document.addEventListener('DOMContentLoaded', () => {
    // Registration Form Validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('fullname');
            const email = document.getElementById('email');
            const pass = document.getElementById('password');
            const confirm = document.getElementById('confirm-password');
            let valid = true;

            [name, email, pass, confirm].forEach(f => f.classList.remove('is-invalid', 'is-valid'));

            if (name.value.trim().length < 3) { name.classList.add('is-invalid'); valid = false; } else name.classList.add('is-valid');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('is-invalid'); valid = false; } else email.classList.add('is-valid');
            if (pass.value.length < 6) { pass.classList.add('is-invalid'); valid = false; } else pass.classList.add('is-valid');
            if (pass.value !== confirm.value) { confirm.classList.add('is-invalid'); valid = false; } else confirm.classList.add('is-valid');

            if (valid) alert('Registration successful!');
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email');
            const pass = document.getElementById('password');
            let valid = true;

            [email, pass].forEach(f => f.classList.remove('is-invalid', 'is-valid'));

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('is-invalid'); valid = false; } else email.classList.add('is-valid');
            if (!pass.value) { pass.classList.add('is-invalid'); valid = false; } else pass.classList.add('is-valid');

            if (valid) alert('Login successful!');
        });
    }
});
