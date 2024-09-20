/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponseData<T = Record<string, any>> {
  data: T;
  message: string;
  statusCode: number;
}

export interface Error {
  message: string;
  statusCode: number;
  title: string;
}
