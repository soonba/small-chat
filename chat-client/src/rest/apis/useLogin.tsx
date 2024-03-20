import { api } from '../../libs/axios';
import { IResponseBody } from '../../libs/axios/types';

interface IRequestBody {
    userId: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

const useLogin = async (body: IRequestBody) => {
    return api.post<IResponseBody<LoginResponse>, IRequestBody>('/auth/login', body).then((response) => response.data);
};

export default useLogin;
