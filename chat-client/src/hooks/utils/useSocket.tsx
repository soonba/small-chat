import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { socket } from '@libs/socket';
import { chatKeys } from '@utils/queryKey';

export enum EventType {
  MESSAGE = 'message',
  SUBSCRIBE = 'subscribe',
  UN_SUBSCRIBE = 'unSubscribe',
}

export type MessageType = {
  chatId: string;
  message: string;
  nickname: string;
  userId: string;
};

export type SocketMessageType = { createdAt: string } & Omit<MessageType, 'chatId'>;

type MessageBodyType = {
  messageBody: MessageType;
};

type ChatListType = {
  chatBasicInfos: {
    chatId: string;
    chatName: string;
    lastMessage: string;
    lastMessageTime: string;
  }[];
};

const useSocket = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState<SocketMessageType[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(socket.connected);
    };

    const onDisconnect = () => {
      setIsConnected(socket.connected);
    };

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
    [onChatJoin],
  );

  const onMessageReceive = useCallback(() => {
    socket.on(EventType.MESSAGE, (message: { createdAt: string } & MessageType) => {
      if (message.chatId.startsWith('list_')) {
        const chatId = message.chatId.replace('list_', '');
        queryClient.setQueryData(chatKeys.lists(), (previousList: ChatListType | undefined) => {
          if (previousList?.chatBasicInfos) {
            const newList = previousList.chatBasicInfos.slice(0);
            const index = newList.findIndex((data) => data.chatId === chatId);
            newList[index] = {
              ...newList[index],
              lastMessage: message.message,
              lastMessageTime: message.createdAt,
            };
            return { chatBasicInfos: newList };
          }
          return previousList;
        });
      } else if (message.chatId === id) {
        setMessage((prev) => [message, ...prev]);
      }
    });
  }, [id]);

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
    onChatJoin,
    onChatLeave,
    onCurrentChatLeave,
    onMessageReceive,
    onMessageSend,
    onSocketConnect,
  };
};

export default useSocket;
