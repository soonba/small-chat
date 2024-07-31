export enum LOCAL_STORAGE_KEYS {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    MODE = 'mode'
}

export const getStorageItem = (key: string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : '';
};

export const setStorageItem = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const clearStorageItem = () => {
    localStorage.clear();
};

export const getTokens = (): { accessToken: string; refreshToken: string } => {
    const accessToken = getStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || '';
    const refreshToken = getStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) || '';

    return { accessToken, refreshToken };
};

export const setTokens = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    setStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    setStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};
