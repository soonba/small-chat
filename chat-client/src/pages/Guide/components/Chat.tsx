import dayjs from 'dayjs';

import { MessageListItem, SystemMessage } from '@pages/Chat/components';
import { ChatListItem } from '@pages/ChatList/components';

export default function Chat() {
  return (
    <section className="scroll-m-16 text-primary-900 dark:text-primary-100" id="chat">
      <div className="mb-10 flex items-center gap-x-2.5">
        <h2 className="text-30-B-36">Chat / Message</h2>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex w-full flex-col self-start rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
          <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">Chat</h3>
          <div className="flex flex-col gap-y-2.5">
            <ul>
              <ChatListItem
                data={{
                  chatId: 'abcd',
                  chatName: '작은대화',
                  lastMessage: '안녕하세요~~~!',
                  lastMessageTime: new Date().toDateString(),
                }}
              />
            </ul>
          </div>
        </div>
        <div className="flex w-full flex-col self-start rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
          <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">Message</h3>
          <div className="flex flex-col gap-y-2.5">
            <ul className="gap-y-5">
              <SystemMessage text="작은대화방이 생성되었습니다." />
              <MessageListItem
                isSender={false}
                data={{
                  createdAt: dayjs().subtract(50, 'minute').toString(),
                  message: '안녕하세요!',
                  nickname: 'nskb',
                  userId: 'abcd',
                }}
              />
              <MessageListItem
                isSender
                data={{
                  createdAt: dayjs().subtract(10, 'minute').toString(),
                  message: '안녕하세요!',
                  nickname: '나',
                  userId: 'abcd',
                }}
              />
              <MessageListItem
                isSender={false}
                data={{
                  createdAt: dayjs().toString(),
                  message: '안녕하세요!~~',
                  nickname: 'nskb33',
                  userId: 'abcd',
                }}
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
