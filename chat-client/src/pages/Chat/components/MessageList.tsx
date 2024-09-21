import { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';

import { Loader } from '@components/Loader';

import { useAccount } from '@hooks/redux';
import { SocketMessageType } from '@hooks/utils/useSocket';
import { MessageListType } from '@services/chat';

import MessageListItem from './MessageListItem';
import SystemMessage from './SystemMessage';

interface Props {
  data: MessageListType;
  isLoading: boolean;
  socketMessages: SocketMessageType[];
}

export interface RefHandler {
  intersectionRef: RefObject<HTMLLIElement>;
}

const MessageList = forwardRef<RefHandler, Props>(function MessageList({ data, isLoading, socketMessages }, ref) {
  const { accountId } = useAccount();

  const intersectionRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => ({ intersectionRef }), []);

  return (
    <ul
      className="flex w-full flex-col-reverse gap-y-5 overflow-auto p-5 scrollbar-hide"
      id="chat-container"
      style={{
        height: window.innerHeight - 56 - 100,
        overflowAnchor: 'none',
      }}
    >
      {socketMessages?.map((message, index) => (
        <MessageListItem key={index} data={message} isSender={message.userId === accountId} />
      ))}
      {data.map((message, index) => {
        const isSender = message.sender === null ? false : message.sender.userId === accountId;
        return message.sender === null ? (
          <SystemMessage key={index} text={message.message} />
        ) : (
          <MessageListItem
            key={index}
            data={{ ...message, nickname: message.sender.nickname, userId: message.sender.userId }}
            isSender={isSender}
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
