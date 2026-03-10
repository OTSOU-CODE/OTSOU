import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('renderColorVariants creates correct DOM elements', async () => {
    // Setup specific DOM elements
    const colorContainer = {
        id: 'colorOptions',
        innerHTML: '',
        children: [],
        appendChild: function(child) { this.children.push(child); }
    };
    const selectedNameVal = {
        id: 'selectedColorName',
        textContent: ''
    };

    const elements = {
        'colorOptions': colorContainer,
        'selectedColorName': selectedNameVal
    };

    // Override the mocked getElementById with our specific elements, falling back to original mock
    const originalGetElementById = global.document.getElementById;
    global.document.getElementById = (id) => elements[id] || originalGetElementById(id);

    // Mock URL parameters to test specific index parsing
    global.window.location = new URL('http://localhost/?index=1');

    // Load the target script
    await import('../JS/image-preview.js');

    // Trigger initialization
    if (global._triggerDOMContentLoaded) {
        global._triggerDOMContentLoaded();
    }

    // Assertions for renderColorVariants logic

    // The current index should be 1, because galleryData has 5 elements
    // and '?index=1' is parsed.

    // Verify children were added
    assert.strictEqual(colorContainer.children.length, 5, 'Should render 5 color variants');

    // Verify specific properties of added elements
    const activeBtnIndex = 1;
    colorContainer.children.forEach((btn, index) => {
        assert.strictEqual(btn.tagName, 'button', 'Appended child should be a button');

        if (index === activeBtnIndex) {
            assert.ok(btn.className.includes('active'), `Button at index ${index} should be active`);
        } else {
            assert.ok(!btn.className.includes('active'), `Button at index ${index} should not be active`);
        }

        // Assert it has the icon
        assert.strictEqual(btn.children.length, 1, 'Button should have one child (the icon)');
        assert.strictEqual(btn.children[0].tagName, 'i', 'Icon child should be an <i> tag');
        assert.strictEqual(btn.children[0].className, 'fas fa-check', 'Icon child should have correct class');

        // Ensure onclick handler is attached
        assert.strictEqual(typeof btn.onclick, 'function', 'Button should have an onclick handler');
    });

    // Verify the text context of the selected color name
    assert.strictEqual(selectedNameVal.textContent, 'Elegant Blue Style', 'The selectedColorName textContent should correspond to index 1');

    // Test the interaction (switchProduct) via onclick
    // Clear children array to ensure clean slate from renderColorVariants call inside switchProduct
    colorContainer.children = [];

    // So let's re-run initialization and interact properly
    global.window.location = new URL('http://localhost/?index=0');
    colorContainer.children = [];
    global._triggerDOMContentLoaded();

    const thirdBtn = colorContainer.children[2];

    // reset tracking for appending since switchProduct will call renderColorVariants again
    // which modifies colorContainer.children. The new render replaces old elements logic
    // we reset `colorContainer.children` in our mock `innerHTML` clearing (but `innerHTML = ''` isn't watched here).
    colorContainer.children = []; // Clear current elements before calling click (simulating innerHTML = '')

    thirdBtn.onclick();

    // Verify state changed
    assert.strictEqual(selectedNameVal.textContent, 'Classic Red Design', 'selectedColorName textContent should update after switching product');
    assert.ok(colorContainer.children[2].className.includes('active'), 'Clicked button should become active');
    assert.ok(!colorContainer.children[0].className.includes('active'), 'Previously active button should not be active');
});
