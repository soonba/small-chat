import { AxiosRequestConfig } from 'axios';

import initialization, { defaultAxiosConfig } from './axiosSetup';
import { IResponseBody } from './types';

export const axiosInstance = initialization(defaultAxiosConfig);

const get = <ReturnType, QueryParamType = unknown>(url: string, queryParams?: QueryParamType, config?: AxiosRequestConfig<any> | undefined) => {
    return axiosInstance.get<IResponseBody<ReturnType>, ReturnType>(url, { ...config, params: queryParams });
};

const post = <ReturnType, BodyType>(url: string, body?: BodyType, config?: AxiosRequestConfig<any> | undefined) => {
    return axiosInstance.post<IResponseBody<ReturnType>, ReturnType>(url, body, config);
};

export const api = { get, post };
