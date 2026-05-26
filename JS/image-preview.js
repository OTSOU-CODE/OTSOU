// Mobile PDP JavaScript - Sherif Siege Auto

// Gallery data
const galleryData = [
  {
    id: 1,
    src: 'images/gallery/Black-&-Orange.webp',
    title: 'Premium Black & Orange',
    code: 'B-O-001',
    price: 2500,
    oldPrice: 3200,
    description: 'Sporty two-tone upholstery with vibrant orange accents. Perfect for those who want to stand out with a custom look.',
    colorCode: 'linear-gradient(135deg, #000000 50%, #FF4500 50%)',
    variants: [
      { src: 'images/gallery/Black-&-Orange.webp', title: 'Main View' },
      { src: 'images/Image Variaant/Black-&-Orange-1.webp', title: 'Side View' },
      { src: 'images/Image Variaant/Black-&-Orange-2.webp', title: 'Detail View' },
      { src: 'images/Image Variaant/Black-&-Orange-3.webp', title: 'Back View' },
      { src: 'images/Image Variaant/Black-&-Orange-4.webp', title: 'Interior View' }
    ]
  },
  {
    id: 2,
    src: 'images/gallery/Blue.webp',
    title: 'Elegant Blue Style',
    code: 'BL-002',
    price: 2400,
    oldPrice: 3000,
    description: 'Sophisticated blue leather design. Adds a touch of class and calm to your interior.',
    colorCode: '#1E3A8A',
    variants: [
      { src: 'images/gallery/Blue.webp', title: 'Main View' }
    ]
  },
  {
    id: 3,
    src: 'images/gallery/Red.webp',
    title: 'Classic Red Design',
    code: 'RD-003',
    price: 2600,
    oldPrice: 3400,
    description: 'Rich red leather interior with premium stitching. A bold choice for a bold driver.',
    colorCode: '#DC2626',
    variants: [
      { src: 'images/gallery/Red.webp', title: 'Main View' }
    ]
  },
  {
    id: 4,
    src: 'images/gallery/Dark-blue-&-white.webp',
    title: 'Modern Dark Blue & White',
    code: 'BW-004',
    price: 2700,
    oldPrice: 3500,
    description: 'Bold contrast with exceptional craftsmanship. Creates a bright and airy feel inside.',
    colorCode: 'linear-gradient(135deg, #1E3A8A 50%, #FFFFFF 50%)',
    variants: [
      { src: 'images/gallery/Dark-blue-&-white.webp', title: 'Main View' },
      { src: 'images/Image Variaant/Dark-blue-&-white-1.webp', title: 'Side View' },
      { src: 'images/Image Variaant/Dark-blue-&-white-2.webp', title: 'Detail View' },
      { src: 'images/Image Variaant/Dark-blue-&-white-2 (2).webp', title: 'Back View' },
      { src: 'images/Image Variaant/Dark-blue-&-white4.webp', title: 'Interior View' }
    ]
  },
  {
    id: 5,
    src: 'images/gallery/Black-&-Red.webp',
    title: 'Sporty Black & Red',
    code: 'BR-005',
    price: 2500,
    oldPrice: 3200,
    description: 'Dynamic black and red leather combination. Racing inspired aesthetics for your daily drive.',
    colorCode: 'linear-gradient(135deg, #000000 50%, #DC2626 50%)',
    variants: [
      { src: 'images/gallery/Black-&-Red.webp', title: 'Main View' },
      { src: 'images/Image Variaant/Black-&-Red-1.webp', title: 'Side View' },
      { src: 'images/Image Variaant/Black-&-Red-2.webp', title: 'Detail View' },
      { src: 'images/Image Variaant/Black-&-Red-3.webp', title: 'Back View' },
      { src: 'images/Image Variaant/Black-&-Red-4.webp', title: 'Interior View' }
    ]
  }
];

let currentImageIndex = 0;
let qty = 1;

document.addEventListener('DOMContentLoaded', function () {
  initPDP();
  updateCartBadge();
  initHeaderActions();
  initWishlist();
});

