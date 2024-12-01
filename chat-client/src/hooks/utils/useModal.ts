import { useCallback, useState } from 'react';

interface Props<T> {
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: (data?: T) => void;
  onSubmit?: (data?: T) => void;
}

const useModal = <T>({ onCancel, onClose, onConfirm, onSubmit }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<T>();

  const handleOpen = useCallback((data: T) => {
    setIsOpen(true);
    setModalData(data);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleConfirm = useCallback(
    (data: T) => {
      setIsOpen(false);
      if (onConfirm) {
        onConfirm(data);
      }
    },
    [onConfirm],
  );

  const handleSubmit = useCallback(
    (data: T) => {
      if (onSubmit) {
        onSubmit(data);
      }
    },
    [onSubmit],
  );

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

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
