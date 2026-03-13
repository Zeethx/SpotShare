import axios from 'axios';
import { auth } from '../firebase/firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
});

// Request interceptor — fetch a fresh Firebase token on every request.
// Token is never stored in localStorage; lives in memory via Firebase SDK.
api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401s globally
api.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
