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
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100">
          <UserIcon className="size-6 text-primary-100 dark:text-primary-900" />
        </div>
        <p className="text-14-B-20 text-primary-900 drop-shadow-lg [text-shadow:0_0_2px_#e0f0fe] dark:text-primary-100">
          {data.nickname}
        </p>
      </div>
      <div className={`${isSender ? 'mr-2.5 flex-row-reverse' : 'ml-2.5 flex-row'} -mt-2.5 flex items-end gap-x-2.5`}>
        <p
          className={`${isSender ? 'mr-[50px] rounded-tr-none' : 'ml-[50px] rounded-tl-none'} w-max max-w-md whitespace-pre-wrap break-all rounded-3xl bg-primary-50 p-5 text-14-R-20 text-primary-900`}
        >
          {data.message}
        </p>
        <time className="text-12-L-16 text-white drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-primary-100/50 dark:[text-shadow:unset]">
          {getFormatChatTime(data.createdAt)}
        </time>
      </div>
    </li>
  );
}
