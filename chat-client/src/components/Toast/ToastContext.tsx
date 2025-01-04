import { createContext } from 'react';

export type OptionsType = {
  canDismiss?: boolean;
  delay?: number;
};

export interface ToastContextType {
  onToast: (message: string, options?: OptionsType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
