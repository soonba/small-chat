import { useCallback, useEffect, useState } from 'react';

import { socket } from 'libs/socket';

export enum EventType {
    SUBSCRIBE = 'subscribe',
    UN_SUBSCRIBE = 'unSubscribe',
    MESSAGE = 'message'
}

type MessageType = {
    chatId: string;
    userId: string;
    nickname: string;
    message: string;
};

const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState<Omit<MessageType, 'chatId'> | null>(null);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        // 이벤트 받을 때는 on 사용
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const onMessageSend = useCallback((message: MessageType) => {
        // 이벤트 보낼 때는 emit 사용
        socket.emit(EventType.MESSAGE, message);
    }, []);

    const onMessageReceive = useCallback(() => {
        socket.on(EventType.MESSAGE, (message: Omit<MessageType, 'chatId'>) => {
            console.log('==================on message receive==================');
            console.log('message : ', message);
            setMessage(message);
            console.log('==================on message receive==================');
        });
    }, []);

    return { isConnected, message, onMessageSend, onMessageReceive };
};

export default useSocket;
