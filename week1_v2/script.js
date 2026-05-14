// Sample products
const products = [
  {id:1, name:"Shirt", price:500},
  {id:2, name:"Shoes", price:1000},
  {id:3, name:"Watch", price:1500}
];

// REGISTER
function register() {
  let u = regUser.value;
  let p = regPass.value;
  localStorage.setItem(u, p);
  alert("Registered!");
}

// LOGIN
function login() {
  let u = loginUser.value;
  let p = loginPass.value;

  if (localStorage.getItem(u) === p) {
    localStorage.setItem("user", u);
    window.location = "catalog.html";
  } else {
    alert("Invalid login");
  }
}

// LOAD PRODUCTS
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

// ADD TO CART
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// LOAD CART
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart");

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