import { Link } from 'react-router-dom';

import { useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import { Button, IconButton } from '@components/Button';

import { useMode, useSocket } from '@hooks/utils';
import { useLogout } from '@services/auth';
import { chatKeys } from '@utils/queryKey';
import { clearToken } from '@utils/storage';

type ChatList = UseQueryResult<
  {
    chatId: string;
    chatName: string;
    lastMessage: string;
    lastMessageTime: string;
  }[],
  Error
>;

export default function Gnb() {
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
    window.location.reload();
  };

  const logoutMutation = useLogout({
    onError() {
      handleLogout();
    },
    onSuccess() {
      handleLogout();
    },
  });

  const handleClick = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-10 rounded-b-md bg-layout-light shadow-sm shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
      <div className="flex h-14 w-full items-center justify-between rounded-b-md px-5">
        <Link reloadDocument to="/">
          <h1 className="text-center font-jua text-24-R-32 text-primary-900 dark:text-primary-100">작은 대화</h1>
        </Link>
        <div className="flex items-center gap-5">
          <Button size="small" text="로그아웃" variant="text" onClick={handleClick} />
          <IconButton
            aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
            icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
            size="small"
            title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
            variant="text"
            onClick={onModeChange}
          />
        </div>
      </div>
    </header>
  );
}
