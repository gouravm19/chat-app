import { io } from 'socket.io-client';
import { fromEventPattern } from 'rxjs';
import { API_URL } from './http';

export const socket = io(API_URL, { autoConnect: false });

export const socketEvent$ = <T>(event: string) =>
  fromEventPattern<T>(
    (handler) => socket.on(event, handler),
    (handler) => socket.off(event, handler)
  );
