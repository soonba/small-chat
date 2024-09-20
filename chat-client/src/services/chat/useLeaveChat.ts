import { useMutation } from '@tanstack/react-query';

import { deleteData } from '@libs/axios';
import { Error } from '@libs/axios/types';

interface IRequestBody {
  chatId: string;
}

const leaveChat = async ({ chatId }: IRequestBody): Promise<void> => {
  return deleteData<void, IRequestBody>('/v2/chats', { chatId }).then((res) => res.data);
};

interface Props {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
const useLeaveChat = ({ onError, onSuccess }: Props) => {
  const leaveChatMutation = useMutation({
    mutationFn: leaveChat,
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return leaveChatMutation;
};

export default useLeaveChat;
