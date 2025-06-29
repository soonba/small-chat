import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatBubbleOvalLeftIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/20/solid';

import IconButton from '@components/IconButton';
import { CreateChatModal, CreateChatModalType, JoinChatModal, JoinChatModalDataType } from '@components/Modal';
import { useToast } from '@components/Toast';

import { useModal, useSocket } from '@hooks/utils';
import { useCreateChat, useJoinChat } from '@services/chat';

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { onChatJoin } = useSocket();
  const { onToast } = useToast();

  const createChatMutation = useCreateChat({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess(chatId) {
      onChatJoin([chatId]);
      navigate(`/chat/${chatId}`);
    },
  });

  const createModal = useModal<CreateChatModalType>({
    onConfirm(data) {
      if (data) {
        const { name } = data;
        createChatMutation.mutate({ chatName: name });
      }
    },
  });
  const { onOpen: onCreateOpen } = createModal;

  const joinChatMutation = useJoinChat({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess(chatId) {
      onChatJoin([chatId]);
      navigate(`/chat/${chatId}`);
    },
  });

  const joinModal = useModal<JoinChatModalDataType>({
    onConfirm(data) {
      if (data) {
        const { code } = data;
        joinChatMutation.mutate({ chatId: code });
      }
    },
  });
  const { onOpen: onJoinOpen } = joinModal;

  const handleChatList = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleJoin = useCallback(() => {
    onJoinOpen({ code: '' });
  }, [onJoinOpen]);

  const handleCreate = useCallback(() => {
    onCreateOpen({ name: '' });
  }, [onCreateOpen]);

  return (
    <>
      {pathname === '/' && (
        <>
          <footer className="fixed inset-x-0 bottom-0 border-t spring:border-pink-900 winter:border-blue-900 dark:spring:border-pink-100 dark:winter:border-blue-100">
            <div className="flex h-14 w-full items-center justify-between rounded-t-md px-10 sm:h-20 sm:justify-around sm:px-0">
              <IconButton
                aria-label="show chat list"
                size="medium"
                title="참여중인 채팅 리스트 보기"
                variant="outlined"
                icon={<ChatBubbleOvalLeftIcon />}
                onClick={handleChatList}
              />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 sm:-top-8">
                <IconButton
                  aria-label="create chat"
                  size="large"
                  title="채팅 생성하기"
                  variant="contained"
                  icon={<PlusIcon />}
                  onClick={handleCreate}
                />
              </div>
              <IconButton
                aria-label="join chat"
                size="medium"
                title="채팅 참여하기"
                variant="outlined"
                icon={<EnvelopeIcon />}
                onClick={handleJoin}
              />
            </div>
          </footer>
          <CreateChatModal {...createModal} />
          <JoinChatModal {...joinModal} />
        </>
      )}
    </>
  );
}
