# 🗄️ Switch from LocalStorage to MongoDB

## Quick Setup Guide

### ✅ **Prerequisites Check**

Your backend is already configured! Just need to:
1. Install MongoDB
2. Start MongoDB service
3. Start backend server
4. System automatically switches to MongoDB

---

## 📋 **Step-by-Step Instructions**

### **Step 1: Install MongoDB (if not installed)**

Check if MongoDB is installed:
```bash
mongod --version
```

If not installed:
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Or download from: https://www.mongodb.com/try/download/community
```

---

### **Step 2: Start MongoDB Service**

```bash
# Start MongoDB (runs in background)
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

You should see: `mongodb-community started`

---

### **Step 3: Start Backend Server**

Open a terminal and run:
```bash
cd backend
npm install  # First time only
npm run dev
```

You should see:
```
🚀 Server running on port 5001
✅ MongoDB Connected: localhost
```

**Keep this terminal open!** The backend needs to stay running.

---

### **Step 4: Open Your Application**

Simply open `index.html` in your browser:
```bash
open index.html
```

**That's it!** The system will automatically:
- Detect the backend is running
- Use MongoDB instead of LocalStorage
- Store all data in the database

---

## 🔍 **How to Verify It's Working**

### **Check Backend Console**
You should see API requests in the backend terminal:
```
POST /api/auth/login 200
GET /api/books 200
POST /api/books 201
```

### **Check MongoDB Data**
Open MongoDB shell:
```bash
mongosh
use library_management
db.books.find()
db.students.find()
```

### **Check Browser Console**
Open DevTools (F12) → Console tab:
```
Using MongoDB (Backend)
```

---

## 🔄 **Switch Back to LocalStorage**

If you want to use LocalStorage again:

1. **Stop the backend server** (Ctrl+C in backend terminal)
2. **Refresh the browser**
3. System automatically falls back to LocalStorage

---

## 🎯 **Current Configuration**

Your `.env` file is already set up:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=df20cfa4ea5ad74c8c04c158373701820967dade65c2ba17e2dd07c7c8cd6121
```

---

## 🚀 **Quick Start Commands**

### **Terminal 1: Start MongoDB**
```bash
brew services start mongodb-community
```

### **Terminal 2: Start Backend**
```bash
cd backend
npm run dev
```

### **Terminal 3: Open Application**
```bash
open index.html
```

---

## 🐛 **Troubleshooting**

### **MongoDB won't start**
```bash
# Check if port 27017 is in use
lsof -i :27017

# Restart MongoDB
brew services restart mongodb-community
```

### **Backend won't start**
```bash
# Check if port 5001 is in use
lsof -i :5001

# Kill the process if needed
kill -9 <PID>

# Or change port in backend/.env
PORT=5002
```

### **"Cannot connect to backend"**
1. Make sure MongoDB is running: `brew services list`
2. Make sure backend is running: Check terminal for "Server running"
3. Check backend URL in browser: http://localhost:5001/api/books

---

## 📊 **Data Migration**

### **Export from LocalStorage**
1. Open any page (e.g., manage_books.html)
2. Click "Export" button
3. Save JSON file

### **Import to MongoDB**
1. Start backend server
2. Open the same page
3. Click "Import" button
4. Select the JSON file
5. Data is now in MongoDB!

---

## ✅ **Benefits of Using MongoDB**

- ✅ **Persistent Data** - Data survives browser clearing
- ✅ **Multi-User** - Multiple users can access same data
- ✅ **Scalable** - Handle thousands of records
- ✅ **Secure** - JWT authentication and validation
- ✅ **Backup** - Easy database backup and restore
- ✅ **Production Ready** - Deploy to cloud (MongoDB Atlas)

---

## 🌐 **Using Cloud MongoDB (Optional)**

Instead of local MongoDB, use MongoDB Atlas (free tier):

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library_management
```
5. Restart backend server

Now your data is in the cloud! ☁️

---

## 📞 **Need Help?**

- Backend not connecting? Check `backend/server.js`
- MongoDB issues? Check MongoDB logs: `brew services list`
- API errors? Check backend terminal for error messages

---

**🎉 You're all set! Your Library Management System now uses MongoDB for data storage.**
