function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) return;

  const cart = JSON.parse(localStorage.getItem("dungeonCart")) || [];

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;
}

// Insert announcement bar on every page
document.addEventListener("DOMContentLoaded", () => {
  const announcement = document.createElement("div");

  announcement.className = "announcement";
  announcement.innerHTML = `
        FREE SHIPPING ON ORDERS OVER $25. HURRY UP, OFFER ENDS IN
        <span id="countdown">01:00:00</span>
    `;

  document.body.prepend(announcement);

  // Set expiration time if one doesn't exist
  let expiration = localStorage.getItem("offerExpiration");

  if (!expiration || Number(expiration) <= Date.now()) {
    expiration = Date.now() + 60 * 60 * 1000;
    localStorage.setItem("offerExpiration", expiration);
  }

  const countdown = document.getElementById("countdown");

  function updateCountdown() {
    const remaining = Math.max(
      0,
      Math.floor((Number(expiration) - Date.now()) / 1000),
    );

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    countdown.textContent =
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");

    if (remaining === 0) {
      clearInterval(timer);
    }
  }

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);
});

// ======================================
// DUNGEON DEALS - PRODUCT DATA
// ======================================
const products = [
  {
    id: "vintage-dragon-shirt",
    name: "Vintage Dragon T-Shirt",
    category: "shirts",
    price: 13.5,
    originalPrice: 45.0,
    images: ["img/shirt/1.webp", "img/shirt/2.jpg", "img/shirt/3.webp"],
    description: "A vintage-inspired dragon design for your next adventure.",
    soldOut: false,
    featured: true,
    hasSizes: true,
  },
  {
    id: "demilich-hoodie",
    name: "Demilich Hoodie",
    category: "hoodies",
    price: 25.0,
    originalPrice: 75.0,
    images: ["img/hoodie/1.webp", "img/hoodie/2.jpg", "img/hoodie/3.webp"],
    description:
      "Printed art on the front, back, and sleeves · Drawstring hood · Long sleeves · Front pouch pocket · 100% cotton · Imported",
    soldOut: false,
    featured: true,
    hasSizes: true,
  },
  {
    id: "mystic-dice",
    name: "Mystic Dice Set",
    category: "accessories",
    price: 5.0,
    originalPrice: 25.0,
    images: ["img/dice/1.webp", "img/dice/2.webp", "img/dice/3.webp"],
    description: "A mystical dice set for your next campaign.",
    soldOut: false,
    featured: true,
    hasSizes: false,
  },
  {
    id: "dragons-lair-mug",
    name: "Dragon's Lair Mug",
    category: "accessories",
    price: 2.0,
    originalPrice: 20.0,
    images: ["img/mug/1.webp", "img/mug/2.webp", "img/mug/3.webp"],
    description: "A fantasy-inspired mug for your everyday adventures.",
    soldOut: true,
    featured: true,
    hasSizes: false,
  },
  {
    id: "tarrasque-heavyweight-tee",
    name: "Tarrasque Heavyweight Tee",
    category: "shirts",
    price: 35.0,
    originalPrice: 40.0,
    images: [
      "img/shirt/4.webp",
      "img/shirt/5.webp",
      "img/shirt/6.webp",
    ],
    description: "The Forge is our heavyweight graphic tee collection.",
    soldOut: false,
    featured: false,
    hasSizes: true,
  },
  {
    id: "beanie",
    name: "Beanie",
    category: "accessories",
    price: 18.0,
    originalPrice: 25.0,
    images: ["img/benie/1.webp", "img/benie/2.webp"],
    description:
      "Built for cooler days and comfort at the top of mind.",
    soldOut: false,
    featured: false,
    hasSizes: false,
  },
  {
    id: "best-friend-necklace",
    name: "Best Friend Necklace Set",
    category: "accessories",
    price: 16.0,
    originalPrice: 20.0,
    images: ["img/necklace/1.webp", "img/necklace/2.webp", "img/necklace/3.webp", "img/necklace/4.webp"],
    description: "Dungeons & Dragons Dice Cage Best Friend Necklace Set",
    soldOut: true,
    featured: false,
    hasSizes: false,
  },
  {
    id: "how-i-roll-hoodie",
    name: "How I Roll Hoodie",
    category: "hoodies",
    price: 70.0,
    originalPrice: 100.0,
    images: ["img/hoodie/4.webp"],
    description:
      "Has the dragon with the large number die of the dice on the front.",
    soldOut: false,
    featured: false,
    hasSizes: true,
  },
];

