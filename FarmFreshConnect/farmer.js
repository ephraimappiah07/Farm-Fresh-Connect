document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('farmer-form');
  const list = document.getElementById('product-list');

  // Load saved products
  let products = JSON.parse(localStorage.getItem('farmer_products') || '[]');
  renderProducts();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const desc = document.getElementById('product-desc').value.trim();
    const imgUrl = document.getElementById('product-img-url').value.trim();
    const imgFile = document.getElementById('product-img-file').files[0];

    if (!name || !price || !desc) {
      alert('Please fill all fields.');
      return;
    }

    let productImg = imgUrl;
    if (imgFile) {
      productImg = URL.createObjectURL(imgFile); // temporary browser URL
    }
    if (!productImg) {
      productImg = 'https://via.placeholder.com/300x200?text=No+Image';
    }

    const product = { id: Date.now(), name, price, desc, img: productImg };
    products.push(product);
    localStorage.setItem('farmer_products', JSON.stringify(products));

    renderProducts();
    form.reset();
  });

  function renderProducts() {
    list.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="price">GHS ${p.price}</p>
          <p class="card-desc">${p.desc}</p>
          <button class="btn small ghost" data-id="${p.id}">Delete</button>
        </div>
      `;
      list.appendChild(card);
    });

    // Handle delete
    list.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        products = products.filter(p => p.id != id);
        localStorage.setItem('farmer_products', JSON.stringify(products));
        renderProducts();
      });
    });
  }
});