import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

// Setup mock for localStorage, document.documentElement and other objects accessed in top-level of script.js
global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};

// We need a proper mock for document.documentElement because script.js accesses it immediately
global.document.documentElement = {
    getAttribute: () => null,
    setAttribute: () => {}
};

// We also need to mock window.addEventListener and removeEventListener since they are called globally
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};

test('initializeElements runs without throwing on a blank DOM', async () => {
    // Import script.js so that functions are attached to window
    await import('../JS/script.js');

    assert.ok(typeof window.initializeElements === 'function', 'initializeElements should be exposed on window');

    assert.doesNotThrow(() => {
        window.initializeElements();
    }, 'initializeElements should not throw exceptions when executed on a blank DOM');
});
