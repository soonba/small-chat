import { useMutation } from '@tanstack/react-query';

import { postData } from '@libs/axios';
import { Error } from '@libs/axios/types';

interface IRequestBody {
  id: string;
  password: string;
}

interface IResponseBody {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const login = async (body: IRequestBody) => {
  return postData<IResponseBody, IRequestBody>('/v2/users/login', body).then((res) => res.data);
};

interface Props {
  onError?: (error: Error) => void;
  onSuccess?: (obj: IResponseBody) => void;
}

const useLogin = ({ onError, onSuccess }: Props) => {
  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return loginMutation;
};

export default useLogin;
