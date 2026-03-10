import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('renderColorVariants creates correct DOM elements based on galleryData', async () => {
    // Clear DOM state before the test
    if (global.document._clearMockDOM) {
        global.document._clearMockDOM();
    }

    // Get the mocked target containers where renderColorVariants will attach its output
    const colorContainer = document.getElementById('colorOptions');
    const selectedNameVal = document.getElementById('selectedColorName');

    // Load the image-preview.js file
    // Note: since it doesn't export functions and relies on DOMContentLoaded, we trigger it
    await import('../JS/image-preview.js');

    // Ensure the DOMContentLoaded trigger is available and call it
    assert.ok(typeof global._triggerDOMContentLoaded === 'function', 'DOMContentLoaded listener should be registered');
    global._triggerDOMContentLoaded();

    // Verify the output in colorOptions container
    // galleryData in image-preview.js has 5 items
    assert.strictEqual(colorContainer.children.length, 5, 'Should create exactly 5 color variant buttons');

    // Check specific attributes of the generated buttons
    const firstBtn = colorContainer.children[0];

    // Check that it's a button element
    assert.strictEqual(firstBtn.tagName, 'BUTTON', 'The created element should be a button');

    // Check active class on the first button (since default currentImageIndex is 0)
    assert.ok(firstBtn.className.includes('color-btn'), 'Button should have color-btn class');
    assert.ok(firstBtn.className.includes('active'), 'First button should have active class initially');

    // Check inline style for background color based on galleryData
    // first item has colorCode: 'linear-gradient(135deg, #000000 50%, #FF4500 50%)'
    assert.strictEqual(firstBtn.style.background, 'linear-gradient(135deg, #000000 50%, #FF4500 50%)', 'Button background should match galleryData colorCode');

    // Check inner child (the icon)
    assert.strictEqual(firstBtn.children.length, 1, 'Button should contain an icon');
    assert.strictEqual(firstBtn.children[0].tagName, 'I', 'Child element should be an icon');
    assert.ok(firstBtn.children[0].className.includes('fas fa-check'), 'Icon should have fas fa-check class');

    // Check that selected color name text is correctly populated for the active variant
    // first item title is 'Premium Black & Orange'
    assert.strictEqual(selectedNameVal.textContent, 'Premium Black & Orange', 'Selected color name text should match the active variant title');

    // Check second button to ensure it doesn't have active class initially
    const secondBtn = colorContainer.children[1];
    assert.ok(secondBtn.className.includes('color-btn'), 'Second button should have color-btn class');
    assert.ok(!secondBtn.className.includes('active'), 'Second button should NOT have active class initially');
});
