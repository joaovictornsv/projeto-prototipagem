import { http } from './main.js';
import './websocket/weighings.js';

http.listen(3000, () => console.log('Server is running on port 3000'));
