document.addEventListener("DOMContentLoaded", () => {
    const issueForm = document.getElementById("issueForm");
  
    issueForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const studentName = document.getElementById("studentName").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const bookId = document.getElementById("bookId").value.trim();
      const issueDate = document.getElementById("issueDate").value;
      const returnDate = document.getElementById("returnDate").value;
  
      // Validation
      if (!studentName || !studentId || !bookTitle || !bookId || !issueDate || !returnDate) {
        alert("⚠️ Please fill out all fields.");
        return;
      }
  
      // Validate dates
      const issue = new Date(issueDate);
      const returnD = new Date(returnDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (issue < today) {
        alert("⚠️ Issue date cannot be in the past.");
        return;
      }
  
      if (returnD <= issue) {
        alert("⚠️ Return date must be after issue date.");
        return;
      }
  
      // Load issued books from localStorage
      let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  
      // Create new issued book record
      const newIssue = {
        student: studentName,
        studentId: studentId,
        book: bookTitle,
        bookId: bookId,
        issueDate: issueDate,
        returnDate: returnDate,
        status: "Issued"
      };
  
      issuedBooks.push(newIssue);
  
      // Save to localStorage
      try {
        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
        
        alert(
          `✅ Book "${bookTitle}" has been issued to ${studentName} from ${issueDate} to ${returnDate}.`
        );
        
        issueForm.reset();
      } catch (error) {
        console.error("Error saving issued book:", error);
        alert("⚠️ Failed to save. Storage might be full.");
      }
    });
  });
  