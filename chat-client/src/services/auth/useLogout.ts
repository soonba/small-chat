import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';

const logout = async () => {
    return postData('/v2/users/logout').then((res) => res.data);
};

interface Props {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

const useLogout = ({ onSuccess, onError }: Props) => {
    const logoutMutation = useMutation({
        mutationFn: logout,
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

    return logoutMutation;
};

export default useLogout;
