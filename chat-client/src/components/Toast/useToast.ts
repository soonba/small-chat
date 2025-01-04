import { useContext } from 'react';

import { ToastContext } from './ToastContext';

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('should use Toast within Toast Provider');
  }

  return context;
};

export default useToast;
