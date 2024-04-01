import { api } from 'libs/axios';

const joinRoom = async (roomId: string): Promise<void> => {
    return api.post(`/rooms/${roomId}/join`);
};
export default joinRoom;
