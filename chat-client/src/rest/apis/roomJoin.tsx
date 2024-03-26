import { api } from 'libs/axios';

interface IRequestBody {
    roomName: string;
}

const roomJoin = async (body: IRequestBody): Promise<void> => {
    return api.post<void, IRequestBody>(`/rooms`, body);
};
export default roomJoin;
