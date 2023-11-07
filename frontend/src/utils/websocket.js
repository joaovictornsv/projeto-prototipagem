import { io } from 'socket.io-client';

const URL = 'https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws';
export const socket = io(URL);
