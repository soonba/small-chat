import { useMutation } from '@tanstack/react-query';

import { deleteData } from 'libs/axios';

interface IRequestBody {
    chatId: string;
}

const leaveChat = async ({ chatId }: IRequestBody): Promise<void> => {
    return deleteData<void, IRequestBody>('/v2/chats', { chatId }).then((res) => res.data);
};

interface Props {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
const useLeaveChat = ({ onSuccess, onError }: Props) => {
    const leaveChatMutation = useMutation({
        mutationFn: leaveChat,
        onSuccess: () => {
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return leaveChatMutation;
};

export default useLeaveChat;
