import { useEffect, useState } from 'react';

import { socket } from 'libs/socket';

export default function Test() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const [value, setValue] = useState('');

    const handleSubmit = () => {
        socket.emit('chat message', value);
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
            <h1>{isConnected ? 'connected' : 'not connected'}</h1>
            <textarea
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                className="h-80 w-1/2 resize-none border border-black"
            />
            <button type="button" onClick={handleSubmit} className="mt-10 w-1/2 rounded border border-black py-5">
                테스트
            </button>
        </div>
    );
}
