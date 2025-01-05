import { Link } from 'react-router-dom';

import { UserIcon } from '@heroicons/react/20/solid';

import { getFormatChatTime } from '@utils/date';

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
    <li className="group rounded-lg border border-primary-900 bg-primary-50/10 px-2.5 py-2.5 hover:border-primary-950 hover:bg-primary-50/50 active:border-primary-950 active:bg-primary-100/50 sm:px-4 dark:border-primary-100/20 dark:bg-black/10 dark:hover:border-primary-100/40 dark:hover:bg-black/10 dark:active:border-primary-100/60 dark:active:bg-black/10">
      <Link to={`/chat/${data.chatId}`}>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-900 sm:size-12 dark:bg-primary-100">
            <UserIcon className="size-5 text-primary-100 sm:size-6 dark:text-primary-900" />
          </div>
          <div className="w-full">
            <div className="flex w-full items-center justify-between gap-x-1 sm:gap-x-2.5">
              <p className="line-clamp-1 break-all text-14-SB-20 text-white group-hover:font-bold sm:text-16-SB-24 dark:text-primary-100">
                {data.chatName}
              </p>
              <time className="shrink-0 text-10-L-12 text-white drop-shadow-lg text-shadow sm:text-12-L-16 dark:text-primary-100/50 dark:text-shadow-unset">
                {getFormatChatTime(data.lastMessageTime)}
              </time>
            </div>
            <p className="line-clamp-2 break-all text-12-R-16 text-white sm:text-14-R-20 dark:text-primary-100">
              {data.lastMessage}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
