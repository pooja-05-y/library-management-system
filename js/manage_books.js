document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "books";
    const STORAGE_VERSION_KEY = "books_version";
    const CURRENT_VERSION = "1.0.0"; // Increment this whenever you change data format

    const bookForm = document.getElementById("bookForm");
    const booksBody = document.getElementById("booksBody");
    const bookSearch = document.getElementById("bookSearch");
  
    // 🟦 Version Check
let storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
let books = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (storedVersion !== CURRENT_VERSION || !books || !Array.isArray(books)) {
  console.warn("⚠️ LocalStorage data outdated or missing. Resetting...");
  books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "12345" },
    { title: "1984", author: "George Orwell", isbn: "67890" },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
}

  
function saveBooks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
  }

  // ✅ Toast function
function showToast(message, type = "success") {
    const toastEl = document.getElementById("liveToast");
    const toastBody = document.getElementById("toastMessage");
    
    // Change color based on type
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastBody.textContent = message;
    
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

    toast.show();
  }
  
  
  
    function renderBooks(data) {
      booksBody.innerHTML = "";
      data.forEach((b, index) => {
        booksBody.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
            <td>${index + 1}</td>
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td>${b.isbn}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary edit-btn me-2">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>`
        );
      });
    }
    
  
    renderBooks(books);
  
    // Add / Update book
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("bookTitle").value.trim();
      const author = document.getElementById("bookAuthor").value.trim();
      const isbn = document.getElementById("bookISBN").value.trim();
  
      if (!title || !author || !isbn) {
        showToast("⚠️ Please fill in all fields.", "warning");
        return;
      }

      // ✅ Prevent duplicate ISBNs
  const duplicate = books.find(
    (b, i) => b.isbn === isbn && i !== Number(bookForm.dataset.editing)
  );
  if (duplicate) {
    showAlert(`⚠️ A book with ISBN "${isbn}" already exists.`, "warning");
    return;
  }
  
      const editingIndex = bookForm.dataset.editing;
  
      if (editingIndex !== undefined && editingIndex !== "") {
        // 🟦 Update existing book
        books[editingIndex] = { title, author, isbn };
        delete bookForm.dataset.editing;
        showToast(`✏️ Updated book "${title}".`, "info");
  
        const submitBtn = bookForm.querySelector("button[type='submit']");
        submitBtn.innerHTML = '<i class="bi bi-plus-lg"></i>';
        submitBtn.classList.remove("btn-primary");
        submitBtn.classList.add("btn-success");
      } else {
        // 🟩 Add new book
        books.push({ title, author, isbn });
        showToast(`✅ Added book "${title}".`, "success");
      }
  
      saveBooks();
      renderBooks(books);
      bookForm.reset();
    });

    function showAlert(message, type = "success") {
        const alertContainer = document.getElementById("alertContainer");
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertContainer.append(wrapper);
      
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
          const alert = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector(".alert"));
          alert.close();
        }, 3000);
      }
      
  
    // Edit book
    booksBody.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".edit-btn");
      if (editBtn) {
        const row = editBtn.closest("tr");
        const index = row.rowIndex - 1;
        const book = books[index];
  
        document.getElementById("bookTitle").value = book.title;
        document.getElementById("bookAuthor").value = book.author;
        document.getElementById("bookISBN").value = book.isbn;
  
        const submitBtn = bookForm.querySelector("button[type='submit']");
        submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i>';
        submitBtn.classList.remove("btn-success");
        submitBtn.classList.add("btn-primary");
  
        bookForm.dataset.editing = index;
      }
    });
  
    // Delete book
    // 🗑️ Delete book with confirmation
let deleteIndex = null;

booksBody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    deleteIndex = row.rowIndex - 1;
    const bookTitle = books[deleteIndex].title;
    document.getElementById("deleteMessage").textContent =
      `Are you sure you want to delete "${bookTitle}"?`;
    
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    deleteModal.show();
  }
});

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (deleteIndex !== null) {
    const removed = books.splice(deleteIndex, 1);
    saveBooks();
    renderBooks(books);
    deleteIndex = null;
    
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
    deleteModal.hide();

    showToast(`🗑️ Removed book "${removed[0].title}".`, "danger");
  }
});

  
    // Search books
    bookSearch.addEventListener("keyup", () => {
      const query = bookSearch.value.toLowerCase();
      const filtered = books.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
      renderBooks(filtered);
    });

    // 🚪 Logout Button
document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      showToast("You have logged out.", "info");
      setTimeout(() => {
        window.location.href = "index.html"; // Redirect to dashboard/login
      }, 1200);
    }
  });
  
  // 🚀 Export Books to JSON
document.getElementById("exportBtn").addEventListener("click", () => {
    const booksJson = JSON.stringify(books, null, 2); // Format JSON for readability
    const blob = new Blob([booksJson], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "books.json"; // Default filename for export
    link.click();
  });

  // 📥 Import Books from JSON File
document.getElementById("importFileBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      showToast("⚠️ Please choose a file to import.", "warning");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      try {
        const importedBooks = JSON.parse(e.target.result);
        
        if (Array.isArray(importedBooks) && importedBooks.length > 0) {
          books = importedBooks;
          saveBooks(); // Save new data to localStorage
          renderBooks(books); // Refresh table with new books
          showToast("✅ Books imported successfully.", "success");
        } else {
          showToast("⚠️ Invalid file format. Please upload a valid JSON file.", "danger");
        }
      } catch (error) {
        showToast("⚠️ Error reading the file. Please check the file format.", "danger");
      }
    };
  
    reader.readAsText(file);
  });
  
  
  });
  
  