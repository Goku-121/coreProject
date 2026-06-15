import axios from 'axios';

// In production (Vercel), VITE_API_URL points to Render backend
// In dev, vite proxy handles /api/* → localhost:5020
if (import.meta.env.VITE_API_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

export default axios;
