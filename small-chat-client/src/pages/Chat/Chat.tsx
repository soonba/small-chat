import { ChangeEvent, useCallback, useState } from 'react';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { ParticipationRoom, useGetMyChattingListQuery, useSubscribeRoomSubscription } from '../../generated/graphql';

export default function Chat() {
    const [selected, setSelected] = useState('');
    const [message, setMessage] = useState('');
    const [rooms, setRooms] = useState([{ roomId: '', roomName: '' } as ParticipationRoom]);

    const handleChatRoomSelect = useCallback((id: string) => setSelected(id), []);
    const handleChatRoomLeave = useCallback(() => setSelected(''), []);

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value), []);

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
        variables: { input: { roomIds: ['1'] } },
        onData({ data: { data } }) {
            const messageResponse = data?.subscribeRoom;
            console.log(messageResponse?.message);
        }
    });

    return (
        <>
            <ChatList rooms={rooms} onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} value={message} onChange={handleChange} onClick={handleSubmit} onLeave={handleChatRoomLeave} />{' '}
        </>
    );
}
