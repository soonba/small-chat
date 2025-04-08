import { useQuery } from '@tanstack/react-query';

import { getData } from '@libs/axios';
import { authKeys } from '@utils/queryKey';
import { ACCOUNT_ID_REG_EXP } from '@utils/regExp';

interface IRequestBody {
  accountId: string;
}

interface IResponseBody {
  isUsed: boolean;
}

const checkId = async ({ accountId }: IRequestBody) => {
  return getData<IResponseBody, void>(`/v2/users/${accountId}/exists`)
    .then((res) => res.data)
    .then((el) => ({
      data: {
        isUsed: el.isUsed,
      },
      message: el.isUsed ? '사용 중인 아이디입니다.' : '사용 가능한 아이디입니다.',
      status: 200,
    }));
};

const useCheckId = (accountId: string) => {
  const data = useQuery({
    enabled: ACCOUNT_ID_REG_EXP.test(accountId),
    queryFn: ({ queryKey }) => checkId({ accountId: queryKey[1] }),
    queryKey: authKeys.existingId(accountId),
    select: (data) => data.data.isUsed,
  });

  return data;
};

export default useCheckId;
