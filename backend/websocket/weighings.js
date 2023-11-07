import { io } from '../main.js';
import { getRecentWeighings } from '../collections/weighingCollection.js';

io.on('connect', (socket) => {
  socket.on('getRecentWeighings', async () => {
    console.log('Received event getRecentWeighings');
    const weighings = await getRecentWeighings();

    socket.emit('listRecentWeighings', weighings);
  });

  socket.on('newWeighing', async () => {
    console.log('Received event newWeighing');
    const weighings = await getRecentWeighings();

    io.emit('listRecentWeighings', weighings);
  });
});
