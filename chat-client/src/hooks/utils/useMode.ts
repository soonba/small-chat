import { useCallback, useLayoutEffect, useState } from 'react';

import dayjs from 'dayjs';

import { getStorageItem, SESSION_STORAGE_KEYS, setStorageItem } from '@utils/storage';

const useMode = () => {
  const [mode, setMode] = useState('light');
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'spring');

  useLayoutEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute('data-theme') || getStorageItem(SESSION_STORAGE_KEYS.THEME);
    if (currentTheme) {
      setTheme(currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
      setStorageItem(SESSION_STORAGE_KEYS.THEME, currentTheme);
    } else {
      let season = 'winter';
      const currentMonth = dayjs().get('M');
      if (currentMonth > 2 && currentMonth < 6) {
        season = 'spring';
      }
      // TODO: Summer & Fall Theme
      // else if (currentMonth > 5 && currentMonth < 9) {
      //   season = 'summer';
      // } else if (currentMonth > 8 && currentMonth < 12) {
      //   season = 'fall';
      // }
      setStorageItem(SESSION_STORAGE_KEYS.THEME, season);
      document.documentElement.setAttribute('data-theme', season);
    }

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

  const handleMode = useCallback(() => {
    if (mode === 'light') {
      document.documentElement.classList.add('dark');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'dark');
      setMode('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setStorageItem(SESSION_STORAGE_KEYS.MODE, 'light');
      setMode('light');
    }
  }, [mode]);

  const handleTheme = useCallback(() => {
    let newTheme = 'spring';
    if (theme === 'spring') {
      newTheme = 'winter';
    }
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setStorageItem(SESSION_STORAGE_KEYS.THEME, newTheme);
    window.location.reload();
  }, [theme]);

  return {
    mode,
    theme,
    onModeChange: handleMode,
    onThemeChange: handleTheme,
  };
};

export default useMode;
