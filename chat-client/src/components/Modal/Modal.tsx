import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { XMarkIcon } from '@heroicons/react/20/solid';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose, title }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [isOpen]);

  return isOpen ? (
    createPortal(
      <div className="fixed inset-0 z-10000 bg-black/60 dark:bg-black/30" role="presentation">
        <div className="mx-auto flex min-h-full w-full max-w-[calc(100%-theme(spacing.10))] items-center justify-center sm:max-w-full">
          <div className="relative flex min-w-full flex-col rounded-md px-4 py-5 shadow-lg bg-linear-gradient sm:min-h-52 sm:min-w-96 sm:px-8 sm:py-10 dark:bg-linear-gradient-dark">
            <button
              aria-label="close modal"
              className="absolute right-4 top-4 sm:right-5 sm:top-5"
              title="창 닫기"
              type="button"
              onClick={onClose}
            >
              <XMarkIcon className="size-6 text-white hover:opacity-80 sm:size-8 dark:text-primary-100" />
            </button>
            <h2 className="mb-5 text-16-B-24 text-white sm:text-20-B-28 dark:text-primary-100">{title}</h2>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById('root') as HTMLElement,
    )
  ) : (
    <></>
  );
}
