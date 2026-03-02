import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_JWT_TOKEN || 'demo-token'}`,
  },
});
