document.addEventListener("DOMContentLoaded", () => {
    const issueForm = document.getElementById("issueForm");
  
    issueForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const studentName = document.getElementById("studentName").value.trim();
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const issueDate = document.getElementById("issueDate").value;
      const returnDate = document.getElementById("returnDate").value;
  
      // Basic validation
      if (!studentName || !bookTitle) {
        alert("Please fill out all fields.");
        return;
      }
  
      // Simulate successful issue
      alert(
        `✅ Book "${bookTitle}" has been issued to ${studentName} from ${issueDate} to ${returnDate}.`
      );
  
      issueForm.reset();
    });
  });
  