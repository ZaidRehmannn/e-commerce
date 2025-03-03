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

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

Promise.all([
    fetch('../data/products.json').then(response => response.json()),
    fetch('../data/newproducts.json').then(response => response.json())
])
    .then(([products1, products2]) => {
        const products = [...products1, ...products2];  // Combine both arrays

        const product = products.find(product => product.id == productId);

        if (product) {
            const singleProImage = document.querySelector(".single-pro-image");

            const mainImg = document.createElement("img");
            mainImg.setAttribute("id", "MainImg");
            mainImg.src = product.image;
            mainImg.style.width = "100%";

            singleProImage.appendChild(mainImg);

            const smallImgGroup = document.createElement("div");
            smallImgGroup.classList.add("small-img-group");

            product.smallImages.forEach(imgSrc => {
                const imgCol = document.createElement("div");
                imgCol.classList.add("small-img-col");

                const imgElement = document.createElement("img");
                imgElement.classList.add("small-img");
                imgElement.src = imgSrc;
                imgElement.style.width = "100%";

                imgElement.addEventListener("click", () => {
                    const matchedProduct = products.find(product => product.image === imgSrc);
                    if (matchedProduct) {
                        window.location.href = `sproduct.html?id=${matchedProduct.id}`;
                    }
                });

                imgCol.appendChild(imgElement);
                smallImgGroup.appendChild(imgCol);
            });

            singleProImage.appendChild(smallImgGroup);

            const single_pro_details = document.querySelector('.single-pro-details');

            const newContent = `
            <h6>Home / ${product.brand}</h6>
            <h4>${product.name}</h4>
            <h2>${product.price}</h2>
            `;

            single_pro_details.innerHTML = newContent + single_pro_details.innerHTML;

            // Add to Cart Button Functionality
            const AddtoCartBtn = document.querySelector(".single-pro-details button");

            AddtoCartBtn.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const selectedQuantity = parseInt(document.querySelector('input[type="number"]').value);

                const existingProductIndex = cart.findIndex(item => item.id == product.id);

                if (existingProductIndex != -1) {
                    cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + selectedQuantity;
                } else {
                    const addedproduct = {
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        quantity: document.querySelector('input[type="number"]').value
                    }

                    cart.push(addedproduct);
                }

                localStorage.setItem('cart', JSON.stringify(cart));

                AddtoCartBtn.classList.add("item-added");
                AddtoCartBtn.textContent = "Item Added";
                AddtoCartBtn.disabled = true;
                updateCartCount();
            });
        }
    })