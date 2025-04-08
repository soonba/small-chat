import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ChevronLeftIcon, Cog6ToothIcon, MoonIcon, PaintBrushIcon, SunIcon } from '@heroicons/react/20/solid';

import IconButton from '@components/IconButton';
import {
  MessageList,
  MessageListItem,
  MessageListItemSystem,
  MessageListSkeleton,
  MessageListSpinner,
} from '@components/MessageList';
import { LeaveChatModal, LeaveChatModalDataType } from '@components/Modal';
import { useToast } from '@components/Toast';

import { useIntersectionObserver, useModal, useMode, useSocket } from '@hooks/utils';
import { useAccount } from '@hooks/zustand';
import { useGetChatDetail, useGetChatHistory, useLeaveChat } from '@services/chat';

import { ChatTextarea } from './components';

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const chatId = id || '';

  const { accountId, nickname } = useAccount();
  const { mode, onModeChange, onThemeChange } = useMode();
  const { onToast } = useToast();

  const { data: detailData } = useGetChatDetail();
  const {
    data,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading: isFetching,
  } = useGetChatHistory(chatId);

  const { isPending, mutate } = useLeaveChat({
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

  const ref = useRef<HTMLLIElement>(null);
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
  const { onOpen } = leaveModal;

  const handleBack = useCallback(() => onCurrentChatLeave(chatId), [onCurrentChatLeave, chatId]);

  const handleLeave = useCallback(() => {
    if (detailData?.chatName) {
      onOpen({ name: detailData.chatName });
    }
  }, [detailData?.chatName, onOpen]);

  const handleSubmit = useCallback(
    (message: string) => {
      if (accountId && nickname) {
        onMessageSend({
          messageBody: { chatId, message, nickname, userId: accountId },
        });
      } else {
        onToast(`문제가 발생하였습니다.\n잠시 후에 다시 시도해주세요.`, { delay: 5000 });
      }
    },
    [accountId, chatId, nickname, onMessageSend, onToast],
  );

  useEffect(() => {
    if (ref.current) {
      if (!isLoading && !isFetchingPreviousPage && hasPreviousPage) {
        setIsLoading(true);
        observe(ref.current as HTMLLIElement);
      }

      if (!hasPreviousPage) {
        unobserve(ref.current as HTMLLIElement);
      }
    }
  }, [isLoading, isFetchingPreviousPage, hasPreviousPage, observe, unobserve]);

  const isFetchingMore = useMemo(() => isLoading || isFetchingPreviousPage, [isLoading, isFetchingPreviousPage]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 shadow-sm spring:shadow-pink-50 winter:shadow-blue-50 spring:dark:shadow-pink-100 winter:dark:shadow-blue-100">
        <div className="flex h-14 w-full items-center justify-between pl-2.5 pr-2.5 sm:pr-5">
          <Link className="flex items-center gap-1" onClick={handleBack} to="/">
            <ChevronLeftIcon className="size-6 spring:text-pink-950 winter:text-white sm:size-8 spring:dark:text-pink-50 winter:dark:text-blue-100" />
            <h1 className="line-clamp-1 text-center font-jua text-18-R-28 spring:text-pink-950 winter:text-white sm:text-24-R-32 spring:dark:text-pink-50 winter:dark:text-blue-100">
              {detailData?.chatName || ''}
            </h1>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-x-2.5 sm:gap-5">
            <IconButton
              aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
              size="small"
              title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
              variant="text"
              icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={onModeChange}
            />
            <IconButton
              aria-label="change theme"
              size="small"
              title="테마 변경하기"
              variant="text"
              icon={
                <PaintBrushIcon className="spring:text-blue-900 winter:text-pink-950 spring:dark:text-blue-100 winter:dark:text-pink-50" />
              }
              onClick={onThemeChange}
            />
            <IconButton
              aria-label="leave chat"
              size="small"
              title="채팅방 나가기"
              variant="text"
              icon={<Cog6ToothIcon />}
              onClick={handleLeave}
            />
          </div>
        </div>
      </header>
      <main className="flex size-full flex-col justify-between pt-14">
        <LeaveChatModal {...leaveModal} />
        {isFetching || isPending ? (
          <MessageListSkeleton />
        ) : (
          <>
            <MessageList id="chat-container" style={{ height: window.innerHeight - 56 - 77, overflowAnchor: 'none' }}>
              {socketMessages?.map((message, index) => (
                <MessageListItem
                  key={index}
                  createdAt={message.createdAt}
                  message={message.message}
                  nickname={message.nickname}
                  position={message.userId === accountId ? 'right' : 'left'}
                />
              ))}
              {list.map((message, index) => {
                const isSender = message.sender === null ? false : message.sender.userId === accountId;
                return message.sender === null ? (
                  <MessageListItemSystem key={index} text={message.message} />
                ) : (
                  <MessageListItem
                    key={index}
                    createdAt={message.createdAt}
                    message={message.message}
                    nickname={message.sender.nickname}
                    position={isSender ? 'right' : 'left'}
                  />
                );
              })}
              <li ref={ref} className="h-px w-full" />
              {isFetchingMore && <MessageListSpinner />}
            </MessageList>
            <ChatTextarea onSubmit={handleSubmit} />
          </>
        )}
      </main>
    </>
  );
}
