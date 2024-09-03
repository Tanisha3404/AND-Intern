document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const conformPassword = document.getElementById('conformPassword');

    // Error elements
    const usernameError = document.getElementById('usernameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const conformPasswordError = document.getElementById('conformPasswordError');

    // Prevent non-digits from being entered in the phone number field
    phone.addEventListener('input', function (event) {
        const value = event.target.value;
        event.target.value = value.replace(/\D/g, '');
    });

    form.addEventListener('submit', function (event) {
        clearErrors();

        let isValid = true;

        // Username Validation
        if (!validateUsername(username.value)) {
            usernameError.textContent = "Username must be at least 8 characters long and contain only letters and numbers.";
            isValid = false;
        }

        // Phone Validation
        if (!validatePhone(phone.value)) {
            phoneError.textContent = "Please enter a valid phone number (10 digits).";
            isValid = false;
        }

        // Email Validation
        if (!validateEmail(email.value)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Password Validation
        if (!validatePassword(password.value)) {
            passwordError.textContent = "Password must be at least 8 characters long, contain at least one number, one special symbol, and include both uppercase and lowercase letters.";
            isValid = false;
        }

        // Confirm Password Validation
        if (password.value !== conformPassword.value) {
            conformPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        }

        // If any field is invalid, prevent the form from submitting
        if (!isValid) {
            event.preventDefault();
        } else {
            // If all fields are valid, display a success message
            alert("Successfully Logged In");
        }
    });

    function clearErrors() {
        usernameError.textContent = '';
        phoneError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        conformPasswordError.textContent = '';
    }

    function validateUsername(username) {
        return /^[a-zA-Z0-9]{8,}$/.test(username);
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(password);
    }
});
