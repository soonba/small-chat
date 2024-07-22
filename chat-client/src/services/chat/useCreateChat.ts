import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';

interface IRequestBody {
    roomName: string;
}

interface IResponseBody {
    roomId: string;
}

const createChat = async (body: IRequestBody) => {
    return postData<IResponseBody, IRequestBody>('/v2/rooms', body);
};

interface Props {
    onSuccess?: (roomId: string) => void;
    onError?: (error: Error) => void;
}
const useCreateChat = ({ onSuccess, onError }: Props) => {
    const createChatMutation = useMutation({
        mutationFn: createChat,
        onSuccess: ({ roomId }) => {
            if (onSuccess) {
                onSuccess(roomId);
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
