import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftEndOnRectangleIcon, ChevronLeftIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { IconButton, Loader } from 'components';
import { useToast } from 'components/Toast';

import { useAccount, useIntersectionObserver, useMode } from 'hooks';
import { useSocket } from 'libs/socket';
import { useGetChatDetail, useGetChatHistory, useLeaveChat } from 'services/chat';

import { MessageList, MessageTextarea } from './components';
import { RefHandler } from './components/MessageList';

export default function Chat() {
    const navigate = useNavigate();
    const { id } = useParams();
    const chatId = id || '';

    const { accountId, nickname } = useAccount();
    const { mode, onModeChange } = useMode();
    const { onToast } = useToast();

    const { data: detailData } = useGetChatDetail();
    const {
        isLoading: isFetching,
        data,
        fetchPreviousPage,
        isFetchingPreviousPage,
        hasPreviousPage
    } = useGetChatHistory(chatId);
    const list = useMemo(() => data?.pages?.flatMap((data) => data.data).reverse() || [], [data?.pages]);
    const { message: socketMessages, onMessageSend, onCurrentChatLeave } = useSocket();

    const ref = useRef<RefHandler>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [observe, unobserve] = useIntersectionObserver(() => {
        setTimeout(() => {
            setIsLoading(false);
            fetchPreviousPage();
        }, 1000);
    });

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

    const leaveChatMutation = useLeaveChat({
        onSuccess() {
            onCurrentChatLeave(chatId);
            navigate('/', { replace: true });
        },
        onError(error) {
            onToast(error.message, { delay: 5000 });
        }
    });

    const handleLeave = () => {
        leaveChatMutation.mutate({ chatId });
    };

    const handleSubmit = (message: string) => {
        if (accountId && nickname) {
            onMessageSend({
                messageBody: { chatId, userId: accountId, nickname, message }
            });
        } else {
            onToast(`문제가 발생하였습니다.\n잠시 후에 다시 시도해주세요.`, { delay: 5000 });
        }
    };

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-10 rounded-b-md bg-layout-light shadow-sm shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                <div className="flex h-14 w-full items-center justify-between rounded-b-md pl-2.5 pr-5">
                    <Link to="/" className="flex w-full items-center gap-1" onClick={() => onCurrentChatLeave(chatId)}>
                        <ChevronLeftIcon className="h-8 w-8 text-primary-900 dark:text-primary-100" />
                        <h1 className="text-center font-jua text-24-R-32 text-primary-900 dark:text-primary-100">
                            {detailData?.chatName || ''}
                        </h1>
                    </Link>
                    <div className="flex items-center gap-5">
                        <IconButton
                            aria-label="leave chat"
                            title="채팅방 나가기"
                            variant="text"
                            size="small"
                            icon={<ArrowLeftEndOnRectangleIcon />}
                            onClick={handleLeave}
                        />
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
            <main className="flex h-full w-full flex-col justify-between pt-14">
                {isFetching ? (
                    <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center text-24-BL-32 text-primary-900 dark:text-primary-100">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <MessageList
                            ref={ref}
                            isLoading={isLoading || isFetchingPreviousPage}
                            data={list}
                            socketMessages={socketMessages || []}
                        />
                        <MessageTextarea onSubmit={handleSubmit} />
                    </>
                )}
            </main>
        </>
    );
}
