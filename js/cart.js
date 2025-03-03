window.onload = function () {
    let cartTotal = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function calculateTotal() {
        cartTotal = 0;
        cart.forEach(item => {
            cartTotal += parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity;
        });
    };

    function updateCartTotals() {
        const cartTotalTable = document.querySelector("#subtotal table");

        if (cartTotal == 0) {
            cartTotalTable.innerHTML = `
            <tr>
                <td>Cart Subtotal</td>
                <td>$ 0.00</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>$ 10.00</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$ 0.00</strong></td>
            </tr>
        `;
        } else {
            cartTotalTable.innerHTML = `
            <tr>
                <td>Cart Subtotal</td>
                <td>$ ${cartTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>$ 10.00</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$ ${(cartTotal + 10).toFixed(2)}</strong></td>
            </tr>
        `;
        }
    };

    function updateCartCount() {
        const cartCount = document.querySelector("#cart-count");
        let count = 0;
    
        cart.forEach(item => {
            count = count + parseInt(item.quantity);
        });
    
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.classList.add("show");
        } else {
            cartCount.classList.remove("show");
        }
    };

    const cartContainer = document.querySelector('tbody');

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        let subtotal = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity;

        row.innerHTML = `
            <td><a href="#" class="remove-item"><i class="fa-regular fa-circle-xmark"></i></a></td>
            <td><img src=${item.image} alt=""></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input class="quantity-input" type="number" value="${item.quantity}" min="1" step="1"></td>
            <td class="item-subtotal">$${subtotal}</td>
        `;

        cartContainer.appendChild(row);

        // Remove from Cart Functionality
        const removeIcon = row.querySelector(".remove-item");
        removeIcon.addEventListener("click", function (e) {
            e.preventDefault();
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartContainer.removeChild(row);

            calculateTotal();
            updateCartTotals();
            updateCartCount();
        });

        // Quantity Changed Functionality
        const quantityInput = row.querySelector(".quantity-input");
        quantityInput.addEventListener("change", () => {
            const newQuantity = parseInt(quantityInput.value);
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            subtotal = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * newQuantity;
            row.querySelector('.item-subtotal').textContent = `$${subtotal}`;

            calculateTotal();
            updateCartTotals();
            updateCartCount();
        });
    });

    calculateTotal();
    updateCartTotals();
    updateCartCount();
};