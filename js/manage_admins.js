document.addEventListener("DOMContentLoaded", () => {
    const adminForm = document.getElementById("adminForm");
    const adminsBody = document.getElementById("adminsBody");
    const searchBox = document.getElementById("adminSearchBox");
  
    // --- Load from localStorage or create default admins ---
    let admins = JSON.parse(localStorage.getItem("admins")) || [
      { name: "Main Admin", username: "admin1", email: "admin1@example.com" },
      { name: "Pooja Yadav", username: "pooja", email: "pooja@example.com" },
    ];
  
    // --- Save admins to localStorage ---
    function saveAdmins() {
      localStorage.setItem("admins", JSON.stringify(admins));
    }
  
    // --- Render admins table ---
    function renderAdmins(data) {
      adminsBody.innerHTML = "";
      data.forEach((a, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${a.name}</td>
            <td>${a.username}</td>
            <td>${a.email}</td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
        adminsBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // --- Initial render ---
    renderAdmins(admins);
  
    // --- Add admin ---
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("adminName").value.trim();
      const username = document.getElementById("adminUsername").value.trim();
      const email = document.getElementById("adminEmail").value.trim();
  
      if (!name || !username || !email) {
        alert("⚠️ Please fill in all fields.");
        return;
      }
  
      admins.push({ name, username, email });
      saveAdmins();
      renderAdmins(admins);
      alert(`✅ Admin ${name} added successfully.`);
      adminForm.reset();
    });
  
    // --- Delete admin ---
    adminsBody.addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn")) {
        const rowIndex = e.target.closest("tr").rowIndex - 1;
        const removed = admins.splice(rowIndex, 1);
        saveAdmins();
        renderAdmins(admins);
        alert(`🗑️ Removed admin ${removed[0].name}.`);
      }
    });
  
    // --- Search admins ---
    searchBox.addEventListener("keyup", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = admins.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.username.toLowerCase().includes(query)
      );
      renderAdmins(filtered);
    });
  });
  