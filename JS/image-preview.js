// Mobile PDP JavaScript - Sherif Siege Auto

// Gallery data
const galleryData = [
  {
    src: 'images/gallery/Black-&-Orange.png',
    title: 'Premium Black & Orange',
    description: 'Sporty two-tone upholstery with vibrant orange accents. Perfect for those who want to stand out.',
    colorCode: 'linear-gradient(135deg, #000000 50%, #FF4500 50%)',
    variants: [
      { src: 'images/gallery/Black-&-Orange.png', title: 'Main View' },
      { src: 'images/misc/Black-&-Orange-1.png', title: 'Side View' },
      { src: 'images/misc/Black-&-Orange-2.png', title: 'Detail View' },
      { src: 'images/misc/Black-&-Orange-3.png', title: 'Back View' },
      { src: 'images/misc/Black-&-Orange-4.png', title: 'Interior View' }
    ]
  },
  {
    src: 'images/gallery/Blue.png',
    title: 'Elegant Blue Style',
    description: 'Sophisticated blue leather design. Adds a touch of class and calm to your interior.',
    colorCode: '#1E3A8A',
    variants: [
      { src: 'images/gallery/Blue.png', title: 'Main View' }
    ]
  },
  {
    src: 'images/gallery/Red.png',
    title: 'Classic Red Design',
    description: 'Rich red leather interior with premium stitching. A bold choice for a bold driver.',
    colorCode: '#DC2626',
    variants: [
      { src: 'images/gallery/Red.png', title: 'Main View' }
    ]
  },
  {
    src: 'images/gallery/Dark-blue-&-white.png',
    title: 'Modern Dark Blue & White',
    description: 'Bold contrast with exceptional craftsmanship. Creates a bright and airy feel inside.',
    colorCode: 'linear-gradient(135deg, #1E3A8A 50%, #FFFFFF 50%)',
    variants: [
      { src: 'images/gallery/Dark-blue-&-white.png', title: 'Main View' },
      { src: 'images/misc/Dark-blue-&-white-1.png', title: 'Side View' },
      { src: 'images/misc/Dark-blue-&-white-2.png', title: 'Detail View' },
      { src: 'images/misc/Dark-blue-&-white-2 (2).png', title: 'Back View' },
      { src: 'images/misc/Dark-blue-&-white4.png', title: 'Interior View' }
    ]
  },
  {
    src: 'images/gallery/Black-&-Red.png',
    title: 'Sporty Black & Red',
    description: 'Dynamic black and red leather combination. Racing inspired aesthetics for your daily drive.',
    colorCode: 'linear-gradient(135deg, #000000 50%, #DC2626 50%)',
    variants: [
      { src: 'images/gallery/Black-&-Red.png', title: 'Main View' },
      { src: 'images/misc/Black-&-Red-1.png', title: 'Side View' },
      { src: 'images/misc/Black-&-Red-2.png', title: 'Detail View' },
      { src: 'images/misc/Black-&-Red-3.png', title: 'Back View' },
      { src: 'images/misc/Black-&-Red-4.png', title: 'Interior View' }
    ]
  }
];

let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function () {
  initPDP();
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
    descEl.textContent = product.description || 'Premium quality upholstery with exceptional attention to detail.';
  }

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
    mainImage.classList.add('fade-in'); // Trigger animation if any
    
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
}

function renderColorVariants() {
  const colorContainer = document.getElementById('colorOptions');
  const selectedNameVal = document.getElementById('selectedColorName');
  
  if (colorContainer) {
    colorContainer.innerHTML = '';

    galleryData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `color-btn ${index === currentImageIndex ? 'active' : ''}`;
      btn.style.background = item.colorCode || '#ccc';
      btn.onclick = () => switchProduct(index);
      
      // Icon
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

/* --- Quantity Logic --- */
let qty = 1;

function updateQty(change) {
  const qtyInput = document.getElementById('qtyInput');
  if (!qtyInput) return;
  
  let currentVal = parseInt(qtyInput.value) || 1;
  const newVal = currentVal + change;
  
  if (newVal > 0) {
      qtyInput.value = newVal;
  }
}

/* --- Add to Cart --- */
function addToCart(btn) {
  if (!btn) return;

  const originalContent = btn.innerHTML;
  const originalBg = btn.style.background;

  btn.innerHTML = '<i class="fas fa-check"></i> Added';
  btn.style.background = '#4CAF50'; // Green

  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.style.background = ''; // Revert to CSS default
  }, 1500);
}

// Make functions global for inline onclick
window.updateQty = updateQty;
window.addToCart = addToCart;
window.selectColor = switchProduct; // Mapping for safety

