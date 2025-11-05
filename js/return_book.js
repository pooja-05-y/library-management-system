document.addEventListener("DOMContentLoaded", () => {
    const returnForm = document.getElementById("returnForm");
  
    returnForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const studentName = document.getElementById("studentName").value.trim();
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const returnDate = document.getElementById("returnDate").value;
  
      if (!studentName || !bookTitle || !returnDate) {
        alert("⚠️ Please fill in all fields before submitting.");
        return;
      }
  
      alert(
        `✅ Book "${bookTitle}" has been successfully returned by ${studentName} on ${returnDate}.`
      );
  
      returnForm.reset();
    });
  });
  