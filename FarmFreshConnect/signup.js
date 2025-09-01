document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('role');
  const farmerFields = document.getElementById('farmer-fields');
  const customerFields = document.getElementById('customer-fields');
  const form = document.getElementById('signup-form');
  const status = document.getElementById('signup-status');

  // Show/hide extra fields depending on role
  roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    farmerFields.style.display = role === 'farmer' ? 'block' : 'none';
    customerFields.style.display = role === 'customer' ? 'block' : 'none';
  });

  // Handle signup form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!role || !name || !email || !password) {
      status.style.color = 'crimson';
      status.textContent = 'Please fill all required fields.';
      return;
    }

    // Simulated backend request
    status.style.color = '';
    status.textContent = 'Signing up...';

    setTimeout(() => {
      status.style.color = 'green';
      status.textContent = Welcome, ${name}! You have signed up as a ${role}.;
      form.reset();
      farmerFields.style.display = 'none';
      customerFields.style.display = 'none';
    }, 1000);
  });
});