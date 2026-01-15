# 🚀 Run Library Management System with MongoDB

## ✅ **Everything is Already Set Up!**

Your backend server is **already running** and connected to MongoDB!

---

## 📋 **How to Use the Application**

### **Step 1: Open the Application**

Simply open `index.html` in your browser:

```bash
open index.html
```

Or double-click `index.html` in Finder.

---

### **Step 2: Login**

Use these credentials:
- **Username**: `admin`
- **Password**: `123456`

---

### **Step 3: Start Using!**

That's it! All your data will now be stored in MongoDB instead of LocalStorage.

---

## 🔍 **How to Verify It's Working**

### **1. Check Browser Console**
- Open DevTools (F12 or Cmd+Option+I)
- Go to Console tab
- You should see API requests to `http://localhost:5001/api/...`

### **2. Check Backend Terminal**
The backend server is running and you'll see logs like:
```
POST /api/auth/login 200
GET /api/books 200
POST /api/books 201
```

### **3. Check MongoDB Data**
Open a new terminal and run:
```bash
mongosh library_management --eval "db.books.find().pretty()"
```

---

## 📊 **What's Running**

✅ **MongoDB** - Database server (port 27017)  
✅ **Backend API** - Node.js/Express server (port 5001)  
✅ **Frontend** - Your HTML/JS application  

---

## 🎯 **Features Now Using MongoDB**

All these features now store data in MongoDB:

- ✅ **Login/Authentication** - JWT tokens
- ✅ **Books Management** - Add, edit, delete books
- ✅ **Students Management** - Student records
- ✅ **Issue/Return Books** - Transaction tracking
- ✅ **Admin Management** - User accounts
- ✅ **Search & Filter** - Real-time queries

---

## 🛑 **If You Need to Stop the Backend**

The backend is running in the background. If you need to stop it:

1. Check running processes:
```bash
lsof -i :5001
```

2. Stop the process:
```bash
kill -9 <PID>
```

Or I can stop it for you - just ask!

---

## 🔄 **If You Need to Restart**

If the backend stops for any reason:

```bash
cd backend
npm run dev
```

You'll see:
```
🚀 Server running on port 5001
✅ MongoDB connected successfully
```

---

## 📝 **View Your Data in MongoDB**

### **See all books:**
```bash
mongosh library_management --eval "db.books.find().pretty()"
```

### **See all students:**
```bash
mongosh library_management --eval "db.students.find().pretty()"
```

### **See all transactions:**
```bash
mongosh library_management --eval "db.transactions.find().pretty()"
```

### **See all users:**
```bash
mongosh library_management --eval "db.users.find().pretty()"
```

---

## 🎉 **You're All Set!**

Your Library Management System is now running with:
- ✅ MongoDB database for persistent storage
- ✅ Secure JWT authentication
- ✅ RESTful API backend
- ✅ Modern responsive frontend

**Just open `index.html` and start using it!**

---

## 💡 **Pro Tips**

1. **Keep the backend running** - Don't close the terminal with the backend server
2. **Check the console** - Browser DevTools will show any errors
3. **MongoDB is persistent** - Your data survives browser restarts
4. **Backup your data** - Use MongoDB export tools for backups

---

## 🐛 **Troubleshooting**

### **"Unable to connect to server"**
- Make sure backend is running: Check for "Server running on port 5001"
- Check if MongoDB is running: `brew services list | grep mongodb`

### **"Session expired"**
- Just login again - tokens expire after 7 days

### **"Port already in use"**
- Another process is using port 5001
- Kill it: `lsof -ti :5001 | xargs kill -9`
- Restart backend: `cd backend && npm run dev`

---

**🎊 Enjoy your fully functional Library Management System with MongoDB!**
