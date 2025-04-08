type SessionStorageType = 'ACCESS_TOKEN' | 'MODE' | 'REFRESH_TOKEN' | 'THEME';

export const SESSION_STORAGE_KEYS: Record<string, SessionStorageType> = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  MODE: 'MODE',
  THEME: 'THEME',
};

export const getStorageItem = (key: SessionStorageType) => {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key) || '') : '';
};

export const setStorageItem = (key: SessionStorageType, value: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const clearStorageItem = () => {
  sessionStorage.clear();
};

export const getTokens = (): { accessToken: string; refreshToken: string } => {
  const accessToken = getStorageItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN) || '';
  const refreshToken = getStorageItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN) || '';

  return { accessToken, refreshToken };
};

export const setTokens = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  setStorageItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  setStorageItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearToken = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.REFRESH_TOKEN);
};
