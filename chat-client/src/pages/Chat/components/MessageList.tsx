import { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';

import { Loader } from 'components';

import { useAccount } from 'hooks';
import { SocketMessageType } from 'libs/socket';
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

    return (
        <ul
            id="chat-container"
            className="flex w-full flex-col-reverse gap-y-5 overflow-auto p-5 scrollbar-hide"
            style={{
                height: window.innerHeight - 56 - 44,
                overflowAnchor: 'none'
            }}
        >
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
            <li ref={intersectionRef} className="h-px w-full" />
            {isLoading && (
                <li className="flex h-32 w-full items-center justify-center">
                    <Loader />
                </li>
            )}
        </ul>
    );
});

export default MessageList;
