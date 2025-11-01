import { io } from 'socket.io-client';
export const socket = io(import.meta.env.VITE_BASE_PATH, {
  transports: ['websocket'], // helps avoid long polling issues
});