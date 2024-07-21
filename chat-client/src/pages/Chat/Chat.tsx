import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Picker from '@emoji-mart/react';

import { ClipboardIcon, FaceSmileIcon, PaperAirplaneIcon, UserIcon } from '@heroicons/react/20/solid';
import { IconButton } from 'components';

import useAccount from 'hooks/useAccount';
import { getFormatChatTime } from 'utils/date';
import { getStorageItem, LOCAL_STORAGE_KEYS } from 'utils/storage';

import { useGetHistoryByRoomIdQuery, useSendMutation, useSubscribeRoomSubscription } from 'generated/graphql';

type EmojiDataType = {
    id: string;
    keywords: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
};

// TODO: UI 완료
export default function Chat() {
    const { id } = useParams();
    const roomId = id || '';
    const { accountId, nickname } = useAccount();

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [message, setMessage] = useState('');
    const [bottom, setBottom] = useState(50);

    // TODO: REST API
    const { data } = useGetHistoryByRoomIdQuery({
        fetchPolicy: 'no-cache',
        variables: { input: { roomId } }
    });
    const messages = useMemo(() => data?.getHistoryByRoomId?.messages || [], [data]);

    // TODO: refactor
    useSubscribeRoomSubscription({
        variables: { input: { roomIds: [`chat_${roomId}`] } },
        onData({ data: { data } }) {
            if (data) {
                //  TODO: subscription
            }
        }
    });

    const handleCopy = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            // eslint-disable-next-line no-alert
            alert('채팅방 코드가 복사되었습니다.');
        }
    };

    const [sendMutation, { loading }] = useSendMutation({
        onCompleted() {
            setMessage('');
        }
    });

    const handleSubmit = () => {
        sendMutation({
            variables: {
                input: {
                    roomId,
                    userId: accountId || '',
                    message,
                    nickname: nickname || ''
                }
            }
        });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                if (textareaRef.current) {
                    const element = textareaRef.current as HTMLTextAreaElement;
                    element.style.setProperty('height', '24px');
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative h-full w-full">
            <ul className="space-y-5 p-10">
                {messages.map((message) => {
                    const isSender = message.sender.userId === accountId;
                    return (
                        <div key={message.messageId} className={`${isSender ? 'ml-auto' : 'mr-auto'} w-max`}>
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
            </ul>
            <div
                ref={ref}
                className="fixed bottom-0 left-0 right-0 flex w-full flex-row items-end gap-5 bg-[#f7fbff] py-2.5 pl-2.5 pr-5 dark:bg-[#02101c]"
            >
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onFocus={(e) => {
                        e.currentTarget.style.height = '72px';
                        setBottom(72 + 26);
                    }}
                    maxLength={140}
                    className="h-6 w-full resize-none bg-transparent text-base font-medium text-primary-950 outline-none ring-0 transition-all scrollbar-hide placeholder:text-primary-900/50 dark:text-primary-50 dark:placeholder:text-primary-50/30"
                />
                <IconButton
                    variant="text"
                    size="small"
                    icon={<FaceSmileIcon />}
                    onClick={() => setIsOpen((prev) => !prev)}
                />
                {!message ? (
                    <IconButton
                        aria-label="copy room id"
                        title="코드 공유하기"
                        variant="text"
                        size="small"
                        icon={<ClipboardIcon />}
                        onClick={handleCopy}
                    />
                ) : (
                    <IconButton
                        aria-label="submit"
                        title="메시지 보내기"
                        disabled={!message || loading}
                        variant="text"
                        size="small"
                        icon={<PaperAirplaneIcon />}
                        onClick={handleSubmit}
                    />
                )}
            </div>
            {isOpen && (
                <div style={{ bottom }} className="fixed bottom-0 right-0">
                    <Picker
                        data={data}
                        locale="ko"
                        previewPosition="none"
                        theme={getStorageItem(LOCAL_STORAGE_KEYS.MODE) === 'light' ? 'light' : 'dark'}
                        onEmojiSelect={(data: EmojiDataType) => setMessage((prev) => prev + data.native)}
                    />
                </div>
            )}
        </div>
    );
}
