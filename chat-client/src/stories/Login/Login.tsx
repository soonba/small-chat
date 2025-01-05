import { FormEvent, useState } from 'react';

import Button from '@components/Button';
import Loader from '@components/Loader';
import TextField from '@components/TextField';

import { sleep } from '../utils/common';

export default function Login() {
  const [id, setId] = useState('test111');
  const [password, setPassword] = useState('test111!');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    await sleep(1500);
    setIsSubmitted(false);
  };

  return (
    <div className="mt-10 flex w-full items-start justify-center">
      {isSubmitted && (
        <div className="fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}
      <form className="flex w-full max-w-screen-md flex-col gap-5 px-5" onSubmit={handleLogin}>
        <h1 className="mb-10 text-center font-jua text-36-R-40 text-white dark:text-primary-100">작은 대화</h1>
        <TextField labelText="Id" type="text" value={id} onChange={setId} placeholder="아이디를 입력하세요." />
        <TextField
          labelText="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호를 입력하세요."
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button disabled={!id && !password} size="large" text="로그인" type="submit" variant="contained" />
          <Button size="large" text="회원가입" type="button" variant="outlined" />
        </div>
      </form>
    </div>
  );
}
