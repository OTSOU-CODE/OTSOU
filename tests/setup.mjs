global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
global.window.matchMedia = () => ({ matches: false });

global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

const mockElement = {
    innerHTML: '',
    style: {},
    children: [],
    classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
    addEventListener: () => {},
    textContent: '',
    querySelectorAll: () => []
};
mockElement.querySelector = () => mockElement;

global.document = {
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            global._triggerDOMContentLoaded = callback;
        }
    },
    createElement: (tag) => {
        return {
            tagName: tag.toUpperCase(),
            innerHTML: '',
            style: {},
            children: [],
            childNodes: [],
            classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
            addEventListener: () => {},
            textContent: '',
            focus: () => {},
            blur: () => {},
            querySelectorAll: () => [],
            querySelector: () => null,
            appendChild: function(child) { this.children.push(child); this.childNodes.push(child); }
        };
    },
    createTextNode: (text) => ({ textContent: text }),
    getElementById: (id) => {
        const el = { ...mockElement, id };
        if (id === 'header-search-input') {
            el.focus = () => {};
            el.blur = () => {};
            el.value = '';
        }
        return el;
    },
    querySelectorAll: () => [],
    querySelector: () => mockElement,
    body: { innerHTML: '', appendChild: () => {} },
    head: { appendChild: () => {} },
    documentElement: { getAttribute: () => null, setAttribute: () => {}, classList: { add: () => {}, remove: () => {} } }
};

// Setup localStorage for tests
let store = {};
global.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = value.toString(); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

// Setup CustomEvent for tests
global.CustomEvent = class CustomEvent {
  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
};

global.window.dispatchEvent = () => {};
global.document.body = {
    insertAdjacentHTML: () => {}
};
global.document.createElement = () => mockElement;
mockElement.appendChild = (child) => { mockElement.children.push(child); };
