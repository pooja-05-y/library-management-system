# 🚀 Backend Quick Reference

## ⚡ Quick Start Commands

```bash
# Install dependencies
cd backend && npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Start production server
npm start
```

## 🔑 Default Credentials

After first registration:
- **Username**: admin
- **Password**: 123456
- **Role**: admin

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication
```bash
# Register
POST /auth/register

# Login
POST /auth/login

# Get current user
GET /auth/me
```

### Books
```bash
GET    /books              # Get all books
GET    /books/search?q=    # Search books
GET    /books/:id          # Get single book
POST   /books              # Create book
PUT    /books/:id          # Update book
DELETE /books/:id          # Delete book (admin)
```

### Students
```bash
GET    /students           # Get all students
GET    /students/search?q= # Search students
GET    /students/:id       # Get single student
POST   /students           # Create student
PUT    /students/:id       # Update student
DELETE /students/:id       # Delete student (admin)
```

### Transactions
```bash
GET  /transactions         # Get all transactions
GET  /transactions/overdue # Get overdue
POST /transactions/issue   # Issue book
PUT  /transactions/:id/return # Return book
```

## 🔐 Authentication Header

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

## 📝 Example Requests

### Login
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: '123456'
  })
})
```

### Create Book
```javascript
fetch('http://localhost:5000/api/books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    title: 'Book Title',
    author: 'Author Name',
    isbn: '1234567890',
    category: 'Fiction',
    quantity: 5,
    shelf: 'A-1'
  })
})
```

### Issue Book
```javascript
fetch('http://localhost:5000/api/transactions/issue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    bookId: 'book_id_here',
    studentId: 'student_id_here',
    dueDate: '2025-12-31'
  })
})
```

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Common Issues

### MongoDB not connecting
```bash
# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Port in use
```bash
# Change port in .env
PORT=5001
```

### CORS error
```bash
# Update CORS_ORIGIN in .env
CORS_ORIGIN=http://localhost:3000
```

## 📊 Database Commands

```bash
# Connect to MongoDB
mongosh

# Use database
use library_management

# View collections
show collections

# View all users
db.users.find()

# View all books
db.books.find()

# Clear collection
db.books.deleteMany({})
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","username":"admin","email":"admin@example.com","password":"123456","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

## 📦 Project Structure

```
backend/
├── controllers/     # Business logic
├── models/         # Database schemas
├── routes/         # API routes
├── middleware/     # Auth & validation
├── .env           # Environment config
├── server.js      # Entry point
└── package.json   # Dependencies
```

## 🚀 Deployment

### Heroku
```bash
heroku create
heroku config:set MONGODB_URI=...
git push heroku main
```

### Railway
1. Connect GitHub
2. Add env variables
3. Deploy

## 📚 Full Documentation

- [Backend README](backend/README.md) - Complete API docs
- [Setup Guide](BACKEND_SETUP.md) - Detailed setup
- [Frontend Integration](BACKEND_SETUP.md#frontend-integration) - Connect frontend

## ✅ Quick Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] npm install completed
- [ ] .env configured
- [ ] Server starts (npm run dev)
- [ ] Health check works
- [ ] Can register/login
- [ ] Token authentication works

---

**Ready to integrate?** See [BACKEND_SETUP.md](BACKEND_SETUP.md) for frontend integration guide.
