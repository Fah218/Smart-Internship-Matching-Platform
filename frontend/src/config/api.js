// API configuration for development and production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (path) => {
    // In production, use the environment variable
    // In development, use the proxy (empty string means relative URL)
    return `${API_BASE_URL}${path}`;
};

export default API_BASE_URL;
