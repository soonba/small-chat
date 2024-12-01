import { FormEvent, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button/Button';
import TextField from '../Input/TextField';
import Modal from './Modal';

export type LeaveChatModalDataType = {
  name: string;
};

type ModalType = ReturnType<typeof useModal<LeaveChatModalDataType>>;

export default function LeaveChatModal({ modalData, isOpen, onClose, onConfirm }: ModalType) {
  const [chatName, setChatName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({ name: chatName });
  };

  return (
    <Modal isOpen={isOpen} title="채팅방 삭제하기" onClose={onClose}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <p className="mb-1 text-16-SB-24 text-white dark:text-primary-100">삭제하려는 채팅방 제목을 입력해 주세요.</p>
          <TextField autoFocus maxLength={20} minLength={3} placeholder="" value={chatName} onChange={setChatName} />
        </div>
        <Button
          disabled={!chatName || chatName.length < 3 || modalData?.name !== chatName}
          size="medium"
          text="삭제하기"
          type="submit"
          variant="contained"
        />
      </form>
    </Modal>
  );
}
