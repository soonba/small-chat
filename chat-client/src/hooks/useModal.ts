import { useState } from 'react';

interface Props {
    onConfirm?: (data?: unknown) => void;
    onSubmit?: (data?: unknown) => void;
    onCancel?: () => void;
    onClose?: () => void;
}

const useModal = ({ onConfirm, onCancel, onSubmit, onClose }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<unknown>();

    const handleOpen = (data?: unknown) => {
        setIsOpen(true);
        setModalData(data);
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const handleConfirm = (data: unknown) => {
        if (onConfirm) {
            onConfirm(data);
        }
    };

    const handleSubmit = (data: unknown) => {
        if (onSubmit) {
            onSubmit(data);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return {
        isOpen,
        modalData,
        onOpen: handleOpen,
        onClose: handleClose,
        onConfirm: handleConfirm,
        onSubmit: handleSubmit,
        onCancel: handleCancel
    };
};

export default useModal;
