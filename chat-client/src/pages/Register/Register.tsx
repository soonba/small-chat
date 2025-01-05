import { FormEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Loader from '@components/Loader';
import TextField from '@components/TextField';
import { useToast } from '@components/Toast';

import { useSocket } from '@hooks/utils';
import { useCheckId, useRegister } from '@services/auth';
import { ACCOUNT_ID_REG_EXP, NICKNAME_REG_EXP, PASSWORD_REG_EXP } from '@utils/regExp';
import { setTokens } from '@utils/storage';

export default function Register() {
  const navigate = useNavigate();
  const { onSocketConnect } = useSocket();
  const { onToast } = useToast();

  const [accountId, setAccountId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: isUsed } = useCheckId(accountId);

  const { mutate } = useRegister({
    onError(error) {
      setIsSubmitted(false);
      onToast(error.message, { delay: 5000 });
    },
    onSuccess({ tokens }) {
      setTokens(tokens);
      onSocketConnect();
      setIsSubmitted(false);
      navigate('/', { replace: true });
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);
      mutate({ id: accountId, nickname, password });
    },
    [mutate, accountId, nickname, password],
  );

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const isValid = useMemo(() => {
    let result = true;
    if (!NICKNAME_REG_EXP.test(nickname)) {
      result = false;
    }
    if (!ACCOUNT_ID_REG_EXP.test(accountId) || isUsed) {
      result = false;
    }
    if (!PASSWORD_REG_EXP.test(password)) {
      result = false;
    }
    if (password !== passwordCheck) {
      result = false;
    }

    return result;
  }, [accountId, password, passwordCheck, nickname, isUsed]);

  const { idErrorMessage, nicknameErrorMessage, passwordCheckErrorMessage, passwordErrorMessage } = useMemo(
    () => ({
      nicknameErrorMessage:
        nickname.length < 3
          ? '최소 3자, 최대 20자까지 입력할 수 있습니다.'
          : !NICKNAME_REG_EXP.test(nickname)
            ? '영문과 숫자 조합으로 입력하세요.'
            : '',
      idErrorMessage: isUsed
        ? '중복된 아이디입니다. 다른 아이디를 입력하세요.'
        : accountId.length < 6
          ? '최소 6자, 최대 20자까지 입력할 수 있습니다.'
          : !ACCOUNT_ID_REG_EXP.test(accountId)
            ? '영문과 숫자 조합으로 입력하세요.'
            : '',
      passwordErrorMessage:
        password.length < 8
          ? '최소 8자, 최대 16자까지 입력할 수 있습니다.'
          : !PASSWORD_REG_EXP.test(password)
            ? '영문, 숫자, 특수문자 조합으로 입력하세요.'
            : '',
      passwordCheckErrorMessage: !passwordCheck
        ? '비밀번호 확인을 입력하세요.'
        : password !== passwordCheck
          ? '비밀번호와 일치하지 않습니다.'
          : '',
    }),
    [nickname, isUsed, accountId, password, passwordCheck],
  );

  return (
    <div className="mt-5 flex h-full w-full items-start justify-center md:mt-0">
      {isSubmitted && (
        <div className="fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}
      <form className="flex w-full max-w-screen-md flex-col gap-5 px-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-center font-jua text-28-R-36 text-white md:text-36-R-40 dark:text-primary-100">
            작은 대화
            <br />
          </h1>
          <h2 className="mb-5 text-center font-jua text-24-R-32 text-white md:mb-10 md:text-28-R-36 dark:text-primary-100">
            회원가입
          </h2>
        </div>
        <TextField
          helperText={nicknameErrorMessage}
          labelText="Nickname"
          maxLength={20}
          minLength={3}
          type="text"
          value={nickname}
          onChange={setNickname}
          placeholder="닉네임을 입력하세요."
        />
        <TextField
          helperText={idErrorMessage}
          labelText="Id"
          maxLength={20}
          minLength={6}
          type="text"
          value={accountId}
          onChange={setAccountId}
          placeholder="아이디를 입력하세요."
        />
        <TextField
          helperText={passwordErrorMessage}
          labelText="Password"
          maxLength={16}
          minLength={8}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호를 입력하세요."
        />
        <TextField
          helperText={passwordCheckErrorMessage}
          labelText="Password Check"
          maxLength={16}
          minLength={8}
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          placeholder="비밀번호 확인을 입력하세요."
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button disabled={!isValid} size="large" text="회원가입" type="submit" variant="contained" />
          <Button size="large" text="로그인" type="button" variant="outlined" onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
}
