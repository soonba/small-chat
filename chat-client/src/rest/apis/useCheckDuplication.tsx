import { QueryFunctionContext } from '@tanstack/react-query';

import { api } from '../../libs/axios';

interface CheckResponse {
    isUsed: boolean;
}

const useCheckDuplication = async ({ queryKey }: QueryFunctionContext<any>) => {
    const [{ inputValue }] = queryKey;
    return api.get<CheckResponse, string>(`/auth/${inputValue}/exists`).then((el) => {
        if (el === undefined) {
            return '';
        }
        return el.isUsed ? '사용중인 아이디입니다.' : '사용 가능한 아이디입니다.';
    });
};
export default useCheckDuplication;
