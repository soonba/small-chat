import { AxiosResponse } from 'axios';

import instance from './setup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getData = async <ReturnType, QueryParamType = any>(url: string, params?: QueryParamType): Promise<any> =>
    instance.get<ReturnType>(`${url}`, { params }).then((res) => res.data);

export const postData = async <ReturnType, BodyType>(url: string, body: BodyType): Promise<ReturnType> =>
    instance.post(`${url}`, body).then((res) => res.data);
