import React, { useEffect } from 'react';
import { getApiUrl } from '../config/api';

const ApiTest = () => {
    useEffect(() => {
        console.log('=== API Configuration Test ===');
        console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
        console.log('getApiUrl("/api/students"):', getApiUrl("/api/students"));

        // Test fetch
        const testUrl = getApiUrl("/api/students");
        console.log('Testing fetch to:', testUrl);
        console.log('URL type:', typeof testUrl);
        console.log('URL length:', testUrl.length);
        console.log('URL charCodes:', [...testUrl].map(c => c.charCodeAt(0)).join(','));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>API Configuration Test</h1>
            <p>Check the console (F12) for details</p>
            <div>
                <strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || '(not set)'}
            </div>
            <div>
                <strong>Test URL:</strong> {getApiUrl("/api/students")}
            </div>
        </div>
    );
};

export default ApiTest;
