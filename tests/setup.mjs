global.window = global;
const mockElement = {
    innerHTML: '',
    style: {},
    children: [],
    classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
    addEventListener: () => {},
    textContent: '',
    querySelectorAll: () => [],
    appendChild: () => {}
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
    querySelector: () => mockElement,
    createElement: (tag) => {
        const el = { ...mockElement, tagName: tag.toUpperCase(), setAttribute: () => {} };
        el.appendChild = () => {};
        return el;
    }
};

global.IntersectionObserver = class {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
};
