import { UserIcon } from '@heroicons/react/20/solid';

import { SocketMessageType } from 'context/SocketProvider';
import { useAccount } from 'hooks';
import { MessageListType } from 'services/chat/useGetChatHistory';
import { getFormatChatTime } from 'utils/date';

interface Props {
    data: MessageListType;
    socketMessages: SocketMessageType[];
}

export default function ChatList({ data, socketMessages }: Props) {
    const { accountId } = useAccount();

    return (
        <ul className="h-full space-y-5 p-10">
            {data.map((message, index) => {
                const isSender = message.sender === null ? false : message.sender.userId === accountId;

                return message.sender === null ? (
                    <p
                        key={index}
                        className="w-full text-center text-sm font-bold text-primary-950 dark:text-primary-100"
                    >
                        {message.message}
                    </p>
                ) : (
                    <div key={index} className={`${isSender ? 'ml-auto' : 'mr-auto'} w-max`}>
                        <div className={`${isSender ? 'flex-row-reverse' : 'flex-row'} flex items-start gap-x-2.5`}>
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100">
                                <UserIcon className="h-6 w-6 text-primary-100 dark:text-primary-900" />
                            </div>
                            <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
                                {message.sender.nickname}
                            </p>
                        </div>
                        <div
                            className={`${isSender ? 'mr-2.5 flex-row-reverse' : 'ml-2.5 flex-row'} -mt-2.5 flex items-end gap-x-2.5`}
                        >
                            <div
                                className={`${isSender ? 'mr-[50px] rounded-tr-none' : 'ml-[50px] rounded-tl-none'}  min-w-80 max-w-md whitespace-pre-wrap break-all rounded-3xl  bg-primary-50 p-5 text-sm`}
                            >
                                {message.message}
                            </div>
                            <time className="text-xs font-light text-primary-950/50 dark:text-primary-50/50">
                                {getFormatChatTime(message.createdAt)}
                            </time>
                        </div>
                    </div>
                );
            })}
            {socketMessages?.map((message, index) => {
                const isSender = message.userId === accountId;

                return (
                    <div key={index} className={`${isSender ? 'ml-auto' : 'mr-auto'} w-max`}>
                        <div className={`${isSender ? 'flex-row-reverse' : 'flex-row'} flex items-start gap-x-2.5`}>
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100">
                                <UserIcon className="h-6 w-6 text-primary-100 dark:text-primary-900" />
                            </div>
                            <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
                                {message.nickname}
                            </p>
                        </div>
                        <div
                            className={`${isSender ? 'mr-2.5 flex-row-reverse' : 'ml-2.5 flex-row'} -mt-2.5 flex items-end gap-x-2.5`}
                        >
                            <div
                                className={`${isSender ? 'mr-[50px] rounded-tr-none' : 'ml-[50px] rounded-tl-none'}  min-w-80 max-w-md whitespace-pre-wrap break-all rounded-3xl  bg-primary-50 p-5 text-sm`}
                            >
                                {message.message}
                            </div>
                            <time className="text-xs font-light text-primary-950/50 dark:text-primary-50/50">
                                {getFormatChatTime(message.createdAt || new Date())}
                            </time>
                        </div>
                    </div>
                );
            })}
        </ul>
    );
}
