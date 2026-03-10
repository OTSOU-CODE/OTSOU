global.window = global;
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
    getElementById: (id) => mockElement,
    querySelectorAll: () => [],
    querySelector: () => mockElement
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
