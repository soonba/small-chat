import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';
import { Error } from 'libs/axios/types';

interface IRequestBody {
    chatId: string;
}

const joinChat = async ({ chatId }: IRequestBody): Promise<void> => {
    return postData<void, IRequestBody>('/v2/chats/participants', { chatId }).then((res) => res.data);
};

interface Props {
    onSuccess?: (chatId: string) => void;
    onError?: (error: Error) => void;
}
const useJoinChat = ({ onSuccess, onError }: Props) => {
    const joinChatMutation = useMutation({
        mutationFn: joinChat,
        onSuccess: (_, { chatId }) => {
            if (onSuccess) {
                onSuccess(chatId);
            }
        },
        onError: (error: Error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return joinChatMutation;
};

export default useJoinChat;
