import { api } from '../../libs/axios';
import { IResponseBody } from '../../libs/axios/types';

interface IRequestBody {
    userId: string;
    password: string;
    nickname: string;
}

interface JoinResponse {
    accessToken: string;
    refreshToken: string;
}

const useJoin = async (body: IRequestBody) => {
    return api.post<IResponseBody<JoinResponse>, IRequestBody>('/auth/join', body).then((response) => response.data);
};
export default useJoin;
