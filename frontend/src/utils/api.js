import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getLicensePlateInfo = async () => {
  const response = await api.get(`/license-plate-info`);
  return response.data;
};

export const verifyInvoiceNumber = async () => {
  const response = await api.get('/invoice-info');
  return response.data;
};

export const getRecentWeighings = async () => {
  const response = await api.get('weighings');
  return response.data;
};

export const createWeighing = async (data) => {
  const response = await api.post('/create/weighing', data);
  return response.data;
};
