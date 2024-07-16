import {api} from 'libs/axios';

interface RoomResponse {
    roomId: string;
    roomName: string;
}

interface rooms {
    roomBasicInfos: {
        roomId: string;
        roomName: string;
    }[];
}

const getParticipationRooms = async (): Promise<RoomResponse[]> => {
    return api.get<rooms, string>(`/v2/rooms`).then((r) => {
        console.log(r);
        return r.roomBasicInfos;
    });
};
export default getParticipationRooms;
