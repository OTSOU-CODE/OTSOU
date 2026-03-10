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
