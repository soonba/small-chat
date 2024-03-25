interface Rooms {
    roomId: string;
    roomName: string;
}

const useParticipationRooms = async () => {
    return [
        // {
        //     roomId: 'roomId',
        //     roomName: 'name'
        // }
    ];
    // return api.get<Rooms, string>(`/auth/rooms`).then((r) => {
    //     return [
    //         {
    //             roomId: 'roomId',
    //             roomName: 'name'
    //         }
    //     ];
    // });
};
export default useParticipationRooms;
