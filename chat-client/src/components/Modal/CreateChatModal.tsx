import { FormEvent, useState } from 'react';

import useModal from 'hooks/useModal';

import Modal from './Modal';
import Button from '../Button/Button';
import TextField from '../Input/TextField';

type ModalType = ReturnType<typeof useModal>;

export default function CreateChatModal({ isOpen, onSubmit, onClose }: ModalType) {
    const [chatName, setChatName] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        onSubmit(chatName);
    };

    return (
        <Modal isOpen={isOpen} title="채팅 생성하기" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <TextField
                    autoFocus
                    labelText="Chat Name"
                    placeholder="방 제목을 입력해 주세요."
                    helperText="최소 3자, 최대 20자까지 입력할 수 있습니다."
                    minLength={3}
                    maxLength={20}
                    value={chatName}
                    onChange={setChatName}
                />
                <Button
                    text="생성하기"
                    disabled={!chatName || chatName.length < 3}
                    type="submit"
                    variant="contained"
                    size="medium"
                />
            </form>
        </Modal>
    );
}
