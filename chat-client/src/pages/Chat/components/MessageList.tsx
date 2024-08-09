import { forwardRef, RefObject, useEffect, useImperativeHandle, useRef } from 'react';

import { EmptyText } from 'components';

import { SocketMessageType } from 'context/SocketProvider';
import { useAccount } from 'hooks';
import { MessageListType } from 'services/chat/useGetChatHistory';

import MessageListItem from './MessageListItem';
import SystemMessage from './SystemMessage';

interface Props {
    isLoading: boolean;
    data: MessageListType;
    socketMessages: SocketMessageType[];
}

export interface RefHandler {
    intersectionRef: RefObject<HTMLLIElement>;
}

const MessageList = forwardRef<RefHandler, Props>(({ isLoading, data, socketMessages }, ref) => {
    const { accountId } = useAccount();

    const intersectionRef = useRef<HTMLLIElement>(null);
    useImperativeHandle(ref, () => ({ intersectionRef }), []);

    const scrollRef = useRef<HTMLLIElement>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }, []);

    return (
        <ul
            id="chat-container"
            className="flex w-full flex-col-reverse gap-y-5 overflow-y-auto p-10"
            style={{
                height: window.innerHeight - 56 - 44,
                overflowAnchor: 'none'
            }}
        >
            <li ref={scrollRef} className="h-px w-full" />
            {socketMessages?.map((message, index) => (
                <MessageListItem key={index} isSender={message.userId === accountId} data={message} />
            ))}
            {data.map((message, index) => {
                const isSender = message.sender === null ? false : message.sender.userId === accountId;
                return message.sender === null ? (
                    <SystemMessage key={index} text={message.message} />
                ) : (
                    <MessageListItem
                        key={index}
                        isSender={isSender}
                        data={{ ...message, userId: message.sender.userId, nickname: message.sender.nickname }}
                    />
                );
            })}
            {isLoading && (
                <li className="flex h-[200px] w-full items-center justify-center">
                    <EmptyText text="Loading...!" />
                </li>
            )}
            <li ref={intersectionRef} className="h-px w-full" />
        </ul>
    );
});

export default MessageList;