// ======================================
// SHOP PAGE
// ======================================

const productGrid = document.getElementById("product-grid");

if (productGrid) {
  const categoryFilter = document.getElementById("category-filter");
  const sortProducts = document.getElementById("sort-products");
  const productCount = document.getElementById("product-count");
  const noProducts = document.getElementById("no-products");

  function displayProducts() {
    let filteredProducts = [...products];

    // Filter by category
    const category = categoryFilter.value;

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category,
      );
    }

    // Sort products
    if (sortProducts.value === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortProducts.value === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    productGrid.innerHTML = "";

    productCount.textContent = `${filteredProducts.length} PRODUCTS`;

    noProducts.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach((product) => {
      const discount = Math.round(
        (1 - product.price / product.originalPrice) * 100,
      );

      const card = document.createElement("div");
      card.className = "col-6 col-md-4 col-lg-3";

      card.innerHTML = `
                <div class="shop-product-card">

                    <a href="product.html?id=${product.id}"
                       class="shop-product-image">

                       
                        <img src="${product.images?.[0] || product.image}" alt="${product.name}">

                        ${
                          product.soldOut
                            ? '<span class="product-status sold-out-label">SOLD OUT</span>'
                            : `<span class="product-status sale-label">-${discount}%</span>`
                        }
                    </a>

                    <div class="shop-product-info">
                        <span class="card-category">
                            ${product.category.toUpperCase()}
                        </span>

                        <h3>
                            <a href="product.html?id=${product.id}">
                                ${product.name}
                            </a>
                        </h3>

                        <div class="card-price">
                            <del>$${product.originalPrice.toFixed(2)}</del>
                            <strong>$${product.price.toFixed(2)}</strong>
                        </div>

                        <a href="product.html?id=${product.id}"
                           class="view-product">
                            VIEW PRODUCT
                        </a>
                    </div>

                </div>
            `;

      productGrid.appendChild(card);
    });
  }

  categoryFilter.addEventListener("change", displayProducts);
  sortProducts.addEventListener("change", displayProducts);

  displayProducts();
}

// ======================================
// HOMEPAGE - FEATURED PRODUCTS
// ======================================

const featuredGrid = document.getElementById("featured-products");

if (featuredGrid) {
  const featuredProducts = products.filter((product) => product.featured);

  featuredGrid.innerHTML = "";

  featuredProducts.forEach((product) => {
    const discount = Math.round(
      (1 - product.price / product.originalPrice) * 100,
    );

    const image = product.images?.[0] || product.image;

    const card = document.createElement("div");
    card.className = "col-6 col-lg-3";

    card.innerHTML = `
            <div class="product-card ${product.soldOut ? "product-image" : ""}">

                <a href="product.html?id=${product.id}">
                    <img src="${image}" alt="${product.name}">
                </a>

                <h5>${product.name}</h5>

                ${product.soldOut ? '<div class="sold-out">SOLD OUT</div>' : ""}

                <div class="product-price-container">
                    <div class="price">
                        <del class="original-price">
                            $${product.originalPrice.toFixed(2)}
                        </del>

                        <ins class="discounted-price">
                            $${product.price.toFixed(2)}
                        </ins>

                        <span class="sale-badge">
                            Save ${discount}%
                        </span>
                    </div>
                </div>

                <a href="product.html?id=${product.id}"
                   class="product-button">
                    VIEW PRODUCT
                </a>

            </div>
        `;

    featuredGrid.appendChild(card);
  });
}

// ======================================
// INDIVIDUAL PRODUCT PAGE
// ======================================

const detailImage = document.getElementById("detail-image");

