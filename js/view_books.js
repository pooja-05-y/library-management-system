document.addEventListener("DOMContentLoaded", () => {
    const books = [
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
  
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    function renderBooks(filteredBooks) {
      tableBody.innerHTML = "";
      filteredBooks.forEach((book, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.category}</td>
            <td>${book.quantity}</td>
            <td>${book.shelf}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-danger delete-btn">
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
      if (e.target.closest(".delete-btn")) {
        const rowIndex = e.target.closest("tr").rowIndex - 1;
        books.splice(rowIndex, 1);
        renderBooks(books);
      }
    });
  
    // Search logic
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = books.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
      renderBooks(filtered);
    });
  });
  