import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import {
  MessageList as MessageListComponent,
  MessageListItem,
  MessageListItemSystem,
  MessageListSkeleton,
} from '@components/MessageList';

import { sleep } from '../utils/common';

const MessageList = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sleep(3000).then(() => setIsLoading(false));
  }, []);

  return (
    <div className="h-full min-h-inherit w-full">
      {isLoading ? (
        <MessageListSkeleton />
      ) : (
        <MessageListComponent>
          <MessageListItem
            createdAt={dayjs().toString()}
            message="안녕하세요!~~"
            nickname="귀여운다람쥐"
            position="left"
          />
          <MessageListItem
            createdAt={dayjs().subtract(10, 'minute').toString()}
            message="안녕하세요!"
            nickname="나"
            position="right"
          />
          <MessageListItem
            createdAt={dayjs().subtract(50, 'minute').toString()}
            message="안녕하세요!"
            nickname="행복한돼지"
            position="left"
          />
          <MessageListItemSystem text="작은대화방이 생성되었습니다." />
        </MessageListComponent>
      )}
    </div>
  );
};

export default MessageList;
