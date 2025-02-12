import axios from 'axios';
import useAuthStore from './authStore';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

export default axiosInstance;