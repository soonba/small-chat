import { api } from 'libs/axios';

interface IRequestBody {
    accountId: string;
    password: string;
    nickname: string;
}

interface JoinResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

const joinUser = async (body: IRequestBody) => {
    return api.post<JoinResponse, IRequestBody>('/v2/users', body);
};
export default joinUser;
