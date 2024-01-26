import { useState } from 'react';

import { MessageResponse, useGetRoomDetailsQuery, useSubscribeRoomSubscription } from 'generated/graphql';

import ChatRoomTitle from './ChatRoomTitle';
import ChatTextarea from './ChatTextarea';
import DefaultImage from './DefaultImage';
import MyChat from './MyChat';
import OpponentChat from './OpponentChat';

type ChatRoomType = {
    selected: string;
    onLeave: () => void;
};
export default function ChatRoom({ selected, onLeave }: ChatRoomType) {
    // 기존메시지
    const [existingMessage, setExistingMessage] = useState([] as MessageResponse[]);
    // 새로운 메시지
    const [subscriptionMessage, setSubscriptionMessage] = useState(new Map<string, MessageResponse[]>());

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [selected] } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            if (messageResponse) {
                const { sender, roomId, message, messageId } = messageResponse;
                const newMessage = subscriptionMessage;
                const messageTypes = newMessage.get(roomId) || [];
                newMessage.set(roomId, [...messageTypes, { sender, roomId, message, messageId } as MessageResponse]);
                setSubscriptionMessage(newMessage);
            }
        }
    });
    const newMessageArr = subscriptionMessage.get(selected) ?? [];

    const { data } = useGetRoomDetailsQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { roomId: selected } },
        onCompleted({ getRoomDetails: { messages } }) {
            setExistingMessage(messages || []);
        }
    });
    const roomId = data?.getRoomDetails?.roomId || '';
    const roomName = data?.getRoomDetails?.roomName || '';
    const userId = localStorage.getItem('userId') ?? null;

    return selected ? (
        <div className="relative mx-auto ml-96 w-full">
            <ChatRoomTitle roomName={roomName} onClick={onLeave} />
            <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                {/* old messages -> from useGetRoomDetailQuery */}
                {existingMessage.map((el) => (userId && userId === el.sender.userId ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />))}
                {/* newer messages -> from useSubscribeRoomSubscription */}
                {newMessageArr.map((el) => (userId && userId === el.sender.userId ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />))}
            </div>
            <ChatTextarea roomId={roomId} />
        </div>
    ) : (
        <DefaultImage />
    );
}
