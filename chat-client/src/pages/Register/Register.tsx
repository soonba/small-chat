import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from 'components';

import { useCheckId, useRegister } from 'services/auth';
import { ACCOUNT_ID_REG_EXP, NICKNAME_REG_EXP, PASSWORD_REG_EXP } from 'utils/regExp';
import { setTokens } from 'utils/storage';

export default function Register() {
    const navigate = useNavigate();

    const [accountId, setAccountId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { data: isUsed } = useCheckId(accountId);
    const registerMutation = useRegister({
        onSuccess({ tokens }) {
            setTokens(tokens);
            navigate('/', { replace: true });
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerMutation.mutate({ id: accountId, password, nickname });
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
            <form onSubmit={handleSubmit} className="flex w-full max-w-screen-md flex-col gap-5 px-5">
                <h1 className="mb-5 text-center text-4xl font-black text-primary-900 dark:text-primary-100">
                    회원가입
                </h1>
                <TextField
                    labelText="Nickname"
                    type="text"
                    value={nickname}
                    minLength={3}
                    maxLength={20}
                    placeholder="닉네임을 입력해 주세요."
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
                    type="text"
                    value={accountId}
                    minLength={6}
                    maxLength={20}
                    placeholder="아이디를 입력해 주세요."
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
                    type="password"
                    minLength={8}
                    maxLength={16}
                    value={password}
                    placeholder="비밀번호를 입력해 주세요."
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
                    type="password"
                    minLength={8}
                    maxLength={16}
                    value={passwordCheck}
                    placeholder="비밀번호 확인을 입력해 주세요."
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
                    <Button type="submit" disabled={!isValid} text="회원가입" variant="contained" size="large" />
                    <Button type="button" onClick={handleLogin} text="로그인" variant="outlined" size="large" />
                </div>
            </form>
        </div>
    );
}
