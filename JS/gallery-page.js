// Gallery Page JavaScript for SHERIF-SIEGE-AUTO Mobile Website

function escapeHTML(str) {
  if (!str) return "";
  return String(str).replace(/[&<>'"]/g, (tag) => {
    switch (tag) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case "'": return '&#39;';
      case '"': return '&quot;';
      default: return tag;
    }
  });
}

// Gallery data
const galleryData = [
  {
    src: "images/gallery/Black-&-Orange.webp",
    title: "Premium Black & Orange",
    description: "Sporty two-tone upholstery with vibrant orange accents.",
  },

  {
    src: "images/gallery/Dark-blue-&-white.webp",
    title: "Modern Dark Blue & White",
    description: "Bold contrast with exceptional craftsmanship.",
  },
  {
    src: "images/gallery/Black-&-Red.webp",
    title: "Sporty Black & Red",
    description: "Dynamic black and red leather combination.",
  },
];

// Global variables
let galleryItems = [];

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGallery();
  setupGalleryEvents();
  animateStats();

});

// Initialize gallery
function initGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  // Clear existing content
  galleryGrid.innerHTML = "";

  // Add loading state
  galleryGrid.innerHTML = `
    <div class="gallery-loading">
      <i class="fas fa-spinner"></i>
      <span>Loading gallery...</span>
    </div>
  `;

  // Load images with error handling
  loadGalleryImages();
}

// Load gallery images
// Load gallery images directly
function loadGalleryImages() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  // Clear loading state
  galleryGrid.innerHTML = "";

  if (galleryData.length === 0) {
    showEmptyState();
    return;
  }

  // Create gallery items directly
  galleryData.forEach((item, index) => {
    const galleryItem = createGalleryItem(item, index);
    galleryGrid.appendChild(galleryItem);
  });

  // Trigger animations
  setTimeout(() => {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 100);
    });
  }, 100);
}

// Create gallery item HTML

// Stats Animation
function animateStats() {
  const statsSection = document.querySelector(".gallery-stats");
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numbers = statsSection.querySelectorAll(".stat-number");
          numbers.forEach((num) => {
            const target = parseInt(num.innerText);
            if (isNaN(target)) return; // Skip if not a number (e.g. "99%")

            let current = 0;
            const suffix = num.innerText.replace(/[0-9]/g, "");
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
              current += 1;
              num.innerText = current + suffix;
              if (current >= target) {
                clearInterval(timer);
                num.innerText = target + suffix; // Ensure exact end value
              }
            }, stepTime);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

// Store gallery items for modal

// Create gallery item
function createGalleryItem(item, index) {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";
  galleryItem.setAttribute("data-index", index);

  // Gallery image container
  const galleryImage = document.createElement("div");
  galleryImage.className = "gallery-image";

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.title;
  img.title = item.title;
  img.setAttribute("loading", "lazy");
  galleryImage.appendChild(img);

  const overlay = document.createElement("div");
  overlay.className = "gallery-overlay";
  const overlayIcon = document.createElement("i");
  overlayIcon.className = "fas fa-search-plus";
  overlay.appendChild(overlayIcon);
  galleryImage.appendChild(overlay);

  galleryItem.appendChild(galleryImage);

  // Gallery content container
  const galleryContent = document.createElement("div");
  galleryContent.className = "gallery-content";

  const title = document.createElement("h3");
  title.className = "gallery-title";
  title.textContent = item.title;
  galleryContent.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "gallery-description";
  desc.textContent = item.description;
  galleryContent.appendChild(desc);

  galleryItem.appendChild(galleryContent);

  // Add click event - navigate to detail page
  galleryItem.addEventListener("click", () => {
    window.location.href = `image-preview.html?index=${index}`;
  });

  // Add touch feedback
  galleryItem.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.98)";
  });

  galleryItem.addEventListener("touchend", function () {
    this.style.transform = "";
  });

  return galleryItem;
}

// Show empty state
function showEmptyState() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = `
    <div class="gallery-empty">
      <i class="fas fa-images"></i>
      <h3>No Images Available</h3>
      <p>We're working on adding more photos to our gallery. Please check back soon!</p>
    </div>
  `;
}

// Setup gallery events
function setupGalleryEvents() {
  // Any additional events
}

