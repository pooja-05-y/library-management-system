document.addEventListener("DOMContentLoaded", () => {
    const adminForm = document.getElementById("adminForm");
    const adminsBody = document.getElementById("adminsBody");
    const searchBox = document.getElementById("adminSearchBox");
  
    // Load from localStorage or create default admins
    let admins = JSON.parse(localStorage.getItem("admins")) || [
      { name: "Main Admin", username: "admin1", email: "admin1@example.com" },
      { name: "Pooja Yadav", username: "pooja", email: "pooja@example.com" },
    ];
  
    // Save admins to localStorage
    function saveAdmins() {
      try {
        localStorage.setItem("admins", JSON.stringify(admins));
      } catch (error) {
        console.error("Error saving admins:", error);
        alert("⚠️ Failed to save admin data.");
      }
    }
  
    // Render admins table
    function renderAdmins(data) {
      adminsBody.innerHTML = "";
      
      if (data.length === 0) {
        adminsBody.innerHTML = `
          <tr>
            <td colspan="5" class="text-center text-muted">No admins found</td>
          </tr>
        `;
        return;
      }
      
      data.forEach((a, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${a.name}</td>
            <td>${a.username}</td>
            <td>${a.email}</td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
        adminsBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Initial render
    renderAdmins(admins);
  
    // Add admin
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("adminName").value.trim();
      const username = document.getElementById("adminUsername").value.trim();
      const email = document.getElementById("adminEmail").value.trim();
  
      // Validation
      if (!name || !username || !email) {
        alert("⚠️ Please fill in all fields.");
        return;
      }
  
      // Check for duplicate username
      const duplicate = admins.find(a => a.username === username);
      if (duplicate) {
        alert(`⚠️ Username "${username}" already exists.`);
        return;
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }
  
      admins.push({ name, username, email });
      saveAdmins();
      renderAdmins(admins);
      alert(`✅ Admin ${name} added successfully.`);
      adminForm.reset();
    });
  
    // Delete admin
    adminsBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        const rowIndex = deleteBtn.closest("tr").rowIndex - 1;
        const admin = admins[rowIndex];
        
        if (confirm(`Are you sure you want to remove admin "${admin.name}"?`)) {
          admins.splice(rowIndex, 1);
          saveAdmins();
          renderAdmins(admins);
          alert(`🗑️ Removed admin ${admin.name}.`);
        }
      }
    });
  
    // Search admins
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = admins.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.username.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query)
      );
      renderAdmins(filtered);
    });
  });
  