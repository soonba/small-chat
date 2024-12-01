import { FormEvent, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button/Button';
import TextField from '../Input/TextField';
import Modal from './Modal';

export type CreateChatModalType = {
  name: string;
};

type ModalType = ReturnType<typeof useModal<CreateChatModalType>>;

export default function CreateChatModal({ isOpen, onClose, onConfirm }: ModalType) {
  const [chatName, setChatName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({ name: chatName });
  };

  return (
    <Modal isOpen={isOpen} title="채팅 생성하기" onClose={onClose}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          helperText="최소 3자, 최대 20자까지 입력할 수 있습니다."
          labelText="Chat Name"
          maxLength={20}
          minLength={3}
          placeholder="방 제목을 입력해 주세요."
          value={chatName}
          onChange={setChatName}
        />
        <Button
          disabled={!chatName || chatName.length < 3}
          size="medium"
          text="생성하기"
          type="submit"
          variant="contained"
        />
      </form>
    </Modal>
  );
}
