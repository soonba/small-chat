import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

interface IResponseBody {
    chatBasicInfoList: {
        sender: {
            userId: string;
            nickname: string;
        } | null;
        createdAt: string;
        message: string;
        chatType: 'SYSTEM' | 'USER';
    }[];
}

const getChat = async (id: string): Promise<IResponseBody> => {
    return getData<IResponseBody, void>(`/v2/rooms/${id}/chats`).then((res) => res.data);
};

const useGetChatHistory = (id: string) => {
    const data = useQuery({
        queryKey: chatKeys.detail(id),
        queryFn: () => getChat(id),
        select: (data) => data.chatBasicInfoList
    });

    return data;
};

export default useGetChatHistory;
