import { useMutation } from '@tanstack/react-query';

import { postData } from 'libs/axios';

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
    return postData<IResponseBody, IRequestBody>('/v2/users', body);
};

interface Props {
    onSuccess?: (obj: IResponseBody) => void;
    onError?: (error: Error) => void;
}
const useRegister = ({ onSuccess, onError }: Props) => {
    const joinMutation = useMutation({
        mutationFn: register,
        onSuccess: ({ tokens }) => {
            if (onSuccess) {
                onSuccess({ tokens });
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error);
            }
        }
    });

    return joinMutation;
};

export default useRegister;
