import { useState } from 'react';

import ChatListItem from './ChatListItem';
import { ParticipationRoom, useGetMyChattingListQuery } from '../../../../generated/graphql';

type ChatListType = {
    userId: string;
    onClick: (id: string) => void;
};

export default function ChatList({ userId, onClick }: ChatListType) {
    const [rooms, setRooms] = useState([{ roomId: '', roomName: '' } as ParticipationRoom]);
    useGetMyChattingListQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { userId } },
        onCompleted({ getMyChattingList: { participationRooms } }) {
            setRooms(participationRooms);
        }
    });

    // 리스트 구독은 v1.1
    // useSubscribeRoomSubscription({
    //     variables: { input: { roomIds: rooms.map((el) => el.roomId) } },
    //     onData({ data: { data } }) {
    //         const messageResponse = data?.subscribeRoom;
    //         const { sender, roomId, message: _message } = messageResponse ?? { sender: '', roomId: '', message: '' };
    //         setMessage({ sender, roomId, message: _message });
    //     }
    // });
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                {rooms.map((room) => (
                    <ChatListItem key={room.roomId} room={room} onClick={onClick} />
                ))}
            </ul>
        </div>
    );
}
