
const API_BASE = '/api'; // if backend served together, otherwise change to full backend URL
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartUI() {
  cartCountEl.textContent = cart.length;
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += Number(item.price || 0);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image || 'assets/prod1.jpg'}" />
      <div style="flex:1">
        <div style="font-weight:600">${item.title}</div>
        <div>₹${item.price}</div>
        <button class="btn" onclick="removeFromCart('${item._id}')">Remove</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
  cart = cart.filter(i => i._id !== id);
  updateCartUI();
}

cartBtn.onclick = () => { cartSidebar.classList.toggle('hidden') }

async function fetchProducts(q='') {
  const url = `${API_BASE}/products${q ? '?q=' + encodeURIComponent(q) : ''}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    console.error('Fetch products error', err);
  }
}

function renderProducts(products) {
  productGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image || 'assets/prod1.jpg'}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <div style="margin-top:10px">
        <button class="btn add-btn" onclick='addToCart(${JSON.stringify(p).replaceAll("'", "\'")})'>Add to cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(p) {
  cart.push(p);
  updateCartUI();
  alert('Added to cart');
}

document.getElementById('searchBtn')?.addEventListener('click', ()=> fetchProducts(searchInput.value));
document.getElementById('searchInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') fetchProducts(searchInput.value) });

/* Initialize */
updateCartUI();
fetchProducts();
