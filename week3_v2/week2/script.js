// PRODUCTS
const products = [
  {id:1, name:"Shirt", price:500},
  {id:2, name:"Shoes", price:1000},
  {id:3, name:"Watch", price:1500}
];

// -------- VALIDATION HELPERS --------
function showError(msg) {
  alert(msg);
  return false;
}

function validateUsername(u) {
  return u.length >= 3;
}

function validatePassword(p) {
  return p.length >= 4;
}

// -------- REGISTER --------
function register() {
  let u = regUser.value.trim();
  let p = regPass.value.trim();

  if (!u || !p) return showError("All fields required");

  if (!validateUsername(u))
    return showError("Username must be at least 3 characters");

  if (!validatePassword(p))
    return showError("Password must be at least 4 characters");

  if (localStorage.getItem(u))
    return showError("User already exists");

  localStorage.setItem(u, p);
  alert("Registered successfully");
}

// -------- LOGIN --------
function login() {
  let u = loginUser.value.trim();
  let p = loginPass.value.trim();

  if (!u || !p) return showError("All fields required");

  if (localStorage.getItem(u) !== p)
    return showError("Invalid username or password");

  localStorage.setItem("user", u);
  window.location = "catalog.html";
}

// -------- LOAD PRODUCTS --------
function loadProducts() {
  let container = document.getElementById("products");

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

// -------- ADD TO CART --------
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // prevent duplicates
  if (cart.includes(id)) {
    return showError("Item already in cart");
  }

  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// -------- LOAD CART --------
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach(id => {
    let p = products.find(x => x.id === id);

    container.innerHTML += `
      <div class="cart-item">
        <span>${p.name}</span>
        <span>₹${p.price}</span>
      </div>
    `;
  });
}