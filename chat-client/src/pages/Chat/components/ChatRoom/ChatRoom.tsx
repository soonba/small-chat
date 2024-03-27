import { useState } from 'react';

import { MessageResponse, useGetHistoryByRoomIdQuery, useSubscribeRoomSubscription } from 'generated/graphql';

import ChatRoomTitle from './ChatRoomTitle';
import ChatTextarea from './ChatTextarea';
import DefaultImage from './DefaultImage';
import MyChat from './MyChat';
import OpponentChat from './OpponentChat';

type ChatRoomType = {
    selected: { id: string; roomName: string };
    me: { userId: string; nickname: string };
    onLeave: () => void;
};
export default function ChatRoom({ selected, me, onLeave }: ChatRoomType) {
    // 새로운 메시지
    const [subscriptionMessages, setSubscriptionMessages] = useState([] as MessageResponse[]);

    const { id: roomId, roomName } = selected;

    // 여기서부터 챗 보내기까지
    const { userId, nickname } = me;

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [roomId] } },
        onData({ data: { data } }) {
            const messageResponse: MessageResponse = data?.subscribeRoom as MessageResponse;
            if (messageResponse) {
                setSubscriptionMessages((prev) => [...prev, messageResponse]);
            }
        }
    });

    const { data } = useGetHistoryByRoomIdQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { roomId } }
    });
    const messages = data?.getHistoryByRoomId.messages || [];

    return selected.id ? (
        <div className="relative mx-auto ml-96 w-full">
            <ChatRoomTitle roomName={roomName} roomId={roomId} onClick={onLeave} />
            <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                {messages.map((el) => (me && me.userId === el.sender.userId ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />))}
                {subscriptionMessages.map((el) => (me && me.userId === el.sender.userId ? <MyChat key={el.messageId} data={el} /> : <OpponentChat key={el.messageId} data={el} />))}
            </div>
            <ChatTextarea roomId={roomId} userId={userId} nickname={nickname} />
        </div>
    ) : (
        <DefaultImage />
    );
}
