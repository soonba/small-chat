export enum SESSION_STORAGE_KEYS {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    MODE = 'mode'
}

export const getStorageItem = (key: string) => {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key) || '') : '';
};

export const setStorageItem = (key: string, value: unknown) => {
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
