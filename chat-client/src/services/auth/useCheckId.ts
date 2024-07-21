import { useQuery } from '@tanstack/react-query';

import { getData } from 'libs/axios';
import { authKeys } from 'utils/queryKey';
import { ACCOUNT_ID_REG_EXP } from 'utils/regExp';

interface IRequestBody {
    accountId: string;
}

interface IResponseBody {
    isUsed: boolean;
}

const checkId = async ({ accountId }: IRequestBody) => {
    return getData<IResponseBody, void>(`/v2/users/${accountId}/exists`).then((el) => ({
        status: 200,
        message: el.isUsed ? '사용중인 아이디입니다.' : '사용 가능한 아이디입니다.',
        data: {
            isUsed: el.isUsed
        }
    }));
};

const useCheckId = (accountId: string) => {
    const data = useQuery({
        queryKey: authKeys.existingId(accountId),
        queryFn: ({ queryKey }) => checkId({ accountId: queryKey[1] }),
        select: (data) => data.data.isUsed,
        enabled: ACCOUNT_ID_REG_EXP.test(accountId)
    });

    return data;
};

export default useCheckId;
