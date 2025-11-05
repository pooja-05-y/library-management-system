document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    const successMsg = document.getElementById("successMsg");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const bookTitle = document.getElementById("bookTitle").value.trim();
      const author = document.getElementById("author").value.trim();
      const isbn = document.getElementById("isbn").value.trim();
      const category = document.getElementById("category").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const shelf = document.getElementById("shelf").value.trim();
  
      if (!bookTitle || !author || !isbn || !category || !quantity || !shelf) {
        successMsg.textContent = "⚠️ Please fill all fields!";
        successMsg.classList.replace("text-success", "text-danger");
        return;
      }
  
      successMsg.textContent = "✅ Book added successfully! (Frontend test only)";
      successMsg.classList.replace("text-danger", "text-success");
      form.reset();
    });
  });
  