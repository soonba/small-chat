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

export default function ChatTextarea({ onSubmit }: Props) {
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
      onToast('초대 코드가 복사되었습니다.', { canDismiss: true, delay: 3000 });
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
    function handleOutsideClick(event: MouseEvent) {
      if (isOpen && !containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-0 w-full divide-y border-t spring:divide-pink-900 spring:border-t-pink-900 spring:bg-white winter:divide-blue-900 winter:border-t-blue-900 winter:bg-white dark:spring:divide-pink-100 dark:spring:border-t-pink-100 dark:spring:bg-transparent dark:winter:divide-blue-100 dark:winter:border-t-blue-100 dark:winter:bg-black"
    >
      <div className="flex w-full items-center gap-5 py-2.5 pl-2.5 pr-5">
        <textarea
          ref={textareaRef}
          className="h-6 flex-1 resize-none bg-transparent text-18-R-28 backdrop-filter transition-all scrollbar-hide spring:text-pink-950 spring:placeholder:text-pink-950/50 winter:text-blue-900 winter:placeholder:text-blue-900/50 dark:spring:text-pink-950 dark:spring:placeholder:text-pink-50/80 dark:winter:text-blue-100 dark:winter:placeholder:text-blue-100/30"
          maxLength={140}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => handleEnter(e.nativeEvent)}
        />
        <div className="flex shrink-0 items-center gap-x-5 spring:[&_svg]:text-pink-950 winter:[&_svg]:text-blue-900 dark:spring:[&_svg]:text-pink-950 dark:winter:[&_svg]:text-blue-100">
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
              title="초대 코드 공유하기"
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
