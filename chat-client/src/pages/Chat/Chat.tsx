import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAccount, useSocket, useIntersectionObserver } from 'hooks';
import { useGetChatHistory } from 'services/chat';

import { MessageList, MessageTextarea } from './components';
import { RefHandler } from './components/MessageList';

// TODO: UI 완료
// TODO: Loader
export default function Chat() {
    const { id } = useParams();
    const chatId = id || '';
    const { accountId, nickname } = useAccount();

    const { isFetching, data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetChatHistory(chatId);
    const list = useMemo(() => data?.pages?.flatMap((data) => data.data).reverse() || [], [data?.pages]);
    const { message: socketMessages, onMessageSend } = useSocket();

    const ref = useRef<RefHandler>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [observe, unobserve] = useIntersectionObserver(() => {
        setTimeout(() => {
            setIsLoading(false);
            fetchNextPage();
        }, 1000);
    });

    useEffect(() => {
        if (ref.current) {
            if (!isLoading && !isFetchingNextPage && hasNextPage) {
                setIsLoading(true);
                observe(ref.current.intersectionRef.current as HTMLLIElement);
            }

            if (!hasNextPage) {
                unobserve(ref.current.intersectionRef.current as HTMLLIElement);
            }
        }
    }, [isLoading, isFetchingNextPage, hasNextPage]);

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
        <div className="flex h-full w-full flex-col justify-between">
            {isFetching ? (
                <div className="text-24-BL-32 flex h-[calc(100vh-56px)] w-full items-center justify-center text-primary-900 dark:text-primary-100">
                    Loading...!
                </div>
            ) : (
                <>
                    {(list.length > 0 || socketMessages.length > 0) && (
                        <MessageList
                            ref={ref}
                            isLoading={isLoading || isFetchingNextPage}
                            data={list}
                            socketMessages={socketMessages || []}
                        />
                    )}
                    <MessageTextarea onSubmit={handleSubmit} />
                </>
            )}
        </div>
    );
}
