import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('script.js DOMContentLoaded does not throw', async () => {
    // Import the script
    await import('../JS/script.js');

    // Trigger DOMContentLoaded manually
    assert.doesNotThrow(() => {
        global._triggerDOMContentLoaded();
    }, 'Calling DOMContentLoaded callback should not throw any errors');
});
