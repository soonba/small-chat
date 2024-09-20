import { useMutation } from '@tanstack/react-query';

import { postData } from '@libs/axios';
import { Error } from '@libs/axios/types';

const logout = async () => {
  return postData('/v2/users/logout').then((res) => res.data);
};

interface Props {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

const useLogout = ({ onError, onSuccess }: Props) => {
  const logoutMutation = useMutation({
    mutationFn: logout,
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

  return logoutMutation;
};

export default useLogout;
