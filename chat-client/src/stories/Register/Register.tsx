import { FormEvent, useMemo, useState } from 'react';

import Button from '@components/Button';
import Loader from '@components/Loader';
import TextField from '@components/TextField';

import { ACCOUNT_ID_REG_EXP, NICKNAME_REG_EXP, PASSWORD_REG_EXP } from '@utils/regExp';

import { sleep } from '../utils/common';

export default function Register() {
  const [accountId, setAccountId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    await sleep(1500);
    setIsSubmitted(false);
  };

  const isUsed = useMemo(() => ['test111', 'test222', 'test333'].includes(accountId), [accountId]);

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
      {isSubmitted && (
        <div className="fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}
      <form className="flex w-full max-w-screen-md flex-col gap-5 px-5" onSubmit={handleSubmit}>
        <h1 className="mb-5 text-center font-jua text-36-R-40 text-white dark:text-primary-100">회원가입</h1>
        <TextField
          labelText="Nickname"
          maxLength={20}
          minLength={3}
          type="text"
          value={nickname}
          onChange={setNickname}
          placeholder="닉네임을 입력해 주세요."
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
          type="text"
          value={accountId}
          onChange={setAccountId}
          placeholder="아이디를 입력해 주세요."
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
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호를 입력해 주세요."
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
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          placeholder="비밀번호 확인을 입력해 주세요."
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
          <Button size="large" text="로그인" type="button" variant="outlined" />
        </div>
      </form>
    </div>
  );
}
