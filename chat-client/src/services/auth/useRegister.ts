import { useMutation } from '@tanstack/react-query';

import { postData } from '@libs/axios';
import { Error } from '@libs/axios/types';

interface IRequestBody {
  id: string;
  nickname: string;
  password: string;
}

interface IResponseBody {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const register = async (body: IRequestBody) => {
  return postData<IResponseBody, IRequestBody>('/v2/users', body).then((res) => res.data);
};

interface Props {
  onError?: (error: Error) => void;
  onSuccess?: (obj: IResponseBody) => void;
}

const useRegister = ({ onError, onSuccess }: Props) => {
  const joinMutation = useMutation({
    mutationFn: register,
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

  return joinMutation;
};

export default useRegister;
