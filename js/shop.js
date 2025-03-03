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

let currentPage = 1;
const productsPerPage = 8;

function loadProducts() {
    Promise.all([
        fetch('../data/products.json').then(response => response.json()),
        fetch('../data/newproducts.json').then(response => response.json())
    ])
        .then(([products1, products2]) => {
            const products = [...products1, ...products2];
            renderProducts(products, currentPage);
            setupPagination(products.length);
        })
};

function renderProducts(products, page) {
    const productContainer = document.querySelector('.pro-container');
    productContainer.innerHTML = '';    // Clear previous products

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
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
};

function setupPagination(totalProducts) {
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = '';     // Clear previous pagination

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = "#";
        pageLink.innerText = i;

        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            loadProducts();
        });

        paginationContainer.appendChild(pageLink);
    }
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

loadProducts();
updateCartCount();