import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ChevronLeftIcon, Cog6ToothIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import { IconButton } from '@components/Button';
import { Loader } from '@components/Loader';
import { LeaveChatModal, LeaveChatModalDataType } from '@components/Modal';
import { useToast } from '@components/Toast';

import { useAccount } from '@hooks/redux';
import { useIntersectionObserver, useModal, useMode, useSocket } from '@hooks/utils';
import { useGetChatDetail, useGetChatHistory, useLeaveChat } from '@services/chat';

import { MessageList, MessageTextarea, RefHandler } from './components';

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';

  const { accountId, nickname } = useAccount();
  const { mode, onModeChange } = useMode();
  const { onToast } = useToast();

  const { data: detailData } = useGetChatDetail();
  const {
    data,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading: isFetching,
  } = useGetChatHistory(chatId);

  const { mutate, isPending } = useLeaveChat({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess() {
      onCurrentChatLeave(chatId);
      navigate('/', { replace: true });
    },
  });

  const list = useMemo(() => data?.pages?.flatMap((data) => data.data).reverse() || [], [data?.pages]);

  const { message: socketMessages, onCurrentChatLeave, onMessageSend } = useSocket();

  const ref = useRef<RefHandler>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setTimeout(() => {
      setIsLoading(false);
      fetchPreviousPage();
    }, 1000);
  });

  const leaveModal = useModal<LeaveChatModalDataType>({
    onConfirm() {
      mutate({ chatId });
    },
  });

  const handleLeave = () => {
    if (detailData?.chatName) {
      leaveModal.onOpen({ name: detailData.chatName });
    }
  };

  const handleSubmit = (message: string) => {
    if (accountId && nickname) {
      onMessageSend({
        messageBody: { chatId, message, nickname, userId: accountId },
      });
    } else {
      onToast(`문제가 발생하였습니다.\n잠시 후에 다시 시도해주세요.`, { delay: 5000 });
    }
  };

  useEffect(() => {
    if (ref.current) {
      if (!isLoading && !isFetchingPreviousPage && hasPreviousPage) {
        setIsLoading(true);
        observe(ref.current.intersectionRef.current as HTMLLIElement);
      }

      if (!hasPreviousPage) {
        unobserve(ref.current.intersectionRef.current as HTMLLIElement);
      }
    }
  }, [isLoading, isFetchingPreviousPage, hasPreviousPage]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 shadow-sm shadow-primary-100 dark:shadow-primary-950">
        <div className="flex h-14 w-full items-center justify-between rounded-b-md pl-2.5 pr-5">
          <Link className="flex items-center gap-1" to="/" onClick={() => onCurrentChatLeave(chatId)}>
            <ChevronLeftIcon className="size-8 text-white dark:text-primary-100" />
            <h1 className="text-center font-jua text-24-R-32 text-white dark:text-primary-100">
              {detailData?.chatName || ''}
            </h1>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-5">
            <IconButton
              aria-label="leave chat"
              icon={<Cog6ToothIcon />}
              size="small"
              title="채팅방 나가기"
              variant="text"
              onClick={handleLeave}
            />
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
      <main className="flex size-full flex-col justify-between pt-14">
        <LeaveChatModal {...leaveModal} />
        {isFetching || isPending ? (
          <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center text-24-BL-32 text-primary-900 dark:text-primary-100">
            <Loader />
          </div>
        ) : (
          <>
            <MessageList
              ref={ref}
              data={list}
              isLoading={isLoading || isFetchingPreviousPage}
              socketMessages={socketMessages || []}
            />
            <MessageTextarea onSubmit={handleSubmit} />
          </>
        )}
      </main>
    </>
  );
}
