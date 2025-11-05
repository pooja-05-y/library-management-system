document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const tableBody = document.getElementById("tableBody");
    const searchBox = document.getElementById("searchBox");
  
    // Sample student data
    const students = [
      { name: "Pooja Yadav", id: "STU101", email: "pooja@example.com" },
      { name: "Rohan Sharma", id: "STU102", email: "rohan@example.com" },
    ];
  
    // Render students table
    function renderStudents(data) {
      tableBody.innerHTML = "";
      data.forEach((s, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.id}</td>
            <td>${s.email}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-danger delete-btn">
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
  
      if (!name || !id || !email) {
        alert("⚠️ Please fill out all fields.");
        return;
      }
  
      // Add to array
      students.push({ name, id, email });
      renderStudents(students);
  
      alert(`✅ Student ${name} added successfully.`);
      studentForm.reset();
    });
  
    // Delete student
    tableBody.addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn")) {
        const rowIndex = e.target.closest("tr").rowIndex - 1;
        const removed = students.splice(rowIndex, 1);
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
          s.id.toLowerCase().includes(query)
      );
      renderStudents(filtered);
    });
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentsBody = document.getElementById("studentsBody");
    const studentSearch = document.getElementById("studentSearch");
  
    let students = JSON.parse(localStorage.getItem("students")) || [
      { name: "Aditi Sharma", id: "S101", email: "aditi@example.com" },
      { name: "Rahul Mehta", id: "S102", email: "rahul@example.com" },
    ];
  
    function saveStudents() {
      localStorage.setItem("students", JSON.stringify(students));
    }
  
    function renderStudents(data) {
      studentsBody.innerHTML = "";
      data.forEach((s, index) => {
        studentsBody.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.id}</td>
            <td>${s.email}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>`
        );
      });
    }
  
    renderStudents(students);
  
    // Add student
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("studentName").value.trim();
      const id = document.getElementById("studentId").value.trim();
      const email = document.getElementById("studentEmail").value.trim();
  
      if (!name || !id || !email) {
        alert("⚠️ Please fill in all fields.");
        return;
      }
  
      students.push({ name, id, email });
      saveStudents();
      renderStudents(students);
      alert(`✅ Added student ${name}.`);
      studentForm.reset();
    });
  
    // Delete student
    studentsBody.addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn")) {
        const index = e.target.closest("tr").rowIndex - 1;
        const removed = students.splice(index, 1);
        saveStudents();
        renderStudents(students);
        alert(`🗑️ Removed student ${removed[0].name}.`);
      }
    });
  
    // Search students
    studentSearch.addEventListener("keyup", () => {
      const query = studentSearch.value.toLowerCase();
      const filtered = students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.id.toLowerCase().includes(query)
      );
      renderStudents(filtered);
    });
  });
  