import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAccount, useSocket, useIntersectionObserver } from 'hooks';
import { useGetChatHistory } from 'services/chat';

import { MessageList, MessageTextarea } from './components';

// TODO: UI 완료
export default function Chat() {
    const { id } = useParams();
    const chatId = id || '';
    const { accountId, nickname } = useAccount();

    const { isFetching, data, fetchPreviousPage, isFetchingPreviousPage, hasPreviousPage } = useGetChatHistory(chatId);
    const { message: socketMessages, onMessageSend } = useSocket();

    const [isLoading, setIsLoading] = useState(false);
    const [observe, unobserve] = useIntersectionObserver(() => {
        setTimeout(() => {
            setIsLoading(false);
            fetchPreviousPage();
        }, 1000);
    });
    const intersectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        if (intersectionRef.current) {
            if (!isLoading && hasScrolled && hasPreviousPage) {
                setIsLoading(true);
                observe(intersectionRef.current as Element);
            }

            if (!hasPreviousPage) {
                unobserve(intersectionRef.current as Element);
            }
        }
    }, [hasScrolled, isLoading, isFetchingPreviousPage, hasPreviousPage]);

    const handleSubmit = (message: string) => {
        if (accountId && nickname) {
            onMessageSend({
                messageBody: { chatId, userId: accountId, nickname, message }
            });
        } else {
            alert('문제가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (!hasScrolled && ((data?.pages && data.pages.length > 0) || socketMessages.length > 0)) {
            scrollRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
            timerId = setTimeout(() => setHasScrolled(true), 1000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [hasScrolled, data?.pages, socketMessages]);

    return (
        <div className="flex h-full w-full flex-col justify-between overflow-auto">
            {isFetching ? (
                <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center">Loading...!</div>
            ) : (
                <>
                    <div
                        className="flex w-full flex-col-reverse overflow-y-auto"
                        style={{
                            height: window.innerHeight - 44 - 56,
                            overflowAnchor: 'none'
                        }}
                    >
                        <MessageList
                            data={data?.pages?.flatMap((data) => data.data) || []}
                            socketMessages={socketMessages || []}
                        />
                        {(isLoading || isFetchingPreviousPage) && (
                            <div className="flex h-[200px] w-full items-center justify-center">Loading...!</div>
                        )}
                        <div ref={intersectionRef} className="h-px w-full" />
                    </div>
                    <div ref={scrollRef} className="h-px w-full" />
                    <MessageTextarea onSubmit={handleSubmit} />
                </>
            )}
        </div>
    );
}
