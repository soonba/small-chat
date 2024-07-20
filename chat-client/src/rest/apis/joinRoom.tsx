import {api} from 'libs/axios';

const joinRoom = async (roomId: string): Promise<void> => {
    return api.post(`/v2/rooms/${roomId}/users`);
};
export default joinRoom;
