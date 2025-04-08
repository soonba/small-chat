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
    const handleConnect = () => {
      setIsConnected(socket.connected);
    };

    const handleDisconnect = () => {
      setIsConnected(socket.connected);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const handleSocketConnect = useCallback(() => {
    socket.connect();
    setIsConnected(socket.connected);
  }, []);

  const handleChatJoin = useCallback(
    (chatIds: string[]) => {
      if (socket.disconnected) {
        handleSocketConnect();
        socket.emit(EventType.SUBSCRIBE, { chatIds });
      } else {
        socket.emit(EventType.SUBSCRIBE, { chatIds });
      }
    },
    [handleSocketConnect],
  );

  const handleMessageSend = useCallback(
    (message: MessageBodyType) => {
      handleChatJoin([message.messageBody.chatId]);
      socket.emit(EventType.MESSAGE, message);
    },
    [handleChatJoin],
  );

  const handleMessageReceive = useCallback(() => {
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
  }, [id, queryClient]);

  const handleCurrentChatLeave = useCallback((chatId: string) => {
    socket.emit(EventType.UN_SUBSCRIBE, { chatId });
  }, []);

  const handleChatLeave = useCallback((chatIds: string[]) => {
    chatIds.forEach((chatId) => {
      socket.emit(EventType.UN_SUBSCRIBE, { chatId });
    });
    socket.disconnect();
  }, []);

  useEffect(() => {
    handleMessageReceive();

    return () => {
      socket.off(EventType.MESSAGE);
    };
  }, [handleMessageReceive]);

  return {
    isConnected,
    message,
    onChatJoin: handleChatJoin,
    onChatLeave: handleChatLeave,
    onCurrentChatLeave: handleCurrentChatLeave,
    onMessageReceive: handleMessageReceive,
    onMessageSend: handleMessageSend,
    onSocketConnect: handleSocketConnect,
  };
};

export default useSocket;
