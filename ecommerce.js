
        let products = [];
        let cart = [];

        // Fetch products from the fake API
        async function fetchProducts() {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            displayProducts(products);
        }

        // Display products
        function displayProducts(products) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <h4>⭐${product.rating.rate}</h4>
                    <p>Price: ₹${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productContainer.appendChild(productElement);
            });
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            showNotification(); // Show the notification when item is added to cart
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Update cart display
        function updateCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            let totalMRP = 0;

            cart.forEach(item => {
                totalMRP += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>₹${item.price}</p>
                        <div class="quantity-control">
                            <button onclick="decreaseQuantity(${item.id})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            document.getElementById('total-mrp').innerText = totalMRP;
            document.getElementById('total-amount').innerText = totalMRP + 20 + 10 - 50;
        }

        // Increase quantity
        function increaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity++;
                updateCart();
            }
        }

        // Decrease quantity
        function decreaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else {
                removeFromCart(productId);
            }
            updateCart();
        }

        // Show notification when an item is added to cart
        function showNotification() {
            const notification = document.getElementById('cart-notification');
            notification.style.display = 'block'; // Show the notification
            setTimeout(() => {
                notification.style.display = 'none'; // Hide it after 3 seconds
            }, 3000);
        }

        // Search functionality
        document.getElementById('search-button').addEventListener('click', () => {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
            displayProducts(filteredProducts);
        });

        // Fetch and display products when the page loads
        fetchProducts();