import { useLayoutEffect, useState } from 'react';

import { getStorageItem, SESSION_STORAGE_KEYS, setStorageItem } from '@utils/storage';

const useMode = () => {
  const [mode, setMode] = useState('dark');

  useLayoutEffect(() => {
    if (
      getStorageItem(SESSION_STORAGE_KEYS.MODE) === 'dark' ||
      (!getStorageItem(SESSION_STORAGE_KEYS.MODE) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setMode('dark');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      setMode('light');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'light');
    }
  }, []);

  const handleMode = () => {
    if (mode === 'light') {
      document.documentElement.classList.add('dark');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'dark');
      setMode('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'light');
      setMode('light');
    }
  };

  return { mode, onModeChange: handleMode };
};

export default useMode;
