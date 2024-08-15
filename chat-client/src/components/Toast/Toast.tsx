import { useEffect, useMemo } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';

import IconButton from '../Button/IconButton';

import type { OptionsType } from './ToastProvider';

interface Props {
    message: string;
    onClose: () => void;
    options?: OptionsType;
}

export default function Toast({ message, options, onClose }: Props) {
    const animationTime = useMemo(() => {
        let total = 4.5;
        if (options?.delay) {
            total = options.delay / 1000 - 0.5;
        }
        return total;
    }, []);

    useEffect(() => {
        const timerId = setTimeout(onClose, options?.delay || 5000);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div
            role="alert"
            className="flex min-h-12 w-max animate-fadeInOut items-center justify-between whitespace-pre-wrap break-all rounded-xl border border-primary-900 bg-layout-light px-3 py-2 text-primary-900 dark:border-primary-100 dark:bg-layout-dark dark:text-primary-100"
            style={{ animationDelay: options?.delay ? `${animationTime}s` : '4.5s' }}
        >
            <p className="pr-2.5 text-16-M-24 text-inherit">{message}</p>
            {(options?.canDismiss === undefined || options?.canDismiss === true) && (
                <div className="flex items-center">
                    <div className="mx-2.5 h-4 w-px bg-primary-900 dark:bg-primary-100" />
                    <IconButton
                        aria-label="dismiss toast"
                        title="토스트 닫기"
                        size="small"
                        variant="text"
                        icon={<XMarkIcon />}
                        onClick={onClose}
                    />
                </div>
            )}
        </div>
    );
}
