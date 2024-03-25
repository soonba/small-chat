import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSubscribeRoomSubscription } from 'generated/graphql';
import useParticipationRooms from 'rest/apis/useParticipationRooms';

import ChatListItem from './ChatListItem';

type ChatListType = {
    onClick: (id: string) => void;
};

export default function ChatList({ onClick }: ChatListType) {
    const [rooms, setRooms] = useState([
        {
            roomId: '',
            roomName: '',
            lastMessage: '',
            lastMessageTime: '',
            unReadMassageCount: 0
        }
    ]);

    const { data } = useQuery({
        queryKey: ['rooms'],
        queryFn: useParticipationRooms
    });

    useEffect(() => {
        if (data) {
            setRooms(data);
        }
    }, [data]);

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: rooms.map((el) => el.roomId) } },
        onData({ data: { data: datum } }) {
            // todo 검토 모든 메시지 수신하며 모든 구독중인 방을 갱신?
            const messageResponse = datum?.subscribeRoom;
            const {
                roomId,
                message: _message,
                createdAt
            } = messageResponse ?? {
                sender: '',
                roomId: '',
                message: '',
                sendAt: ''
            };
            const newRooms = rooms;
            const index = newRooms.findIndex((el) => el.roomId === roomId);
            if (!index || index === -1) {
                return;
            }
            newRooms[index].lastMessage = _message;
            newRooms[index].lastMessageTime = createdAt;
            newRooms[index].unReadMassageCount += 1;
            setRooms(newRooms);
        }
    });
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            {!!rooms && rooms.length > 0 ? (
                <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                    {rooms.map((room) => (
                        <ChatListItem key={room.roomId} room={room} onClick={onClick} />
                    ))}
                </ul>
            ) : (
                <div className="flex h-full w-full items-center justify-center font-bold">채팅방을 생성하거나 참여해보세요. 😆</div>
            )}
        </div>
    );
}
