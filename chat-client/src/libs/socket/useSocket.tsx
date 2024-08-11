import { useCallback, useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { socket } from './setup';

export enum EventType {
    SUBSCRIBE = 'subscribe',
    UN_SUBSCRIBE = 'unSubscribe',
    MESSAGE = 'message'
}

export type MessageType = {
    chatId: string;
    userId: string;
    nickname: string;
    message: string;
};

export type SocketMessageType = Omit<MessageType, 'chatId'> & { createdAt: string };

type MessageBodyType = {
    messageBody: MessageType;
};

const useSocket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState<SocketMessageType[]>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(socket.connected);
        }

        function onDisconnect() {
            setIsConnected(socket.connected);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const onSocketConnect = useCallback(() => {
        socket.connect();
        setIsConnected(socket.connected);
    }, []);

    const onChatJoin = useCallback((chatIds: string[]) => {
        if (socket.disconnected) {
            onSocketConnect();
            socket.emit(EventType.SUBSCRIBE, { chatIds });
        } else {
            socket.emit(EventType.SUBSCRIBE, { chatIds });
        }
    }, []);

    const onMessageSend = useCallback(
        (message: MessageBodyType) => {
            onChatJoin([message.messageBody.chatId]);
            socket.emit(EventType.MESSAGE, message);
        },
        [onChatJoin]
    );

    const onMessageReceive = useCallback(() => {
        socket.on(EventType.MESSAGE, (message: MessageType & { createdAt: string }) => {
            console.log(dayjs().toDate());
            if (message.chatId.startsWith('list_')) {
                console.log('list message');
            } else {
                console.log('chat message');
                setMessage((prev) => [message, ...prev]);
            }
            console.log(message);
        });
    }, []);

    const onCurrentChatLeave = useCallback((chatId: string) => {
        socket.emit(EventType.UN_SUBSCRIBE, { chatId });
    }, []);

    const onChatLeave = useCallback((chatIds: string[]) => {
        chatIds.forEach((chatId) => {
            socket.emit(EventType.UN_SUBSCRIBE, { chatId });
        });
        socket.disconnect();
    }, []);

    useEffect(() => {
        onMessageReceive();

        return () => {
            socket.off(EventType.MESSAGE);
        };
    }, []);

    return {
        isConnected,
        message,
        onSocketConnect,
        onChatJoin,
        onMessageSend,
        onMessageReceive,
        onCurrentChatLeave,
        onChatLeave
    };
};

export default useSocket;
