// API Configuration and Helper Functions
const API_URL = 'http://localhost:5001/api';

// API Helper Class
class API {
  static async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...options
    };

    if (options.body && config.method !== 'GET') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = 'index.html';
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  static async login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { username, password }
    });
  }

  static async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData
    });
  }

  static async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Books
  static async getBooks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/books${query ? '?' + query : ''}`);
  }

  static async getBook(id) {
    return this.request(`/books/${id}`);
  }

  static async createBook(bookData) {
    return this.request('/books', {
      method: 'POST',
      body: bookData
    });
  }

  static async updateBook(id, bookData) {
    return this.request(`/books/${id}`, {
      method: 'PUT',
      body: bookData
    });
  }

  static async deleteBook(id) {
    return this.request(`/books/${id}`, {
      method: 'DELETE'
    });
  }

  static async searchBooks(query) {
    return this.request(`/books/search?q=${encodeURIComponent(query)}`);
  }

  // Students
  static async getStudents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/students${query ? '?' + query : ''}`);
  }

  static async getStudent(id) {
    return this.request(`/students/${id}`);
  }

  static async createStudent(studentData) {
    return this.request('/students', {
      method: 'POST',
      body: studentData
    });
  }

  static async updateStudent(id, studentData) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: studentData
    });
  }

  static async deleteStudent(id) {
    return this.request(`/students/${id}`, {
      method: 'DELETE'
    });
  }

  static async searchStudents(query) {
    return this.request(`/students/search?q=${encodeURIComponent(query)}`);
  }

  // Transactions
  static async getTransactions(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/transactions${query ? '?' + query : ''}`);
  }

  static async issueBook(transactionData) {
    return this.request('/transactions/issue', {
      method: 'POST',
      body: transactionData
    });
  }

  static async returnBook(id, returnData = {}) {
    return this.request(`/transactions/${id}/return`, {
      method: 'PUT',
      body: returnData
    });
  }

  static async getOverdueBooks() {
    return this.request('/transactions/overdue');
  }

  // Admins
  static async getAdmins() {
    return this.request('/admins');
  }

  static async createAdmin(adminData) {
    return this.request('/admins', {
      method: 'POST',
      body: adminData
    });
  }

  static async updateAdmin(id, adminData) {
    return this.request(`/admins/${id}`, {
      method: 'PUT',
      body: adminData
    });
  }

  static async deleteAdmin(id) {
    return this.request(`/admins/${id}`, {
      method: 'DELETE'
    });
  }
}

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('token');
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!token && currentPage !== 'index.html' && currentPage !== '') {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Get current user info
function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Show toast notification
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
  return container;
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});
