const appConfig = {
  env: import.meta.env.MODE,
  authApiUrl: import.meta.env.VITE_API_URL,
  socketApiUrl: import.meta.env.VITE_SOCKET_API_URL,
};

export default appConfig;
