import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws',
});

export const getLicensePlateInfo = async () => {
  const response = await api.get(`/license-plate-info`);
  return response.data;
};

export const verifyInvoiceNumber = async () => {
  const response = await api.get('/invoice-info');
  return response.data;
};

export const createWeighing = async (data) => {
  const response = await api.post('/create/weighing', data);
  return response.data;
};
