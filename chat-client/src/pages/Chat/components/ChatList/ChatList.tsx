import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { RoomResponse, useGetRoomLatestInfosQuery, useSubscribeRoomSubscription } from 'generated/graphql';
import getParticipationRooms from 'rest/apis/getParticipationRooms';

import ChatListItem from './ChatListItem';

type ChatListType = {
    onClick: (id: string) => void;
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

    const { data } = useQuery({
        queryKey: ['rooms'],
        queryFn: getParticipationRooms
    });

    const { data: latestData } = useGetRoomLatestInfosQuery({
        skip: !data,
        variables: { input: { roomIds: data?.map((room) => room.roomId) ?? [] } },
        onCompleted: (res) => {
            if (res?.getRoomLatestInfos) {
                // todo 개선... data
                setRoomsLatestMessage(
                    res.getRoomLatestInfos.map((datum) => {
                        const { roomName } = data?.find((el2) => el2.roomId === datum.roomId) ?? { roomName: '' };
                        return { ...datum, roomName, unReadMassageCount: 0 };
                    })
                );
            }
        }
    });

    useSubscribeRoomSubscription({
        skip: !latestData,
        variables: { input: { roomIds: latestData?.getRoomLatestInfos.map((el) => el?.roomId ?? '') ?? [] } },
        onData({ data: { data: datum } }) {
            // todo 검토 모든 메시지 수신하며 모든 구독중인 방을 갱신?
            const messageResponse = datum?.subscribeRoom;
            const {
                roomId,
                sender,
                message: _message,
                createdAt
            } = messageResponse ?? {
                roomId: '',
                sender: { userId: '', nickname: '' },
                message: '',
                createdAt: ''
            };

            const newData = roomsLatestMessage;
            const index = newData.findIndex((el) => el?.roomId === roomId);
            if (!index || index === -1) {
                return;
            }
            newData[index].lastMessage = _message;
            newData[index].lastMessageTime = dayjs(createdAt);
            newData[index].unReadMassageCount += 1;
            newData[index].lastMessageSenderNickname = sender.nickname;
            setRoomsLatestMessage(newData);
        }
    });
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            {!!roomsLatestMessage && roomsLatestMessage.length > 0 ? (
                <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                    {roomsLatestMessage.map((room) => (
                        <ChatListItem key={room.roomId} room={room} onClick={onClick} />
                    ))}
                </ul>
            ) : (
                <div className="flex h-full w-full items-center justify-center font-bold">채팅방을 생성하거나 참여해보세요. 😆</div>
            )}
        </div>
    );
}
