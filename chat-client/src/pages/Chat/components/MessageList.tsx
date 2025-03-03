import { Ref, useEffect, useState } from 'react';

import Loader from '@components/Loader';

import { useAccount } from '@hooks/redux';
import { SocketMessageType } from '@hooks/utils/useSocket';
import { MessageListType } from '@services/chat';

import MessageListItem from './MessageListItem';
import SystemMessage from './SystemMessage';

interface Props {
  data: MessageListType;
  ref: Ref<HTMLLIElement>;
  isLoading: boolean;
  socketMessages: SocketMessageType[];
}

const MessageList = ({ data, isLoading, ref, socketMessages }: Props) => {
  const { accountId } = useAccount();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 425) {
        // header - textarea
        setHeight(window.innerHeight - 56 - 102);
      } else {
        setHeight(window.innerHeight - 56 - 62);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ul
      className="flex w-full flex-col-reverse gap-y-5 overflow-auto p-5 scrollbar-hide"
      id="chat-container"
      style={{ height, overflowAnchor: 'none' }}
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
      <li ref={ref} className="h-px w-full" />
      {isLoading && (
        <li className="flex h-32 w-full items-center justify-center">
          <Loader />
        </li>
      )}
    </ul>
  );
};

export default MessageList;
