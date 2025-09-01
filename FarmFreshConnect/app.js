// Small interactivity for Farm Fresh Connect
document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle?.addEventListener('click', () => {
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? 'none' : 'flex';
  });

  // Contact form handling (client-side only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const clearBtn = document.getElementById('clear-btn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.style.color = 'crimson';
      return;
    }

    // Simulated submit — replace with fetch('/api/contact') for real backend
    status.style.color = '';
    status.textContent = 'Sending...';

    setTimeout(() => {
      status.style.color = 'green';
      status.textContent = Thanks ${name}! We'll get back to you soon.;
      form.reset();
    }, 900);
  });

  clearBtn?.addEventListener('click', () => {
    form.reset();
    status.textContent = '';
  });

  // Product details quick modal (simple)
  document.querySelectorAll('.product-card .view-details').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const card = ev.target.closest('.product-card');
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('.card-desc').textContent;
      const price = card.querySelector('.price').textContent;
      alert(${title}\n\n${desc}\n\nPrice: ${price});
    });
  });

  // Add to cart (simple local storage counter)
  document.querySelectorAll('.product-card .add-cart').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const card = ev.target.closest('.product-card');
      const id = card.dataset.id;
      const title = card.querySelector('h3').textContent;
      let cart = JSON.parse(localStorage.getItem('ffc_cart') || '[]');
      cart.push({ id, title, addedAt: Date.now() });
      localStorage.setItem('ffc_cart', JSON.stringify(cart));
      alert(${title} added to cart. (${cart.length} item${cart.length>1?'s':''}));
    });
  });
});