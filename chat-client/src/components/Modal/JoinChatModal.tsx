import { FormEvent, useState } from 'react';

import useModal from 'hooks/utils/useModal';

import Modal from './Modal';
import Button from '../Button/Button';
import TextField from '../Input/TextField';

type ModalType = ReturnType<typeof useModal>;

export default function JoinChatModal({ isOpen, onSubmit, onClose }: ModalType) {
    const [code, setCode] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        onSubmit(code);
    };

    return (
        <Modal isOpen={isOpen} title="채팅 참여하기" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <TextField
                    autoFocus
                    labelText="Chat Invitation Code"
                    placeholder="채팅방 코드를 입력해 주세요."
                    helperText="공유받은 채팅방 코드를 입력해 주세요."
                    minLength={36}
                    maxLength={36}
                    value={code}
                    onChange={setCode}
                />
                <Button
                    text="참여하기"
                    disabled={!code || code.length < 3}
                    type="submit"
                    variant="contained"
                    size="medium"
                />
            </form>
        </Modal>
    );
}
