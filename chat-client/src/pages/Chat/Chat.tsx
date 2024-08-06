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

    const { isFetching, data, fetchPreviousPage, hasPreviousPage } = useGetChatHistory(chatId);
    const { isConnected, message: socketMessages, onMessageSend } = useSocket();

    const [observe, unobserve] = useIntersectionObserver(() => fetchPreviousPage());
    const intersectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        if (hasScrolled && !isFetching && hasPreviousPage) {
            observe(intersectionRef.current as Element);
        }

        if (!hasPreviousPage) {
            unobserve(intersectionRef.current as Element);
        }
    }, [hasScrolled, isFetching, data?.pages, hasPreviousPage]);

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
        <div className="relative h-full w-full">
            {isConnected ? 'Connected' : 'Disconnected'}
            <div ref={intersectionRef} className="h-px w-full" />
            <MessageList data={data?.pages?.flatMap((data) => data.data) || []} socketMessages={socketMessages || []} />
            <div ref={scrollRef} className="h-px w-full" />
            <MessageTextarea onSubmit={handleSubmit} />
        </div>
    );
}
