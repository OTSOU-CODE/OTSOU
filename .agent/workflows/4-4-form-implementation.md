---
description: Frontend Development - Form Implementation
---

# Form Implementation Workflow (Sherif-Auto)

START → Scaffold Accessible HTML → Write CSS Mod → Implement Input Validations → Wire Firebase Connect → END

## Scope & Context

All forms (like the "Get Price" contact module) are built natively, preventing reliance on Formik or React Hook Form.

## Steps:

1. **Scaffold HTML Form Elements:**
   - Use native form elements with `<label for="id">` explicitly linked to the inputs.
   - Assign semantic inputs (`type="email"`, `type="tel"`).
   - Add placeholder text while retaining visible labels for accessibility.

2. **Implement Input Validations (Vanilla JS):**
   - Listen for the `submit` event on the `<form>`. **Always call `e.preventDefault()`.**
   - Check input validity strings (e.g., regex for Email format `^[^\s@]+@[^\s@]+\.[^\s@]+$`).
   - Implement real-time validation feedback on `blur` or `input` using CSS toggles (`.is-invalid`).

3. **UI Micro-interactions:**
   - Trigger a Gold (`#D4AF37`) border glow on `.input:focus`.
   - On submit, disable the submit button and inject a CSS-based spinner or GSAP loader to prevent double-submissions.

4. **Wire the Firebase Connect:**
   - Construct the Data Payload (e.g., `const formData = { name, email, phone, message }`).
   - Use `try...catch` when pushing data to Firestore or triggering email webhooks.

5. **Error & Success Handling:**
   - `try`: Trigger GSAP fade out of the form, reveal a Green/Gold Success Message ("Thank you! We'll contact you soon").
   - `catch`: Show a contextual error message below the submit button.

6. **Accessibility Testing:**
   - Ensure absolute full keyboard navigation using `Tab` and `Enter`.
