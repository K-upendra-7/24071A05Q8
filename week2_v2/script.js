const products = [
  {id:1, name:"Shirt", price:500},
  {id:2, name:"Shoes", price:1000},
  {id:3, name:"Watch", price:1500}
];

// REGISTER
function register() {
  localStorage.setItem(regUser.value, regPass.value);
  alert("Registered!");
}

// LOGIN
function login() {
  if (localStorage.getItem(loginUser.value) === loginPass.value) {
    localStorage.setItem("user", loginUser.value);
    window.location = "catalog.html";
  } else {
    alert("Invalid login");
  }
}

// LOAD PRODUCTS (Bootstrap cards)
function loadProducts() {
  let container = document.getElementById("products");

  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-4 col-sm-6 mb-3">
        <div class="card p-3 text-center shadow-sm">
          <h5>${p.name}</h5>
          <p>₹${p.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added!");
}

// LOAD CART
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart");

  cart.forEach(id => {
    let p = products.find(x => x.id === id);

    container.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${p.name}</span>
        <span>₹${p.price}</span>
      </li>
    `;
  });
}