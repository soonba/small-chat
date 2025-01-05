import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import Button from '@components/Button';
import IconButton from '@components/IconButton';

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

  const { mutate } = useLogout({
    onError() {
      handleLogout();
    },
    onSuccess() {
      handleLogout();
    },
  });

  const handleClick = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <header className="fixed inset-x-0 top-0 z-10 shadow-sm shadow-primary-50 dark:shadow-primary-100">
      <div className="flex h-14 w-full items-center justify-between px-5">
        <Link reloadDocument to="/">
          <h1 className="text-center font-jua text-18-R-28 text-white sm:text-24-R-32 dark:text-primary-100">
            작은 대화
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          <IconButton
            aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
            size="small"
            title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
            variant="text"
            icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={onModeChange}
          />
          <Button size="small" text="로그아웃" variant="text" onClick={handleClick} />
        </div>
      </div>
    </header>
  );
}
