---
description: Frontend Development - State Management Implementation
---

# State Management Implementation (Sherif-Auto)

START → Identify State Needs → Choose Provider → Module Pattern → Render UI Updates → END

## Scope & Context

Sherif-Auto avoids Redux/Context/Zustand. State is managed by raw Vanilla JS closures, Proxy objects, or specialized class singletons (`DataManager.js`).

## Steps:

1. **Identify State Needs:**
   - Is the state global? (e.g., Filter categories selected across pages, Firebase User Auth).
   - Is it local? (e.g., Currently active Image Preview in a gallery modal).

2. **Choose Provider:**
   - **Local State:** Use variables inside a module closure.
   - **Global State:** Use `DataManager.js` or `localStorage/sessionStorage`.

3. **Set Up Data Manager Singleton (If Global):**
   - Create an ES6 Class with a `constructor()` holding the raw data.
   - Use getter/setter methods.
   - Implement a simple PubSub (Observer) pattern if multiple components must react to state changes (e.g., `events.on('filterChange', updateGrid)`).

4. **Implement UI Reactor:**
   - When the state changes, trigger a function to update the DOM.
   - Example: If a filter changes, clear `.gallery-container.innerHTML` and re-render the filtered array using template literals.

5. **Memory Management Audit:**
   - Always ensure Event Listeners that reference state are properly detached if a component is "destroyed" (though less common in multi-page architecture).
