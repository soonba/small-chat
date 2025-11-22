import { useCallback } from 'react';

import { useBoundStore } from '@libs/zustand';
import { AccountState } from '@slices/accountSlice';

const useAccount = () => {
  const { accountId, initAccount, nickname, setAccount } = useBoundStore((state) => state);

  const handleAccountSet = useCallback(
    (payload: AccountState) => {
      setAccount(payload);
    },
    [setAccount],
  );

  const handleAccountInit = useCallback(() => {
    initAccount();
  }, [initAccount]);

  return { accountId, nickname, onAccountInit: handleAccountInit, onAccountSet: handleAccountSet };
};

export default useAccount;
