import { FormEvent, useCallback, useMemo, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button';
import TextField from '../TextField';
import Modal from './Modal';

export type CreateChatModalType = {
  name: string;
};

type ModalType = ReturnType<typeof useModal<CreateChatModalType>>;

export default function CreateChatModal({ isOpen, onClose, onConfirm }: ModalType) {
  const [chatName, setChatName] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm({ name: chatName });
    },
    [onConfirm, chatName],
  );

  const isDisabled = useMemo(() => !chatName || chatName.length < 3, [chatName]);

  return (
    <Modal isOpen={isOpen} title="채팅 생성하기" onClose={onClose}>
      <form className="space-y-4 sm:space-y-8" onSubmit={handleSubmit}>
        <TextField
          helperText="최소 3자, 최대 20자까지 입력할 수 있습니다."
          labelText="Chat Name"
          maxLength={20}
          minLength={3}
          value={chatName}
          autoFocus
          onChange={setChatName}
          placeholder="방 제목을 입력하세요."
        />
        <Button disabled={isDisabled} size="medium" text="생성하기" type="submit" variant="contained" />
      </form>
    </Modal>
  );
}
