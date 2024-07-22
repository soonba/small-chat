import { initAccount, setAccount, Account } from 'libs/redux/slices/accountSlice';
import { useAppDispatch, useAppSelector } from 'libs/redux/store';

const useAccount = () => {
    const dispatch = useAppDispatch();
    const { accountId, nickname } = useAppSelector(({ account }) => account);

    const onSetAccount = (payload: Account) => {
        dispatch(setAccount(payload));
    };

    const onInitAccount = () => {
        dispatch(initAccount());
    };

    return { accountId, nickname, onSetAccount, onInitAccount };
};

export default useAccount;
