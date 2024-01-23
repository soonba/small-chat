import { ChangeEvent, useCallback, useState } from 'react';

import ChatRoomTitle from './ChatRoomTitle';
import ChatTextarea from './ChatTextarea';
import DefaultImage from './DefaultImage';
import MyChat from './MyChat';
import OpponentChat from './OpponentChat';
import { useGetRoomDetailsQuery, useSubscribeRoomSubscription } from '../../../../generated/graphql';

type ChatRoomType = {
    userId: string;
    selected: string;
    onLeave: () => void;
};
type MessageType = {
    message: string;
    sender: string;
    roomId: string;
};
export default function ChatRoom({ userId, selected, onLeave }: ChatRoomType) {
    // 기존메시지
    const [message, setMessage] = useState([{ message: '', sender: '', roomId: '' } as MessageType]);
    // 사용자 입력메시지
    const [inputMessage, setInputMessage] = useState('');
    // 새로운 메시지
    const [subscriptionMessage, setSubscriptionMessage] = useState([{ message: '', sender: '', roomId: '' } as MessageType]);
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessage((prev) => [
                ...prev,
                {
                    message: e.currentTarget.value,
                    sender: userId,
                    roomId: selected
                } as MessageType
            ]);
        },
        [selected]
    );

    const handleSubmit = useCallback(() => {
        // useSendMutation()
    }, []);

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [selected] } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            const { sender, roomId, message } = messageResponse ?? {
                sender: '',
                roomId: '',
                message: ''
            };
            setMessage((prev) => [...prev, { sender, roomId, message } as MessageType]);
        }
    });

    const { data } = useGetRoomDetailsQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { roomId: selected } }
    });
    const roomId = data?.getRoomDetails?.roomId || '';
    const roomName = data?.getRoomDetails?.roomName || '';
    const messages = data?.getRoomDetails?.messages || null;
    return selected ? (
        <div className="relative mx-auto ml-96 w-full">
            <ChatRoomTitle roomName={roomName} onClick={onLeave} />
            {/* old messages -> from useGetRoomDetailQuery */}
            {messages?.map((message) => (
                <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                    <OpponentChat />
                    <MyChat />
                </div>
            ))}
            {/* newer messages -> from useSubscribeRoomSubscription */}
            {subscriptionMessage.map((subscribeMessage) => (
                <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                    <OpponentChat />
                    <MyChat />
                </div>
            ))}
            <ChatTextarea value={inputMessage} onChange={handleChange} onClick={handleSubmit} />
        </div>
    ) : (
        <DefaultImage />
    );
}
