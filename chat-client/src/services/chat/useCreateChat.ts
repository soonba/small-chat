import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';

interface IRequestBody {
    chatName: string;
}

interface IResponseBody {
    chatId: string;
}

const createChat = async (body: IRequestBody) => {
    return postData<IResponseBody, IRequestBody>('/v2/chats', body).then((res) => res.data);
};

interface Props {
    onSuccess?: (chatId: string) => void;
    onError?: (error: Error) => void;
}
const useCreateChat = ({ onSuccess, onError }: Props) => {
    const createChatMutation = useMutation({
        mutationFn: createChat,
        onSuccess: ({ chatId }) => {
            if (onSuccess) {
                onSuccess(chatId);
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return createChatMutation;
};

export default useCreateChat;
