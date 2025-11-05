document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    // Sample issued books data
    const issuedBooks = [
      {
        student: "Pooja Yadav",
        book: "Atomic Habits",
        issueDate: "2025-11-01",
        returnDate: "2025-11-10",
        status: "Issued",
      },
      {
        student: "Rohan Sharma",
        book: "The Psychology of Money",
        issueDate: "2025-10-28",
        returnDate: "2025-11-05",
        status: "Overdue",
      },
      {
        student: "Neha Singh",
        book: "The Great Gatsby",
        issueDate: "2025-11-03",
        returnDate: "2025-11-12",
        status: "Issued",
      },
    ];
  
    // Render issued books in table
    function renderBooks(data) {
      tableBody.innerHTML = "";
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
                b.status === "Issued"
                  ? `<button class="btn btn-sm btn-outline-success return-btn">Mark Returned</button>`
                  : "-"
              }
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Initial render
    renderBooks(issuedBooks);
  
    // Handle "Mark Returned" button
    tableBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("return-btn")) {
        const rowIndex = e.target.closest("tr").rowIndex - 1;
        issuedBooks[rowIndex].status = "Returned";
        renderBooks(issuedBooks);
        alert(`✅ Book "${issuedBooks[rowIndex].book}" marked as returned.`);
      }
    });
  
    // Search filter
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = issuedBooks.filter(
        (b) =>
          b.student.toLowerCase().includes(query) ||
          b.book.toLowerCase().includes(query)
      );
      renderBooks(filtered);
    });
  });
  