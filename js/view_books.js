document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    // Load books from localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [
      {
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        category: "Self-Help",
        quantity: 10,
        shelf: "A-1"
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        isbn: "9780857197689",
        category: "Finance",
        quantity: 5,
        shelf: "B-3"
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        category: "Fiction",
        quantity: 7,
        shelf: "C-2"
      }
    ];
  
    // Save initial books if localStorage is empty
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(books));
      localStorage.setItem("books_version", "1.0.0");
    }
  
    function saveBooks() {
      try {
        localStorage.setItem("books", JSON.stringify(books));
      } catch (error) {
        console.error("Error saving books:", error);
        alert("⚠️ Failed to save changes.");
      }
    }
  
    function renderBooks(filteredBooks) {
      tableBody.innerHTML = "";
      
      if (filteredBooks.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center text-muted">No books found</td>
          </tr>
        `;
        return;
      }
      
      filteredBooks.forEach((book, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.category || 'N/A'}</td>
            <td>${book.quantity || 0}</td>
            <td>${book.shelf || 'N/A'}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-danger delete-btn" data-isbn="${book.isbn}">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Initial render
    renderBooks(books);
  
    // Delete button logic
    tableBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        const isbn = deleteBtn.dataset.isbn;
        const bookIndex = books.findIndex(b => b.isbn === isbn);
        
        if (bookIndex !== -1) {
          const bookTitle = books[bookIndex].title;
          if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
            books.splice(bookIndex, 1);
            saveBooks();
            renderBooks(books);
            alert(`✅ Book "${bookTitle}" deleted successfully.`);
          }
        }
      }
    });
  
    // Search logic
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = books.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          (b.isbn && b.isbn.toLowerCase().includes(query)) ||
          (b.category && b.category.toLowerCase().includes(query))
      );
      renderBooks(filtered);
    });
  });
  