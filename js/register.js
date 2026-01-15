document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const nameField = document.getElementById("name");
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const roleField = document.getElementById("role");
    const termsField = document.getElementById("terms");
    const messageDiv = document.getElementById("message");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    // Password visibility toggles
    togglePassword.addEventListener("click", () => {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        togglePassword.innerHTML = type === "password" 
            ? '<i class="bi bi-eye"></i>' 
            : '<i class="bi bi-eye-slash"></i>';
    });

    toggleConfirmPassword.addEventListener("click", () => {
        const type = confirmPasswordField.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordField.setAttribute("type", type);
        toggleConfirmPassword.innerHTML = type === "password" 
            ? '<i class="bi bi-eye"></i>' 
            : '<i class="bi bi-eye-slash"></i>';
    });

    // Real-time validation
    nameField.addEventListener("blur", validateName);
    usernameField.addEventListener("blur", validateUsername);
    emailField.addEventListener("blur", validateEmail);
    passwordField.addEventListener("input", validatePassword);
    confirmPasswordField.addEventListener("input", validateConfirmPassword);

    // Form submission
    form.addEventListener("submit", handleRegistration);

    // Validation functions
    function validateName() {
        const name = nameField.value.trim();
        if (name.length < 2) {
            showFieldError(nameField, "Name must be at least 2 characters long");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showFieldError(nameField, "Name can only contain letters and spaces");
            return false;
        }
        showFieldSuccess(nameField);
        return true;
    }

    function validateUsername() {
        const username = usernameField.value.trim();
        if (username.length < 3 || username.length > 20) {
            showFieldError(usernameField, "Username must be 3-20 characters long");
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showFieldError(usernameField, "Username can only contain letters, numbers, and underscores");
            return false;
        }
        showFieldSuccess(usernameField);
        return true;
    }

    function validateEmail() {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError(emailField, "Please enter a valid email address");
            return false;
        }
        showFieldSuccess(emailField);
        return true;
    }

    function validatePassword() {
        const password = passwordField.value;
        if (password.length < 6) {
            showFieldError(passwordField, "Password must be at least 6 characters long");
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            showFieldError(passwordField, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
            return false;
        }
        showFieldSuccess(passwordField);
        
        // Re-validate confirm password if it has a value
        if (confirmPasswordField.value) {
            validateConfirmPassword();
        }
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        if (password !== confirmPassword) {
            showFieldError(confirmPasswordField, "Passwords do not match");
            return false;
        }
        if (confirmPassword.length > 0) {
            showFieldSuccess(confirmPasswordField);
        }
        return true;
    }

    function showFieldError(field, message) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        const feedback = field.parentNode.querySelector(".invalid-feedback") || 
                        field.nextElementSibling;
        if (feedback && feedback.classList.contains("invalid-feedback")) {
            feedback.textContent = message;
        }
    }

    function showFieldSuccess(field) {
        field.classList.add("is-valid");
        field.classList.remove("is-invalid");
    }

    function showMessage(message, type = "success") {
        messageDiv.className = `alert alert-${type === "success" ? "success" : "danger"} mb-3`;
        messageDiv.textContent = message;
        messageDiv.style.display = "block";
        
        // Auto-hide success messages
        if (type === "success") {
            setTimeout(() => {
                messageDiv.style.display = "none";
            }, 5000);
        }
    }

    async function handleRegistration(e) {
        e.preventDefault();
        
        // Clear previous messages
        messageDiv.style.display = "none";

        // Validate all fields
        const isNameValid = validateName();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        // Check terms acceptance
        if (!termsField.checked) {
            showFieldError(termsField, "You must accept the terms and conditions");
            return;
        } else {
            termsField.classList.remove("is-invalid");
        }

        // Check role selection
        if (!roleField.value) {
            showFieldError(roleField, "Please select a role");
            return;
        } else {
            roleField.classList.remove("is-invalid");
        }

        // If any validation fails, stop here
        if (!isNameValid || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            showMessage("Please fix the errors above", "error");
            return;
        }

        // Prepare registration data
        const registrationData = {
            name: nameField.value.trim(),
            username: usernameField.value.trim(),
            email: emailField.value.trim(),
            password: passwordField.value,
            role: roleField.value
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating Account...';

        try {
            // Call registration API
            const response = await API.register(registrationData);

            if (response.success) {
                showMessage("Account created successfully! Redirecting to login...", "success");
                
                // Clear form
                form.reset();
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                throw new Error(response.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            // Handle specific error types
            if (error.message.includes("username") || error.message.includes("Username")) {
                showFieldError(usernameField, "Username already exists");
                showMessage("Username is already taken. Please choose a different one.", "error");
            } else if (error.message.includes("email") || error.message.includes("Email")) {
                showFieldError(emailField, "Email already exists");
                showMessage("Email is already registered. Please use a different email.", "error");
            } else {
                showMessage(error.message || "Registration failed. Please try again.", "error");
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
});