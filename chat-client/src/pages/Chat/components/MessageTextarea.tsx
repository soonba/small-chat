import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { ClipboardIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

import { IconButton } from '@components/Button';
import { useToast } from '@components/Toast';

import { getStorageItem, SESSION_STORAGE_KEYS } from '@utils/storage';

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
  const { onToast } = useToast();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');

  const handleCopy = () => {
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
  };

  const handleSubmit = () => {
    onSubmit(message.trim());
    setMessage('');
  };

  // ref : https://minjung-jeon.github.io/IME-keyCode-229-issue/
  const handleEnter = (e: KeyboardEvent) => {
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
  };

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
      className="fixed inset-x-0 bottom-0 flex w-full flex-row gap-5 border-t-2 border-t-primary-100 bg-layout-light py-2.5 pl-2.5 pr-5 dark:border-t-primary-950 dark:bg-layout-dark"
    >
      <textarea
        ref={textareaRef}
        className="h-20 flex-1 resize-none bg-transparent text-16-R-24 text-primary-900 outline-none ring-0 transition-all scrollbar-hide placeholder:text-primary-900/50 dark:text-primary-100 dark:placeholder:text-primary-100/30"
        maxLength={140}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => handleEnter(e.nativeEvent)}
      />
      <div className="flex shrink-0 items-center gap-x-5">
        <IconButton
          aria-label="open emoji picker"
          icon={<FaceSmileIcon />}
          size="medium"
          title="이모티콘 보기"
          variant="text"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {!message ? (
          <IconButton
            aria-label="copy chat id"
            icon={<ClipboardIcon />}
            size="medium"
            title="코드 공유하기"
            variant="text"
            onClick={handleCopy}
          />
        ) : (
          <IconButton
            aria-label="send message"
            disabled={!message || message.trim().length === 0}
            icon={<PaperAirplaneIcon />}
            size="medium"
            title="메시지 보내기"
            variant="text"
            onClick={handleSubmit}
          />
        )}
      </div>
      {isOpen && (
        <div className="fixed bottom-28 right-0">
          <Picker
            data={emojiData}
            locale="ko"
            previewPosition="none"
            theme={getStorageItem(SESSION_STORAGE_KEYS.MODE) === 'light' ? 'light' : 'dark'}
            onEmojiSelect={(data: EmojiDataType) => setMessage((prev) => prev + data.native)}
          />
        </div>
      )}
    </div>
  );
}
