// API configuration for development and production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Log the API URL in development
if (import.meta.env.DEV) {
    console.log('API Base URL:', API_BASE_URL || 'Using proxy (relative URLs)');
}

export const getApiUrl = (path) => {
    // Remove leading slash from path if API_BASE_URL is set
    const cleanPath = API_BASE_URL && path.startsWith('/') ? path : path;
    const url = `${API_BASE_URL}${cleanPath}`;

    // Log in development
    if (import.meta.env.DEV) {
        console.log('API URL:', url);
    }

    return url;
};

export default API_BASE_URL;
