document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  // Load products (added by farmers)
  const products = JSON.parse(localStorage.getItem('farmer_products') || '[]');

  // Load cart
  let cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
  renderProducts();
  renderCart();

  // Render products
  function renderProducts() {
    productList.innerHTML = '';
    if (products.length === 0) {
      productList.innerHTML = '<p>No products available yet.</p>';
      return;
    }

    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="price">GHS ${p.price}</p>
          <p>${p.desc}</p>
          <button class="btn small" data-id="${p.id}">Add to Cart</button>
        </div>
      `;
      productList.appendChild(card);
    });

    // Add to cart
    productList.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const product = products.find(p => p.id == id);
        if (!product) return;

        const existing = cart.find(c => c.id == id);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ ...product, qty: 1 });
        }
        localStorage.setItem('customer_cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  // Render cart
  function renderCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
      cartList.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = '';
      return;
    }

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <span>${item.name} (x${item.qty})</span>
        <span>GHS ${item.price * item.qty}</span>
        <div>
          <button class="btn small ghost" data-action="decrease" data-id="${item.id}">-</button>
          <button class="btn small" data-action="increase" data-id="${item.id}">+</button>
          <button class="btn small danger" data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartList.appendChild(row);
    });

    cartTotal.textContent = Total: GHS ${total};

    // Handle cart actions
    cartList.querySelectorAll('button[data-id]').forEach(btn => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      btn.addEventListener('click', () => {
        const item = cart.find(c => c.id == id);
        if (!item) return;

        if (action === 'increase') item.qty += 1;
        if (action === 'decrease' && item.qty > 1) item.qty -= 1;
        if (action === 'remove') cart = cart.filter(c => c.id != id);

        localStorage.setItem('customer_cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }
});