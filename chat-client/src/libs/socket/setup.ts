import { io } from 'socket.io-client';

import config from '@config/index';

// ref : https://socket.io/how-to/use-with-react
const URL = config.socketApiUrl;

export const socket = io(`${URL}`, {
  autoConnect: false,
});
