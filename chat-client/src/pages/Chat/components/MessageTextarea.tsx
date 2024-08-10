import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { ClipboardIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { IconButton } from 'components';

import { getStorageItem, SESSION_STORAGE_KEYS } from 'utils/storage';

type EmojiDataType = {
    id: string;
    keywords: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
};

interface Props {
    onSubmit: (newMessage: string) => void;
}

export default function MessageTextarea({ onSubmit }: Props) {
    const { id } = useParams();
    const chatId = id || '';

    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bottom, setBottom] = useState(50);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState('');

    const handleCopy = () => {
        if (chatId) {
            navigator.clipboard.writeText(chatId);
            // eslint-disable-next-line no-alert
            alert('채팅방 코드가 복사되었습니다.');
        }
    };

    const handleSubmit = () => {
        onSubmit(message);
        setMessage('');
        if (textareaRef.current) {
            const container = document.getElementById('chat-container');
            container?.style.setProperty('height', `${window.innerHeight - 56 - 44}px`);
            textareaRef.current.style.setProperty('height', '24px');
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                if (textareaRef.current) {
                    const element = textareaRef.current as HTMLTextAreaElement;
                    element.style.setProperty('height', '24px');
                    const container = document.getElementById('chat-container');
                    container?.style.setProperty('height', `${window.innerHeight - 56 - 44}px`);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="fixed bottom-0 left-0 right-0 flex w-full flex-row gap-5 bg-layout-light py-2.5 pl-2.5 pr-5 dark:bg-layout-dark"
            >
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onFocus={(e) => {
                        const container = document.getElementById('chat-container');
                        container?.style.setProperty('height', `${window.innerHeight - 56 - 72}px`);
                        e.currentTarget.style.height = '72px';
                        setBottom(72 + 26);
                    }}
                    maxLength={140}
                    className="h-6 flex-1 resize-none bg-transparent text-16-M-24 text-primary-900 outline-none ring-0 transition-all scrollbar-hide placeholder:text-primary-900/50 dark:text-primary-100 dark:placeholder:text-primary-100/30"
                />
                <div className="flex shrink-0 items-center gap-x-5">
                    <IconButton
                        variant="text"
                        size="small"
                        icon={<FaceSmileIcon />}
                        onClick={() => setIsOpen((prev) => !prev)}
                    />
                    {!message ? (
                        <IconButton
                            aria-label="copy chat id"
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
                            disabled={!message}
                            variant="text"
                            size="small"
                            icon={<PaperAirplaneIcon />}
                            onClick={handleSubmit}
                        />
                    )}
                </div>
            </div>
            {isOpen && (
                <div style={{ bottom }} className="fixed bottom-0 right-0">
                    <Picker
                        data={emojiData}
                        locale="ko"
                        previewPosition="none"
                        theme={getStorageItem(SESSION_STORAGE_KEYS.MODE) === 'light' ? 'light' : 'dark'}
                        onEmojiSelect={(data: EmojiDataType) => setMessage((prev) => prev + data.native)}
                    />
                </div>
            )}
        </>
    );
}
