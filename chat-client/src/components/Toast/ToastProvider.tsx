import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { v4 as uuid } from 'uuid';

import { getToastPosition, ToastPositionType } from './styles';
import Toast from './Toast';
import { OptionsType, ToastContext, ToastContextType } from './ToastContext';

type ToastMessageType = {
  id: string;
  content: string;
  options?: OptionsType;
};

interface Props {
  children: ReactNode;
  position?: ToastPositionType;
}

export default function ToastProvider({ children, position }: Props) {
  const [modalElement, setModalElement] = useState<HTMLElement>();
  const [messages, setMessages] = useState<ToastMessageType[]>([]);

  const handleOpen = useCallback(
    (content: string, options?: OptionsType) => {
      const newMessage = { content, id: uuid(), options };
      if (position?.includes('top')) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        setMessages((prev) => [newMessage, ...prev]);
      }
    },
    [position],
  );

  const handleClose = useCallback(
    (id: string) => setMessages((prev) => prev.filter((message) => message.id !== id)),
    [],
  );

  const context: ToastContextType = useMemo(() => ({ onToast: handleOpen }), [handleOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      setModalElement(document.getElementById('portal') as HTMLElement);
    } else {
      setModalElement(undefined);
    }
  }, [messages]);

  return (
    <ToastContext.Provider value={context}>
      {children}
      {modalElement
        ? createPortal(
            <div className={`${getToastPosition(position)} absolute z-1000 flex flex-col gap-2.5`}>
              {messages.map((message) => (
                <Toast
                  key={message.id}
                  message={message.content}
                  onClose={() => handleClose(message.id)}
                  options={message.options}
                />
              ))}
            </div>,
            modalElement as HTMLElement,
          )
        : null}
    </ToastContext.Provider>
  );
}
