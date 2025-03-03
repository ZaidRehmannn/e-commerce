let bar = document.getElementById("bar");
let nav = document.getElementById("navbar");
let close = document.getElementById("close");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    })
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    })
}

function loadProducts(containerSelector, jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(products => {
            const productContainer = document.querySelector(containerSelector);

            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('pro');

                const uniqueProductID = product.id;
                productElement.setAttribute('id', `product-${uniqueProductID}`);

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="des">
                        <span>${product.brand}</span>
                        <h5>${product.name}</h5>
                        <div class="star">
                            ${'<i class="fas fa-star"></i>'.repeat(product.stars)}
                        </div>
                        <h4>${product.price}</h4>
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
                `;

                productElement.addEventListener('click', () => {
                    window.location.href = `sproduct.html?id=${uniqueProductID}`;
                });

                productContainer.appendChild(productElement);
            });
        })
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

loadProducts('.pro-container', '../data/products.json');
loadProducts('.new-pro-container', '../data/newproducts.json');
updateCartCount();