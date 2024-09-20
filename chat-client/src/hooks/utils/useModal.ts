import { useState } from 'react';

interface Props {
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: (data?: unknown) => void;
  onSubmit?: (data?: unknown) => void;
}

const useModal = ({ onCancel, onClose, onConfirm, onSubmit }: Props) => {
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
    onCancel: handleCancel,
    onClose: handleClose,
    onConfirm: handleConfirm,
    onOpen: handleOpen,
    onSubmit: handleSubmit,
  };
};

export default useModal;
