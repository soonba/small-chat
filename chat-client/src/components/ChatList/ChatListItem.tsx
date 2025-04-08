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
    <li className="group rounded-lg border px-2.5 py-2.5 spring:border-pink-900 spring:bg-white hover:spring:border-pink-950 hover:spring:bg-pink-50 spring:active:border-pink-950 spring:active:bg-pink-100 winter:border-blue-900 winter:bg-blue-50/10 hover:winter:border-blue-950 hover:winter:bg-blue-50/50 winter:active:border-blue-950 winter:active:bg-blue-100/50 sm:px-4 spring:dark:border-pink-100 spring:dark:bg-black/10 dark:hover:spring:border-pink-200 dark:hover:spring:bg-black/20 spring:dark:active:border-pink-300 spring:dark:active:bg-black/50 winter:dark:border-blue-100/20 winter:dark:bg-black/10 dark:hover:winter:border-blue-100/40 dark:hover:winter:bg-black/10 winter:dark:active:border-blue-100/60 winter:dark:active:bg-black/10">
      <Link to={`/chat/${chatId}`}>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg spring:bg-pink-900 winter:bg-blue-900 sm:size-12 spring:dark:bg-pink-100 winter:dark:bg-blue-100">
            <UserIcon className="size-5 spring:text-pink-50 winter:text-blue-100 sm:size-6 spring:dark:text-pink-950 winter:dark:text-blue-900" />
          </div>
          <div className="w-full">
            <div className="flex w-full items-center justify-between gap-x-1 sm:gap-x-2.5">
              <p className="line-clamp-1 break-all text-14-SB-20 spring:text-pink-950 winter:text-white sm:text-16-SB-24 spring:dark:text-pink-50 winter:dark:text-blue-100">
                {chatName}
              </p>
              <time className="shrink-0 text-10-L-12 spring:text-pink-950 winter:text-white winter:text-shadow sm:text-12-L-16 spring:dark:text-pink-50/50 winter:dark:text-blue-100/50 winter:dark:text-shadow-unset">
                {getFormatChatTime(lastMessageTime)}
              </time>
            </div>
            <p className="line-clamp-2 break-all text-12-R-16 spring:text-pink-950 winter:text-white sm:text-14-R-20 spring:dark:text-pink-50 winter:dark:text-blue-100">
              {lastMessage}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
