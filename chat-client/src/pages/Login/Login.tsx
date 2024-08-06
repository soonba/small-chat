import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from 'components';

import { useSocket } from 'hooks';
import useLogin from 'services/auth/useLogin';
import { clearToken, setTokens } from 'utils/storage';

export default function Login() {
    const navigate = useNavigate();
    const { onSocketConnect } = useSocket();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useLogin({
        onSuccess({ tokens }) {
            setTokens(tokens);
            onSocketConnect();
            navigate('/', { replace: true });
        }
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
            <form onSubmit={handleLogin} className="flex w-full max-w-screen-md flex-col gap-5 px-5">
                <h1 className="mb-10 text-center text-4xl font-black text-primary-900 dark:text-primary-100">
                    작은 대화
                </h1>
                <TextField
                    labelText="Id"
                    type="text"
                    value={id}
                    placeholder="아이디를 입력해 주세요."
                    onChange={setId}
                />
                <TextField
                    labelText="Password"
                    type="password"
                    value={password}
                    placeholder="비밀번호를 입력해 주세요."
                    onChange={setPassword}
                />
                <div className="mt-4 flex flex-col gap-2">
                    <Button type="submit" disabled={!id && !password} text="로그인" variant="contained" size="large" />
                    <Button type="button" onClick={handleRegister} text="회원가입" variant="outlined" size="large" />
                </div>
            </form>
        </div>
    );
}
