import {api} from 'libs/axios';

interface RoomResponse {
    roomId: string;
    roomName: string;
}

interface rooms {
    rooms: {
        rooms: {
            roomId: string;
            roomName: string;
        }[];
    };
}

const getParticipationRooms = async (): Promise<RoomResponse[]> => {
    return api.get<rooms, string>(`/v2/rooms`).then((r) => r.rooms.rooms);
};
export default getParticipationRooms;
