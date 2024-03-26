import { api } from 'libs/axios';

interface IRequestBody {
    roomName: string;
}

const joinRoom = async (body: IRequestBody): Promise<void> => {
    return api.post<void, IRequestBody>(`/rooms`, body);
};
export default joinRoom;