if (detailImage) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = products.find((item) => item.id === productId);

  if (!product) {
    document.querySelector(".product-detail-info").innerHTML = `
            <h1>PRODUCT NOT FOUND</h1>
            <p>Looks like this item has wandered off on its own adventure.</p>
            <a href="shop.html" class="view-product">BACK TO SHOP</a>
        `;
  } else {
    // Show or hide size selector depending on the product
    const sizeOption = document.getElementById("product-size-option");

    if (product.hasSizes) {
      sizeOption.style.display = "block";
    } else {
      sizeOption.style.display = "none";
    }

    document.title = `${product.name} | Dungeon Deals`;

    document.getElementById("breadcrumb-name").textContent =
      product.name.toUpperCase();

    const mainImage = document.getElementById("detail-image");
    const thumbnails = document.getElementById("product-thumbnails");

    // Set the first image as the main image
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    // Generate thumbnails
    thumbnails.innerHTML = "";

    product.images.forEach((image, index) => {
      const thumbnail = document.createElement("img");

      thumbnail.src = image;
      thumbnail.alt = `${product.name} - Image ${index + 1}`;

      if (index === 0) {
        thumbnail.classList.add("active");
      }

      thumbnail.addEventListener("click", () => {
        mainImage.src = image;

        // Update active thumbnail
        document
          .querySelectorAll(".product-thumbnails img")
          .forEach((img) => img.classList.remove("active"));

        thumbnail.classList.add("active");
      });

      thumbnails.appendChild(thumbnail);
    });

    document.getElementById("detail-name").textContent = product.name;

    document.getElementById("detail-category").textContent =
      product.category.toUpperCase();

    document.getElementById("detail-price").textContent =
      `$${product.price.toFixed(2)}`;

    document.getElementById("detail-original-price").textContent =
      `$${product.originalPrice.toFixed(2)}`;

    document.getElementById("detail-description").textContent =
      product.description;

    const badge = document.getElementById("detail-badge");
    const addButton = document.getElementById("add-to-cart");

    if (product.soldOut) {
      badge.textContent = "SOLD OUT";
      badge.style.display = "block";
      addButton.disabled = true;
      addButton.textContent = "SOLD OUT";
    } else {
      const discount = Math.round(
        (1 - product.price / product.originalPrice) * 100,
      );

      badge.textContent = `-${discount}%`;
      badge.style.display = "block";
    }

    // Simulated shopping cart
    addButton.addEventListener("click", () => {
      const quantity = Number(
        document.getElementById("product-quantity").value,
      );

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        document.getElementById("product-message").textContent =
          "Please enter a quantity between 1 and 10.";
        return;
      }

      const size = product.hasSizes
        ? document.getElementById("product-size").value
        : null;

      let cart = JSON.parse(localStorage.getItem("dungeonCart")) || [];

      const existingItem = cart.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          size: size,
          quantity: quantity,
        });
      }

      localStorage.setItem("dungeonCart", JSON.stringify(cart));
      updateCartCount();

      document.getElementById("product-message").textContent =
        "Added to your cart!";
    });
  }
}

// ======================================
// DUNGEON DEALS - CART PAGE
// ======================================

const cartItemsContainer = document.getElementById("cart-items");

