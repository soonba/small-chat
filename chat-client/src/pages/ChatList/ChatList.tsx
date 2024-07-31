import { Link } from 'react-router-dom';

import { UserIcon } from '@heroicons/react/20/solid';

import { useGetChatList } from 'services/chat';
import { getFormatChatTime } from 'utils/date';

export default function Chat() {
    const { data } = useGetChatList();

    return (
        <div className="relative h-full w-full p-5">
            <ul className="h-full space-y-2.5">
                {(!data || data.length === 0) && (
                    <li className="flex h-80 w-full items-center justify-center">
                        <p className="text-center text-2xl font-black text-primary-900 dark:text-primary-100">
                            채팅에 참여해 보세요.
                        </p>
                    </li>
                )}
                {data?.map((item) => (
                    <li
                        key={item.chatId}
                        className="group rounded-lg border border-primary-900 px-4 py-2.5 hover:border-primary-950 hover:bg-primary-50/50 active:border-primary-950 active:bg-primary-100/50 dark:border-primary-100/20 dark:hover:border-primary-100/40 dark:hover:bg-current dark:active:border-primary-100/60 dark:active:bg-current"
                    >
                        <Link to={`/chat/${item.chatId}`}>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100">
                                    <UserIcon className="h-6 w-6 text-primary-100 dark:text-primary-900" />
                                </div>
                                <div className="w-full">
                                    <div className="flex w-full items-center justify-between">
                                        <p className="text-base font-semibold text-primary-900 group-hover:font-bold dark:text-primary-100">
                                            {item.chatName}
                                        </p>
                                        <time className="text-xs font-light text-primary-950/50 dark:text-primary-50/50">
                                            {getFormatChatTime(item.lastMessageTime)}
                                        </time>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-primary-900 dark:text-primary-100">
                                        {item.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
