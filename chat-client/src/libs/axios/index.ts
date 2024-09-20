import { AxiosResponse } from 'axios';

import instance from './setup';
import { IResponseData } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getData = async <ReturnType, QueryParamType = any>(url: string, params?: QueryParamType) =>
  instance
    .get<
      IResponseData<ReturnType>,
      AxiosResponse<IResponseData<ReturnType>, QueryParamType>,
      QueryParamType
    >(`${url}`, { params })
    .then((res) => res.data);

export const postData = async <ReturnType, BodyType>(url: string, body?: BodyType) =>
  instance
    .post<IResponseData<ReturnType>, AxiosResponse<IResponseData<ReturnType>, BodyType>, BodyType>(`${url}`, body)
    .then((res) => res.data);

export const deleteData = async <ReturnType, BodyType>(url: string, body?: BodyType) =>
  instance
    .delete<IResponseData<ReturnType>, AxiosResponse<IResponseData<ReturnType>, BodyType>, BodyType>(`${url}`, {
      data: body,
    })
    .then((res) => res.data);
