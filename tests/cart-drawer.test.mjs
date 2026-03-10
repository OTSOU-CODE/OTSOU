import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

// Mock CustomEvent
if (typeof global.CustomEvent !== 'function') {
    global.CustomEvent = class CustomEvent {
        constructor(event, params) {
            this.type = event;
            this.detail = params ? params.detail : null;
        }
    };
}

// Mock window.dispatchEvent
let dispatchedEvents = [];
global.window.dispatchEvent = (event) => {
    dispatchedEvents.push(event);
};

// We need a specific mock for document.querySelector('.cart-badge')
const originalQuerySelector = global.document.querySelector;
let mockBadgeElement = { textContent: '', style: { display: '' } };

global.document.querySelector = (selector) => {
    if (selector === '.cart-badge') {
        return mockBadgeElement;
    }
    return originalQuerySelector(selector);
};

test('updateGlobalBadge test suite', async (t) => {
    const { updateGlobalBadge } = await import('../JS/cart-drawer.js');

    t.afterEach(() => {
        global.localStorage.clear();
        dispatchedEvents = [];
        mockBadgeElement = { textContent: '', style: { display: '' } };
    });

    await t.test('updates badge correctly with populated cart', () => {
        const cartItems = [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 3 }
        ];
        global.localStorage.setItem('cart_items', JSON.stringify(cartItems));

        updateGlobalBadge();

        assert.strictEqual(String(mockBadgeElement.textContent), '5', 'Badge text should reflect total quantity');
        assert.strictEqual(mockBadgeElement.style.display, 'flex', 'Badge display should be flex when items > 0');
    });

    await t.test('updates badge correctly with empty cart', () => {
        global.localStorage.setItem('cart_items', JSON.stringify([]));

        updateGlobalBadge();

        assert.strictEqual(String(mockBadgeElement.textContent), '0', 'Badge text should be 0 when empty');
        assert.strictEqual(mockBadgeElement.style.display, 'none', 'Badge display should be none when empty');
    });

    await t.test('dispatches cartUpdated event', () => {
        updateGlobalBadge();

        assert.strictEqual(dispatchedEvents.length, 1, 'Should dispatch exactly 1 event');
        assert.strictEqual(dispatchedEvents[0].type, 'cartUpdated', 'Event should be cartUpdated');
    });
});
