document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    // Load from localStorage or use default data
    let students = JSON.parse(localStorage.getItem("students")) || [
      { name: "Pooja Yadav", id: "STU101", email: "pooja@example.com" },
      { name: "Rohan Sharma", id: "STU102", email: "rohan@example.com" },
    ];
  
    // Save to localStorage
    function saveStudents() {
      try {
        localStorage.setItem("students", JSON.stringify(students));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert("⚠️ Failed to save data. Storage might be full.");
      }
    }
  
    // Render students table
    function renderStudents(data) {
      tableBody.innerHTML = "";
      if (data.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="text-center text-muted">No students found</td>
          </tr>
        `;
        return;
      }
      
      data.forEach((s, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.id}</td>
            <td>${s.email}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Initial render
    renderStudents(students);
  
    // Add student
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("studentName").value.trim();
      const id = document.getElementById("studentId").value.trim();
      const email = document.getElementById("studentEmail").value.trim();
  
      // Validation
      if (!name || !id || !email) {
        alert("⚠️ Please fill out all fields.");
        return;
      }
  
      // Check for duplicate ID
      const duplicate = students.find(s => s.id === id);
      if (duplicate) {
        alert(`⚠️ Student ID "${id}" already exists.`);
        return;
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }
  
      // Add to array
      students.push({ name, id, email });
      saveStudents();
      renderStudents(students);
  
      alert(`✅ Student ${name} added successfully.`);
      studentForm.reset();
    });
  
    // Delete student
    tableBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        const rowIndex = deleteBtn.closest("tr").rowIndex - 1;
        const removed = students.splice(rowIndex, 1);
        saveStudents();
        renderStudents(students);
        alert(`🗑️ Removed student ${removed[0].name}.`);
      }
    });
  
    // Search filter
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.id.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      );
      renderStudents(filtered);
    });
  });
  