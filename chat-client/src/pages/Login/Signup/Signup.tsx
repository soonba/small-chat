import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

import { useMutation } from '@tanstack/react-query';

import useJoin from '../../../rest/apis/useJoin';

export default function Signup() {
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const navigate = useNavigate();

    const joinMutation = useMutation({ mutationFn: useJoin });
    const handleSignup = () => {
        joinMutation.mutate({ userId, password, nickname });
    };

    const handleCheckDuplication = () => {
        // todo
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-max min-h-40 min-w-[320px] items-center justify-center gap-x-2 rounded-lg bg-blue-gray-50 p-5 shadow-md">
                <div className="flex flex-col">
                    <div className="flex">
                        <label htmlFor="userId" className="ml-1 flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                            ID
                            <input
                                id="userId"
                                type="text"
                                maxLength={20}
                                value={userId}
                                onChange={(e) => {
                                    if (e.currentTarget.type === 'text') {
                                        if (e.currentTarget.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                                            // 한글 글자수 제한
                                            e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                                        }
                                    }
                                    setUserId(e.currentTarget.value);
                                }}
                                className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleCheckDuplication}
                            className="ml-3 mt-4 h-10 w-16 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                        >
                            중복 검사
                        </button>
                    </div>
                    <label htmlFor="password" className="ml-1 flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                        Password
                        <form>
                            <input
                                id="password"
                                type="password"
                                maxLength={20}
                                value={password}
                                autoComplete="off"
                                onChange={(e) => {
                                    if (e.currentTarget.type === 'text') {
                                        if (e.currentTarget.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                                            // 한글 글자수 제한
                                            e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                                        }
                                    }
                                    setPassword(e.currentTarget.value);
                                }}
                                className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                            />
                        </form>
                    </label>
                    <div className="flex">
                        <label htmlFor="nickname" className="ml-1 flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                            Nickname
                            <form>
                                <input
                                    id="nickname"
                                    type="text"
                                    maxLength={20}
                                    value={nickname}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        if (e.currentTarget.type === 'text') {
                                            if (e.currentTarget.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                                                // 한글 글자수 제한
                                                e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                                            }
                                        }
                                        setNickname(e.currentTarget.value);
                                    }}
                                    className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                                />
                            </form>
                        </label>
                        <div className="flex">
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="ml-3 mt-4 h-10 w-16 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                            >
                                등록
                            </button>
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="ml-1 mt-4 h-10 w-16 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                            >
                                뒤로가기
                            </button>
                        </div>
                    </div>
                    <small className="ml-1 mt-1 flex items-center gap-1 text-xs font-normal leading-6 text-blue-gray-600">
                        <InformationCircleIcon className="h-4 w-4" />
                        최대 20자까지 입력할 수 있습니다.
                    </small>
                </div>
            </div>
        </div>
    );
}
