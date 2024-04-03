import { LOCAL_STORAGE_KEYS } from '../common/constant';

export const setTokens = (at: string, rt: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, at);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, rt);
};

export const clearToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};
