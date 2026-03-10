import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('setupContactForm displays error notification on network failure', async () => {
    // 1. Load JS/script.js content
    const fs = await import('fs');
    const path = await import('path');
    const scriptPath = path.resolve('JS/script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    // 2. Setup mock DOM
    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';

    // Required inputs
    const nameInput = document.createElement('input');
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.value = 'John Doe';
    nameInput.checkValidity = () => true;

    const emailInput = document.createElement('input');
    emailInput.name = 'email';
    emailInput.required = true;
    emailInput.value = 'john@example.com';
    emailInput.checkValidity = () => true;

    const messageTextarea = document.createElement('textarea');
    messageTextarea.name = 'message';
    messageTextarea.required = true;
    messageTextarea.value = 'Test message';
    messageTextarea.checkValidity = () => true;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Send';

    contactForm.appendChild(nameInput);
    contactForm.appendChild(emailInput);
    contactForm.appendChild(messageTextarea);
    contactForm.appendChild(submitBtn);

    // Mock specific form methods/properties
    contactForm.querySelectorAll = (selector) => {
        if (selector === 'input[required], textarea[required]') {
            return [nameInput, emailInput, messageTextarea];
        }
        if (selector === 'button[type="submit"]') {
            return submitBtn;
        }
        return [];
    };
    contactForm.querySelector = (selector) => {
        if (selector === 'button[type="submit"]') {
            return submitBtn;
        }
        return null;
    };
    contactForm.reset = () => {};

    // Other DOM elements
    const fileWrapper = document.createElement('div');
    fileWrapper.className = 'file-upload-wrapper';

    const fileInput = document.createElement('input');
    fileInput.id = 'file-upload';
    fileInput.type = 'file';
    fileInput.files = [];

    const fileNameDisplay = document.createElement('span');
    fileNameDisplay.id = 'file-name';

    const originalGetElementById = document.getElementById;
    const originalQuerySelector = document.querySelector;
    document.getElementById = (id) => {
        if (id === 'contact-form') return contactForm;
        if (id === 'file-upload') return fileInput;
        if (id === 'file-name') return fileNameDisplay;
        return originalGetElementById(id);
    };
    document.querySelector = (selector) => {
        if (selector === '.file-upload-wrapper') return fileWrapper;
        return originalQuerySelector(selector);
    };

    // Mock global dependencies to prevent reference errors during eval
    global.__localStorage = {};
    global.localStorage = {
        getItem: (key) => global.__localStorage[key] || null,
        setItem: (key, value) => { global.__localStorage[key] = value; },
    };

    // Form data mock since we're in Node.js mock DOM
    global.FormData = class {
        constructor() {
            this.data = new Map();
        }
        append(key, value) {
            this.data.set(key, value);
        }
        get(key) {
            // Provide specific values to pass validation
            if (key === 'email') return 'john@example.com';
            if (key === 'name') return 'John Doe';
            if (key === 'message') return 'Test message';
            return this.data.get(key) || null;
        }
    };

    // Mock fetch to simulate failure
    let fetchCalled = false;
    global.fetch = async (url, options) => {
        if (url === '/api/contact') {
            fetchCalled = true;
            return {
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            };
        }
        return { ok: true };
    };

    // Suppress console.error
    let capturedError = null;
    const originalConsoleError = console.error;
    console.error = (msg, err) => {
        capturedError = { msg, err };
    };

    // Ensure mock document.createElement creates objects that handle querySelector('.notification-message')
    const originalCreateElement = document.createElement;
    document.createElement = (tag) => {
        const el = originalCreateElement(tag);
        el.querySelector = (selector) => {
            if (selector === '.notification-message') return el;
            if (selector === '.notification-close') return el;
            return null;
        };
        return el;
    };

    // Provide missing global properties if any
    if (!document.head) {
        document.head = { appendChild: () => {} };
    }

    // We want to capture document.body.appendChild to see notifications
    const originalAppendChild = document.body.appendChild;
    let appendedElements = [];
    document.body.appendChild = (el) => {
        appendedElements.push(el);
        originalAppendChild.call(document.body, el);
    };

    // Call setupContactForm to attach submit listener
    // Note: contactForm.addEventListener was already attached, but our dummy elements only have a stub.
    // Let's intercept addEventListener on the form to capture the submit handler.
    let submitHandler = null;
    contactForm.addEventListener = (event, handler) => {
        if (event === 'submit') {
            submitHandler = handler;
        }
    };

    // 3. Evaluate script
    const evalCode = `
        ${scriptContent};
        if (typeof setupContactForm !== 'undefined') {
            global.test_setupContactForm = setupContactForm;
        }
    `;
    eval(evalCode);

    // Now call the function to let it attach handlers
    global.test_setupContactForm();

    assert.ok(submitHandler, 'Submit handler should be attached to the form');

    // 4. Trigger form submission
    const mockEvent = {
        preventDefault: () => {}
    };

    // Await the handler because it's an async function
    await submitHandler(mockEvent);

    // 5. Assertions
    assert.ok(fetchCalled, 'Fetch should have been called');

    assert.ok(capturedError, 'console.error should have been called');
    assert.strictEqual(capturedError.msg, 'Error sending form data:');
    assert.ok(capturedError.err.message.includes('Network response was not ok'), 'Error message should match fetch rejection');

    // Check if notification was added
    const notification = appendedElements.find(el => el.className && el.className.includes('notification-error'));
    assert.ok(notification, 'An error notification element should have been appended to document.body');

    // Verify notification message content
    // Because we mocked querySelector to return the element itself, textContent is on the notification element
    assert.strictEqual(notification.textContent, 'There was an error sending your message. Please try again or call us directly.', 'Error message should match');

    // Cleanup
    console.error = originalConsoleError;
    document.getElementById = originalGetElementById;
    document.querySelector = originalQuerySelector;
    document.body.appendChild = originalAppendChild;
    document.createElement = originalCreateElement;
});
