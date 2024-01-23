import { useCallback, useState } from 'react';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { ParticipationRoom, useGetMyChattingListQuery } from '../../generated/graphql';

export default function Chat() {
    const [selected, setSelected] = useState('');
    const [rooms, setRooms] = useState([{ roomId: '', roomName: '' } as ParticipationRoom]);

    const handleChatRoomSelect = useCallback((id: string) => setSelected(id), []);
    const handleChatRoomLeave = useCallback(() => setSelected(''), []);

    const userId = localStorage.getItem('userId') || '';
    useGetMyChattingListQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { userId } },
        onCompleted({ getMyChattingList: { participationRooms } }) {
            setRooms(participationRooms);
        }
    });

    // 리스트 구독은 v1.1
    // useSubscribeRoomSubscription({
    //     variables: { input: { roomIds: rooms.map((el) => el.roomId) } },
    //     onData({ data: { data } }) {
    //         const messageResponse = data?.subscribeRoom;
    //         const { sender, roomId, message: _message } = messageResponse ?? { sender: '', roomId: '', message: '' };
    //         setMessage({ sender, roomId, message: _message });
    //     }
    // });

    /* 메시지를 받으면 sender: userId 검사를 통해 누구인지 판단.. */
    return (
        <>
            <ChatList rooms={rooms} onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} onLeave={handleChatRoomLeave} />{' '}
        </>
    );
}
