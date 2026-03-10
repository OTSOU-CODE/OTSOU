import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('initCartDrawer injects HTML when missing and not when present', async () => {
    // Import the cart-drawer.js module
    const { initCartDrawer } = await import('../JS/cart-drawer.js');

    // Setup initial state: clear the body and local storage
    document.body.innerHTML = '';
    localStorage.clear();

    // Verify initial state
    assert.strictEqual(document.querySelector('.cart-drawer'), null, 'cart-drawer should not exist initially');

    // 1. Call initCartDrawer, should inject HTML
    initCartDrawer();

    // Verify HTML was injected
    const cartDrawer = document.querySelector('.cart-drawer');
    assert.ok(cartDrawer, 'cart-drawer should be injected');
    assert.ok(document.getElementById('cartOverlay'), 'cartOverlay should be injected');
    assert.ok(document.getElementById('cartDrawer'), 'cartDrawer should be injected');
    assert.ok(document.getElementById('closeCartBtn'), 'closeCartBtn should be injected');
    assert.ok(document.getElementById('cartItemsContainer'), 'cartItemsContainer should be injected');
    assert.ok(document.getElementById('cartTotal'), 'cartTotal should be injected');

    // Save current HTML
    const htmlAfterFirstCall = document.body.innerHTML;

    // 2. Call initCartDrawer again, should NOT inject HTML again
    initCartDrawer();

    // Verify HTML did not change
    assert.strictEqual(document.body.innerHTML, htmlAfterFirstCall, 'HTML should not be re-injected if cart-drawer exists');

    // Cleanup
    document.body.innerHTML = '';
});
