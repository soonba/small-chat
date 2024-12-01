import dayjs from 'dayjs';

import { MessageListItem, SystemMessage } from '@pages/Chat/components';
import { ChatListItem } from '@pages/ChatList/components';

export default function Chat() {
  return (
    <section className="scroll-m-16" id="chat">
      <h2
        className="mb-10 text-30-B-36 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:[text-shadow:unset]"
        id="chat / message"
      >
        Chat / Message
      </h2>
      <div className="flex flex-col gap-10">
        <div className="flex w-full flex-col self-start rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            Chat
          </h3>
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
        <div className="flex w-full flex-col self-start rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            Message
          </h3>
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
