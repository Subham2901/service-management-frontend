import axios from 'axios';

const externalAxiosInstance = axios.create({
  baseURL: 'https://agiledev-contractandprovidermana-production.up.railway.app', // External API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

externalAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('External API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default externalAxiosInstance;
