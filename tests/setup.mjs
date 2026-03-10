global.window = global;

function createMockElement(tagName) {
    const el = {
        tagName: tagName ? tagName.toUpperCase() : 'DIV',
        innerHTML: '',
        style: {},
        children: [],
        className: '',
        classList: {
            toggle: () => {},
            contains: (cls) => el.className.split(' ').includes(cls),
            add: (cls) => {
                const classes = el.className ? el.className.split(' ') : [];
                if (!classes.includes(cls)) classes.push(cls);
                el.className = classes.join(' ');
            },
            remove: (cls) => {
                const classes = el.className ? el.className.split(' ') : [];
                el.className = classes.filter(c => c !== cls).join(' ');
            }
        },
        addEventListener: () => {},
        textContent: '',
        querySelectorAll: () => [],
        appendChild: (child) => {
            el.children.push(child);
            return child;
        },
        setAttribute: () => {},
        getAttribute: () => null
    };
    el.querySelector = () => el;
    return el;
}

const mockElement = createMockElement();

const elementsById = {};

global.document = {
    createElement: createMockElement,
    createTextNode: (text) => ({ nodeType: 3, textContent: text }),
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            global._triggerDOMContentLoaded = callback;
        }
    },
    getElementById: (id) => {
        if (!elementsById[id]) {
            elementsById[id] = createMockElement();
            elementsById[id].id = id;
        }
        return elementsById[id];
    },
    querySelectorAll: () => [],
    querySelector: () => mockElement,
    _clearMockDOM: () => {
        for (const key in elementsById) {
            delete elementsById[key];
        }
    }
};

global.URLSearchParams = class URLSearchParams {
    constructor(query) {
        this.query = query;
    }
    get(name) {
        return null;
    }
    set(name, value) {}
};

global.URL = class URL {
    constructor(url) {
        this.href = url;
        this.searchParams = new global.URLSearchParams();
    }
};

global.location = {
    search: ''
};

global.history = {
    pushState: () => {}
};

// Add missing globals needed by tests
global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};

global.CustomEvent = class CustomEvent {
    constructor(type, detail) {
        this.type = type;
        this.detail = detail;
    }
};

global.setTimeout = (cb, ms) => cb();
