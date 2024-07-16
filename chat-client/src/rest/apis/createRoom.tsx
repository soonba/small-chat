import {api} from 'libs/axios';

interface IRequestBody {
    roomName: string;
}

const createRoom = async (body: IRequestBody) => {
    return api.post<void, IRequestBody>('/v2/rooms', body);
};
export default createRoom;
