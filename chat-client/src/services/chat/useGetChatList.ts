import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { chatKeys } from 'utils/queryKey';

interface IResponseBody {
    list: {
        roomId: string;
        roomName: string;
        lastMessage: string;
        lastMessageTime: string;
    }[];
}

const getChatList = async (): Promise<IResponseBody> => {
    return getData<IResponseBody, void>(`/v2/rooms`);
};

const useGetChatList = () => {
    const data = useQuery({
        queryKey: chatKeys.lists(),
        queryFn: getChatList,
        select: (data) => data.list
    });

    return data;
};

export default useGetChatList;
