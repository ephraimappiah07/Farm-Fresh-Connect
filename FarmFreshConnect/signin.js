document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('role');
  const farmerFields = document.getElementById('farmer-fields');
  const customerFields = document.getElementById('customer-fields');
  const form = document.getElementById('signin-form');
  const status = document.getElementById('signin-status');

  // Show/hide role-specific fields
  roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    farmerFields.style.display = role === 'farmer' ? 'block' : 'none';
    customerFields.style.display = role === 'customer' ? 'block' : 'none';
  });

  // Handle sign-in
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!role || !email || !password) {
      status.style.color = 'crimson';
      status.textContent = 'Please fill in all required fields.';
      return;
    }

    status.style.color = '';
    status.textContent = 'Signing in...';

    // Simulated backend check
    setTimeout(() => {
      if (password.length >= 6) {
        status.style.color = 'green';
        status.textContent = Welcome back, ${role}! You are signed in as ${email}.;
        form.reset();
        farmerFields.style.display = 'none';
        customerFields.style.display = 'none';
      } else {
        status.style.color = 'crimson';
        status.textContent = 'Invalid credentials. Please try again.';
      }
    }, 1000);
  });
});