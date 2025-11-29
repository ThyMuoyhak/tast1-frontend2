 // Product data
        const products = {
            1: {
                name: "Arabica Blend",
                price: 12.99,
                image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "Our signature Arabica blend features beans sourced from the highlands of Cambodia. This coffee offers a smooth, well-balanced flavor with subtle notes of chocolate and caramel.",
                flavorNotes: "Chocolate, Caramel, Nutty",
                roastLevel: "Medium",
                origin: "Cambodia Highlands"
            },
            2: {
                name: "Robusta Premium",
                price: 10.99,
                image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "This robusta blend delivers a strong, full-bodied coffee experience with a rich, earthy flavor profile. Perfect for those who prefer a bold coffee with higher caffeine content.",
                flavorNotes: "Earthy, Woody, Dark Chocolate",
                roastLevel: "Dark",
                origin: "Cambodia Lowlands"
            },
            3: {
                name: "Espresso Roast",
                price: 14.99,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "Specially crafted for espresso lovers, this dark roast offers intense flavors with a rich crema. It's a blend of our finest beans roasted to perfection for espresso machines.",
                flavorNotes: "Dark Chocolate, Caramel, Spice",
                roastLevel: "Dark",
                origin: "Mixed Regions"
            },
            4: {
                name: "Cold Brew Blend",
                price: 13.99,
                image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "This special blend is crafted specifically for cold brewing. It produces a smooth, low-acidity coffee with sweet notes that shine when brewed cold.",
                flavorNotes: "Sweet, Citrus, Cocoa",
                roastLevel: "Medium",
                origin: "Cambodia Highlands"
            },
            5: {
                name: "Single Origin",
                price: 16.99,
                image: "https://images.unsplash.com/photo-1510707577719-ae7c9b788690?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "Experience the unique terroir of Cambodia's Mondulkiri province with this single-origin coffee. Each batch is traceable to specific farms for exceptional quality.",
                flavorNotes: "Floral, Berry, Honey",
                roastLevel: "Light",
                origin: "Mondulkiri, Cambodia"
            },
            6: {
                name: "Decaf Blend",
                price: 11.99,
                image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "Enjoy all the flavor of our premium coffee without the caffeine. Our decaf blend uses a natural Swiss Water process to remove caffeine while preserving flavor.",
                flavorNotes: "Caramel, Nutty, Mild Citrus",
                roastLevel: "Medium",
                origin: "Mixed Regions"
            }
        };

        // Cart functionality
        let cart = [];
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        // Update cart display
        function updateCartDisplay() {
            // Update cart count
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            
            // Update cart items
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                return;
            }
            
            emptyCartMessage.classList.add('hidden');
            
            cart.forEach(item => {
                const product = products[item.id];
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center border-b border-amber-200 py-4';
                cartItem.innerHTML = `
                    <div class="flex items-center">
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                        <div>
                            <h4 class="font-bold text-amber-900">${product.name}</h4>
                            <p class="text-amber-700">$${product.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="text-amber-900 font-bold mr-4">$${(product.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-from-cart text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 p-2 rounded-lg transition" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Update cart totals
            const subtotal = cart.reduce((total, item) => {
                const product = products[item.id];
                return total + (product.price * item.quantity);
            }, 0);
            
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${(subtotal + 2.99).toFixed(2)}`;
        }

        // Add to cart functionality
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                addToCart(productId);
            });
        });

        // Add to cart from modal
        document.getElementById('modal-add-to-cart').addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            addToCart(productId);
            closeModal();
        });

        function addToCart(productId) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
            
            // Show confirmation
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-amber-700 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
            toast.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                <span>Added to cart!</span>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 2000);
        }

        // Remove from cart
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-from-cart')) {
                const productId = e.target.closest('.remove-from-cart').getAttribute('data-id');
                cart = cart.filter(item => item.id !== productId);
                updateCartDisplay();
            }
        });

        // Slideshow functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slide-dot');

        function showSlide(index) {
            slides.forEach(slide => slide.style.opacity = 0);
            dots.forEach(dot => dot.classList.remove('opacity-100'));
            
            slides[index].style.opacity = 1;
            dots[index].classList.add('opacity-100');
            currentSlide = index;
        }

        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        }

        // Auto-advance slides
        setInterval(nextSlide, 5000);

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
            });
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Modal functionality
        const productModal = document.getElementById('product-modal');
        const cartModal = document.getElementById('cart-modal');
        const checkoutModal = document.getElementById('checkout-modal');
        const successModal = document.getElementById('success-modal');

        // View detail buttons
        document.querySelectorAll('.view-detail-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                const product = products[productId];
                
                document.getElementById('modal-product-name').textContent = product.name;
                document.getElementById('modal-product-image').src = product.image;
                document.getElementById('modal-product-image').alt = product.name;
                document.getElementById('modal-product-description').textContent = product.description;
                document.getElementById('modal-flavor-notes').textContent = product.flavorNotes;
                document.getElementById('modal-roast-level').textContent = product.roastLevel;
                document.getElementById('modal-origin').textContent = product.origin;
                document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
                document.getElementById('modal-add-to-cart').setAttribute('data-product', productId);
                
                productModal.classList.remove('hidden');
            });
        });

        // Close modal buttons
        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById('close-cart-modal').addEventListener('click', closeCartModal);
        document.getElementById('close-checkout-modal').addEventListener('click', closeCheckoutModal);
        document.getElementById('close-success-modal').addEventListener('click', closeSuccessModal);
        document.getElementById('continue-shopping').addEventListener('click', closeCartModal);

        function closeModal() {
            productModal.classList.add('hidden');
        }

        function closeCartModal() {
            cartModal.classList.add('hidden');
        }

        function closeCheckoutModal() {
            checkoutModal.classList.add('hidden');
        }

        function closeSuccessModal() {
            successModal.classList.add('hidden');
        }

        // Cart button
        document.getElementById('cart-button').addEventListener('click', function() {
            cartModal.classList.remove('hidden');
        });

        // Checkout button
        document.getElementById('checkout-button').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            cartModal.classList.add('hidden');
            
            // Update order summary
            const orderSummary = document.getElementById('order-summary');
            orderSummary.innerHTML = '';
            
            cart.forEach(item => {
                const product = products[item.id];
                const summaryItem = document.createElement('div');
                summaryItem.className = 'flex justify-between';
                summaryItem.innerHTML = `
                    <span>${product.name} x ${item.quantity}</span>
                    <span>$${(product.price * item.quantity).toFixed(2)}</span>
                `;
                orderSummary.appendChild(summaryItem);
            });
            
            const subtotal = cart.reduce((total, item) => {
                const product = products[item.id];
                return total + (product.price * item.quantity);
            }, 0);
            
            document.getElementById('order-total').textContent = `$${(subtotal + 2.99).toFixed(2)}`;
            
            checkoutModal.classList.remove('hidden');
        });

        // Order form submission
        document.getElementById('order-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('full-name').value;
            const phoneNumber = document.getElementById('phone-number').value;
            const address = document.getElementById('address').value;
            const specialNotes = document.getElementById('special-notes').value;
            
            // Prepare order data
            const orderData = {
                name: fullName,
                phone: phoneNumber,
                address: address,
                notes: specialNotes,
                items: cart.map(item => {
                    const product = products[item.id];
                    return {
                        name: product.name,
                        quantity: item.quantity,
                        price: product.price
                    };
                }),
                total: cart.reduce((total, item) => {
                    const product = products[item.id];
                    return total + (product.price * item.quantity);
                }, 0) + 2.99
            };
            
            // Send to Telegram bot
            sendToTelegram(orderData);
            
            // Show success modal
            checkoutModal.classList.add('hidden');
            successModal.classList.remove('hidden');
            
            // Clear cart
            cart = [];
            updateCartDisplay();
            
            // Reset form
            document.getElementById('order-form').reset();
        });

        // Function to send order to Telegram
        function sendToTelegram(orderData) {
            const botToken = '8413264716:AAHIqatQdcxuz1mqiwbRyRMrZKXqu8Zo550';
            const chatId = '1667587449'; // Your Telegram user ID
            
            // Format the message
            let message = `🛒 *New Coffee Order!* 🛒\n\n`;
            message += `*Customer Information:*\n`;
            message += `Name: ${orderData.name}\n`;
            message += `Phone: ${orderData.phone}\n`;
            message += `Address: ${orderData.address}\n`;
            
            if (orderData.notes) {
                message += `Special Instructions: ${orderData.notes}\n`;
            }
            
            message += `\n*Order Details:*\n`;
            orderData.items.forEach(item => {
                message += `- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            
            message += `\n*Total: $${orderData.total.toFixed(2)}*`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Send to Telegram
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}&parse_mode=Markdown`)
                .then(response => response.json())
                .then(data => {
                    console.log('Message sent to Telegram:', data);
                })
                .catch(error => {
                    console.error('Error sending message to Telegram:', error);
                });
        }

        // Initialize
        updateCartDisplay();
        showSlide(0);