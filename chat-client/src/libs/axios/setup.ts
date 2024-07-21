import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { clearToken, getTokens } from 'utils/storage';

import appConfig from 'config';

declare module 'axios' {
    export interface AxiosRequestConfig {
        retry?: boolean;
    }
}

const instance: AxiosInstance = axios.create({
    baseURL: appConfig.authApiUrl,
    timeout: 5000
});

instance.defaults.headers.common.Accept = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';

instance.interceptors.request.use((config) => {
    if (config.headers) {
        const { accessToken } = getTokens();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;
});

let isTokenRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => refreshSubscribers.map((callback) => callback(accessToken));
const addRefreshSubscriber = (callback: (accessToken: string) => void) => refreshSubscribers.push(callback);

instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: AxiosError<any>) => {
        const originalRequest = err.config;
        if (originalRequest) {
            if (err.response?.status === 401 && !originalRequest.retry) {
                if (isTokenRefreshing === false) {
                    isTokenRefreshing = true;
                    axios
                        .post(`${appConfig.authApiUrl}/auth/refresh`)
                        .then((res) => res.data)
                        .then(({ result }) => {
                            const { accessToken } = result;
                            onTokenRefreshed(accessToken);
                        })
                        .catch(async () => {
                            clearToken();
                            window.location.reload();
                        })
                        .finally(() => {
                            refreshSubscribers = [];
                            isTokenRefreshing = false;
                        });
                }

                const retryOriginalRequest = new Promise((resolve) => {
                    addRefreshSubscriber((accessToken: string) => {
                        if (originalRequest) {
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            resolve(
                                axios(originalRequest)
                                    .then((res) => res)
                                    .catch((error) => {
                                        return Promise.reject(error);
                                    })
                            );
                        }
                    });
                });

                originalRequest.retry = true;
                return retryOriginalRequest;
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
