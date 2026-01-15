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
  
      // Login with backend API
      loginUser(userVal, passVal);
    });
  });

// Login function using backend API
async function loginUser(username, password) {
  const errorMsg = document.getElementById("error-msg");
  const submitBtn = document.querySelector('button[type="submit"]');
  
  try {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
    
    const data = await API.login(username, password);

    if (data.success) {
      // Store token and user info
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      // Show success message
      errorMsg.className = 'alert alert-success';
      errorMsg.textContent = 'Login successful! Redirecting...';
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.className = 'alert alert-danger';
    errorMsg.textContent = error.message || 'Unable to connect to server. Please try again.';
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Login';
  }
}