function initPDP() {
  const urlParams = new URLSearchParams(window.location.search);
  currentImageIndex = parseInt(urlParams.get('index')) || 0;

  if (currentImageIndex < 0 || currentImageIndex >= galleryData.length) {
    currentImageIndex = 0;
  }

  const product = galleryData[currentImageIndex];
  renderProduct(product);
  renderColorVariants();
}

function renderProduct(product) {
  // 1. Populate Text Info
  const titleEl = document.getElementById('product-title');
  if (titleEl) titleEl.textContent = product.title;

  const descEl = document.getElementById('product-description');
  if (descEl) {
    descEl.textContent = product.description;
  }

  // Update Prices
  const priceEls = document.querySelectorAll('.current-price, .bar-text span');
  priceEls.forEach(el => el.textContent = `${product.price} MAD`);
  
  const oldPriceEl = document.querySelector('.old-price');
  if (oldPriceEl) oldPriceEl.textContent = `${product.oldPrice} MAD`;

  // Sticky Bar Info
  const barTitle = document.getElementById('barTitle');
  if (barTitle) barTitle.textContent = product.title;

  const barThumb = document.getElementById('barThumb');
  if (barThumb) barThumb.src = product.src;

  // 2. Setup Gallery (Main Image + Thumbnails)
  const mainImage = document.getElementById('mainImage');
  const thumbnailsGrid = document.getElementById('thumbnailsGrid');
  const variants = product.variants || [{ src: product.src }];

  if (mainImage && variants.length > 0) {
    // Set initial main image
    mainImage.src = variants[0].src;
    mainImage.classList.add('fade-in'); 
    
    // Clear thumbs
    if (thumbnailsGrid) {
        thumbnailsGrid.innerHTML = '';
        
        variants.forEach((variant, index) => {
            const btn = document.createElement('button');
            btn.className = `thumbnail-btn ${index === 0 ? 'active' : ''}`;
            btn.onclick = () => {
                // Update Main Image
                mainImage.style.opacity = '0.5';
                setTimeout(() => {
                    mainImage.src = variant.src;
                    mainImage.style.opacity = '1';
                }, 150);
                
                // Update active state
                thumbnailsGrid.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };

            const img = document.createElement('img');
            img.src = variant.src;
            img.alt = variant.title || `View ${index + 1}`;
            
            btn.appendChild(img);
            thumbnailsGrid.appendChild(btn);
        });
    }
  }
  
  // Update Wishlist State
  checkWishlist(product.id);
}

function renderColorVariants() {
  const colorContainer = document.getElementById('colorOptions');
  const selectedNameVal = document.getElementById('selectedColorName');
  
  if (colorContainer) {
    colorContainer.innerHTML = '';

    galleryData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `color-btn ${index === currentImageIndex ? 'active' : ''}`;
      // Basic gradient logic
      btn.style.background = item.colorCode || '#ccc'; 
      btn.onclick = () => switchProduct(index);
      
      const icon = document.createElement('i');
      icon.className = 'fas fa-check';
      btn.appendChild(icon);
      
      colorContainer.appendChild(btn);
      
      if (index === currentImageIndex && selectedNameVal) {
          selectedNameVal.textContent = item.title;
      }
    });
  }
}

function switchProduct(index) {
  if (index < 0 || index >= galleryData.length) return;

  currentImageIndex = index;
  const product = galleryData[currentImageIndex];

  // Update URL without reloading
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('index', index);
  window.history.pushState({}, '', newUrl);

  renderProduct(product);
  renderColorVariants();
}

/* --- Accordion Logic --- */
function toggleAccordion(btn) {
    btn.classList.toggle('active');
    const content = btn.nextElementSibling;
    
    if (content) {
        content.classList.toggle('active');
    }
}
window.toggleAccordion = toggleAccordion;

/* --- Config Logic --- */
function selectConfig(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update displayed price based on selection
    updateDisplayedPrice();
}
window.selectConfig = selectConfig;