if (cartItemsContainer) {
  const emptyCart = document.getElementById("empty-cart");
  const cartSummary = document.getElementById("cart-summary");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");

  function getCart() {
    return JSON.parse(localStorage.getItem("dungeonCart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("dungeonCart", JSON.stringify(cart));
    updateCartCount();
  }

  function displayCart() {
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      emptyCart.hidden = false;
      cartSummary.hidden = true;
      return;
    }

    emptyCart.hidden = true;
    cartSummary.hidden = false;

    let subtotal = 0;

    cart.forEach((item, index) => {
      const product = products.find((product) => product.id === item.id);

      const image = product ? product.images?.[0] || product.image : "";

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
                <img
                    src="${image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >

                <div class="cart-item-info">
                    <h3>${item.name}</h3>

                    ${item.size ? `<p>Size: ${item.size}</p>` : ""}

                    <p class="cart-item-price">
                        $${Number(item.price).toFixed(2)}
                    </p>

                    <div class="cart-quantity">
                        <button type="button" data-action="decrease"
                            data-index="${index}" aria-label="Decrease quantity">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button type="button" data-action="increase"
                            data-index="${index}" aria-label="Increase quantity">
                            +
                        </button>
                    </div>
                </div>

                <div class="cart-item-right">
                    <strong>$${itemTotal.toFixed(2)}</strong>

                    <button
                        type="button"
                        class="remove-cart-item"
                        data-action="remove"
                        data-index="${index}"
                    >
                        REMOVE
                    </button>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;

    checkoutButton.hidden = cart.length === 0;
  }

  cartItemsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;
    const cart = getCart();

    if (!cart[index]) return;

    if (action === "increase" && cart[index].quantity < 10) {
      cart[index].quantity++;
    }

    if (action === "decrease") {
      cart[index].quantity--;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
  });

  displayCart();
}

// ======================================
// DUNGEON DEALS - SIMULATED CHECKOUT
// ======================================

const checkoutItemsContainer = document.getElementById("checkout-items");

if (checkoutItemsContainer) {
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutContent = document.getElementById("checkout-content");
  const checkoutEmpty = document.getElementById("checkout-empty");
  const orderSuccess = document.getElementById("order-success");

  const cart = JSON.parse(localStorage.getItem("dungeonCart")) || [];

  if (cart.length === 0) {
    checkoutContent.hidden = true;
    checkoutEmpty.hidden = false;
  } else {
    let subtotal = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const row = document.createElement("div");
      row.className = "checkout-item";

      row.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <p>
                        Quantity: ${item.quantity}
                        ${item.size ? `· Size: ${item.size}` : ""}
                    </p>
                </div>

                <strong>$${itemTotal.toFixed(2)}</strong>
            `;

      checkoutItemsContainer.appendChild(row);
    });

    const shipping = subtotal >= 25 ? 0 : 4.99;
    const total = subtotal + shipping;

    document.getElementById("checkout-subtotal").textContent =
      `$${subtotal.toFixed(2)}`;

    document.getElementById("checkout-shipping").textContent =
      shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;

    document.getElementById("checkout-total").textContent =
      `$${total.toFixed(2)}`;

    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!checkoutForm.reportValidity()) return;

      const selectedPayment = document.querySelector(
        'input[name="payment"]:checked',
      ).value;

      if (selectedPayment === "card") {
        const number = document
          .getElementById("card-number")
          .value.replace(/\s/g, "");
        const expiry = document.getElementById("card-expiry").value;
        const cvv = document.getElementById("card-cvv").value;

        // // Only accept the documented fictional demo card
        // if (number !== "1234567890123456") {
        //     alert("Invalid card.");
        //     return;
        // }

        // if (expiry !== "12/30" || cvv !== "123") {
        //     alert("Please use the demo expiration date 12/30 and CVV 123.");
        //     return;
        // }
      }

      const orderNumber = "DD-" + Math.floor(100000 + Math.random() * 900000);

sessionStorage.setItem("lastOrderNumber", orderNumber);

localStorage.removeItem("dungeonCart");

window.location.href = "order-success.html";
    });
  }
}

// ======================================
// PAYMENT METHOD INTERACTION
// ======================================

const paymentRadios = document.querySelectorAll('input[name="payment"]');

if (paymentRadios.length > 0) {
  const cardPayment = document.getElementById("card-payment");
  const paypalPayment = document.getElementById("paypal-payment");

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      cardPayment.hidden = radio.value !== "card";
      paypalPayment.hidden = radio.value !== "paypal";

      // Only validate card details when card payment is selected
      document.querySelectorAll("#card-payment input").forEach((input) => {
        input.required = radio.value === "card";
      });
    });
  });
}

// Format card number
const cardNumber = document.getElementById("card-number");

if (cardNumber) {
  cardNumber.addEventListener("input", () => {
    let value = cardNumber.value.replace(/\D/g, "").slice(0, 16);

    cardNumber.value = value.replace(/(.{4})/g, "$1 ").trim();
  });
}

// Format expiration date
const cardExpiry = document.getElementById("card-expiry");

if (cardExpiry) {
  cardExpiry.addEventListener("input", () => {
    let value = cardExpiry.value.replace(/\D/g, "").slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    cardExpiry.value = value;
  });
}

// Restrict CVV to digits
const cardCVV = document.getElementById("card-cvv");

if (cardCVV) {
  cardCVV.addEventListener("input", () => {
    cardCVV.value = cardCVV.value.replace(/\D/g, "").slice(0, 4);
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);