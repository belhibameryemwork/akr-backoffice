const API_URL = 'http://localhost:5000/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const fetchOptions: RequestInit = {
        cache: 'no-store', // Prevent Next.js from caching API responses
        ...options,
        headers
    };

    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
    
    if (response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return null;
    }
    
    // If the response is 204 No Content, don't try to parse JSON
    if (response.status === 204) {
        return null;
    }
    
    return response.json();
}