import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { useAccount } from '@hooks/zustand';
import { getData } from '@libs/axios';
import { usersKeys } from '@utils/queryKey';
import { getTokens } from '@utils/storage';

interface IResponseBody {
  nickname: string;
  userId: string;
}

const getMyInfo = async (): Promise<IResponseBody> => {
  return getData<IResponseBody, void>('/v2/users').then((res) => res.data);
};

const useGetMyInfo = () => {
  const { pathname } = useLocation();
  const { onAccountSet } = useAccount();

  const { accessToken } = getTokens();

  const data = useQuery({
    enabled: !!(!['/login', '/register'].includes(pathname) && accessToken),
    initialData: () => ({ nickname: '', userId: '' }),
    queryFn: getMyInfo,
    queryKey: usersKeys.my(),
  });

  useEffect(() => {
    if (data?.data?.userId && data?.data?.nickname) {
      onAccountSet({ accountId: data.data.userId, nickname: data.data.nickname });
    }
  }, [data?.data, onAccountSet]);

  return data;
};

export default useGetMyInfo;
