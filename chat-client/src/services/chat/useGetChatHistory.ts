import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

interface IResponseBody {
    messageBasicInfoList: {
        sender: {
            userId: string;
            nickname: string;
        } | null;
        createdAt: string;
        message: string;
        messageType: 'SYSTEM' | 'USER';
    }[];
}

const getChat = async (id: string): Promise<IResponseBody> => {
    return getData<IResponseBody, void>(`/v2/chats/${id}/messages`).then((res) => res.data);
};

const useGetChatHistory = (id: string) => {
    const data = useQuery({
        queryKey: chatKeys.detail(id),
        queryFn: () => getChat(id),
        select: (data) => data.messageBasicInfoList
    });

    return data;
};

export default useGetChatHistory;
