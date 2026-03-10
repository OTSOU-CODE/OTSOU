import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('openWishlist opens the wishlist drawer and sets body overflow to hidden', async () => {
    // Keep track of original functions to restore later
    const originalGetElementById = global.document.getElementById;
    const originalBody = global.document.body;
    const originalLocalStorage = global.localStorage;

    // Create our mock elements
    const mockOverlay = { classList: { add: (cls) => mockOverlay.classes.add(cls) }, classes: new Set() };
    const mockDrawer = { classList: { add: (cls) => mockDrawer.classes.add(cls) }, classes: new Set() };
    const mockContainer = { innerHTML: '', querySelectorAll: () => [] };

    // Mock document.getElementById
    global.document.getElementById = (id) => {
        if (id === 'wishlistOverlay') return mockOverlay;
        if (id === 'wishlistDrawer') return mockDrawer;
        if (id === 'wishlistItemsContainer') return mockContainer;
        return { innerHTML: '', classList: { add: () => {}, remove: () => {} }, querySelectorAll: () => [] };
    };

    // Mock document.body
    global.document.body = {
        style: {}
    };

    // Mock localStorage
    global.localStorage = {
        getItem: () => null
    };

    try {
        // Import the module dynamically after mocks are set up
        const { openWishlist } = await import('../JS/wishlist-drawer.js');

        // Call the function
        openWishlist();

        // Assertions
        assert.ok(mockOverlay.classes.has('open'), 'wishlistOverlay should have "open" class added');
        assert.ok(mockDrawer.classes.has('open'), 'wishlistDrawer should have "open" class added');
        assert.strictEqual(global.document.body.style.overflow, 'hidden', 'document.body.style.overflow should be "hidden"');
    } finally {
        // Restore globals
        global.document.getElementById = originalGetElementById;
        global.document.body = originalBody;
        global.localStorage = originalLocalStorage;
    }
});
