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
    _elements: {},
    getElementById: function(id) {
        if (!this._elements[id]) {
            this._elements[id] = {
                id,
                innerHTML: '',
                style: {},
                children: [],
                classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
                addEventListener: () => {},
                textContent: '',
                querySelectorAll: () => [],
                getBoundingClientRect: () => ({ top: 0 })
            };
            this._elements[id].querySelector = () => this._elements[id];
        }
        return this._elements[id];
    },
    querySelectorAll: () => [],
    querySelector: () => mockElement
};
