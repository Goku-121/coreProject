import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5020";

if (API_BASE) {
    axios.defaults.baseURL = API_BASE;
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['token'] = token;
    return config;
});

export default axios;