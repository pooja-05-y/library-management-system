# 🚀 Backend Setup & Integration Guide

Complete guide to set up and integrate the backend API with your frontend.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Backend](#running-the-backend)
5. [Testing the API](#testing-the-api)
6. [Frontend Integration](#frontend-integration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   ```bash
   # Check version
   node --version
   
   # Install from https://nodejs.org/
   ```

2. **MongoDB** (Choose one option)

   **Option A: Local MongoDB**
   ```bash
   # macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   
   # Verify
   mongosh
   ```

   **Option B: MongoDB Atlas (Cloud - Recommended)**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create free account
   - Create cluster
   - Get connection string

3. **Git** (for version control)
   ```bash
   git --version
   ```

---

## 📦 Installation

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- express-validator (input validation)
- cors (CORS support)
- helmet (security headers)
- dotenv (environment variables)
- morgan (logging)
- express-rate-limit (rate limiting)

---

## ⚙️ Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env
```

### Step 2: Edit .env File

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/library_management

# MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS (Frontend URL)
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 3: Generate JWT Secret

```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

---

## 🏃 Running the Backend

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Expected Output

```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📝 Environment: development
```

---

## 🧪 Testing the API

### Option 1: Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "username": "admin",
    "email": "admin@example.com",
    "password": "123456",
    "role": "admin"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456"
  }'
```

### Option 2: Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API collection (see backend/README.md)
3. Test all endpoints

### Option 3: Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create new request
3. Test endpoints

---

## 🔗 Frontend Integration

### Step 1: Create API Service File

Create `js/api.js` in your frontend:

```javascript
// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API Helper Function
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
const authAPI = {
  login: (username, password) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
  
  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
  
  getMe: () => apiRequest('/auth/me')
};

// Books API
const booksAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/books?${query}`);
  },
  
  search: (q) => apiRequest(`/books/search?q=${encodeURIComponent(q)}`),
  
  getOne: (id) => apiRequest(`/books/${id}`),
  
  create: (bookData) =>
    apiRequest('/books', {
      method: 'POST',
      body: JSON.stringify(bookData)
    }),
  
  update: (id, bookData) =>
    apiRequest(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData)
    }),
  
  delete: (id) =>
    apiRequest(`/books/${id}`, {
      method: 'DELETE'
    })
};

// Students API
const studentsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/students?${query}`);
  },
  
  search: (q) => apiRequest(`/students/search?q=${encodeURIComponent(q)}`),
  
  create: (studentData) =>
    apiRequest('/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    }),
  
  update: (id, studentData) =>
    apiRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData)
    }),
  
  delete: (id) =>
    apiRequest(`/students/${id}`, {
      method: 'DELETE'
    })
};

// Transactions API
const transactionsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/transactions?${query}`);
  },
  
  issue: (bookId, studentId, dueDate) =>
    apiRequest('/transactions/issue', {
      method: 'POST',
      body: JSON.stringify({ bookId, studentId, dueDate })
    }),
  
  return: (id) =>
    apiRequest(`/transactions/${id}/return`, {
      method: 'PUT'
    }),
  
  getOverdue: () => apiRequest('/transactions/overdue')
};

// Export APIs
export { authAPI, booksAPI, studentsAPI, transactionsAPI };
```

### Step 2: Update Login Page (main.js)

```javascript
import { authAPI } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("error-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await authAPI.login(username, password);
      
      // Save token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      errorMsg.textContent = error.message || "Login failed";
    }
  });
});
```

### Step 3: Update Add Book Page (add_book.js)

```javascript
import { booksAPI } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const successMsg = document.getElementById("successMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookData = {
      title: document.getElementById("bookTitle").value.trim(),
      author: document.getElementById("author").value.trim(),
      isbn: document.getElementById("isbn").value.trim(),
      category: document.getElementById("category").value.trim(),
      quantity: parseInt(document.getElementById("quantity").value),
      shelf: document.getElementById("shelf").value.trim()
    };

    try {
      await booksAPI.create(bookData);
      
      successMsg.textContent = "✅ Book added successfully!";
      successMsg.className = "text-center text-success mt-3 fw-bold";
      form.reset();
      
      setTimeout(() => {
        successMsg.textContent = "";
      }, 3000);
    } catch (error) {
      successMsg.textContent = `⚠️ ${error.message}`;
      successMsg.className = "text-center text-danger mt-3 fw-bold";
    }
  });
});
```

### Step 4: Add API Script to HTML

Add to all HTML pages before your script tags:

```html
<script type="module" src="js/api.js"></script>
<script type="module" src="js/your-page-script.js"></script>
```

---

## 🌐 CORS Configuration

### For Development

Backend `.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

Or allow all origins (development only):
```env
CORS_ORIGIN=*
```

### For Production

Set specific frontend URL:
```env
CORS_ORIGIN=https://yourdomain.com
```

---

## 🚀 Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create library-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open
heroku open
```

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Option 3: DigitalOcean

```bash
# Create droplet (Ubuntu)
# SSH into droplet

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# Clone repository
git clone your-repo-url
cd backend

# Install dependencies
npm install

# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server.js --name library-api

# Setup Nginx
sudo apt install nginx
# Configure reverse proxy
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Check if MongoDB is running: `brew services list`
- Start MongoDB: `brew services start mongodb-community`
- Or use MongoDB Atlas cloud database

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### JWT Token Invalid

```
Error: Invalid token
```

**Solution:**
- Check if token is being sent in headers
- Verify JWT_SECRET matches between requests
- Token might be expired, login again

### CORS Error

```
Access to fetch blocked by CORS policy
```

**Solution:**
- Update CORS_ORIGIN in backend .env
- Make sure frontend URL matches exactly
- Check if credentials are being sent

### Validation Errors

```
Error: Please enter a valid email
```

**Solution:**
- Check request body format
- Ensure all required fields are present
- Validate data before sending

---

## 📊 Database Management

### View Database

```bash
# Connect to MongoDB
mongosh

# Use database
use library_management

# View collections
show collections

# View users
db.users.find().pretty()

# View books
db.books.find().pretty()
```

### Create First Admin User

```bash
# Using MongoDB shell
mongosh

use library_management

db.users.insertOne({
  name: "Admin User",
  username: "admin",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash "123456"
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the register API endpoint.

---

## ✅ Verification Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Dependencies installed
- [ ] .env file configured
- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Can register user
- [ ] Can login and get token
- [ ] Protected routes require token
- [ ] CORS configured for frontend
- [ ] Database connection stable

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)

---

## 🎉 Success!

If everything is set up correctly, you should see:

```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📝 Environment: development
```

Your backend is now ready to integrate with the frontend!

---

**Need help?** Check the [backend/README.md](backend/README.md) for API documentation.
