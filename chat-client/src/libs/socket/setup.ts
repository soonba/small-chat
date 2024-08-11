import { io } from 'socket.io-client';

import appConfig from 'config';

// ref : https://socket.io/how-to/use-with-react
const URL = appConfig.socketApiUrl;

export const socket = io(`${URL}`, {
    autoConnect: false
});
