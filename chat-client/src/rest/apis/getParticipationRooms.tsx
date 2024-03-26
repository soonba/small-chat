import { api } from 'libs/axios';

interface Rooms {
    roomResponse: {
        roomId: string;
        roomName: string;
    }[];
}

const getParticipationRooms = async (): Promise<Rooms> => {
    return api.get<Rooms, string>(`/rooms`);
};
export default getParticipationRooms;
