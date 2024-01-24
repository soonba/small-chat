import { useState } from 'react';

import ChatRoomTitle from './ChatRoomTitle';
import ChatTextarea from './ChatTextarea';
import DefaultImage from './DefaultImage';
import MyChat from './MyChat';
import OpponentChat from './OpponentChat';
import { useGetRoomDetailsQuery, useSubscribeRoomSubscription } from '../../../../generated/graphql';

type ChatRoomType = {
    selected: string;
    onLeave: () => void;
};
export type MessageType = {
    message: string;
    sender: string;
    roomId: string;
    messageId: string;
};
export default function ChatRoom({ selected, onLeave }: ChatRoomType) {
    // 기존메시지
    const [existingMessage, setExistingMessage] = useState([{ messageId: '', message: '', sender: '', roomId: '' } as MessageType]);
    // 새로운 메시지
    const [subscriptionMessage, setSubscriptionMessage] = useState(new Map<string, MessageType[]>());

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [selected] } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            if (messageResponse) {
                const { sender, roomId, message, messageId } = messageResponse;
                const newMessage = subscriptionMessage;
                const messageTypes = newMessage.get(roomId) || [];
                newMessage.set(roomId, [...messageTypes, { sender, roomId, message } as MessageType]);
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
            {/* old messages -> from useGetRoomDetailQuery */}
            {existingMessage.map((el) => {
                const chatComponent = userId && userId === el.sender ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />;
                return <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">{chatComponent}</div>;
            })}
            {/* newer messages -> from useSubscribeRoomSubscription */}
            {newMessageArr.map((el) => {
                const chatComponent = userId && userId === el.sender ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />;
                return <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">{chatComponent}</div>;
            })}
            <ChatTextarea roomId={roomId} />
        </div>
    ) : (
        <DefaultImage />
    );
}
