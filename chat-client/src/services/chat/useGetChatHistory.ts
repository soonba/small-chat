import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useSocket } from 'hooks';
import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

interface IRequestBody {
    nextCursor: string | null;
}

export type MessageListType = {
    sender: { userId: string; nickname: string } | null;
    createdAt: string;
    message: string;
    messageType: 'SYSTEM' | 'USER';
}[];

interface IResponseBody {
    data: MessageListType;
    nextCursor: string;
}

const getChat = async (id: string, nextCursor: string): Promise<IResponseBody> => {
    return getData<IResponseBody, IRequestBody>(`/v2/chats/${id}/messages`, { nextCursor: nextCursor || null }).then(
        (res) => res.data
    );
};

const useGetChatHistory = (chatId: string) => {
    const { onChatJoin } = useSocket();

    const data = useInfiniteQuery({
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryKey: chatKeys.detail(chatId),
        queryFn: ({ pageParam }) => getChat(chatId, pageParam),
        initialPageParam: '',
        select: ({ pageParams, pages }) => ({ pages, pageParams }),
        getNextPageParam: (lastPage) => (Number(lastPage.nextCursor) > 0 ? lastPage.nextCursor : undefined)
    });

    useEffect(() => {
        if (data?.data) {
            onChatJoin([chatId]);
        }
    }, [data?.data]);

    return data;
};

export default useGetChatHistory;
