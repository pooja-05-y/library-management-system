document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    const successMsg = document.getElementById("successMsg");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const author = document.getElementById("author").value.trim();
      const isbn = document.getElementById("isbn").value.trim();
      const category = document.getElementById("category").value.trim();
      const quantity = parseInt(document.getElementById("quantity").value.trim());
      const shelf = document.getElementById("shelf").value.trim();
  
      // Validation
      if (!bookTitle || !author || !isbn || !category || !quantity || !shelf) {
        successMsg.textContent = "⚠️ Please fill all fields!";
        successMsg.className = "text-center text-danger mt-3 fw-bold";
        return;
      }
  
      if (quantity < 1) {
        successMsg.textContent = "⚠️ Quantity must be at least 1!";
        successMsg.className = "text-center text-danger mt-3 fw-bold";
        return;
      }
  
      // Load existing books from localStorage
      let books = JSON.parse(localStorage.getItem("books")) || [];
  
      // Check for duplicate ISBN
      const duplicate = books.find(b => b.isbn === isbn);
      if (duplicate) {
        successMsg.textContent = `⚠️ Book with ISBN "${isbn}" already exists!`;
        successMsg.className = "text-center text-danger mt-3 fw-bold";
        return;
      }
  
      // Add new book
      const newBook = {
        title: bookTitle,
        author: author,
        isbn: isbn,
        category: category,
        quantity: quantity,
        shelf: shelf
      };
  
      books.push(newBook);
  
      // Save to localStorage
      try {
        localStorage.setItem("books", JSON.stringify(books));
        localStorage.setItem("books_version", "1.0.0");
        
        successMsg.textContent = "✅ Book added successfully!";
        successMsg.className = "text-center text-success mt-3 fw-bold";
        form.reset();
        
        // Clear message after 3 seconds
        setTimeout(() => {
          successMsg.textContent = "";
        }, 3000);
      } catch (error) {
        console.error("Error saving book:", error);
        successMsg.textContent = "⚠️ Failed to save book. Storage might be full.";
        successMsg.className = "text-center text-danger mt-3 fw-bold";
      }
    });
  });
  