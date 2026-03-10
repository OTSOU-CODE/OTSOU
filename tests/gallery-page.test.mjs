import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('window.showEmptyState displays empty state message', async () => {
    // Import and initialize gallery-page.js environment
    await import('../JS/gallery-page.js');
    global._triggerDOMContentLoaded();

    assert.ok(typeof window.showEmptyState === 'function', 'showEmptyState should be globally available');

    // Scenario 1: galleryGrid exists
    let innerHTMLValue = '';
    const mockElement = {
        set innerHTML(val) {
            innerHTMLValue = val;
        },
        get innerHTML() {
            return innerHTMLValue;
        }
    };

    // Override document.getElementById just for this test
    const originalGetElementById = global.document.getElementById;
    global.document.getElementById = (id) => {
        if (id === 'gallery-grid') {
            return mockElement;
        }
        return null;
    };

    window.showEmptyState();

    assert.ok(innerHTMLValue.includes('gallery-empty'), 'Should contain the gallery-empty div');
    assert.ok(innerHTMLValue.includes('No Images Available'), 'Should contain the empty state message');
    assert.ok(innerHTMLValue.includes('fas fa-images'), 'Should contain the icon');

    // Scenario 2: galleryGrid does not exist
    global.document.getElementById = () => null;

    // This shouldn't throw an error
    try {
        window.showEmptyState();
        assert.ok(true, 'Calling showEmptyState when grid is null should not throw');
    } catch (e) {
        assert.fail(`Threw error: ${e.message}`);
    }

    // Restore original document.getElementById
    global.document.getElementById = originalGetElementById;
});
