import { useAppDispatch, useAppSelector } from '@libs/redux';
import { Account, initAccount, setAccount } from '@slices/accountSlice';

const useAccount = () => {
  const dispatch = useAppDispatch();
  const { accountId, nickname } = useAppSelector(({ account }) => account);

  const onSetAccount = (payload: Account) => {
    dispatch(setAccount(payload));
  };

  const onInitAccount = () => {
    dispatch(initAccount());
  };

  return { accountId, nickname, onInitAccount, onSetAccount };
};

export default useAccount;
