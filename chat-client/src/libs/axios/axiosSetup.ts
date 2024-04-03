import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import appConfig from 'config';

import { IError } from './types';
import { LOCAL_STORAGE_KEYS } from '../common/constant';
import { clearToken, setTokens } from '../utils/storage';

export const defaultAxiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
    timeout: 5000
};
const onFulfilled = (response: AxiosResponse) => {
    return response.data.data;
};

const onRejected = async (error: IError) => {
    const { config, response } = error;
    if (response?.status === 401) {
        try {
            const { data } = await axios.post(`${appConfig.authApiUrl}/auth/refresh`, { refreshToken: localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) });
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;
            setTokens(newAccessToken, newRefreshToken);
            config.headers = { Authorization: `Bearer ${newAccessToken}` };
            return await axios.request(error.config);
        } catch (err) {
            clearToken();
            window.location.replace('/');
            return window.location.reload();
        }
    }
    return Promise.reject(error);
};

const initialization = (axiosRequestConfig: AxiosRequestConfig) => {
    const axiosInstance = axios.create(axiosRequestConfig);

    axiosInstance.interceptors.request.use((existedConfig: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const newConfig = existedConfig;
        if (typeof window !== 'undefined' && accessToken) {
            newConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
        return newConfig;
    });

    axiosInstance.interceptors.response.use(onFulfilled, onRejected);

    return axiosInstance;
};
export default initialization;
