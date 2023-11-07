import { useEffect, useState } from 'react';
import { socket } from '../utils/websocket.js';
import { useWebSocket } from './useWebSocket.js';

export const useRecentWeighings = () => {
  useWebSocket();
  const [weighings, setWeighings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const listRecentWeighings = (data) => {
    setWeighings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    socket.on('listRecentWeighings', listRecentWeighings);

    socket.emit('getRecentWeighings');

    return () => {
      socket.off('listRecentWeighings', listRecentWeighings);
    };
  }, []);

  return {
    isLoading,
    weighings,
  };
};
