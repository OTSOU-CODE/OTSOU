---
description: "Frontend Development - Form Implementation"
---

# Form Implementation Workflow (Sherif-Auto)

START → Scaffold Accessible HTML → Write CSS Module → Implement Validation → Wire Firebase → Success/Error States → A11Y Test → END

## Scope & Context

All forms (like the "Get Quote" contact module) are built natively with HTML5, Vanilla CSS, and ES6 JavaScript. No Formik, React Hook Form, or validation libraries.

## Prerequisites

- Read `.ai/brand-guidelines.md` for form styling tokens
- Firebase Web SDK connected and configured

## Steps

### 1. SCAFFOLD ACCESSIBLE HTML

- [ ] Use native `<form>` element with explicit `<label for="id">` pairs
- [ ] Use semantic input types (`type="email"`, `type="tel"`, `type="text"`)
- [ ] Add `required` attribute for mandatory fields
- [ ] Include `autocomplete` attributes for better UX
- [ ] Add placeholder text while retaining visible labels

```html
<form id="contact-form" class="contact-form" novalidate>
  <div class="form-group">
    <label for="contact-name" class="form-label">Full Name</label>
    <input
      type="text"
      id="contact-name"
      name="name"
      class="form-input"
      required
      minlength="2"
      maxlength="100"
      autocomplete="name"
      placeholder="Your full name"
      aria-describedby="name-error"
    />
    <span
      id="name-error"
      class="form-error"
      role="alert"
      aria-live="polite"
    ></span>
  </div>

  <div class="form-group">
    <label for="contact-email" class="form-label">Email Address</label>
    <input
      type="email"
      id="contact-email"
      name="email"
      class="form-input"
      required
      autocomplete="email"
      placeholder="your@email.com"
      aria-describedby="email-error"
    />
    <span
      id="email-error"
      class="form-error"
      role="alert"
      aria-live="polite"
    ></span>
  </div>

  <div class="form-group">
    <label for="contact-phone" class="form-label">Phone Number</label>
    <input
      type="tel"
      id="contact-phone"
      name="phone"
      class="form-input"
      autocomplete="tel"
      placeholder="+213 XXX XXX XXX"
      aria-describedby="phone-error"
    />
    <span
      id="phone-error"
      class="form-error"
      role="alert"
      aria-live="polite"
    ></span>
  </div>

  <div class="form-group">
    <label for="contact-message" class="form-label">Message</label>
    <textarea
      id="contact-message"
      name="message"
      class="form-input form-textarea"
      required
      minlength="10"
      maxlength="2000"
      placeholder="Describe your upholstery project..."
      aria-describedby="message-error"
    ></textarea>
    <span
      id="message-error"
      class="form-error"
      role="alert"
      aria-live="polite"
    ></span>
  </div>

  <button type="submit" class="btn-primary form-submit" id="submit-btn">
    <span class="btn-text">Send Request</span>
    <span class="btn-spinner" aria-hidden="true"></span>
  </button>
</form>
```

### 2. WRITE MODULAR CSS

```css
/* CSS/contact-form.css */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: var(--color-text-secondary, #e0e0e0);
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--color-bg-elevated, #121212);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text-primary, #ffffff);
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent-gold, #d4af37);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
}

.form-input.is-invalid {
  border-color: var(--color-error, #f44336);
}

.form-error {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-error, #f44336);
  min-height: 1.25rem; /* Prevent layout shift */
}
```

### 3. IMPLEMENT VALIDATION (Vanilla JS)

```javascript
// JS/contact-form.js
const validators = {
  name: (value) => {
    if (!value.trim()) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 100) return "Name is too long";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email";
    return "";
  },
  phone: (value) => {
    if (value && !/^[\d\s+()-]{7,20}$/.test(value))
      return "Please enter a valid phone number";
    return "";
  },
  message: (value) => {
    if (!value.trim()) return "Message is required";
    if (value.length < 10) return "Message must be at least 10 characters";
    return "";
  },
};

const showError = (input, message) => {
  input.classList.toggle("is-invalid", !!message);
  const errorEl = document.getElementById(`${input.name}-error`);
  if (errorEl) errorEl.textContent = message;
};
```

- [ ] Listen for `submit` event — **always call `e.preventDefault()`**
- [ ] Implement real-time validation on `blur` and `input` events
- [ ] Show/hide error messages with ARIA `role="alert"` for screen readers

### 4. WIRE FIREBASE CONNECTION

```javascript
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const submitToFirestore = async (formData) => {
  const db = getFirestore();
  try {
    await addDoc(collection(db, "contact_requests"), {
      ...formData,
      timestamp: serverTimestamp(),
      source: window.location.pathname,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### 5. SUCCESS & ERROR UI STATES

- [ ] **On Submit:** Disable button, show spinner, prevent double-submission
- [ ] **On Success:** GSAP fade-out form → reveal success message
  ```javascript
  gsap.to(form, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      form.style.display = "none";
      gsap.from(successMessage, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });
    },
  });
  ```
- [ ] **On Error:** Show contextual error below submit button, re-enable form

### 6. ACCESSIBILITY VALIDATION

- [ ] Full keyboard navigation: Tab → Enter → submit workflow
- [ ] Screen reader announces labels, errors, and success messages
- [ ] Error messages use `aria-live="polite"` for dynamic announcement
- [ ] Submit button focus ring visible (gold outline)
- [ ] Form inputs have sufficient color contrast

## Verification Checklist

- [ ] All fields validate correctly (empty, format, length)
- [ ] Real-time validation on blur shows/hides errors
- [ ] Submit disabled during submission (no double-clicks)
- [ ] Firestore receives data with correct schema
- [ ] Success animation plays smoothly
- [ ] Error state is recoverable (user can fix and resubmit)
- [ ] Full keyboard navigation works
- [ ] Mobile layout looks correct (inputs stack, touch-friendly)

## Related Workflows

- **Security:** `/14-1-security-implementation` — Firestore rules for form data
- **Database Design:** `/5-2-database-design` — Collection schema
- **Accessibility:** `/8-2-accessible-component-development` — Focus management
