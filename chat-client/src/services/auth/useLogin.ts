import {useMutation} from '@tanstack/react-query';

import {postData} from 'libs/axios';

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
    return postData<IResponseBody, IRequestBody>('/v2/users/login', body);
};

interface Props {
    onSuccess?: (obj: IResponseBody) => void;
    onError?: (error: Error) => void;
}

const useLogin = ({ onSuccess, onError }: Props) => {
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: ({tokens}) => {
            if (onSuccess) {
                onSuccess({tokens});
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return loginMutation;
};

export default useLogin;
