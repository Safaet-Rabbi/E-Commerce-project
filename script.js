document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.dataset.product;
            const price = parseFloat(button.dataset.price);
            addToCart(product, price);
        });
    });

    function addToCart(product, price) {
        const existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="row">
                    <div class="col-md-3">
                        <img src="img/product-1.jpg" class="img-fluid" alt="Product">
                    </div>
                    <div class="col-md-5">
                        <h4>${item.product}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" value="${item.quantity}" min="1" data-product="${item.product}">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger remove-item" data-product="${item.product}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxElement.innerText = `$${tax.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;

        attachEventListeners();
    }

    function attachEventListeners() {
        const removeItemButtons = document.querySelectorAll(".remove-item");
        const quantityInputs = document.querySelectorAll("input[type='number']");

        removeItemButtons.forEach(button => {
            button.addEventListener("click", () => {
                const product = button.dataset.product;
                removeFromCart(product);
            });
        });

        quantityInputs.forEach(input => {
            input.addEventListener("change", () => {
                const product = input.dataset.product;
                const quantity = parseInt(input.value);
                updateQuantity(product, quantity);
            });
        });
    }

    function removeFromCart(product) {
        const index = cart.findIndex(item => item.product === product);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function updateQuantity(product, quantity) {
        const item = cart.find(item => item.product === product);
        if (item) {
            item.quantity = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    displayCart();
});
