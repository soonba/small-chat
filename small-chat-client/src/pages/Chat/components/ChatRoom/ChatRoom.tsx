import { ChangeEvent, useCallback, useState } from 'react';

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

export default function ChatRoom({ selected, onLeave }: ChatRoomType) {
    const [message, setMessage] = useState([{ message: '', sender: '', roomId: '' }]);
    const [inputMessage, setInputMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    // todo 수정
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const newMessage = message;
            newMessage.push({ message: e.currentTarget.value, sender: '', roomId: selected });
            setMessage(newMessage);
        },
        [message, selected]
    );

    const handleSubmit = useCallback(() => {
        // useSendMutation()
    }, []);

    // 새로운 메시지가 왔을 때
    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [selected] } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            const { sender, roomId: _roomId, message: _message } = messageResponse ?? { sender: '', roomId: '', message: '' };
            const newMessage = message;
            newMessage.push({ sender, roomId: _roomId, message: _message });
            setMessage(newMessage);
        }
    });

    useGetRoomDetailsQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { roomId: selected } },
        onCompleted({ getRoomDetails: { roomId: _roomId, roomName: _roomName, messages } }) {
            setRoomName(_roomName);
            setMessage(messages);
            setRoomId(_roomId);
            console.log('리스트 쿼리호출');
        }
    });

    return selected ? (
        <div className="relative mx-auto ml-96 w-full">
            <ChatRoomTitle roomName={roomName} onClick={onLeave} />
            <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                <OpponentChat />
                <MyChat />
            </div>
            <ChatTextarea value={inputMessage} onChange={handleChange} onClick={handleSubmit} />
        </div>
    ) : (
        <DefaultImage />
    );
}
