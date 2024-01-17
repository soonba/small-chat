import { ChangeEvent, useCallback, useState } from 'react';

import { useSubscribeRoomSubscription } from 'generated/graphql';

import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';

export default function Chat() {
    const [selected, setSelected] = useState('');
    const [message, setMessage] = useState('');

    const handleChatRoomSelect = useCallback((id: string) => setSelected(id), []);
    const handleChatRoomLeave = useCallback(() => setSelected(''), []);

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value), []);

    const handleSubmit = useCallback(() => {
        // TODO:
    }, []);

    useSubscribeRoomSubscription({
        variables: { input: { roomIds: ['1', '2'] } },
        onData(options) {
            // eslint-disable-next-line no-console
            console.log(options.data.data);
        }
    });

    return (
        <>
            <ChatList onClick={handleChatRoomSelect} />
            <ChatRoom selected={selected} value={message} onChange={handleChange} onClick={handleSubmit} onLeave={handleChatRoomLeave} />{' '}
        </>
    );
}
