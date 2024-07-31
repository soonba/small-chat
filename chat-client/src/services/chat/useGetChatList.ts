import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

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
    const data = useQuery({
        queryKey: chatKeys.lists(),
        queryFn: getChatList,
        select: (data) => data.chatBasicInfos
    });

    return data;
};

export default useGetChatList;
