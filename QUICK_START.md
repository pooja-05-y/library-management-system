# Library Management System - Quick Start Guide

## 🚀 Getting Started

### 1. Open the Application
Simply open `index.html` in your web browser (Chrome, Firefox, Safari, or Edge).

### 2. Login
- **Username**: `admin`
- **Password**: `123456`
- Check "Remember me" to save your username

### 3. Navigate the System

#### Dashboard
After login, you'll see the main dashboard with quick access cards.

## 📚 Main Features

### Book Management

#### Add Books
1. Go to **Add Book** page
2. Fill in all fields:
   - Book Title
   - Author
   - ISBN Number
   - Category (select from dropdown)
   - Quantity (number of copies)
   - Shelf Number
3. Click "Add Book"
4. Book is saved and available across all pages

#### View Books
1. Go to **View Books** page
2. See all books in a table
3. Use search box to filter by title, author, ISBN, or category
4. Click trash icon to delete a book (with confirmation)

#### Manage Books (Advanced)
1. Go to **Manage Books** page
2. Add new books or edit existing ones
3. **Export**: Download all books as JSON file
4. **Import**: Upload a JSON file to bulk import books
5. Search, edit, or delete books

### Student Management

#### Manage Students
1. Go to **Manage Students** page
2. Add new students with:
   - Name
   - Student ID (must be unique)
   - Email (validated format)
3. Search students by name, ID, or email
4. Delete students with trash icon

### Admin Management

#### Manage Admins
1. Go to **Manage Admins** page
2. Add new admin users
3. Username must be unique
4. Email format is validated
5. Search and delete admins

### Book Transactions

#### Issue a Book
1. Go to **Issue Book** page
2. Fill in:
   - Student Name & ID
   - Book Title & ID/ISBN
   - Issue Date (cannot be in past)
   - Return Date (must be after issue date)
3. Click "Issue Book"
4. Record is saved and visible in "View Issued Books"

#### Return a Book
1. Go to **Return Book** page
2. Enter student and book details
3. Select return date
4. System checks if book is overdue
5. Updates the issued book status

#### View Issued Books
1. Go to **View Issued Books** page
2. See all issued books with status badges:
   - 🟢 **Issued** - Currently with student
   - 🔴 **Overdue** - Past return date
   - ⚪ **Returned** - Book returned
3. Click "Mark Returned" to return a book
4. Search by student name, book title, or status

## 💡 Tips & Tricks

### Search Functionality
- All search boxes filter in real-time
- Search is case-insensitive
- Works across multiple fields

### Data Persistence
- All data is saved in browser's localStorage
- Data persists across page refreshes
- Clearing browser data will reset the system

### Validation
- Forms validate all required fields
- Email addresses must be properly formatted
- Duplicate ISBNs, Student IDs, and Usernames are prevented
- Dates are validated for logical consistency

### Overdue Detection
- System automatically marks books as overdue
- Checks happen when viewing issued books
- Return book page calculates days late

## 🔧 Troubleshooting

### Data Not Saving?
- Check if browser localStorage is enabled
- Try clearing browser cache
- Ensure you're not in private/incognito mode

### Books Not Appearing?
- Make sure you're adding books through the form
- Check if localStorage has space (5-10MB limit)
- Refresh the page

### Can't Login?
- Username: `admin` (lowercase)
- Password: `123456` (exactly 6 characters)
- Clear any saved passwords and try again

### Import Not Working?
- Ensure JSON file is properly formatted
- File must contain an array of book objects
- Each book must have: title, author, and isbn

## 📊 Sample Data

The system comes with sample data:

### Books
- Atomic Habits by James Clear
- The Psychology of Money by Morgan Housel
- The Great Gatsby by F. Scott Fitzgerald

### Students
- Pooja Yadav (STU101)
- Rohan Sharma (STU102)

### Admins
- Main Admin (admin1)
- Pooja Yadav (pooja)

## 🎯 Common Workflows

### Complete Book Issue Flow
1. Add a book (Add Book page)
2. Add a student (Manage Students page)
3. Issue the book (Issue Book page)
4. View the transaction (View Issued Books page)
5. Return the book (Return Book page)
6. Verify status updated (View Issued Books page)

### Bulk Book Management
1. Go to Manage Books page
2. Click "Export Books" to backup current books
3. Edit the JSON file or create new one
4. Click "Import Books" and select file
5. All books are loaded at once

## 🔐 Security Note

This is a **demo application** for learning purposes. It stores all data in the browser and has hardcoded credentials. Do not use for real library management without implementing proper backend security.

## 📱 Mobile Responsive

The application is responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Navigation menu collapses on smaller screens.

## 🆘 Need Help?

Check the `DEBUGGING_REPORT.md` file for:
- Technical details
- Known limitations
- Future enhancements
- Testing procedures
