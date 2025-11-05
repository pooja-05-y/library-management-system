document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const togglePassword = document.getElementById("togglePassword");
    const remember = document.getElementById("remember");
  
    // 🧠 Load remembered username on page load
    const savedUser = localStorage.getItem("savedUsername");
    if (savedUser) {
      username.value = savedUser;
      remember.checked = true;
    }
  
    // 👁️ Toggle password visibility
    togglePassword.addEventListener("click", () => {
        const type =
          password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        togglePassword.innerHTML =
          type === "password"
            ? '<i class="bi bi-eye"></i>'
            : '<i class="bi bi-eye-slash"></i>';
      });
      
  
    // 🧩 Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMsg.textContent = "";
  
      const userVal = username.value.trim();
      const passVal = password.value.trim();
  
      if (userVal === "" || passVal === "") {
        errorMsg.textContent = "Please enter both username and password.";
        return;
      }
  
      if (passVal.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters long.";
        return;
      }
  
      // Remember username if checkbox is checked
      if (remember.checked) {
        localStorage.setItem("savedUsername", userVal);
      } else {
        localStorage.removeItem("savedUsername");
      }
  
      // Dummy login logic (to be replaced by backend later)
      if (userVal === "admin" && passVal === "123456") {
        window.location.href = "dashboard.html";
      } else {
        errorMsg.textContent = "Invalid username or password.";
      }
    });
  });
  