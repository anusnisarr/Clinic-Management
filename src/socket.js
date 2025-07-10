import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000', {
  transports: ['websocket'], // helps avoid long polling issues
});