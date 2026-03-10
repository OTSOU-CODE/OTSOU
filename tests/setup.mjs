global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
global.window.innerWidth = 1024;

class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.IntersectionObserver = IntersectionObserver;

const mockElement = {
    innerHTML: '',
    style: {},
    children: [],
    classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    textContent: '',
    querySelectorAll: () => [],
    setAttribute: () => {},
    getAttribute: () => null
};
mockElement.querySelector = () => mockElement;

global.document = {
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            global._triggerDOMContentLoaded = callback;
        }
    },
    removeEventListener: () => {},
    getElementById: (id) => mockElement,
    querySelectorAll: () => [],
    querySelector: () => mockElement,
    documentElement: mockElement,
    body: { style: {} },
    createElement: () => mockElement,
    createTextNode: () => mockElement
};

global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};

global.fetch = async () => ({
    ok: true,
    text: async () => 'make,model,year\nToyota,Camry,2023'
});

global.CustomEvent = class CustomEvent {
    constructor(type, eventInitDict) {
        this.type = type;
        this.detail = eventInitDict?.detail;
    }
};
global.dispatchEvent = () => true;
