import { FormEvent, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button/Button';
import TextField from '../Input/TextField';
import Modal from './Modal';

type ModalType = ReturnType<typeof useModal>;

export default function JoinChatModal({ isOpen, onClose, onSubmit }: ModalType) {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    onSubmit(code);
  };

  return (
    <Modal isOpen={isOpen} title="채팅 참여하기" onClose={onClose}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          helperText="공유받은 채팅방 코드를 입력해 주세요."
          labelText="Chat Invitation Code"
          maxLength={36}
          minLength={36}
          placeholder="채팅방 코드를 입력해 주세요."
          value={code}
          onChange={setCode}
        />
        <Button disabled={!code || code.length < 3} size="medium" text="참여하기" type="submit" variant="contained" />
      </form>
    </Modal>
  );
}
