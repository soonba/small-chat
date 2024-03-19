export interface IResponseBodyWithoutDataProperty {
    statusCode: number;
    message: string;
}

export interface IResponseBody<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface IConfig {
    originalRequest: any;
    headers: { Authorization: string };
    url: string;
    method: string;
    params: string;
}

export interface IError {
    config: IConfig;
    response?: { status: number } | null;
}
