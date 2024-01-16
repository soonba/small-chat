import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

import { useJoinMutation } from 'generated/graphql';

export default function Login() {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const [joinMutation] = useJoinMutation({
        onCompleted() {
            localStorage.setItem('nickname', nickname);
            navigate('/chat');
        }
    });

    // TODO: API
    const handleClick = () => {
        if (nickname) {
            joinMutation({ variables: { input: { nickname } } });
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="bg-blue-gray-50 flex h-max min-h-40 min-w-[320px] items-center justify-center gap-x-2 rounded-lg p-5 shadow-md">
                <div className="flex flex-col">
                    <label htmlFor="nickname" className="text-blue-gray-600 ml-1 flex flex-col justify-center text-xs font-bold">
                        닉네임
                        <input
                            id="nickname"
                            type="text"
                            maxLength={20}
                            value={nickname}
                            onChange={(e) => {
                                if (e.currentTarget.type === 'text') {
                                    if (e.currentTarget.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                                        // 한글 글자수 제한
                                        e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                                    }
                                }
                                setNickname(e.currentTarget.value);
                            }}
                            className="border-blue-gray-200 text-blue-gray-900 hover:border-blue-gray-900 focus:border-blue-gray-900 h-10 min-w-56 truncate rounded-md border bg-white p-2 text-sm font-medium outline-none ring-0 hover:border-2 focus:border-2"
                        />
                    </label>
                    <small className="text-blue-gray-600 ml-1 mt-1 flex items-center gap-1 text-xs font-normal leading-6">
                        <InformationCircleIcon className="h-4 w-4" />
                        최대 20자까지 입력할 수 있습니다.
                    </small>
                </div>
                <button type="button" onClick={handleClick} className="bg-blue-gray-900 text-blue-gray-50 mb-7 mt-4 h-10 w-16 whitespace-nowrap rounded-md text-xs font-bold hover:opacity-80">
                    등록
                </button>
            </div>
        </div>
    );
}
