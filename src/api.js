import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://arlette-sepaloid-joey.ngrok-free.dev",
});

// Перехватчик: перед каждым запросом проверяем наличие токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;