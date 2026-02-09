// API configuration for development and production
// Hardcoded backend URL for production (temporary fix)
const PRODUCTION_API_URL = 'https://skillbridge-api-4ueu.onrender.com';

let API_BASE_URL = import.meta.env.VITE_API_URL || '';

// If in production and no env var, use hardcoded URL
if (import.meta.env.PROD && !API_BASE_URL) {
    API_BASE_URL = PRODUCTION_API_URL;
}

// Clean the URL - remove any whitespace or trailing slashes
if (API_BASE_URL) {
    API_BASE_URL = API_BASE_URL.trim().replace(/\/+$/, '');
}

// Log the API URL
console.log('🔧 API Configuration:');
console.log('  Environment:', import.meta.env.MODE);
console.log('  VITE_API_URL:', import.meta.env.VITE_API_URL || '(not set)');
console.log('  Final API_BASE_URL:', API_BASE_URL || '(using proxy)');

export const getApiUrl = (path) => {
    // If no base URL, return the path as-is (for proxy)
    if (!API_BASE_URL) {
        return path;
    }

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${API_BASE_URL}${cleanPath}`;

    console.log(`📡 API Call: ${path} → ${url}`);

    return url;
};

export default API_BASE_URL;
