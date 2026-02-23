---
description: Documentation - Technical Documentation
---

# Technical Documentation Workflow (Sherif-Auto)

START → JSDoc Function Headers → Update AI Globals → Document CSS Logic → Verify Code → END

## Scope & Context

Vanilla JS can lack architectural rigor over time without strict documentation. Documentation exists close to the metal within the files themselves and explicitly structured in the `/Global/` directory.

## Steps:

1. **JS INLINE ARCHITECTURE (JSDoc):**
   - All ES6 Modules (like `category.js` or `script.js`) must define explicit JSDoc blocks over major functions outlining parameters and return states.
   - Example:
     ```javascript
     /**
      * Initializes the GSAP Staggered Menu based on the DOM trigger
      * @param {HTMLElement} triggerBtn - The hamburger button
      * @param {Array<Object>} navItems - Array containing link destinations
      */
     export const initMobileNavigation = (triggerBtn, navItems) => { ... }
     ```

2. **AI AGENT SYNCHRONIZATION (`AI_Agent_Instructions.md`):**
   - When a fundamental architecture change occurs (e.g., swapping CSS variables handling, or adopting a new external API), explicitly update the root directives file inside the `/Global/` folder.
   - Keep AI prompts aware of current implementation logic.

3. **CSS MODULAR DOCUMENTATION:**
   - Use standard `/* Component: Footer Layering */` comments bridging CSS sections inside the monolithic `style.css` before splitting to modular `.css` files.
   - Explicitly document complex calculations (e.g., `calc(100vh - var(--nav-height))`) so future edits don't blindly break intended layouts.

4. **MAINTAINING THE `docs.md` STANDARD:**
   - The original `docs.md` holds the absolute source of truth for 8K rendering capabilities and prompt variables. If the pipeline changes, the documentation must reflect the updated physical workflow.

5. **GITOPS & README:**
   - `README_Sherif.md` should distinctly list the hosting platform URL (Firebase), the deployment command (`firebase deploy --only hosting`), and structural folder explanations for easy onboarding.
