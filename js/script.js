// Nav open close
const body = document.querySelector('body'),
    navMenu = body.querySelector('.menu-content'),
    navOpenBtn = body.querySelector('.navOpen-btn');
    navCloseBtn = navMenu.querySelector('.navClose-btn');

if(navMenu && navOpenBtn){
    navOpenBtn.addEventListener("click", () => {
        navMenu.classList.add("open");
        body.style.overflowY = "hidden";
    })
}

if(navMenu && navCloseBtn){
    navCloseBtn.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.style.overflowY = "scroll";
    })
}

 let cart = [];

    function addToCart(productName, price) {
        let existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: price, quantity: 1 });
        }
        updateCartDisplay();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartList = document.getElementById('cartItems');
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - ₱${item.price} x ${item.quantity} 
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>`;
            cartList.appendChild(li);
        });
        document.getElementById('cartCount').innerText = cart.reduce((a,b)=>a+b.quantity,0);
    }

    function sendReceipt() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const email = document.getElementById('userEmail').value;
        if (!email) {
            alert("Please enter a recipient email.");
            return;
        }

        let receipt = "Your Singku Coffee Receipt:\n\n";
        let total = 0;
        cart.forEach(item => {
            receipt += `${item.name} - ₱${item.price} x ${item.quantity}\n`;
            total += item.price * item.quantity;
        });
        receipt += `\nTotal: ₱${total}`;

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Singku Coffee Receipt")}&body=${encodeURIComponent(receipt)}`;
        window.open(gmailLink, '_blank');
    }

    document.getElementById('searchInput')?.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            product.style.display = productName.includes(searchValue) ? 'block' : 'none';
        });
    });

// Swiper js
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    //grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }, 
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

