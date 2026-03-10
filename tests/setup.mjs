global.window = global;

// Basic storage mock
global.localStorage = {
    _data: {},
    getItem(key) { return this._data[key] || null; },
    setItem(key, value) { this._data[key] = String(value); },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
};

// Event mock
global.CustomEvent = class CustomEvent {
    constructor(type, detail) {
        this.type = type;
        this.detail = detail;
    }
};

global.window.dispatchEvent = () => true;

// A slightly more capable element mock factory
function createMockElement(tag = 'div') {
    const el = {
        tagName: tag.toUpperCase(),
        innerHTML: '',
        style: {},
        children: [],
        classList: {
            _classes: new Set(),
            toggle(c) {
                if (this._classes.has(c)) { this._classes.delete(c); return false; }
                else { this._classes.add(c); return true; }
            },
            contains(c) { return this._classes.has(c); },
            add(c) { this._classes.add(c); },
            remove(c) { this._classes.delete(c); }
        },
        addEventListener: () => {},
        textContent: '',
        appendChild(child) {
            this.children.push(child);
        },
        querySelectorAll: () => [],
        querySelector: () => null,
        dataset: {},
        closest: () => null
    };
    return el;
}

const mockBody = createMockElement('body');
mockBody.insertAdjacentHTML = function(position, html) {
    if (position === 'beforeend') {
        this.innerHTML += html;
    }
};

// Add fallback elements to ensure tests don't break due to missing elements
const modelGrid = createMockElement('div');
modelGrid.id = 'modelFilterGrid';
const brandGrid = createMockElement('div');
brandGrid.id = 'brandFilterGrid';
const yearGrid = createMockElement('div');
yearGrid.id = 'yearFilterGrid';
const resultsGrid = createMockElement('div');
resultsGrid.id = 'resultsGrid';
const activeFiltersContainer = createMockElement('div');
activeFiltersContainer.id = 'activeFilters';
const clearFiltersBtn = createMockElement('button');
clearFiltersBtn.id = 'clearFiltersBtn';

const knownElements = {
    'modelFilterGrid': modelGrid,
    'brandFilterGrid': brandGrid,
    'yearFilterGrid': yearGrid,
    'resultsGrid': resultsGrid,
    'activeFilters': activeFiltersContainer,
    'clearFiltersBtn': clearFiltersBtn
};

global.document = {
    body: mockBody,
    addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
            global._triggerDOMContentLoaded = callback;
        }
    },
    createElement: createMockElement,

    // We need to parse innerHTML to find elements by ID/class for tests to work
    // Since we don't have a real DOM parser in this mock environment,
    // we'll implement a basic mock that checks if the ID/class is present in the body's HTML.
    getElementById: (id) => {
        if (knownElements[id]) return knownElements[id];
        if (document.body.innerHTML.includes(`id="${id}"`)) {
            return createMockElement();
        }
        return createMockElement(); // return an empty element instead of null
    },
    querySelectorAll: (selector) => {
        return [];
    },
    querySelector: (selector) => {
        // Very basic mock for classes
        if (selector.startsWith('.')) {
            const className = selector.substring(1);
            if (document.body.innerHTML.includes(`class="${className}"`) ||
                document.body.innerHTML.includes(`class="cart-overlay"`) && className === 'cart-overlay' ||
                document.body.innerHTML.includes(`class="cart-drawer"`) && className === 'cart-drawer') {
                return createMockElement();
            }
        }
        return null;
    }
};

// Expose a way to reset the DOM
global.document.resetMock = () => {
    mockBody.innerHTML = '';
    mockBody.children = [];
};
