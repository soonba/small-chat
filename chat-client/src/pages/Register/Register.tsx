import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/Button';
import { TextField } from '@components/Input';
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

  const { data: isUsed } = useCheckId(accountId);
  const registerMutation = useRegister({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess({ tokens }) {
      setTokens(tokens);
      onSocketConnect();
      navigate('/', { replace: true });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate({ id: accountId, nickname, password });
  };

  const handleLogin = () => {
    navigate('/login');
  };

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

  return (
    <div className="mt-10 flex w-full items-start justify-center">
      <form className="flex w-full max-w-screen-md flex-col gap-5 px-5" onSubmit={handleSubmit}>
        <h1 className="mb-5 text-center font-jua text-36-R-40 text-primary-900 dark:text-primary-100">회원가입</h1>
        <TextField
          labelText="Nickname"
          maxLength={20}
          minLength={3}
          placeholder="닉네임을 입력해 주세요."
          type="text"
          value={nickname}
          onChange={setNickname}
          helperText={
            nickname.length < 3
              ? '최소 3자, 최대 20자까지 입력해 주세요.'
              : !NICKNAME_REG_EXP.test(nickname)
                ? '영문과 숫자 조합으로 입력해 주세요.'
                : ''
          }
        />
        <TextField
          labelText="Id"
          maxLength={20}
          minLength={6}
          placeholder="아이디를 입력해 주세요."
          type="text"
          value={accountId}
          onChange={setAccountId}
          helperText={
            isUsed
              ? '중복된 아이디입니다. 다른 아이디를 입력해 주세요.'
              : accountId.length < 6
                ? '최소 6자, 최대 20자까지 입력할 수 있습니다.'
                : !ACCOUNT_ID_REG_EXP.test(accountId)
                  ? '영문과 숫자 조합으로 입력해 주세요.'
                  : ''
          }
        />
        <TextField
          labelText="Password"
          maxLength={16}
          minLength={8}
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          value={password}
          onChange={setPassword}
          helperText={
            password.length < 8
              ? '최소 8자, 최대 16자까지 입력할 수 있습니다.'
              : !PASSWORD_REG_EXP.test(password)
                ? '영문, 숫자, 특수문자 조합으로 입력해 주세요.'
                : ''
          }
        />
        <TextField
          labelText="Password Check"
          maxLength={16}
          minLength={8}
          placeholder="비밀번호 확인을 입력해 주세요."
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          helperText={
            !passwordCheck
              ? '비밀번호 확인을 입력해 주세요.'
              : password !== passwordCheck
                ? '비밀번호와 일치하지 않습니다.'
                : ''
          }
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button disabled={!isValid} size="large" text="회원가입" type="submit" variant="contained" />
          <Button size="large" text="로그인" type="button" variant="outlined" onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
}
