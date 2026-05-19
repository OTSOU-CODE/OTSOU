/**
 * Wishlist Drawer Logic
 * Handles showing/hiding the wishlist sidebar and managing wishlist state.
 */

export function initWishlistDrawer() {
    // 1. Inject HTML if not present
    if (!document.querySelector('.wishlist-drawer')) {
        const drawerHTML = `
            <div class="wishlist-overlay" id="wishlistOverlay"></div>
            <div class="wishlist-drawer" id="wishlistDrawer">
                <div class="wishlist-header">
                    <h2 class="wishlist-title">My Wishlist</h2>
                    <button class="close-wishlist-btn" id="closeWishlistBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="wishlist-items-container" id="wishlistItemsContainer">
                    <!-- Items Injected Here -->
                </div>
                <div class="wishlist-footer">
                   <!-- Maybe bulk add to cart later? -->
                   <button class="btn-clear-wishlist" id="clearWishlistBtn">Clear Wishlist</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', drawerHTML);
    }

    // 2. Event Listeners
    const overlay = document.getElementById('wishlistOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    const closeBtn = document.getElementById('closeWishlistBtn');
    const clearBtn = document.getElementById('clearWishlistBtn');
    
    // Open Triggers (Any button with class 'open-wishlist-trigger' or specific ID)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.header-icon-btn[title="Wishlist"]') || e.target.closest('.open-wishlist-trigger')) {
            openWishlist();
        }
    });

    // Close Triggers
    closeBtn.addEventListener('click', closeWishlist);
    overlay.addEventListener('click', closeWishlist);
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to clear your wishlist?')) {
                localStorage.removeItem('wishlist_items');
                renderWishlistItems();
                // Trigger an update to main page state (hearts)
                window.dispatchEvent(new CustomEvent('wishlistUpdated'));
            }
        });
    }

    // Listen for updates from other parts of the app
    window.addEventListener('wishlistUpdated', renderWishlistItems);

    // Initial Render
    renderWishlistItems();
}

export function openWishlist() {
    const overlay = document.getElementById('wishlistOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    
    renderWishlistItems();
    
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden'; 
}

export function closeWishlist() {
    const overlay = document.getElementById('wishlistOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = ''; 
}

function renderWishlistItems() {
    const container = document.getElementById('wishlistItemsContainer');
    const wishlist = JSON.parse(localStorage.getItem('wishlist_items')) || [];

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist-message">
                <div class="empty-wishlist-icon"><i class="far fa-heart"></i></div>
                <p>Your wishlist is empty.</p>
                <button class="btn btn-secondary" onclick="document.getElementById('closeWishlistBtn').click()">Browse Products</button>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    wishlist.forEach((item, index) => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        // Assuming item has id, title, image. 
        // We create a simpler card than cart.
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="wishlist-item-img">
            <div class="wishlist-item-details">
                <h4 class="wishlist-item-title">${item.title}</h4>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart-from-wishlist" data-index="${index}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                    <button class="remove-wishlist-item-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        container.appendChild(wishlistItem);
    });

    // Add Listeners
    container.querySelectorAll('.remove-wishlist-item-btn').forEach(btn => {
        btn.onclick = () => removeWishlistItem(parseInt(btn.dataset.index));
    });
    
    container.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
        btn.onclick = () => {
             // Logic to add to cart... slightly complex because we need price/config. 
             // Ideally we just redirect to PDP or add base item.
             // For now, let's just redirect to PDP with that ID if possible, or attempt add.
             // Data structure in wishlist only has id, title, image (from image-preview.js).
             // We can redirect:
             const index = parseInt(btn.dataset.index);
             const item = wishlist[index];
             // Assuming we can map ID to gallery index or similar. 
             // Or we just close drawer and let them click? 
             // Best to just alert or redirect.
             
             // Simplest: Redirect to product page with index? 
             // The ID in galleryData is 1..5. Index is 0..4.
             // item.id is 1..5.
             window.location.href = `image-preview.html?index=${item.id - 1}`;
        };
    });
}

function removeWishlistItem(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist_items')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist_items', JSON.stringify(wishlist));
    renderWishlistItems();
    
    // Dispatch event so main page hearts update
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}
