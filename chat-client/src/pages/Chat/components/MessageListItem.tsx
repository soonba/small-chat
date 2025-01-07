import { UserIcon } from '@heroicons/react/20/solid';

import { SocketMessageType } from '@hooks/utils/useSocket';
import { getFormatChatTime } from '@utils/date';

interface Props {
  data: SocketMessageType;
  isSender: boolean;
}

export default function MessageListItem({ data, isSender }: Props) {
  return (
    <li className={`${isSender ? 'ml-auto' : 'mr-auto'} w-max`}>
      <div className={`${isSender ? 'flex-row-reverse' : 'flex-row'} flex items-start gap-x-2.5`}>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-900 sm:size-12 dark:bg-primary-100">
          <UserIcon className="size-5 text-primary-100 sm:size-6 dark:text-primary-900" />
        </div>
        <p className="text-12-B-16 text-primary-900 drop-shadow-lg text-shadow-light sm:text-14-B-20 dark:text-primary-100">
          {data.nickname}
        </p>
      </div>
      <div
        className={`${isSender ? 'mr-2.5 flex-col items-start sm:flex-row-reverse' : 'ml-2.5 flex-col items-end sm:flex-row'} -mt-2.5 flex gap-2.5 sm:items-end`}
      >
        <p
          className={`${isSender ? 'mr-10 !rounded-tr-none sm:mr-[50px]' : 'ml-10 !rounded-tl-none sm:ml-[50px]'} max-w-[calc(100vw-90px)] whitespace-pre-wrap break-all rounded-xl bg-primary-50 p-2.5 text-12-R-16 text-primary-900 sm:w-max sm:max-w-sm sm:rounded-3xl sm:p-5 sm:text-14-R-20`}
        >
          {data.message}
        </p>
        <time className="text-10-L-12 text-white drop-shadow-lg text-shadow sm:text-12-L-16 dark:text-primary-100/50 dark:text-shadow-unset">
          {getFormatChatTime(data.createdAt)}
        </time>
      </div>
    </li>
  );
}
