import dayjs from 'dayjs';

import { MessageListItem, SystemMessage } from 'pages/Chat/components';
import { ChatListItem } from 'pages/ChatList/components';

export default function Chat() {
    return (
        <section id="chat" className="scroll-m-16 text-primary-900 dark:text-primary-100">
            <div className="mb-10 flex items-center gap-x-2.5">
                <h2 className="text-30-B-36">Chat / Message</h2>
            </div>
            <div className="flex flex-col gap-10">
                <div className="dark:bg-layout-dark bg-layout-light flex w-full flex-col self-start rounded p-5 shadow-md shadow-primary-100 dark:shadow-primary-950">
                    <h3 className="text-16-B-24 mb-2.5 text-gray-900 dark:text-gray-100">Chat</h3>
                    <div className="flex flex-col gap-y-2.5">
                        <ul>
                            <ChatListItem
                                data={{
                                    chatId: 'abcd',
                                    chatName: '작은대화',
                                    lastMessage: '안녕하세요~~~!',
                                    lastMessageTime: new Date().toDateString()
                                }}
                            />
                        </ul>
                    </div>
                </div>
                <div className="dark:bg-layout-dark bg-layout-light flex w-full flex-col self-start rounded p-5 shadow-md shadow-primary-100 dark:shadow-primary-950">
                    <h3 className="text-16-B-24 mb-2.5 text-gray-900 dark:text-gray-100">Message</h3>
                    <div className="flex flex-col gap-y-2.5">
                        <ul className="gap-y-5">
                            <SystemMessage text="작은대화방이 생성되었습니다." />
                            <MessageListItem
                                isSender={false}
                                data={{
                                    userId: 'abcd',
                                    nickname: 'nskb',
                                    message: '안녕하세요!',
                                    createdAt: dayjs().subtract(50, 'minute').toString()
                                }}
                            />
                            <MessageListItem
                                isSender
                                data={{
                                    userId: 'abcd',
                                    nickname: '나',
                                    message: '안녕하세요!',
                                    createdAt: dayjs().subtract(10, 'minute').toString()
                                }}
                            />
                            <MessageListItem
                                isSender={false}
                                data={{
                                    userId: 'abcd',
                                    nickname: 'nskb33',
                                    message: '안녕하세요!~~',
                                    createdAt: dayjs().toString()
                                }}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
