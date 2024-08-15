import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';
import { Error } from 'libs/axios/types';

interface IRequestBody {
    id: string;
    password: string;
    nickname: string;
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
    onSuccess?: (obj: IResponseBody) => void;
    onError?: (error: Error) => void;
}
const useRegister = ({ onSuccess, onError }: Props) => {
    const joinMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error: Error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return joinMutation;
};

export default useRegister;
