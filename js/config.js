// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5001/api',
    USE_BACKEND: true, // Set to false to use LocalStorage only
    TIMEOUT: 10000
};

// Check if backend is available
async function checkBackendAvailability() {
    if (!API_CONFIG.USE_BACKEND) {
        return false;
    }
    
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || 'test'}`
            }
        });
        return response.status !== 404; // Backend is available if not 404
    } catch (error) {
        console.log('Backend not available, using LocalStorage');
        return false;
    }
}

// Storage helper - automatically chooses between backend and localStorage
const Storage = {
    useBackend: false,
    
    async init() {
        this.useBackend = await checkBackendAvailability();
        console.log(`Using ${this.useBackend ? 'MongoDB (Backend)' : 'LocalStorage (Frontend-only)'}`);
        return this.useBackend;
    },
    
    // Generic API call
    async apiCall(endpoint, method = 'GET', data = null) {
        if (!this.useBackend) {
            throw new Error('Backend not available');
        }
        
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const options = {
            method,
            headers
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }
        
        return await response.json();
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await Storage.init();
});
