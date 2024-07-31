/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponseData<T = Record<string, any>> {
    statusCode: number;
    message: string;
    data: T;
}
