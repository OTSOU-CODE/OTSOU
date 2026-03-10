import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('Search History Rendering generates safe DOM elements and correct structure', async () => {
    // We will bypass the DOM Content Loaded by directly running the file content and calling the function
    const fs = await import('fs');
    const path = await import('path');
    const scriptPath = path.resolve('JS/script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    const searchToggle = document.createElement('button');
    searchToggle.id = 'search-toggle';
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.id = 'header-search-input';
    const searchResults = document.createElement('div');
    searchResults.id = 'header-search-results';

    // Store listeners
    const inputListeners = {};
    searchInput.addEventListener = (event, handler) => { inputListeners[event] = handler; };

    // Setup mocks
    global.__localStorage = {
        'searchHistory': JSON.stringify(['<script>alert("xss")</script>', 'Normal Search'])
    };
    global.localStorage = {
        getItem: (key) => global.__localStorage[key] || null,
        setItem: (key, value) => { global.__localStorage[key] = value; },
    };
    global.fetch = () => Promise.resolve({
        ok: true,
        text: () => Promise.resolve('brand,model,year\nToyota,Camry,2020')
    });

    const originalGetElementById = document.getElementById;
    const originalQuerySelector = document.querySelector;
    document.getElementById = (id) => {
        if (id === 'search-toggle') return searchToggle;
        if (id === 'header-search-input') return searchInput;
        if (id === 'header-search-results') return searchResults;
        return originalGetElementById(id);
    };
    document.querySelector = (selector) => {
        if (selector === '.search-container') return searchContainer;
        return originalQuerySelector(selector);
    };

    // Use eval but capture the function
    const evalCode = `
        ${scriptContent};
        if (typeof initHeaderSearch !== 'undefined') {
            global.test_initHeaderSearch = initHeaderSearch;
        }
    `;
    eval(evalCode);

    // Run the captured function
    global.test_initHeaderSearch();

    // Now listeners should be attached. Trigger 'focus' on the search input.
    if (inputListeners['focus']) {
        inputListeners['focus']();
    } else {
        assert.fail('Focus listener was not attached to searchInput');
    }

    // Wait briefly for UI to update
    await new Promise(resolve => setTimeout(resolve, 50));

    // Verify search results are rendered
    const resultItems = searchResults.children.filter(child => child.className === 'search-result-item');

    assert.strictEqual(resultItems.length, 2, 'Should render 2 history items');

    // Structure: wrapper > icon, textSpan
    const wrapper = resultItems[0].children[0];

    assert.ok(wrapper, 'Wrapper span should exist');
    assert.strictEqual(wrapper.tagName, 'SPAN', 'Wrapper should be a span');

    const firstItemIcon = wrapper.children[0];
    const firstItemSpan = wrapper.children[1];

    assert.ok(firstItemSpan, 'Text span should be created');

    // Test XSS prevention: textContent should literally contain the script tags
    assert.strictEqual(firstItemSpan.textContent, '<script>alert("xss")</script>', 'Should escape XSS characters by using textContent');

    // Verify the UI structure matches guidelines (marginLeft: 8px)
    assert.strictEqual(firstItemSpan.style.marginLeft, '8px', 'Should have a marginLeft of 8px on the text span');

    // Verify Icon is sibling
    assert.strictEqual(firstItemIcon.className, 'fas fa-history', 'Icon should have fa-history class');
    assert.strictEqual(firstItemIcon.style.marginRight, undefined, 'Icon should not have marginRight');

    // Restore original DOM methods
    document.getElementById = originalGetElementById;
    document.querySelector = originalQuerySelector;
});
test('Search Results Rendering generates safe DOM elements for vehicles and services', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const scriptPath = path.resolve('JS/script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    const searchToggle = document.createElement('button');
    searchToggle.id = 'search-toggle';
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.id = 'header-search-input';
    const searchResults = document.createElement('div');
    searchResults.id = 'header-search-results';

    const originalFetchBackup = global.fetch;
    const originalLocalStorageBackup = global.localStorage;
    const original__localStorageBackup = global.__localStorage;

    global.__localStorage = {};
    global.localStorage = {
        getItem: (key) => global.__localStorage[key] || null,
        setItem: (key, value) => { global.__localStorage[key] = value; },
    };

    global.fetch = () => Promise.resolve({
        ok: true,
        text: () => Promise.resolve('brand,model,year\nToyota,Camry,2020\nFord,Focus,2015')
    });

    const originalGetElementById = document.getElementById;
    const originalQuerySelector = document.querySelector;
    document.getElementById = (id) => {
        if (id === 'search-toggle') return searchToggle;
        if (id === 'header-search-input') return searchInput;
        if (id === 'header-search-results') return searchResults;
        return originalGetElementById(id);
    };
    document.querySelector = (selector) => {
        if (selector === '.search-container') return searchContainer;
        return originalQuerySelector(selector);
    };

    const evalCode = `
        ${scriptContent};
        if (typeof initHeaderSearch !== 'undefined') {
            global.test_initHeaderSearch_2 = initHeaderSearch;
        }
    `;
    eval(evalCode);

    global.test_initHeaderSearch_2();

    await new Promise(resolve => setTimeout(resolve, 50));

    searchInput.value = 'to';
    searchInput.dispatchEvent({ type: 'input', target: searchInput });

    await new Promise(resolve => setTimeout(resolve, 350));

    const children = Array.from(searchResults.children);

    const headers = children.filter(c => c.tagName === 'DIV' && c.className !== 'search-result-item');
    const resultItems = children.filter(c => c.className === 'search-result-item');

    assert.strictEqual(headers.length, 2, 'Should have 2 headers (VEHICLES and SERVICES & PAGES)');
    assert.strictEqual(headers[0].textContent, 'VEHICLES', 'First header should be VEHICLES');
    assert.strictEqual(headers[1].textContent, 'SERVICES & PAGES', 'Second header should be SERVICES & PAGES');

    assert.ok(resultItems.length > 0, 'Should have search results');

    const carWrapper = resultItems[0].children[0];
    assert.ok(carWrapper, 'Car wrapper span should exist');
    assert.strictEqual(carWrapper.tagName, 'SPAN', 'Car wrapper should be a span');

    const carIcon = carWrapper.children[0];
    const carSpan = carWrapper.children[1];

    assert.strictEqual(carIcon.className, 'fas fa-car', 'Vehicle should have fa-car icon');
    assert.strictEqual(carSpan.textContent, 'Toyota Camry 2020', 'Vehicle text should match');
    assert.strictEqual(carSpan.style.marginLeft, '8px', 'Vehicle text should have marginLeft 8px');

    const serviceWrapper = resultItems[1].children[0];
    assert.ok(serviceWrapper, 'Service wrapper span should exist');
    assert.strictEqual(serviceWrapper.tagName, 'SPAN', 'Service wrapper should be a span');

    const serviceIcon = serviceWrapper.children[0];
    const serviceSpan = serviceWrapper.children[1];

    assert.strictEqual(serviceIcon.className, 'fas fa-tools', 'Service should have fa-tools icon');
    assert.strictEqual(serviceSpan.textContent, 'Leather Restoration', 'Service text should match');
    assert.strictEqual(serviceSpan.style.marginLeft, '8px', 'Service text should have marginLeft 8px');

    document.getElementById = originalGetElementById;
    document.querySelector = originalQuerySelector;
    global.fetch = originalFetchBackup;
    global.localStorage = originalLocalStorageBackup;
    global.__localStorage = original__localStorageBackup;
});
