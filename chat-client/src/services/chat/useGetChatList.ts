import { useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSocket } from '@hooks/utils';
import { getData } from '@libs/axios';
import { chatKeys } from '@utils/queryKey';

interface IResponseBody {
  chatBasicInfos: {
    chatId: string;
    chatName: string;
    lastMessage: string;
    lastMessageTime: string;
  }[];
}

const getChatList = async (): Promise<IResponseBody> => {
  return getData<IResponseBody, void>(`/v2/chats`).then((res) => res.data);
};

const useGetChatList = () => {
  const { onChatJoin } = useSocket();
  const hasSubscribed = useRef(false);

  const { data, ...rest } = useQuery({
    queryFn: getChatList,
    queryKey: chatKeys.lists(),
    select: (data) => data.chatBasicInfos,
  });

  useEffect(() => {
    if (!hasSubscribed.current && data && data.length > 0) {
      hasSubscribed.current = true;
      onChatJoin(data.map((val) => `list_${val.chatId}`));
    }
  }, [data, onChatJoin]);

  return { data, ...rest };
};

export default useGetChatList;
