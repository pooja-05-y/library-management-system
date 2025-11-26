document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    // Load issued books from localStorage
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  
    // Auto-update overdue status
    function updateOverdueStatus() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      issuedBooks.forEach(book => {
        if (book.status === "Issued") {
          const returnDate = new Date(book.returnDate);
          returnDate.setHours(0, 0, 0, 0);
          
          if (today > returnDate) {
            book.status = "Overdue";
          }
        }
      });
      
      saveBooks();
    }
  
    function saveBooks() {
      try {
        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
      } catch (error) {
        console.error("Error saving issued books:", error);
      }
    }
  
    // Render issued books in table
    function renderBooks(data) {
      tableBody.innerHTML = "";
      
      if (data.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="7" class="text-center text-muted">No issued books found</td>
          </tr>
        `;
        return;
      }
      
      data.forEach((b, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${b.student}</td>
            <td>${b.book}</td>
            <td>${b.issueDate}</td>
            <td>${b.returnDate}</td>
            <td>
              <span class="badge ${
                b.status === "Issued"
                  ? "bg-success"
                  : b.status === "Overdue"
                  ? "bg-danger"
                  : "bg-secondary"
              }">${b.status}</span>
            </td>
            <td class="text-center">
              ${
                b.status === "Issued" || b.status === "Overdue"
                  ? `<button class="btn btn-sm btn-outline-success return-btn" data-index="${index}">Mark Returned</button>`
                  : b.actualReturnDate || "-"
              }
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Update overdue status on load
    updateOverdueStatus();
  
    // Initial render
    renderBooks(issuedBooks);
  
    // Handle "Mark Returned" button
    tableBody.addEventListener("click", (e) => {
      const returnBtn = e.target.closest(".return-btn");
      if (returnBtn) {
        const index = parseInt(returnBtn.dataset.index);
        const book = issuedBooks[index];
        
        if (confirm(`Mark "${book.book}" as returned by ${book.student}?`)) {
          const today = new Date().toISOString().split('T')[0];
          book.status = "Returned";
          book.actualReturnDate = today;
          
          saveBooks();
          renderBooks(issuedBooks);
          alert(`✅ Book "${book.book}" marked as returned.`);
        }
      }
    });
  
    // Search filter
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = issuedBooks.filter(
        (b) =>
          b.student.toLowerCase().includes(query) ||
          b.book.toLowerCase().includes(query) ||
          b.status.toLowerCase().includes(query)
      );
      renderBooks(filtered);
    });
  });
  