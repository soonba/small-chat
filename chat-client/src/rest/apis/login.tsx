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

const login = async (body: IRequestBody) => {
    return api.post<LoginResponse, IRequestBody>('/auth/login', body);
};

export default login;
