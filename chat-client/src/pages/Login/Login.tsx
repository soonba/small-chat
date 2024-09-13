import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/Button';
import { TextField } from '@components/Input';
import { useToast } from '@components/Toast';

import { useSocket } from '@hooks/utils';
import { useLogin } from '@services/auth';
import { clearToken, setTokens } from '@utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const { onSocketConnect } = useSocket();
  const { onToast } = useToast();

  const [id, setId] = useState('test111');
  const [password, setPassword] = useState('test111!');

  const loginMutation = useLogin({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess({ tokens }) {
      setTokens(tokens);
      onSocketConnect();
      navigate('/', { replace: true });
    },
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ id, password });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    clearToken();
  }, []);

  return (
    <div className="mt-10 flex w-full items-start justify-center">
      <form className="flex w-full max-w-screen-md flex-col gap-5 px-5" onSubmit={handleLogin}>
        <h1 className="mb-10 text-center font-jua text-36-R-40 text-primary-900 dark:text-primary-100">작은 대화</h1>
        <TextField labelText="Id" placeholder="아이디를 입력해 주세요." type="text" value={id} onChange={setId} />
        <TextField
          labelText="Password"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          value={password}
          onChange={setPassword}
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button disabled={!id && !password} size="large" text="로그인" type="submit" variant="contained" />
          <Button size="large" text="회원가입" type="button" variant="outlined" onClick={handleRegister} />
        </div>
      </form>
    </div>
  );
}
