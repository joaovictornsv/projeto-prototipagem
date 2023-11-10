import { useEffect, useState } from 'react';
import { socket } from '../utils/websocket.js';
import { useWebSocket } from './useWebSocket.js';

export const useWeighingData = (weighingId) => {
  useWebSocket();
  const [weighing, setWeighing] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const listWeighingDetails = (data) => {
    setWeighing(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    socket.on('listWeighingDetails', listWeighingDetails);

    socket.emit('getWeighingDetails', { weighingId });

    return () => {
      socket.off('listWeighingDetails', listWeighingDetails);
    };
  }, []);

  return {
    isLoading,
    weighing,
  };
};
