# Sherif-Auto Technical Specifications

## Architecture Ecosystem

Sherif-Auto eschews heavy framework bloat in favor of native, lightning-fast rendering and robust NoSQL integrations.

### 1. Structure (HTML5)

- Standard semantic layout (`main`, `section`, `nav`, `footer`).
- One physical `.html` file per major page route.

### 2. Styling (CSS)

- Vanilla CSS3 utilizing Custom Properties (`:root` variables) defined in `Global/AI_Agent_Instructions.md` and `style.css`.
- Complete ban on utility-first frameworks like Tailwind CSS to preserve absolute control over micro-styling components.
- BEM-inspired class-naming (`.nav-container--active`).

### 3. Logic (JavaScript)

- **ES6+ Modules:** `import` and `export const` patterns natively loaded via `<script type="module" src="...">`.
- **Zero Query Selectors in Markup:** Event delegation is preferred to reduce memory leakage. Custom classes like `UIManager` handle DOM updates.
- **State Management:** Custom PubSub or local closure Singletons (`DataManager.js`). No Redux, Zustand, etc.

### 4. Animation (GSAP)

- The only permissible external library for complex view management.
- Restricted to animating `opacity` and `transform` properties (`scale`, `x`, `y`) natively off the main thread.
- Primary implementations: ScrollTrigger integrations, Parallax headers, and complex Staggered Menus.

### 5. Backend (Firebase)

- Realtime operations handled via Google Firebase. Web SDK injected natively via raw `<script type="module">` directly querying Firestore NoSQL endpoints.
- Primary uses: Storing structured form payloads, tracking high-level UX telemetry (if implemented), and pushing dynamic configurations if the local `[...]_data.js` files are superseded.
