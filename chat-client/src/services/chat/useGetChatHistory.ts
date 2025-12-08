import { useEffect, useRef } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { useSocket } from '@hooks/utils';
import { getData } from '@libs/axios';
import { chatKeys } from '@utils/queryKey';

interface IRequestBody {
  nextCursor: null | string;
}

export type MessageSenderType = 'SYSTEM' | 'USER';

export type MessageListType = {
  createdAt: string;
  message: string;
  messageType: 'SYSTEM' | 'USER';
  nickname: string;
  type: MessageSenderType;
  userId: string;
}[];

interface IResponseBody {
  data: MessageListType;
  nextCursor: string;
}

const getChat = async (id: string, nextCursor: string): Promise<IResponseBody> => {
  return getData<IResponseBody, IRequestBody>(`/v2/chats/${id}/messages`, { nextCursor: nextCursor || null }).then(
    (res) => res.data,
  );
};

const useGetChatHistory = (chatId: string) => {
  const queryClient = useQueryClient();
  const { onChatJoin } = useSocket();
  const hasSubscribed = useRef(false);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: chatKeys.history(chatId) });
  }, [chatId, queryClient]);

  const { data, ...rest } = useInfiniteQuery<IResponseBody, Error>({
    getNextPageParam: () => undefined,
    getPreviousPageParam: (lastPage) => (Number(lastPage.nextCursor) > 0 ? lastPage.nextCursor : undefined),
    initialPageParam: '',
    queryFn: ({ pageParam }) => getChat(chatId, pageParam as string),
    queryKey: chatKeys.history(chatId),
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!hasSubscribed.current && chatId) {
      hasSubscribed.current = true;
      onChatJoin([chatId]);
    }
  }, [chatId, onChatJoin]);

  return { data, ...rest };
};

export default useGetChatHistory;
