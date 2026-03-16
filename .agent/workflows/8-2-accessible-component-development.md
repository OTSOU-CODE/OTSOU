---
description: Accessibility - Accessible Component Development
---

# Accessible UI Engineering (Sherif-Auto)

START → Native HTML Override → Focus Management Scripting → Keyboard Handlers → Test → END

## Scope & Context

When designing custom luxurious components in Vanilla JS/CSS without automated accessibility wrappers, explicit coding guarantees compliance.

## Steps:

1. **USE NATIVE ELEMENTS BY DEFAULT:**
   - Always map custom UI to a native node. (e.g., Use an invisible `<input type="checkbox">` if creating a completely custom "Switch" element to inherently handle spacebar hits and form-linking).

2. **DETERMINE FOCUS TRAPPING LAWS:**
   - When the Custom `<dialog>` or GSAP Full-Screen Navigation Menu opens, capture the focus.
   - Add a keyboard listener specifically for the `Escape` key (`e.key === "Escape"`) to manually close the UI.
   - Using JS, prevent the user from `Tab`bing into the background document while the modal is open.

3. **DYNAMIC ARIA ATTRIBUTES:**
   - When a JS function modifies a state, update ARIA directly.
   - `element.setAttribute('aria-hidden', 'true')`
   - `element.setAttribute('aria-current', 'page')` for active navbar tabs.

4. **REDUCED MOTION OVERRIDE:**
   - Detect user preferences for motion limits. If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, immediately disable all heavy GSAP timelines and degrade strictly to instant shifts or CSS opacity fades.

5. **VALIDATION (SCREEN READER):**
   - Check using VoiceOver (Mac) or NVDA (PC). The UI should narrate flawlessly exactly what's interactable without guessing `div` roles.
