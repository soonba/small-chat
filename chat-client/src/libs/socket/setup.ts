import appConfig from 'config';
import { io } from 'socket.io-client';

// ref : https://socket.io/how-to/use-with-react
const URL = appConfig.socketApiUrl;

export const socket = io(`${URL}`, {
  autoConnect: false,
});