function updateDisplayedPrice() {
    const product = galleryData[currentImageIndex];
    let extraPrice = 0;
    
    const activeConfigBtn = document.querySelector('.config-btn.active');
    if (activeConfigBtn) {
       const priceText = activeConfigBtn.querySelector('.config-price').textContent;
       const match = priceText.match(/\+(\d+)/);
       if (match) {
           extraPrice = parseInt(match[1]);
       }
    }
    
    const finalPrice = product.price + extraPrice;
    
    // Update Main Price
    document.querySelectorAll('.current-price').forEach(el => {
        el.textContent = `${finalPrice} MAD`;
    });
    
    // Update Sticky Bar Price
    const barPrice = document.querySelector('.bar-text span');
    if (barPrice) {
        barPrice.textContent = `${finalPrice} MAD`;
    }
}

/* --- Quantity Logic --- */
function updateQty(change) {
  const qtyInput = document.getElementById('qtyInput');
  if (!qtyInput) return;
  
  let currentVal = parseInt(qtyInput.value) || 1;
  const newVal = currentVal + change;
  
  if (newVal > 0) {
      qtyInput.value = newVal;
      qty = newVal;
  }
}
window.updateQty = updateQty;

/* --- Cart Logic --- */
function addToCart(btn) {
  if (!btn) return;

  /* --- Config Price Logic --- */
  let extraPrice = 0;
  const activeConfigBtn = document.querySelector('.config-btn.active');
  if (activeConfigBtn) {
      const priceText = activeConfigBtn.querySelector('.config-price').textContent;
      // Extract number from "+850 MAD"
      const match = priceText.match(/\+(\d+)/);
      if (match) {
          extraPrice = parseInt(match[1]);
      }
  }

  const product = galleryData[currentImageIndex];
  const finalPrice = product.price + extraPrice;

  const cartItem = {
      id: product.id,
      title: product.title,
      price: finalPrice, 
      basePrice: product.price,
      image: product.src,
      quantity: qty,
      config: activeConfigBtn ? activeConfigBtn.querySelector('.config-name').textContent : 'Standard'
  };
  
  // Save to LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart_items')) || [];
  // Check if exists
  const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.config === cartItem.config);
  
  if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
  } else {
      cart.push(cartItem);
  }
  
  localStorage.setItem('cart_items', JSON.stringify(cart));
  
  // Notify other components (like Cart Drawer)
  window.dispatchEvent(new CustomEvent('cartUpdated'));

  updateCartBadge();

  // Visual Feedback
  btn.innerHTML = '<i class="fas fa-check"></i> Added';
  btn.style.background = '#4CAF50'; 
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    btn.style.background = ''; 
  }, 1500);
}
window.addToCart = addToCart;

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    
    const cart = JSON.parse(localStorage.getItem('cart_items')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

/* --- Wishlist Logic --- */
function initWishlist() {
    const btns = document.querySelectorAll('.header-icon-btn[title="Wishlist"], .wishlist-btn-overlay');
    
    btns.forEach(btn => {
       btn.onclick = () => {
           const product = galleryData[currentImageIndex];
           toggleWishlistItem(product);
       }; 
    });
}

function toggleWishlistItem(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist_items')) || [];
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
        wishlist.splice(index, 1); // Remove
        // alert('Removed from Wishlist');
    } else {
        wishlist.push({ id: product.id, title: product.title, image: product.src });
        // alert('Added to Wishlist');
    }
    
    localStorage.setItem('wishlist_items', JSON.stringify(wishlist));
    renderWishlistState(wishlist);
    
    // Notify Drawer
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

function checkWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist_items')) || [];
    renderWishlistState(wishlist);
}

function renderWishlistState(wishlist) {
    const productId = galleryData[currentImageIndex].id;
    const isSaved = wishlist.some(item => item.id === productId);
    
    // Update Hearts
    const hearts = document.querySelectorAll('.wishlist-btn-overlay i, .header-icon-btn[title="Wishlist"] i');
    hearts.forEach(icon => {
        if (isSaved) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--error)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
}

/* --- Header Actions --- */
function initHeaderActions() {

    
    const cartBtn = document.querySelector('.header-icon-btn[title="Cart"]');
    if (cartBtn) {
        cartBtn.onclick = () => {
            // alert('Opening Cart...');
            // In a real app, redirect to cart.html or open side drawer
        };
    }
}


