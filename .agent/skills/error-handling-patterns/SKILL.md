---
name: error-handling-patterns
description: "Master error handling patterns for vanilla JavaScript and Firebase integrations including try/catch, graceful degradation, and user-friendly error UI. Use when implementing error handling, designing resilient components, or improving application reliability."
---

# Error Handling Patterns (Vanilla JS + Firebase)

Build resilient web applications with robust error handling that gracefully handles failures and provides excellent user feedback — all within Sherif-Auto's vanilla architecture.

## When to Use

- Implementing error handling in new components
- Wiring up Firebase Firestore/Analytics integrations
- Handling async operations (fetch, Firebase SDK calls)
- Building form validation with user-friendly error messages
- Ensuring third-party script failures don't crash the UI
- Adding loading states and fallback behaviors

## Core Patterns for Sherif-Auto

### 1. DOM Guard Pattern

Always verify DOM elements exist before manipulation:

```javascript
const initComponent = () => {
  const container = document.querySelector(".component");
  if (!container) return; // Silent exit — component not on this page

  const button = container.querySelector(".btn");
  if (!button) return;

  button.addEventListener("click", handleClick);
};
```

### 2. Async/Await with Try-Catch

Wrap all network operations:

```javascript
const submitContactForm = async (formData) => {
  const submitBtn = document.querySelector("#submit-btn");

  try {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    const db = getFirestore();
    await addDoc(collection(db, "contact_requests"), {
      ...formData,
      timestamp: serverTimestamp(),
    });

    // Success: GSAP animation
    showSuccess("Thank you! We'll contact you soon.");
  } catch (error) {
    // User-friendly error (never expose raw error messages)
    showError("Something went wrong. Please try again or call us directly.");

    // Log for debugging (remove in production)
    // console.error('Form submission error:', error);
  } finally {
    // Always restore UI state
    submitBtn.disabled = false;
    submitBtn.classList.remove("is-loading");
  }
};
```

### 3. Optional Chaining for Third-Party Scripts

Prevent crashes when ad-blockers or network issues block external scripts:

```javascript
// Firebase Analytics might be blocked by ad-blockers
window.analytics?.logEvent?.("page_view", { page: "gallery" });

// GSAP might not load from CDN
if (typeof gsap !== "undefined") {
  gsap.from(".hero", { opacity: 0, duration: 1 });
} else {
  // Fallback: show content immediately without animation
  document.querySelector(".hero")?.style.setProperty("opacity", "1");
}
```

### 4. Image Load Error Handling

```javascript
const handleImageError = (img) => {
  img.onerror = null; // Prevent infinite loop
  img.src = "images/ui/placeholder-vehicle.webp"; // Fallback image
  img.alt = "Image unavailable";
};

// Apply to all gallery images
document.querySelectorAll(".gallery-image").forEach((img) => {
  img.addEventListener("error", () => handleImageError(img));
});
```

### 5. Data Validation Before Rendering

```javascript
const renderVehicleCard = (vehicle) => {
  // Validate required fields
  if (!vehicle || !vehicle.name || !vehicle.brand) {
    return ""; // Skip invalid entries silently
  }

  const thumbnail =
    vehicle.thumbnail_path || "images/ui/placeholder-vehicle.webp";
  const alt = `${vehicle.brand} ${vehicle.name}`;

  return `
    <article class="vehicle-card">
      <img src="${thumbnail}" alt="${alt}" loading="lazy" width="400" height="300"
           onerror="this.src='images/ui/placeholder-vehicle.webp'">
      <h3 class="vehicle-card__title">${vehicle.name}</h3>
    </article>
  `;
};
```

### 6. User-Friendly Error UI

```javascript
const showError = (message) => {
  const errorEl = document.querySelector(".error-toast");
  if (!errorEl) return;

  errorEl.textContent = message;
  errorEl.classList.add("is-visible");

  // Auto-dismiss after 5 seconds
  gsap.to(errorEl, {
    opacity: 0,
    y: -20,
    delay: 5,
    duration: 0.4,
    onComplete: () => errorEl.classList.remove("is-visible"),
  });
};

const showSuccess = (message) => {
  const successEl = document.querySelector(".success-toast");
  if (!successEl) return;

  successEl.textContent = message;
  gsap.from(successEl, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power3.out",
  });
};
```

## Error Categories

| Category        | Example                          | Strategy                                |
| --------------- | -------------------------------- | --------------------------------------- |
| **Expected**    | Invalid form input               | Show specific error message to user     |
| **Network**     | Firebase timeout, CDN failure    | Retry once, then show friendly fallback |
| **Missing DOM** | Element not on this page         | Silent `return` (not an error)          |
| **Data**        | Missing thumbnail path           | Use placeholder, skip entry             |
| **Third-Party** | Analytics blocked by ad-blocker  | Optional chaining, graceful skip        |
| **Critical**    | Firebase SDK fails to initialize | Show "Contact us by phone" fallback     |

## Best Practices

1. **Never expose raw error messages** to users — always use friendly language
2. **Always restore UI state** in `finally` blocks (buttons, loading spinners)
3. **Use `try...catch`** for every `async` operation without exception
4. **Guard DOM queries** — check existence before attaching listeners
5. **Provide fallbacks** — placeholder images, "contact us" alternatives
6. **Don't swallow errors silently** — at minimum, handle the user experience
7. **Remove `console.log()`** before production deployment

## Specialized Resources

### 1. Language-Specific Patterns

Detailed implementation patterns for vanilla JavaScript error handling:
👉 **[`resources/language-patterns.md`](resources/language-patterns.md)**

### 2. Universal Resilience Patterns

Architectural patterns like graceful degradation and error aggregation:
👉 **[`resources/universal-patterns.md`](resources/universal-patterns.md)**

### 3. Best Practices & Pitfalls

Common mistakes and checklist items:
👉 **[`resources/best-practices.md`](resources/best-practices.md)**
