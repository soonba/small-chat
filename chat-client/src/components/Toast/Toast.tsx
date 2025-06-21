import { useEffect, useMemo } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';

import IconButton from '../IconButton';

import type { OptionsType } from './ToastContext';

interface Props {
  message: string;
  onClose: () => void;
  options?: OptionsType;
}

export default function Toast({ message, onClose, options }: Props) {
  const { canDismiss, delay } = useMemo(
    () => ({
      delay: options?.delay || 5000,
      canDismiss: options?.canDismiss,
    }),
    [options],
  );

  const animationTime = useMemo(() => {
    let total = 4.5;
    if (delay) {
      total = delay / 1000 - 0.5;
    }
    return total;
  }, [delay]);

  useEffect(() => {
    const timerId = setTimeout(onClose, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [onClose, delay]);

  return (
    <div
      className="flex min-h-12 w-max animate-fade-in-out items-center justify-between rounded-xl px-3 py-2 spring:bg-pink-900 winter:bg-blue-900 dark:spring:bg-pink-100 dark:winter:bg-blue-100"
      style={{ animationDelay: delay ? `${animationTime}s` : '4.5s' }}
      role="alert"
    >
      <p className="whitespace-pre-wrap break-all pr-2.5 text-12-R-16 text-inherit text-white sm:text-16-M-24 dark:spring:text-pink-950 dark:winter:text-blue-900">
        {message}
      </p>
      {(canDismiss === undefined || canDismiss === true) && (
        <div className="flex items-center spring:[&_svg]:text-pink-50 winter:[&_svg]:text-blue-100 dark:spring:[&_svg]:text-pink-950 dark:winter:[&_svg]:text-blue-900">
          <div className="mx-2.5 h-4 w-px bg-white dark:spring:bg-pink-900 dark:winter:bg-blue-900" />
          <IconButton
            aria-label="dismiss toast"
            size="small"
            title="토스트 닫기"
            variant="text"
            icon={<XMarkIcon />}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
}
