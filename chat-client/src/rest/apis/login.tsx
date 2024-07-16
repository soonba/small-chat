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
    return api.post<LoginResponse, IRequestBody>('/v2/users/login', body);
};

export default login;
