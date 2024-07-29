import { io } from 'socket.io-client';

// ref : https://socket.io/how-to/use-with-react
const URL = 'http://localhost:3010';

export const socket = io(URL);
