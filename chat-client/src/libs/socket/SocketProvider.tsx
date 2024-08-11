import { createContext, ReactNode, useMemo, useCallback, useEffect, useState, useContext } from 'react';

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

interface SocketContextType {
    isConnected: boolean;
    message: SocketMessageType[];
    onSocketConnect: () => void;
    onChatJoin: (chatIds: string[]) => void;
    onMessageSend: (message: MessageBodyType) => void;
    onMessageReceive: () => void;
    onCurrentChatLeave: (chatId: string) => void;
    onChatLeave: (chatIds: string[]) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('should use Socket inside `SocketProvider`!');
    }

    return context;
};

interface Props {
    children: ReactNode;
}

export default function SocketProvider({ children }: Props) {
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

    const onChatJoin = useCallback(
        (chatIds: string[]) => {
            if (socket.disconnected) {
                onSocketConnect();
                socket.emit(EventType.SUBSCRIBE, { chatIds });
            } else {
                socket.emit(EventType.SUBSCRIBE, { chatIds });
            }
        },
        [onSocketConnect]
    );

    const onMessageSend = useCallback(
        (message: MessageBodyType) => {
            onChatJoin([message.messageBody.chatId]);
            socket.emit(EventType.MESSAGE, message);
        },
        [onChatJoin]
    );

    const onMessageReceive = useCallback(() => {
        socket.on(EventType.MESSAGE, (message: SocketMessageType) => {
            setMessage((prev) => [message, ...prev]);
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

    const context: SocketContextType = useMemo(
        () => ({
            isConnected,
            message,
            onSocketConnect,
            onChatJoin,
            onMessageSend,
            onMessageReceive,
            onCurrentChatLeave,
            onChatLeave
        }),
        [
            isConnected,
            message,
            onSocketConnect,
            onChatJoin,
            onMessageSend,
            onMessageReceive,
            onCurrentChatLeave,
            onChatLeave
        ]
    );

    return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}
