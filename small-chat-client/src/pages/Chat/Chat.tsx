import { ChangeEvent, useCallback, useState } from 'react';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { ParticipationRoom, useGetMyChattingListQuery, useSubscribeRoomSubscription } from '../../generated/graphql';

export default function Chat() {
    const [selected, setSelected] = useState('');
    const [message, setMessage] = useState({ message: '', roomId: '', sender: '' });
    const [rooms, setRooms] = useState([{ roomId: '', roomName: '' } as ParticipationRoom]);

    const handleChatRoomSelect = useCallback((id: string) => setSelected(id), []);
    const handleChatRoomLeave = useCallback(() => setSelected(''), []);

    // todo 수정
    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setMessage({ message: e.currentTarget.value, sender: '', roomId: selected }), []);

    const handleSubmit = useCallback(() => {
        // TODO:
    }, []);

    const userId = localStorage.getItem('userId') || '';
    useGetMyChattingListQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { userId } },
        onCompleted({ getMyChattingList: { participationRooms } }) {
            setRooms(participationRooms);
        }
    });

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: rooms.map((el) => el.roomId) } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            const { sender, roomId, message: _message } = messageResponse ?? { sender: '', roomId: '', message: '' };
            setMessage({ sender, roomId, message: _message });
        }
    });

    /* 메시지를 받으면 sender: userId 검사를 통해 누구인지 판단.. */
    return (
        <>
            <ChatList rooms={rooms} onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} value={message} onChange={handleChange} onClick={handleSubmit} onLeave={handleChatRoomLeave} />{' '}
        </>
    );
}
