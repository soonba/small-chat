import { api } from 'libs/axios';

interface FetchMeResponse {
    userId: string;
    nickname: string;
}

const fetchMe = async (): Promise<FetchMeResponse> => {
    return api.get<FetchMeResponse, void>(`/v2/users`);
};
export default fetchMe;
