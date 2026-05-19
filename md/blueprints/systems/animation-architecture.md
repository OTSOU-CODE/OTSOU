# Blueprint: Animation Architecture

## 1. Core Philosophy

Sherif-Auto prioritizes a "Wow" factor through fluid, performant animations. To bypass the heavy cost of Virtual DOM reconciliation (like React Spring), this platform relies strictly on Vanilla JavaScript `IntersectionObserver` bindings alongside native CSS transitions, reserving heavyweight GSAP logic explicitly for complex, multi-stage orchestrations.

## 2. Global Scroll Interactions

- **Observer:** Initialized in `script.js` (`observeElements()`), a widespread `IntersectionObserver` monitors DOM nodes tagged with the `.animate-on-scroll` class.
- **Effect:** Upon intersecting the viewport (`threshold: 0.15`), the observer attaches a `.visible` class.
- **CSS Execution:** Typical CSS binds `opacity: 0` and `transform: translateY(30px)` to `.animate-on-scroll`, while `.visible` resets these values via hardware-accelerated transitions.

## 3. High-Performance Hardware Acceleration

- **The Rule:** Animations must _only_ manipulate `transform` (scale, translate, rotate) and `opacity`.
- **Why:** Modifying layout properties like `height`, `width`, or `margin` forces the browser to recalculate the document flow (Layout Thrashing). Using `transform` isolates the action to the GPU compositor layer, ensuring locked 60 FPS performance even on low-end mobile devices.

## 4. Complex Timelines (GSAP)

For advanced, elastic interactions where CSS `transition-delay` logic becomes unwieldy, the platform utilizes **GreenSock (GSAP)**.

- **Implementation:** See `staggered-menu.js` (`buildOpenTimeline()`), where `gsap.timeline` is used to orchestrate overlapping layer reveals, elastic text bounces, and stagger arrays spanning numerous DOM nodes concurrently.

## 5. View Transitions API

To seamlessly jump between the Dark/Light modes, the `toggleTheme()` string uses the emerging browser **View Transitions API** (`document.startViewTransition()`). It captures the old layout root state and the new incoming CSS variable overrides, natively crossfading them without requiring manual animation engineering. A standard sync fallback exists for un-supported browsers.
