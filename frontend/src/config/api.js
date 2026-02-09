// API configuration for development and production
let API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Clean the URL - remove any whitespace or trailing slashes
if (API_BASE_URL) {
    API_BASE_URL = API_BASE_URL.trim().replace(/\/+$/, '');
}

// Log the API URL in development
if (import.meta.env.DEV) {
    console.log('API Base URL:', API_BASE_URL || 'Using proxy (relative URLs)');
}

export const getApiUrl = (path) => {
    // If no base URL, return the path as-is (for proxy)
    if (!API_BASE_URL) {
        return path;
    }

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${API_BASE_URL}${cleanPath}`;

    // Log in development
    if (import.meta.env.DEV) {
        console.log('API URL:', url);
    }

    return url;
};

export default API_BASE_URL;
