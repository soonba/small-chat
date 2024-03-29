import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { RoomResponse, useGetRoomLatestInfosQuery, useSubscribeRoomSubscription } from 'generated/graphql';
import getParticipationRooms from 'rest/apis/getParticipationRooms';

import ChatListItem from './ChatListItem';

type ChatListType = {
    onClick: (id: string, roomName: string) => void;
};

export default function ChatList({ onClick }: ChatListType) {
    const [roomsLatestMessage, setRoomsLatestMessage] = useState([
        {
            ...({
                roomId: '',
                lastMessage: '',
                lastMessageTime: '',
                lastMessageSenderNickname: ''
            } as RoomResponse),
            roomName: '',
            unReadMassageCount: 0
        }
    ]);

    const [selectedId, setSelectedId] = useState('');

    const { data: rooms } = useQuery({
        queryKey: ['rooms'],
        queryFn: getParticipationRooms,
        initialData: () => []
    });

    const { data: latestData } = useGetRoomLatestInfosQuery({
        skip: !rooms || rooms.length === 0,
        variables: { input: { roomIds: rooms.map((room) => room.roomId) ?? [] } },
        onCompleted: (res) => {
            if (res?.getRoomLatestInfos) {
                // todo 개선... O(n^2)
                setRoomsLatestMessage(
                    res.getRoomLatestInfos.map((datum) => {
                        const { roomName } = rooms?.find((el2) => el2.roomId === datum.roomId) ?? { roomName: '' };
                        return { ...datum, roomName, unReadMassageCount: 0 };
                    })
                );
            }
        }
    });

    const handleChatRoomSelect = useCallback(
        (id: string, roomName: string) => {
            const resetUnReadCountMessage = roomsLatestMessage;
            const index = resetUnReadCountMessage.findIndex((el) => el?.roomId === id);
            if (index !== -1) {
                resetUnReadCountMessage[index].unReadMassageCount = 0;
                setRoomsLatestMessage(resetUnReadCountMessage);
            }
            setSelectedId(id);
            return onClick(id, roomName);
        },
        [onClick, roomsLatestMessage]
    );

    useSubscribeRoomSubscription({
        skip: !latestData,
        variables: { input: { roomIds: latestData?.getRoomLatestInfos.map((el) => (el?.roomId ? `list_${el.roomId}` : '')) ?? [] } },
        onData({ data: { data } }) {
            if (!data) return;
            // todo 검토. 모든 메시지 수신하며 모든 구독중인 방을 갱신?
            const messageResponse = data.subscribeRoom;
            const { roomId, sender, message: _message, createdAt } = messageResponse;
            const newData = roomsLatestMessage;

            const index = newData.findIndex((el) => el?.roomId === roomId);
            if (index === -1) return;

            newData[index].lastMessage = _message;
            newData[index].lastMessageTime = dayjs(createdAt);
            if (selectedId !== roomId) {
                newData[index].unReadMassageCount += 1;
            }
            newData[index].lastMessageSenderNickname = sender.nickname;
            setRoomsLatestMessage(newData);
        }
    });
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            {!!roomsLatestMessage && roomsLatestMessage[0].roomId !== '' ? (
                <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                    {roomsLatestMessage.map((room) => (
                        <ChatListItem key={room.roomId} room={room} selectedId={selectedId} onClick={handleChatRoomSelect} />
                    ))}
                </ul>
            ) : (
                <div className="flex h-full w-full items-center justify-center font-bold">채팅방을 생성하거나 참여해보세요. 😆</div>
            )}
        </div>
    );
}
