global.window = global;

const mockElement = {
    innerHTML: '',
    style: {},
    children: [],
    classList: {
        toggle: () => {},
        contains: () => false,
        add: () => {},
        remove: () => {}
    },
    addEventListener: () => {},
    textContent: '',
    querySelectorAll: () => [],
    appendChild: function(child) {
        this.children.push(child);
    }
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
        return {
            tagName: tag,
            className: '',
            style: {},
            children: [],
            classList: {
                toggle: () => {},
                contains: () => false,
                add: function(cls) {
                    if (!this._classes) this._classes = new Set();
                    this._classes.add(cls);
                },
                remove: function(cls) {
                    if (this._classes) this._classes.delete(cls);
                }
            },
            appendChild: function(child) {
                this.children.push(child);
            },
            addEventListener: () => {},
            textContent: ''
        };
    },
    createTextNode: (text) => {
        return {
            nodeType: 3,
            textContent: text
        };
    }
};

global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {}
    observe(element) {}
    unobserve(element) {}
    disconnect() {}
};

global.localStorage = {
    _data: {},
    setItem: function(id, val) { return this._data[id] = String(val); },
    getItem: function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : null; },
    removeItem: function(id) { return delete this._data[id]; },
    clear: function() { return this._data = {}; }
};

global.CustomEvent = class CustomEvent {
    constructor(event, params) {
        this.type = event;
        this.detail = params ? params.detail : null;
    }
};

// Also mock location and history to avoid errors
global.window.location = { search: '' };
global.window.history = { pushState: () => {} };
