import { api } from 'libs/axios';

interface IRequestBody {
    userId: string;
    password: string;
    nickname: string;
}

interface JoinResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

const useJoin = async (body: IRequestBody) => {
    return api.post<JoinResponse, IRequestBody>('/auth/join', body);
};
export default useJoin;
