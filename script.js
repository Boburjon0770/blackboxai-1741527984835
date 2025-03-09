// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.cartCount = document.querySelector('.fa-shopping-cart + span');
    }

    addItem(product) {
        this.items.push(product);
        this.updateTotal();
        this.updateCartCount();
        this.showNotification(`${product.name} savatga qo'shildi`);
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    }

    updateCartCount() {
        this.cartCount.textContent = this.items.length;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-[-100%]';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('button');
    addToCartButtons.forEach(button => {
        if (button.textContent.trim() === 'Savatga') {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.bg-white');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseInt(productCard.querySelector('.text-blue-600').textContent.replace(/[^\d]/g, ''));
                
                cart.addItem({
                    name: productName,
                    price: productPrice
                });
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let errorMessages = [];

        // Name validation
        if (!nameInput.value.trim()) {
            isValid = false;
            errorMessages.push('Iltimos, ismingizni kiriting');
            nameInput.classList.add('border-red-500');
        } else {
            nameInput.classList.remove('border-red-500');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errorMessages.push('Iltimos, to\'g\'ri email manzilini kiriting');
            emailInput.classList.add('border-red-500');
        } else {
            emailInput.classList.remove('border-red-500');
        }

        // Message validation
        if (!messageInput.value.trim()) {
            isValid = false;
            errorMessages.push('Iltimos, xabarni kiriting');
            messageInput.classList.add('border-red-500');
        } else {
            messageInput.classList.remove('border-red-500');
        }

        if (!isValid) {
            // Show error messages
            const errorDiv = document.createElement('div');
            errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
            errorDiv.innerHTML = errorMessages.map(msg => `<p>${msg}</p>`).join('');
            
            const existingError = contactForm.querySelector('.bg-red-100');
            if (existingError) {
                existingError.remove();
            }
            contactForm.insertBefore(errorDiv, contactForm.firstChild);
        } else {
            // Form is valid, show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
            successDiv.innerHTML = '<p>Xabaringiz muvaffaqiyatli yuborildi!</p>';
            
            const existingMessages = contactForm.querySelector('.bg-red-100, .bg-green-100');
            if (existingMessages) {
                existingMessages.remove();
            }
            contactForm.insertBefore(successDiv, contactForm.firstChild);
            
            // Clear form
            contactForm.reset();
        }
    });

    // Add hover animations to product cards
    const productCards = document.querySelectorAll('.bg-white.rounded-lg');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add search functionality
    const searchIcon = document.querySelector('.fa-search');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4';
    searchContainer.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Qidirish</h3>
                <button class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <input type="text" 
                   placeholder="Mahsulot nomini kiriting..." 
                   class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
    `;

    document.body.appendChild(searchContainer);

    searchIcon.addEventListener('click', () => {
        searchContainer.classList.remove('hidden');
    });

    searchContainer.querySelector('button').addEventListener('click', () => {
        searchContainer.classList.add('hidden');
    });

    // Close search on outside click
    searchContainer.addEventListener('click', (e) => {
        if (e.target === searchContainer) {
            searchContainer.classList.add('hidden');
        }
    });
});

// Add scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.className = 'fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hidden items-center justify-center hover:bg-blue-700 transition duration-300';
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopButton);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to top on click
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
