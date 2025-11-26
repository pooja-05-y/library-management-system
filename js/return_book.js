document.addEventListener("DOMContentLoaded", () => {
    const returnForm = document.getElementById("returnForm");
  
    returnForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const studentName = document.getElementById("studentName").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const bookId = document.getElementById("bookId").value.trim();
      const returnDate = document.getElementById("returnDate").value;
  
      if (!studentName || !studentId || !bookTitle || !bookId || !returnDate) {
        alert("⚠️ Please fill in all fields before submitting.");
        return;
      }
  
      // Load issued books
      let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  
      // Find the issued book
      const bookIndex = issuedBooks.findIndex(
        b => b.book.toLowerCase() === bookTitle.toLowerCase() && 
             b.student.toLowerCase() === studentName.toLowerCase() &&
             b.status === "Issued"
      );
  
      if (bookIndex === -1) {
        alert(`⚠️ No issued record found for "${bookTitle}" by ${studentName}.`);
        return;
      }
  
      // Update status to Returned
      issuedBooks[bookIndex].status = "Returned";
      issuedBooks[bookIndex].actualReturnDate = returnDate;
  
      // Check if overdue
      const expectedReturn = new Date(issuedBooks[bookIndex].returnDate);
      const actualReturn = new Date(returnDate);
      
      if (actualReturn > expectedReturn) {
        const daysLate = Math.ceil((actualReturn - expectedReturn) / (1000 * 60 * 60 * 24));
        issuedBooks[bookIndex].daysLate = daysLate;
        alert(
          `⚠️ Book "${bookTitle}" returned ${daysLate} day(s) late by ${studentName} on ${returnDate}.`
        );
      } else {
        alert(
          `✅ Book "${bookTitle}" has been successfully returned by ${studentName} on ${returnDate}.`
        );
      }
  
      // Save back to localStorage
      try {
        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
        returnForm.reset();
      } catch (error) {
        console.error("Error saving return:", error);
        alert("⚠️ Failed to save return record.");
      }
    });
  });
  