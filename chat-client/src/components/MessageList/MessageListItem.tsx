import { UserIcon } from '@heroicons/react/20/solid';

import { getFormatChatTime } from '@utils/date';

interface Props {
  createdAt: string;
  message: string;
  nickname: string;
  position: 'left' | 'right';
}

export default function MessageListItem({ createdAt, message, nickname, position }: Props) {
  return (
    <li className={`${position === 'right' ? 'ml-auto' : 'mr-auto'} w-max`}>
      <div className={`${position === 'right' ? 'flex-row-reverse' : 'flex-row'} flex items-start gap-x-2.5`}>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg spring:border spring:border-pink-900 spring:bg-pink-900 winter:border winter:border-blue-900 winter:bg-blue-900 sm:size-12 dark:spring:bg-pink-100 dark:winter:bg-blue-100">
          <UserIcon className="size-5 spring:text-pink-50 winter:text-blue-100 sm:size-6 dark:spring:text-pink-950 dark:winter:text-blue-900" />
        </div>
        <p className="text-12-B-16 spring:text-pink-950 winter:text-blue-100 winter:text-shadow sm:text-14-B-20 dark:spring:text-pink-50 dark:winter:text-blue-100">
          {nickname}
        </p>
      </div>
      <div
        className={`${position === 'right' ? 'mr-2.5 flex-col items-start sm:flex-row-reverse' : 'ml-2.5 flex-col items-end sm:flex-row'} -mt-2.5 flex gap-2.5 sm:items-end`}
      >
        <p
          className={`${position === 'right' ? 'mr-10 !rounded-tr-none sm:mr-[50px]' : 'ml-10 !rounded-tl-none sm:ml-[50px]'} max-w-[calc(100vw-90px)] whitespace-pre-wrap break-all rounded-xl p-2.5 text-12-R-16 spring:border spring:border-pink-900 spring:bg-pink-50 spring:text-pink-950 winter:border winter:border-blue-900 winter:bg-blue-50 winter:text-blue-900 sm:w-max sm:max-w-sm sm:rounded-3xl sm:p-5 sm:text-14-R-20`}
        >
          {message}
        </p>
        <time className="text-10-L-12 spring:text-pink-950 winter:text-white winter:text-shadow sm:text-12-L-16 dark:spring:text-pink-50 dark:spring:text-shadow dark:winter:text-blue-100/50">
          {getFormatChatTime(createdAt)}
        </time>
      </div>
    </li>
  );
}
