document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const fullname = document.getElementById('fullname');

            // Email Validation (Common to both)
            if (email && !email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }

            // Password Validation (Common to both)
            if (password && password.value.length < 6) {
                alert('Password must be at least 6 characters long.');
                isValid = false;
            }

            // Register specific validations
            if (fullname && fullname.value.trim() === '') {
                alert('Full Name is required.');
                isValid = false;
            }

            if (confirmPassword && password && confirmPassword.value !== password.value) {
                alert('Passwords do not match.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});
