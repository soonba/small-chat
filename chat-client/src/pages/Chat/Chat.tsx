import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftEndOnRectangleIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { IconButton, Loader } from 'components';

import { useAccount, useSocket, useIntersectionObserver } from 'hooks';
import { useGetChatDetail, useGetChatHistory, useLeaveChat } from 'services/chat';

import { MessageList, MessageTextarea } from './components';
import { RefHandler } from './components/MessageList';

// TODO: UI 완료
export default function Chat() {
    const navigate = useNavigate();
    const { id } = useParams();
    const chatId = id || '';
    const { accountId, nickname } = useAccount();

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
            // eslint-disable-next-line no-alert
            alert('문제가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
        }
    };

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-10 rounded-b-md bg-layout-light shadow-sm shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                <div className="flex h-14 w-full items-center justify-between rounded-b-md px-5">
                    <Link to="/" className="flex w-full items-center gap-1">
                        <ChevronLeftIcon className="h-8 w-8 text-primary-900 dark:text-primary-100" />
                        <h1 className="text-center font-jua text-24-R-32 text-primary-900 dark:text-primary-100">
                            {detailData?.chatName || ''}
                        </h1>
                    </Link>
                    <IconButton
                        aria-label="leave chat"
                        title="채팅방 나가기"
                        variant="text"
                        size="small"
                        icon={<ArrowLeftEndOnRectangleIcon />}
                        onClick={handleLeave}
                    />
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
