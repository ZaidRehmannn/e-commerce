let currentPage = 1;
const blogsPerPage = 3;

function loadBlogs() {
    fetch('../data/blogs.json')
        .then(response => response.json())
        .then(blogs => {
            renderBlogs(blogs, currentPage);
            setupPagination(blogs.length);
        })
};

function renderBlogs(blogs, page) {
    const blogContainer = document.querySelector('#blog');
    blogContainer.innerHTML = '';    // Clear previous blogs

    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const paginatedBlogs = blogs.slice(start, end);

    paginatedBlogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('blog-box');

        blogElement.innerHTML = `
            <div class="blog-img">
                <img src="${blog.image}" alt="${blog.title}">
            </div>
            <div class="blog-details">
                <h4>${blog.title}</h4>
                <p>${blog.description}</p>
                <a href="#">CONTINUE READING</a>
            </div>
            <h1>${blog.date}</h1>
            `;

        blogContainer.appendChild(blogElement);
    });
};

function setupPagination(totalBlogs) {
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = '';     // Clear previous pagination

    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

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
            loadBlogs();
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

loadBlogs();
updateCartCount();