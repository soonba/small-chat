import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import fetchMe from 'rest/apis/fetchMe';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';

export default function Chat() {
    const [selected, setSelected] = useState({ id: '', roomName: '' });

    const handleChatRoomSelect = useCallback((id: string, roomName: string) => setSelected({ id, roomName }), []);
    const handleChatRoomLeave = useCallback(() => setSelected({ id: '', roomName: '' }), []);

    const { data: me } = useQuery({
        queryKey: ['fetchMe'],
        queryFn: fetchMe,
        initialData: () => {
            return {
                userId: '',
                nickname: ''
            };
        }
    });

    /* 메시지를 받으면 sender: userId 검사를 통해 누구인지 판단.. */
    return (
        <>
            <ChatList onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} me={me} onLeave={handleChatRoomLeave} />
        </>
    );
}
