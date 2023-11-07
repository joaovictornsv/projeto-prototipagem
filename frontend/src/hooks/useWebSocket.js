import { useEffect } from 'react';
import { socket } from '../utils/websocket.js';

export const useWebSocket = () => {
  const onConnect = () => {
    console.log('Socket connected!');
  };

  const onDisconnect = () => {
    console.log('Socket disconnected!');
  };

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
};
