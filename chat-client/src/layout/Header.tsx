import { Link } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button, IconButton } from 'components';

import { useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { useSocket } from 'hooks';
import useMode from 'hooks/useMode';
import { chatKeys } from 'utils/queryKey';
import { clearToken } from 'utils/storage';

type ChatList = UseQueryResult<
    {
        chatId: string;
        chatName: string;
        lastMessage: string;
        lastMessageTime: string;
    }[],
    Error
>;

export default function Header() {
    const client = useQueryClient();
    const { mode, onModeChange } = useMode();
    const { onChatLeave } = useSocket();

    const handleLogout = () => {
        const data = client.getQueryData(chatKeys.lists()) as ChatList;

        if (data?.data) {
            const chatIds = data.data.map((val) => val.chatId);
            onChatLeave(chatIds);
        }

        clearToken();
        // window.location.reload();
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-10 rounded-b-md bg-[#f7fbff] shadow-sm shadow-primary-100 dark:bg-[#02101c] dark:shadow-primary-950">
            <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
                <Link reloadDocument to="/">
                    <h1 className="text-center text-2xl font-black text-primary-900 dark:text-primary-100">
                        작은 대화
                    </h1>
                </Link>
                <div className="ml-auto flex items-center gap-5">
                    <Button text="로그아웃" variant="text" size="small" onClick={handleLogout} />
                    <IconButton
                        aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
                        title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
                        variant="text"
                        size="small"
                        onClick={onModeChange}
                        icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                </div>
            </div>
        </header>
    );
}
