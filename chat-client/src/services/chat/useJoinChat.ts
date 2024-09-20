import { useMutation } from '@tanstack/react-query';

import { postData } from '@libs/axios';
import { Error } from '@libs/axios/types';

interface IRequestBody {
  chatId: string;
}

const joinChat = async ({ chatId }: IRequestBody): Promise<void> => {
  return postData<void, IRequestBody>('/v2/chats/participants', { chatId }).then((res) => res.data);
};

interface Props {
  onError?: (error: Error) => void;
  onSuccess?: (chatId: string) => void;
}
const useJoinChat = ({ onError, onSuccess }: Props) => {
  const joinChatMutation = useMutation({
    mutationFn: joinChat,
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
    onSuccess: (_, { chatId }) => {
      if (onSuccess) {
        onSuccess(chatId);
      }
    },
  });

  return joinChatMutation;
};

export default useJoinChat;
