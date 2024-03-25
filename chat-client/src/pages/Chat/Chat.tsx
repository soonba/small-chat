import { useCallback, useState } from 'react';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';

export default function Chat() {
    const [selected, setSelected] = useState('');

    const handleChatRoomSelect = useCallback((id: string) => setSelected(id), []);
    const handleChatRoomLeave = useCallback(() => setSelected(''), []);

    /* 메시지를 받으면 sender: userId 검사를 통해 누구인지 판단.. */
    return (
        <>
            <ChatList onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} onLeave={handleChatRoomLeave} />
        </>
    );
}
