import { FormEvent, useCallback, useMemo, useState } from 'react';

import useModal from '@hooks/utils/useModal';

import Button from '../Button';
import TextField from '../TextField';
import Modal from './Modal';

export type JoinChatModalDataType = {
  code: string;
};

type ModalType = ReturnType<typeof useModal<JoinChatModalDataType>>;

export default function JoinChatModal({ isOpen, onClose, onConfirm }: ModalType) {
  const [code, setCode] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm({ code });
    },
    [onConfirm, code],
  );

  const isDisabled = useMemo(() => !code || code.length < 3, [code]);

  return (
    <Modal isOpen={isOpen} title="채팅 참여하기" onClose={onClose}>
      <form className="space-y-4 sm:space-y-8" onSubmit={handleSubmit}>
        <TextField
          helperText="공유받은 채팅방 코드를 입력하세요."
          labelText="Chat Invitation Code"
          maxLength={36}
          minLength={36}
          value={code}
          autoFocus
          onChange={setCode}
          placeholder="채팅방 코드를 입력하세요."
        />
        <Button disabled={isDisabled} size="medium" text="참여하기" type="submit" variant="contained" />
      </form>
    </Modal>
  );
}
