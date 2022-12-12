let topHeader = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    topHeader.style.cssText = `background-color: #151111; transition: .3s`
  } else {
    topHeader.style.cssText = `background-color: transparent; transition: .3s`
  }
});

let barsIcon = document.querySelector(".header .bars-icons .bars");
let barsXmark = document.querySelector(".header .bars-icons .xmark");
let mobNav = document.querySelector(".header .mobile-nav");

barsIcon.addEventListener("click", showMobNav);

function showMobNav() {
  mobNav.classList.add(`show-mobile-menu`);
  barsXmark.style.cssText = `display: inline;`;
  barsIcon.style.cssText = `display: none;`;
};

barsXmark.addEventListener("click", closeMobNav);

function closeMobNav() {
  mobNav.classList.remove(`show-mobile-menu`);
  mobNav.style.transition = `.8s`;
  barsXmark.style.cssText = `display: none;`;
  barsIcon.style.cssText = `display: inline;`;
};

// Shopping Cart Start

let cartIcon = document.querySelectorAll(".cart");
let shoppingCart = document.querySelector(".super-container .shopping-cart");
let closeCartIcon = document.querySelector(".shopping-cart .head .close-cart");
let removeBoxIcon = document.querySelectorAll(".shopping-cart .cart-box .remove-cart-box");

cartIcon.forEach((e) => {
  e.addEventListener("click", showCart);
})

function showCart() {
  shoppingCart.style.visibility = "visible";
  shoppingCart.style.opacity = "1";
};

closeCartIcon.addEventListener("click", closeCart);

function closeCart() {
  shoppingCart.style.visibility = "hidden";
  shoppingCart.style.opacity = "0";
};

// 

let counter = 0;
let emptyCart = document.querySelector(".shopping-cart .empty-cart");

for (let i = 0; i < removeBoxIcon.length; i++) {
  let button = removeBoxIcon[i];
  button.addEventListener("click", removeFromCart);
};
function removeFromCart(event) {
  counter--;
  if (counter <= 0) {
    emptyCart.style.display = "block";
  }
  let button = event.target;
  button.parentElement.remove();
  updateCartTotal();
};

let quantityInputs = document.querySelectorAll(".cart-box .quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", updateCartTotal);
};

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".shopping-cart");
  let cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let quantityElement = cartBox.querySelector(".cart-box .quantity");
    let priceElement = cartBox.querySelector(".cart-price");
    let totalCartPrice = cartBox.querySelector(".total-cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = quantityElement.value;
    total = price * quantity;
    totalCartPrice.innerHTML = "$" + total + ".00";
  }
};

let productBoxes = document.querySelectorAll(".product-boxes .box");

let addBtns = document.querySelectorAll(".add-to-cart");

for (let i = 0; i < addBtns.length; i++) {
  let addBtn = addBtns[i];
  addBtn.addEventListener("click", addNewCartBox);
};

function addNewCartBox(event) {
  counter++;
  let addBtn = event.target;
  let productBox = addBtn.parentElement.parentElement;
  let imageSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector(".txt-content h4").innerText;
  let price =  productBox.querySelector(".txt-content .product-price").innerText;
  if (counter > 0) {
    emptyCart.style.display = "none";
  }
  addProductsToCart(imageSrc, title, price);
  updateCartTotal();
  showCart();
};
function addProductsToCart(imageSrc, title, price) {
  let productTitles = document.querySelectorAll(".cart-name");
  for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].innerText === title) {
      let quantityInputs = document.querySelectorAll(".cart-box .quantity");
      counter--;
      quantityInputs[i].value++;
      return
    }
  }
    let newBox = document.createElement("div");
  newBox.classList.add("cart-box");
  let shoppingCartCont = document.querySelector(".shopping-cart .cart-boxes");
  shoppingCartCont.prepend(newBox);
  let newBoxContent = `
  <i class="fa-solid fa-xmark remove-cart-box"></i>
  <img src="${imageSrc}" alt="">
  <span class="cart-name">${title}</span>
  <span class="cart-price">${price}</span>
  <input type="number" min="1" value="1" class="quantity">
  <span class="total-cart-price">$0.00</span>
  `
  newBox.innerHTML = newBoxContent;
  newBox.querySelector(".cart-box .remove-cart-box").addEventListener("click", removeFromCart);
  newBox.querySelector(".cart-box .quantity").addEventListener("change", updateCartTotal);
};
