
// ===============================
//  LOAD CART FROM LOCALSTORAGE
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
//  SELECT ALL ADD TO CART BUTTONS
// ===============================
const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});


// ===============================
// ➕ ADD TO CART FUNCTION
// ===============================
function addToCart(e) {
  const product = e.target.closest(".product");

  const title = product.querySelector(".item").innerText;
  const priceText = product.querySelector(".Price").innerText;
  const price = Number(priceText.replace("$", ""));
  const image = product.querySelector("img").src;

  const existingItem = cart.find((item) => item.title === title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      title,
      price,
      image,
      quantity: 1,
    });
  }

  saveCart();
  displayCart();
}


// ===============================
//  SAVE CART
// ===============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


// ===============================
// DISPLAY CART ITEMS
// ===============================
const cartContainer = document.getElementById("cart-container");

function displayCart() {
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    // Main container
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Image
    const img = document.createElement("img");
    img.src = item.image;
    img.width = 10;
    img.height=10;

    // Info container
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("cart-info");

    // Title
    const title = document.createElement("h4");
    title.textContent = item.title;

    // Price
    const price = document.createElement("p");
    price.textContent = `$${item.price}`;

    // Quantity container
    const qtyDiv = document.createElement("div");
    qtyDiv.classList.add("qty-controls");

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.addEventListener("click", () => {
      changeQty(index, -1);
    });

    const qtyText = document.createElement("span");
    qtyText.textContent = item.quantity;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      changeQty(index, 1);
    });

    qtyDiv.appendChild(minusBtn);
    qtyDiv.appendChild(qtyText);
    qtyDiv.appendChild(plusBtn);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      removeItem(index);
    });

    // Build structure
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(qtyDiv);

    cartItem.appendChild(img);
    cartItem.appendChild(infoDiv);
    cartItem.appendChild(removeBtn);

    cartContainer.appendChild(cartItem);
  });

  updateTotal();
}


// ===============================
//  CHANGE QUANTITY
// ===============================
function changeQty(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
}


// ===============================
//  REMOVE ITEM
// ===============================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}


// ===============================
// UPDATE TOTAL PRICE
// ===============================
function updateTotal() {
  const totalElement = document.getElementById("total-price");
  if (!totalElement) return;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  totalElement.textContent = total.toFixed(2);
}


displayCart();
