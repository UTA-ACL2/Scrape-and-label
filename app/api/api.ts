import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
    return config;
});

export default api;