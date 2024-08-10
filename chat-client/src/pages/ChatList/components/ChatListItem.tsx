import { Link } from 'react-router-dom';

import { UserIcon } from '@heroicons/react/20/solid';

import { getFormatChatTime } from 'utils/date';

interface Props {
    data: {
        chatId: string;
        chatName: string;
        lastMessage: string;
        lastMessageTime: string;
    };
}
export default function ChatListItem({ data }: Props) {
    return (
        <li className="group rounded-lg border border-primary-900 bg-primary-50/10 px-4 py-2.5 hover:border-primary-950 hover:bg-primary-50/50 active:border-primary-950 active:bg-primary-100/50 dark:border-primary-100/20 dark:bg-black/10 dark:hover:border-primary-100/40 dark:hover:bg-black/10 dark:active:border-primary-100/60 dark:active:bg-black/10">
            <Link to={`/chat/${data.chatId}`}>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100">
                        <UserIcon className="h-6 w-6 text-primary-100 dark:text-primary-900" />
                    </div>
                    <div className="w-full">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-16-SB-24 text-primary-900 group-hover:font-bold dark:text-primary-100">
                                {data.chatName}
                            </p>
                            <time className="text-12-L-16 text-primary-900/50 dark:text-primary-100/50">
                                {getFormatChatTime(data.lastMessageTime)}
                            </time>
                        </div>
                        <p className="line-clamp-2 text-14-R-20 text-primary-900 dark:text-primary-100">
                            {data.lastMessage}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
}
