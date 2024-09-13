import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { v4 as uuid } from 'uuid';

import Toast from './Toast';

export type OptionsType = {
  canDismiss?: boolean;
  delay?: number;
};

interface ToastContextType {
  onToast: (message: string, options?: OptionsType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('should use Toast within Toast Provider');
  }

  return context;
};

export function getPositionStyle(position?: string) {
  switch (position) {
    case 'top-right':
      return 'top-20 right-20';
    case 'top-left':
      return 'top-20 left-20';
    case 'top-center':
      return 'top-20 left-1/2 -translate-x-1/2';
    case 'bottom-left':
      return 'bottom-20 left-20';
    case 'bottom-center':
      return 'bottom-20 left-1/2 -translate-x-1/2';
    default:
      return 'bottom-20 right-20';
  }
}

type MessageType = {
  content: string;
  id: string;
  options?: OptionsType;
};

interface Props {
  children: ReactNode;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
}

export function ToastProvider({ children, position }: Props) {
  const [modalElement, setModalElement] = useState<HTMLElement>();
  const [messages, setMessages] = useState<MessageType[]>([]);

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
            <div className={`${getPositionStyle(position)} absolute z-1000 flex flex-col gap-2.5`}>
              {messages.map((message) => (
                <Toast
                  key={message.id}
                  message={message.content}
                  options={message.options}
                  onClose={() => handleClose(message.id)}
                />
              ))}
            </div>,
            modalElement as HTMLElement,
          )
        : null}
    </ToastContext.Provider>
  );
}
