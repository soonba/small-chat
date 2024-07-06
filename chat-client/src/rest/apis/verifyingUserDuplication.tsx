import { QueryFunctionContext } from '@tanstack/react-query';

import { api } from 'libs/axios';

interface CheckResponse {
    isUsed: boolean;
}

const verifyingUserDuplication = async ({ queryKey }: QueryFunctionContext<{ inputValue: string }[]>) => {
    const [{ inputValue }] = queryKey;
    return api.get<CheckResponse, string>(`/v2/users/${inputValue}/exists`).then((el) => {
        return el.isUsed ? { msg: '사용중인 아이디입니다.', isUsed: true } : { msg: '사용 가능한 아이디입니다.', isUsed: false };
    });
};
export default verifyingUserDuplication;
