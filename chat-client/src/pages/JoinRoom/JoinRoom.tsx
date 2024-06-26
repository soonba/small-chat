import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

import { useMutation } from '@tanstack/react-query';

import joinRoom from 'rest/apis/joinRoom';

export default function JoinRoom() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const roomJoinMutation = useMutation({
        mutationFn: joinRoom,
        onSuccess: () => {
            navigate('/chat');
        }
    });
    const handleClick = () => {
        if (roomId) {
            roomJoinMutation.mutate(roomId);
        }
    };
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-max min-h-40 min-w-[320px] items-center justify-center gap-x-2 rounded-lg bg-blue-gray-50 p-5 shadow-md">
                <div className="flex flex-col">
                    <label htmlFor="nickname" className="ml-1 flex flex-col justify-center text-xs font-bold text-blue-gray-600">
                        방 제목
                        <input
                            id="roomId"
                            type="text"
                            maxLength={40}
                            value={roomId}
                            onChange={(e) => {
                                setRoomId(e.currentTarget.value);
                            }}
                            className="h-10 min-w-56 truncate rounded-md border border-blue-gray-200 bg-white p-2 text-sm font-medium text-blue-gray-900 outline-none ring-0 hover:border-2 hover:border-blue-gray-900 focus:border-2 focus:border-blue-gray-900"
                        />
                    </label>
                    <small className="ml-1 mt-1 flex items-center gap-1 text-xs font-normal leading-6 text-blue-gray-600">
                        <InformationCircleIcon className="h-4 w-4" />
                        채팅방 코드를 입력해주세요.
                    </small>
                </div>
                <button type="button" onClick={handleClick} className="mb-7 mt-4 h-10 w-16 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80">
                    등록
                </button>
            </div>
        </div>
    );
}
