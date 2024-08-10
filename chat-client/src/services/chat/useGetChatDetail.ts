import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

interface IResponseBody {
    chatId: string;
    chatName: string;
}

const getChatDetail = async (chatId: string): Promise<IResponseBody> => {
    return getData<IResponseBody, void>(`/v2/chats/${chatId}`).then((res) => res.data);
};

const useGetChatDetail = () => {
    const { id } = useParams();
    const chatId = id || '';

    const data = useQuery({
        queryKey: chatKeys.detail(chatId),
        queryFn: () => getChatDetail(chatId),
        select: (data) => data
    });

    return data;
};

export default useGetChatDetail;
