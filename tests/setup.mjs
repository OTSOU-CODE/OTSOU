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
    createElement: (tag) => {
        return {
            tagName: tag ? tag.toUpperCase() : '',
            className: '',
            innerHTML: '',
            style: {},
            children: [],
            attributes: {},
            eventListeners: {},
            setAttribute(name, value) {
                this.attributes[name] = value;
            },
            getAttribute(name) {
                return this.attributes[name];
            },
            addEventListener(event, callback) {
                this.eventListeners[event] = callback;
            },
            appendChild(child) {
                this.children.push(child);
            },
            classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
            textContent: '',
            querySelectorAll: () => []
        };
    },
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            global._triggerDOMContentLoaded = callback;
        }
    },
    getElementById: (id) => mockElement,
    querySelectorAll: () => [],
    querySelector: () => mockElement
};

global.IntersectionObserver = class { observe() {} unobserve() {} };
