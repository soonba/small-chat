import { api } from 'libs/axios';

interface IRequestBody {
    accountId: string;
    password: string;
}

interface LoginResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

const useLogin = async (body: IRequestBody) => {
    return api.post<LoginResponse, IRequestBody>('/auth/login', body);
};

export default useLogin;
