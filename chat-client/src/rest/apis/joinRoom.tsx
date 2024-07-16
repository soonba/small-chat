import {api} from 'libs/axios';

const joinRoom = async (roomId: string): Promise<void> => {
    return api.post(`/v2/rooms/rooms/${roomId}/users`);
};
export default joinRoom;
