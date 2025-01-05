import { FormEvent, useCallback, useMemo, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button';
import TextField from '../TextField';
import Modal from './Modal';

export type LeaveChatModalDataType = {
  name: string;
};

type ModalType = ReturnType<typeof useModal<LeaveChatModalDataType>>;

export default function LeaveChatModal({ isOpen, modalData, onClose, onConfirm }: ModalType) {
  const [chatName, setChatName] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm({ name: chatName });
    },
    [onConfirm, chatName],
  );

  const isDisabled = useMemo(
    () => !chatName || chatName.length < 3 || modalData?.name !== chatName,
    [chatName, modalData?.name],
  );

  return (
    <Modal isOpen={isOpen} title="채팅방 삭제하기" onClose={onClose}>
      <form className="space-y-4 sm:space-y-8" onSubmit={handleSubmit}>
        <div>
          <p className="mb-1 text-12-SB-16 text-white sm:text-16-SB-24 dark:text-primary-100">
            삭제하려는 채팅방 제목을 입력하세요.
          </p>
          <TextField maxLength={20} minLength={3} value={chatName} autoFocus onChange={setChatName} />
        </div>
        <Button disabled={isDisabled} size="medium" text="삭제하기" type="submit" variant="contained" />
      </form>
    </Modal>
  );
}
