import { useMutation } from '@tanstack/react-query';

import { postData } from '@libs/axios';
import { Error } from '@libs/axios/types';

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
  onError?: (error: Error) => void;
  onSuccess?: (chatId: string) => void;
}

const useCreateChat = ({ onError, onSuccess }: Props) => {
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
    onSuccess: ({ chatId }) => {
      if (onSuccess) {
        onSuccess(chatId);
      }
    },
  });

  return createChatMutation;
};

export default useCreateChat;
