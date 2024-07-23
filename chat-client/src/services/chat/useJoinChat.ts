import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';

interface IRequestBody {
    roomId: string;
}

const joinChat = async ({ roomId }: IRequestBody): Promise<void> => {
    return postData<void, IRequestBody>('/v2/rooms/participants', { roomId }).then((res) => res.data);
};

interface Props {
    onSuccess?: (roomId: IRequestBody) => void;
    onError?: (error: Error) => void;
}
const useJoinChat = ({ onSuccess, onError }: Props) => {
    const joinChatMutation = useMutation({
        mutationFn: joinChat,
        onSuccess: (_, variables) => {
            if (onSuccess) {
                onSuccess(variables);
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return joinChatMutation;
};

export default useJoinChat;
