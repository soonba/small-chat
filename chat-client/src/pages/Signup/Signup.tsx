import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

import { useMutation, useQuery } from '@tanstack/react-query';

import { setTokens } from 'libs/utils/storage';
import useCheckDuplication from 'rest/apis/useCheckDuplication';
import useJoin from 'rest/apis/useJoin';

export default function Signup() {
    const navigate = useNavigate();

    const [accountId, setAccountId] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');

    const joinMutation = useMutation({
        mutationFn: useJoin,
        onSuccess: (response) => {
            const { accessToken, refreshToken } = response.tokens;
            setTokens(accessToken, refreshToken);
        }
    });
    const { data } = useQuery({
        queryKey: [{ inputValue }],
        queryFn: useCheckDuplication,
        enabled: !!inputValue
    });
    const onClickDuplication = () => {
        setInputValue(accountId);
    };

    const handleSignup = () => {
        if (!data || data?.isUsed) {
            // todo 처리?
            return;
        }
        joinMutation.mutate({ accountId, password, nickname });
        navigate('/chat');
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        if (e.currentTarget.type === 'text') {
            if (e.currentTarget.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                // 한글 글자수 제한
                e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
            }
        }
        setter(e.currentTarget.value);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-max min-h-40 min-w-[320px] items-center justify-center gap-x-2 rounded-lg bg-blue-gray-50 p-5 shadow-md">
                <div className="flex flex-col">
                    <form className="ml-1 flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                        <div className="flex">
                            <div className="flex flex-col">
                                ID
                                <input
                                    id={accountId}
                                    type="text"
                                    maxLength={20}
                                    value={accountId}
                                    onChange={(e) => onChange(e, setAccountId)}
                                    readOnly={!!data && !data?.isUsed}
                                    className={`h-10 min-w-56 truncate rounded-md border border-blue-gray-200 p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 ${!!data && !data?.isUsed ? 'bg-blue-gray-300' : 'bg-white hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900'}`}
                                />
                                <div className="mb-3 mt-1 h-3">{data?.msg}</div>
                            </div>
                            <button
                                type="button"
                                onClick={onClickDuplication}
                                className={`ml-3 mt-4 h-10 w-16 whitespace-nowrap rounded-md ${!!data && !data?.isUsed ? 'bg-blue-gray-300' : 'bg-blue-gray-900'} text-xs font-bold text-blue-gray-50 hover:opacity-80`}
                            >
                                중복 검사
                            </button>
                        </div>
                        <div className="mb-3 flex max-w-0 flex-col">
                            Password
                            <input
                                id="password"
                                type="password"
                                maxLength={20}
                                value={password}
                                autoComplete="off"
                                onChange={(e) => onChange(e, setPassword)}
                                className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                            />
                        </div>
                        <div className="flex">
                            <label htmlFor="nickname" className="flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                                Nickname
                                <input
                                    id="nickname"
                                    type="text"
                                    maxLength={20}
                                    value={nickname}
                                    autoComplete="off"
                                    onChange={(e) => onChange(e, setNickname)}
                                    className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                                />
                            </label>
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={handleSignup}
                                    className="ml-3 mt-4 h-10 w-16 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                                >
                                    등록
                                </button>
                                <Link
                                    to="/"
                                    className="ml-1 mt-4 flex h-10 w-16 items-center justify-center whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                                >
                                    뒤로가기
                                </Link>
                            </div>
                        </div>
                    </form>
                    <small className="ml-1 mt-1 flex items-center gap-1 text-xs font-normal leading-6 text-blue-gray-600">
                        <InformationCircleIcon className="h-4 w-4" />
                        모든 입력값은 최대 20자까지 영문만 입력할 수 있습니다.
                    </small>
                </div>
            </div>
        </div>
    );
}
