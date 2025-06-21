import { Link } from 'react-router-dom';

import { UserIcon } from '@heroicons/react/20/solid';

import { getFormatChatTime } from '@utils/date';

interface Props {
  chatId: string;
  chatName: string;
  lastMessage: string;
  lastMessageTime: string;
}

export default function ChatListItem({ chatId, chatName, lastMessage, lastMessageTime }: Props) {
  return (
    <li className="group rounded-lg border px-2.5 py-2.5 spring:border-pink-900 spring:bg-white hover:spring:border-pink-950 hover:spring:bg-pink-50 active:spring:border-pink-950 active:spring:bg-pink-100 winter:border-blue-900 winter:bg-blue-50/10 hover:winter:border-blue-950 hover:winter:bg-blue-50/50 active:winter:border-blue-950 active:winter:bg-blue-100/50 sm:px-4 dark:spring:border-pink-100 dark:spring:bg-black/10 dark:hover:spring:border-pink-200 dark:hover:spring:bg-black/20 dark:active:spring:border-pink-300 dark:active:spring:bg-black/50 dark:winter:border-blue-100/20 dark:winter:bg-black/10 dark:hover:winter:border-blue-100/40 dark:hover:winter:bg-black/10 dark:active:winter:border-blue-100/60 dark:active:winter:bg-black/10">
      <Link to={`/chat/${chatId}`}>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg spring:bg-pink-900 winter:bg-blue-900 sm:size-12 dark:spring:bg-pink-100 dark:winter:bg-blue-100">
            <UserIcon className="size-5 spring:text-pink-50 winter:text-blue-100 sm:size-6 dark:spring:text-pink-950 dark:winter:text-blue-900" />
          </div>
          <div className="w-full">
            <div className="flex w-full items-center justify-between gap-x-1 sm:gap-x-2.5">
              <p className="line-clamp-1 break-all text-14-SB-20 spring:text-pink-950 winter:text-white sm:text-16-SB-24 dark:spring:text-pink-50 dark:winter:text-blue-100">
                {chatName}
              </p>
              <time className="shrink-0 text-10-L-12 spring:text-pink-950 winter:text-white winter:text-shadow sm:text-12-L-16 dark:spring:text-pink-50/50 dark:winter:text-blue-100/50 dark:winter:text-shadow-unset">
                {getFormatChatTime(lastMessageTime)}
              </time>
            </div>
            <p className="line-clamp-2 break-all text-12-R-16 spring:text-pink-950 winter:text-white sm:text-14-R-20 dark:spring:text-pink-50 dark:winter:text-blue-100">
              {lastMessage}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
