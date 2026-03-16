// =========================
// NAVIGATION (Hamburger)
// =========================
const body = document.querySelector('body');
const navMenu = body.querySelector('.menu-content');
const navOpenBtn = body.querySelector('.navOpen-btn');
const navCloseBtn = navMenu.querySelector('.navClose-btn');

// Open mobile nav
if(navMenu && navOpenBtn){
    navOpenBtn.addEventListener("click", () => {
        navMenu.classList.add("open");
        body.style.overflowY = "hidden"; // prevent background scroll
    });
}

// Close mobile nav
if(navMenu && navCloseBtn){
    navCloseBtn.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.style.overflowY = "scroll"; // restore scroll
    });
}

// Close nav when clicking any menu link
document.querySelectorAll(".menu-list a").forEach(link => {
    link.addEventListener("click", () => {
        if(navMenu.classList.contains("open")){
            navMenu.classList.remove("open");
            body.style.overflowY = "scroll";
        }
    });
});

// =========================
// CART MANAGEMENT
// =========================
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartItems');
    if (!cartList) return;
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₱${item.price} 
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>`;
        cartList.appendChild(li);
    });

    const cartCountElem = document.getElementById('cartCount');
    if (cartCountElem) cartCountElem.innerText = cart.length;
}

// =========================
// LIVE PRODUCT SEARCH
// =========================
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const productName = (product.getAttribute('data-name') || product.querySelector('h3')?.innerText || '').toLowerCase();
            product.style.display = productName.includes(searchValue) ? 'block' : 'none';
        });
    });
}

// =========================
// CONTACT FORM SUBMISSION
// =========================
const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const number = form.number.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        // Build Gmail message
        const bodyContent = `Name: ${name}\nContact Number: ${number}\nEmail: ${email}\n\nMessage:\n${message}`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("yourgmail@gmail.com")}&su=${encodeURIComponent("Singku Coffee Contact Form Message")}&body=${encodeURIComponent(bodyContent)}`;

        // Open Gmail compose in a new tab
        window.open(gmailLink, '_blank');

        // Optional: reset form
        form.reset();
    });
}
