import { FormEvent, useState } from 'react';

import useModal from 'hooks/useModal';

import Button from './Button';
import Modal from './Modal';
import TextField from './TextField';

type ModalType = ReturnType<typeof useModal>;

export default function CreateChatModal({ isOpen, onSubmit, onClose }: ModalType) {
    const [roomName, setRoomName] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        onSubmit(roomName);
    };

    return (
        <Modal isOpen={isOpen} title="채팅 생성하기" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <TextField
                    autoFocus
                    labelText="Room Name"
                    placeholder="방 제목을 입력해 주세요."
                    helperText="최소 3자, 최대 20자까지 입력할 수 있습니다."
                    minLength={3}
                    maxLength={20}
                    value={roomName}
                    onChange={setRoomName}
                />
                <Button
                    text="생성하기"
                    disabled={!roomName || roomName.length < 3}
                    type="submit"
                    variant="contained"
                    size="medium"
                />
            </form>
        </Modal>
    );
}
