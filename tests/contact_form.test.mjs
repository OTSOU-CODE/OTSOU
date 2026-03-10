import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import vm from 'vm';
import './setup.mjs';

test('verify setupContactForm error handling logs error and shows notification', async () => {
    // 1. Setup DOM Elements Mocks
    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';

    // Track the submit listener added by setupContactForm
    let submitEventCallback = null;
    contactForm.addEventListener = (event, callback) => {
        if (event === 'submit') {
            submitEventCallback = callback;
        }
    };
    contactForm.reset = () => {};

    // Mock Inputs
    const nameInput = document.createElement('input');
    nameInput.name = 'name';
    nameInput.value = 'John Doe';
    nameInput.checkValidity = () => true;
    contactForm.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.name = 'email';
    emailInput.value = 'john@example.com';
    emailInput.checkValidity = () => true;
    contactForm.appendChild(emailInput);

    // Mock querySelectorAll for Inputs
    contactForm.querySelectorAll = (selector) => {
        if (selector === 'input[required], textarea[required]') {
            return [nameInput, emailInput];
        }
        return [];
    };

    // Mock Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerHTML = 'Send';

    // Mock querySelector on form for Submit Button
    contactForm.querySelector = (selector) => {
        if (selector === 'button[type="submit"]') {
            return submitButton;
        }
        return null;
    };

    // Override Global Document Methods
    const origGetElementById = global.document.getElementById;
    const origQuerySelector = global.document.querySelector;
    const origQuerySelectorAll = global.document.querySelectorAll;
    const origCreateElement = global.document.createElement;

    global.document.getElementById = (id) => {
        if (id === 'contact-form') return contactForm;
        return null; // Return null for elements not needed in this test
    };

    global.document.querySelector = (selector) => null;
    global.document.querySelectorAll = (selector) => {
        if (selector === '.notification') return [];
        return [];
    };

    // Mock document.createElement to handle notification structure
    global.document.createElement = (tag) => {
        const el = origCreateElement(tag);
        if (tag === 'div') {
            // For notification div inner queries
            const messageEl = { textContent: '' };
            const closeBtn = { addEventListener: () => {} };
            el.querySelector = (sel) => {
                if (sel === '.notification-message') return messageEl;
                if (sel === '.notification-close') return closeBtn;
                return null;
            };
        }
        return el;
    };

    // Fix body.children to be an array so length checks work
    global.document.body = {
        children: [],
        appendChild: function(child) {
            this.children.push(child);
        }
    };

    // Mock localStorage since loadTheme uses it immediately on load
    global.localStorage = {
        getItem: () => null,
        setItem: () => {}
    };

    // Mock FormData
    global.FormData = class {
        constructor(form) {
            this.form = form;
            this.data = new Map();
            if (form) {
                this.data.set('name', nameInput.value);
                this.data.set('email', emailInput.value);
            }
        }
        append(key, value) {
            this.data.set(key, value);
        }
        get(key) {
            return this.data.get(key);
        }
    };

    // Mock console.error
    let consoleErrorCalled = false;
    let consoleErrorMessage = '';
    let consoleErrorObject = null;
    const originalConsoleError = console.error;
    console.error = (msg, err) => {
        consoleErrorCalled = true;
        consoleErrorMessage = msg;
        consoleErrorObject = err;
    };

    // Read JS/script.js
    const scriptContent = fs.readFileSync('JS/script.js', 'utf8');

    // Mock fetch to simulate network failure
    const originalFetch = global.fetch;
    global.fetch = () => Promise.reject(new Error('Simulated network error'));

    try {
        // Load the script into the global environment
        const setupScript = `
            ${scriptContent};
            if (typeof setupContactForm !== 'undefined') {
                global.test_setupContactForm = setupContactForm;
            }
        `;
        eval(setupScript);

        // Run setupContactForm explicitly
        global.test_setupContactForm();

        assert.ok(submitEventCallback, 'Submit event listener should be attached');

        // Trigger submit event
        await submitEventCallback({ preventDefault: () => {} });

        // Assert console.error was called
        assert.ok(consoleErrorCalled, 'console.error should have been called');
        assert.strictEqual(consoleErrorMessage, 'Form submission error:', 'Should log correct error prefix');
        assert.strictEqual(consoleErrorObject.message, 'Simulated network error', 'Should pass correct error object to console.error');

        // Assert notification was shown by checking document.body
        const notificationDiv = document.body.children[document.body.children.length - 1];

        assert.ok(notificationDiv, 'Notification element should be appended to body');
        assert.strictEqual(notificationDiv.className, 'notification notification-error', 'Should have notification-error class');

        const messageSpan = notificationDiv.querySelector('.notification-message');
        assert.ok(messageSpan, 'Message span should exist');
        assert.strictEqual(messageSpan.textContent, 'There was an error sending your message. Please try again or call us directly.', 'Should show correct error message');

        // Check finally block execution
        assert.strictEqual(submitButton.disabled, false, 'Submit button should be re-enabled');
        assert.strictEqual(submitButton.innerHTML, 'Send', 'Submit button original text should be restored');
    } finally {
        console.error = originalConsoleError;
        global.document.getElementById = origGetElementById;
        global.document.querySelector = origQuerySelector;
        global.document.querySelectorAll = origQuerySelectorAll;
        global.document.createElement = origCreateElement;
        global.fetch = originalFetch;
    }
});
