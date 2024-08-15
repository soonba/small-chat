import { useLocation, useNavigate } from 'react-router-dom';

import { ChatBubbleOvalLeftIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/20/solid';
import { CreateChatModal, IconButton, JoinChatModal } from 'components';
import { useToast } from 'components/Toast';

import useModal from 'hooks/utils/useModal';
import { useSocket } from 'libs/socket';
import { useCreateChat, useJoinChat } from 'services/chat';

export default function Footer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { onChatJoin } = useSocket();
    const { onToast } = useToast();

    const createChatMutation = useCreateChat({
        onSuccess(chatId) {
            onChatJoin([chatId]);
            navigate(`/chat/${chatId}`);
        },
        onError(error) {
            onToast(error.message, { delay: 5000 });
        }
    });

    const createModal = useModal({
        onSubmit(data) {
            const chatName = data as string;
            createChatMutation.mutate({ chatName });
        }
    });

    const joinChatMutation = useJoinChat({
        onSuccess(chatId) {
            onChatJoin([chatId]);
            navigate(`/chat/${chatId}`);
        },
        onError(error) {
            onToast(error.message, { delay: 5000 });
        }
    });

    const joinModal = useModal({
        onSubmit(data) {
            const chatId = data as string;
            joinChatMutation.mutate({ chatId });
        }
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
                    <footer className="fixed bottom-0 left-0 right-0 rounded-t-md bg-layout-light shadow-inner shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                        <div className="flex h-20 w-full items-center justify-around rounded-t-md">
                            <IconButton
                                type="button"
                                aria-label="chat list"
                                title="참여중인 채팅 리스트"
                                variant="outlined"
                                size="medium"
                                onClick={handleChatList}
                                icon={<ChatBubbleOvalLeftIcon />}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <IconButton
                                    type="button"
                                    variant="contained"
                                    size="large"
                                    aria-label="create chat"
                                    title="채팅 생성하기"
                                    onClick={handleCreate}
                                    icon={<PlusIcon />}
                                />
                            </div>
                            <IconButton
                                type="button"
                                aria-label="join chat"
                                title="채팅 참여하기"
                                variant="outlined"
                                size="medium"
                                onClick={handleJoin}
                                icon={<EnvelopeIcon />}
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
