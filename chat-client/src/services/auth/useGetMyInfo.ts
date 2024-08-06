import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import useAccount from 'hooks/useAccount';
import { getData } from 'libs/axios';
import { usersKeys } from 'utils/queryKey';
import { getTokens } from 'utils/storage';

interface IResponseBody {
    userId: string;
    nickname: string;
}

const getMyInfo = async (): Promise<IResponseBody> => {
    return getData<IResponseBody, void>('/v2/users').then((res) => res.data);
};

const useGetMyInfo = () => {
    const { pathname } = useLocation();
    const { onSetAccount } = useAccount();
    const { accessToken } = getTokens();

    const data = useQuery({
        queryKey: usersKeys.my(),
        enabled: !!(!['/login', '/register'].includes(pathname) && accessToken),
        queryFn: getMyInfo,
        initialData: () => ({ userId: '', nickname: '' })
    });

    useEffect(() => {
        if (data?.data) {
            onSetAccount({ nickname: data.data.nickname, accountId: data.data.userId });
        }
    }, [data?.data]);

    return data;
};

export default useGetMyInfo;
