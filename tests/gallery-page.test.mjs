import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import vm from 'node:vm';

test('createGalleryItem creates the correct DOM structure', () => {
    // Read the script content
    const code = fs.readFileSync('JS/gallery-page.js', 'utf8');

    // Simply evaluate the script in the current environment
    // Since we import setup.mjs, we already have a basic mock DOM
    const originalLocation = global.window.location;
    global.window.location = { href: '' };

    // Evaluate code using vm
    const context = vm.createContext({
        ...global,
        setTimeout: () => {},
        setInterval: () => {},
        clearInterval: () => {}
    });
    vm.runInContext(code, context);

    assert.ok(typeof context.createGalleryItem === 'function', 'createGalleryItem should be defined');

    const mockItem = {
        src: 'images/test.jpg',
        title: 'Test Title',
        description: 'Test Description'
    };

    const mockIndex = 42;

    const el = context.createGalleryItem(mockItem, mockIndex);

    // Verify basic element properties
    assert.strictEqual(el.tagName, 'DIV');
    assert.ok(el.className.includes('gallery-item'), 'className should include gallery-item');
    assert.strictEqual(el.getAttribute('data-index'), mockIndex);

    // Verify inner HTML structure and content
    assert.ok(el.innerHTML.includes('images/test.jpg'), 'innerHTML should contain the image src');
    assert.ok(el.innerHTML.includes('Test Title'), 'innerHTML should contain the title');
    assert.ok(el.innerHTML.includes('Test Description'), 'innerHTML should contain the description');
    assert.ok(el.innerHTML.includes('<h3 class="gallery-title">Test Title</h3>'), 'innerHTML should structure the title correctly');
    assert.ok(el.innerHTML.includes('<p class="gallery-description">Test Description</p>'), 'innerHTML should structure the description correctly');
    assert.ok(el.innerHTML.includes('<img src="images/test.jpg" alt="Test Title" title="Test Title" loading="lazy">'), 'innerHTML should structure the image correctly');

    // Verify event listeners
    assert.ok(el.eventListeners['click'], 'Should have a click event listener');
    assert.ok(el.eventListeners['touchstart'], 'Should have a touchstart event listener');
    assert.ok(el.eventListeners['touchend'], 'Should have a touchend event listener');

    // Test click functionality
    el.eventListeners['click']();
    assert.strictEqual(global.window.location.href, 'image-preview.html?index=42', 'Click should navigate to image-preview.html with correct index');

    // Test touch functionality
    const touchStartHandler = el.eventListeners['touchstart'].bind(el);
    touchStartHandler();
    assert.strictEqual(el.style.transform, 'scale(0.98)', 'Touch start should apply scale transform');

    const touchEndHandler = el.eventListeners['touchend'].bind(el);
    touchEndHandler();
    assert.strictEqual(el.style.transform, '', 'Touch end should remove transform');

    // Restore
    global.window.location = originalLocation;
});
