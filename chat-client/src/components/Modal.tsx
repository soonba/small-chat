import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { XMarkIcon } from '@heroicons/react/20/solid';

interface Props {
    children: ReactNode;
    isOpen: boolean;
    title: string;
    onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: Props) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.removeProperty('overflow');
        }
    }, [isOpen]);

    return isOpen ? (
        createPortal(
            <div
                role="presentation"
                className="fixed bottom-0 left-0 right-0 top-0 z-[10000] bg-black/60 dark:bg-transparent"
            >
                <div className="flex min-h-full w-full items-center justify-center">
                    <div className="relative min-h-52 min-w-96 rounded-md bg-background-light px-8 py-10 shadow-lg dark:bg-background-dark">
                        <button
                            type="button"
                            aria-label="close modal"
                            title="창 닫기"
                            onClick={onClose}
                            className="absolute right-5 top-5"
                        >
                            <XMarkIcon className="h-8 w-8 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        </button>
                        <h2 className="mb-10 text-xl font-bold text-primary-900 dark:text-primary-100">{title}</h2>
                        {children}
                    </div>
                </div>
            </div>,
            document.getElementById('root') as HTMLElement
        )
    ) : (
        <></>
    );
}
