import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import { ClipboardIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

import IconButton from '@components/IconButton';
import { useToast } from '@components/Toast';

import { getStorageItem, SESSION_STORAGE_KEYS } from '@utils/storage';

interface Props {
  onSubmit: (newMessage: string) => void;
}

export default function MessageTextarea({ onSubmit }: Props) {
  const { id } = useParams();
  const chatId = id || '';
  const { onToast } = useToast();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');

  const handleCopy = useCallback(() => {
    if (chatId) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(chatId);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = chatId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      onToast('채팅방 코드가 복사되었습니다.', { canDismiss: true, delay: 3000 });
    } else {
      onToast('문제가 발생하였습니다. 잠시 후에 다시 시도해 주세요.', { canDismiss: true, delay: 5000 });
    }
  }, [chatId, onToast]);

  const handleSubmit = useCallback(() => {
    onSubmit(message.trim());
    setMessage('');
  }, [onSubmit, message]);

  // ref : https://minjung-jeon.github.io/IME-keyCode-229-issue/
  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Enter') {
        setMessage((prev) => `${prev}\n`.trim());
      } else if (!e.isComposing && e.key === 'Enter') {
        e.preventDefault();
        if (message.trim().length > 0) {
          handleSubmit();
        } else {
          onToast('메시지를 입력해 주세요!', { canDismiss: true, delay: 5000 });
        }
      }
    },
    [message, handleSubmit, onToast],
  );

  const handleSelect = useCallback((data: EmojiClickData) => {
    setIsOpen(false);
    setMessage((prev) => prev + data.emoji);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && !containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-0 w-full divide-y divide-primary-900 border-t border-t-primary-900 bg-white dark:divide-primary-100 dark:border-t-primary-100 dark:bg-black"
    >
      <div className="flex w-full items-center gap-5 py-2.5 pl-2.5 pr-5">
        <textarea
          ref={textareaRef}
          className="h-6 flex-1 resize-none bg-transparent text-18-R-28 text-primary-900 outline-none ring-0 transition-all scrollbar-hide placeholder:text-primary-900/50 dark:text-primary-100 dark:placeholder:text-primary-100/30"
          maxLength={140}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => handleEnter(e.nativeEvent)}
        />
        <div className="flex shrink-0 items-center gap-x-5 [&_svg]:text-primary-900 dark:[&_svg]:text-primary-100">
          <IconButton
            aria-label="open emoji picker"
            size="medium"
            title="이모티콘 보기"
            variant="text"
            icon={<FaceSmileIcon />}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {!message ? (
            <IconButton
              aria-label="copy chat id"
              size="medium"
              title="코드 공유하기"
              variant="text"
              icon={<ClipboardIcon />}
              onClick={handleCopy}
            />
          ) : (
            <IconButton
              aria-label="send message"
              disabled={!message || message.trim().length === 0}
              size="medium"
              title="메시지 보내기"
              variant="text"
              icon={<PaperAirplaneIcon />}
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
      <EmojiPicker
        searchDisabled
        height={300}
        style={{ borderRadius: 0, border: 'none' }}
        theme={getStorageItem(SESSION_STORAGE_KEYS.MODE)}
        width="100%"
        lazyLoadEmojis
        onEmojiClick={handleSelect}
        open={isOpen}
      />
    </div>
  );
}
