import { useLocation, useNavigate } from 'react-router-dom';

import { ChatBubbleOvalLeftIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/20/solid';

import { IconButton } from '@components/Button';
import { CreateChatModal, JoinChatModal } from '@components/Modal';
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

  const createModal = useModal({
    onSubmit(data) {
      const chatName = data as string;
      createChatMutation.mutate({ chatName });
    },
  });

  const joinChatMutation = useJoinChat({
    onError(error) {
      onToast(error.message, { delay: 5000 });
    },
    onSuccess(chatId) {
      onChatJoin([chatId]);
      navigate(`/chat/${chatId}`);
    },
  });

  const joinModal = useModal({
    onSubmit(data) {
      const chatId = data as string;
      joinChatMutation.mutate({ chatId });
    },
  });

  const handleChatList = () => {
    navigate('/');
  };

  const handleJoin = () => {
    joinModal.onOpen();
  };

  const handleCreate = () => {
    createModal.onOpen();
  };

  return (
    <>
      {pathname === '/' && (
        <>
          <footer className="fixed inset-x-0 bottom-0 rounded-t-md bg-layout-light shadow-inner shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
            <div className="flex h-20 w-full items-center justify-around rounded-t-md">
              <IconButton
                aria-label="chat list"
                icon={<ChatBubbleOvalLeftIcon />}
                size="medium"
                title="참여중인 채팅 리스트"
                type="button"
                variant="outlined"
                onClick={handleChatList}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <IconButton
                  aria-label="create chat"
                  icon={<PlusIcon />}
                  size="large"
                  title="채팅 생성하기"
                  type="button"
                  variant="contained"
                  onClick={handleCreate}
                />
              </div>
              <IconButton
                aria-label="join chat"
                icon={<EnvelopeIcon />}
                size="medium"
                title="채팅 참여하기"
                type="button"
                variant="outlined"
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
