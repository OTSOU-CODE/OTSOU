/**
 * Cart Drawer Logic
 * Handles showing/hiding the cart sidebar and managing cart state.
 */

export function initCartDrawer() {
    // 1. Inject HTML if not present
    if (!document.querySelector('.cart-drawer')) {
        const drawerHTML = `
            <div class="cart-overlay" id="cartOverlay"></div>
            <div class="cart-drawer" id="cartDrawer">
                <div class="cart-header">
                    <h2 class="cart-title">Your Cart</h2>
                    <button class="close-cart-btn" id="closeCartBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-items-container" id="cartItemsContainer">
                    <!-- Items Injected Here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total-row">
                        <span>Total</span>
                        <span id="cartTotal">0 MAD</span>
                    </div>
                    <button class="checkout-btn" onclick="alert('Proceeding to Checkout...')">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', drawerHTML);
    }

    // 2. Event Listeners
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    const closeBtn = document.getElementById('closeCartBtn');
    
    // Open Triggers (Any button with class 'open-cart-trigger' or specific ID)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.header-icon-btn[title="Cart"]') || e.target.closest('.open-cart-trigger')) {
            openCart();
        }
    });

    // Close Triggers
    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // Initial Render
    renderCartItems();
}

export function openCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    
    renderCartItems(); // Refresh data before showing
    
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock scroll
}

export function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
}

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(
        /[&<>'"]/g,
        (tag) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}

function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotal');
    const cart = JSON.parse(localStorage.getItem('cart_items')) || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <div class="empty-cart-icon"><i class="fas fa-shopping-basket"></i></div>
                <p>Your cart is empty.</p>
                <button class="btn btn-secondary" onclick="document.getElementById('closeCartBtn').click()">Start Shopping</button>
            </div>
        `;
        totalEl.textContent = '0 MAD';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${escapeHTML(item.title)}</h4>
                <div class="cart-item-config">
                    ${escapeHTML(item.config)} | <span class="cart-item-price">${escapeHTML(item.price)} MAD</span>
                </div>
                <div class="cart-item-controls">
                    <div class="item-qty-control">
                        <button class="item-qty-btn minus" data-index="${index}">-</button>
                        <span class="item-qty-val">${escapeHTML(item.quantity)}</span>
                        <button class="item-qty-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(cartItem);
    });

    totalEl.textContent = `${total} MAD`;

    // Add Listeners for controls
    container.querySelectorAll('.item-qty-btn.minus').forEach(btn => {
        btn.onclick = () => updateCartItemQty(parseInt(btn.dataset.index), -1);
    });
    container.querySelectorAll('.item-qty-btn.plus').forEach(btn => {
        btn.onclick = () => updateCartItemQty(parseInt(btn.dataset.index), 1);
    });
    container.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.onclick = () => removeCartItem(parseInt(btn.dataset.index));
    });
}

export function updateCartItemQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart_items')) || [];
    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart_items', JSON.stringify(cart));
    renderCartItems();
    updateGlobalBadge(); // Helper to update header badge
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart_items')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart_items', JSON.stringify(cart));
    renderCartItems();
    updateGlobalBadge();
}

function updateGlobalBadge() {
    // Dispatch event or manually update if function available
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    // Fallback direct update
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const cart = JSON.parse(localStorage.getItem('cart_items')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}
