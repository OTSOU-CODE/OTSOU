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
test('Search Results Rendering generates correct structure for vehicles and services', async () => {
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
        'searchHistory': JSON.stringify([])
    };
    global.localStorage = {
        getItem: (key) => global.__localStorage[key] || null,
        setItem: (key, value) => { global.__localStorage[key] = value; },
    };

    // Create a Promise hook to know when fetch completes
    let resolveFetch;
    const fetchPromise = new Promise(resolve => { resolveFetch = resolve; });

    global.fetch = () => {
        resolveFetch();
        return Promise.resolve({
            ok: true,
            text: () => Promise.resolve('brand,model,year\nLeatherBrand,LeatherModel,2023\nToyota,Camry,2020')
        });
    };

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

    // Wait for fetch to be called and microtasks to flush
    await fetchPromise;
    await new Promise(resolve => setTimeout(resolve, 50)); // let data process

    // Now listeners should be attached. Trigger 'input' on the search input.
    if (inputListeners['input']) {
        inputListeners['input']({ target: { value: 'leather' } });
    } else {
        assert.fail('Input listener was not attached to searchInput');
    }

    // Wait for the 300ms debounce timer to fire + a little extra
    await new Promise(resolve => setTimeout(resolve, 350));

    // Verify search results are rendered
    // Expected children:
    // 1. Header (VEHICLES)
    // 2. search-result-item (LeatherBrand)
    // 3. Header (SERVICES & PAGES)
    // 4. search-result-item (Leather Restoration)

    const children = searchResults.children;
    assert.strictEqual(children.length, 4, 'Should render 2 headers and 2 results');

    // VEHICLES Header
    assert.strictEqual(children[0].textContent, 'VEHICLES', 'First child should be VEHICLES header');

    // Vehicle result
    assert.strictEqual(children[1].className, 'search-result-item', 'Second child should be a result item');
    const vehicleWrapper = children[1].children[0];
    assert.strictEqual(vehicleWrapper.tagName, 'SPAN', 'Vehicle wrapper should be a span');
    const vehicleIcon = vehicleWrapper.children[0];
    const vehicleText = vehicleWrapper.children[1];
    assert.strictEqual(vehicleIcon.className, 'fas fa-car', 'Vehicle icon should be fas fa-car');
    assert.strictEqual(vehicleText.textContent, 'LeatherBrand LeatherModel 2023', 'Vehicle text should match');

    // SERVICES Header
    assert.strictEqual(children[2].textContent, 'SERVICES & PAGES', 'Third child should be SERVICES header');

    // Service result
    assert.strictEqual(children[3].className, 'search-result-item', 'Fourth child should be a result item');
    const serviceWrapper = children[3].children[0];
    assert.strictEqual(serviceWrapper.tagName, 'SPAN', 'Service wrapper should be a span');
    const serviceIcon = serviceWrapper.children[0];
    const serviceText = serviceWrapper.children[1];
    assert.strictEqual(serviceIcon.className, 'fas fa-tools', 'Service icon should be fas fa-tools');
    assert.strictEqual(serviceText.textContent, 'Leather Restoration', 'Service text should match');

    // Restore original DOM methods
    document.getElementById = originalGetElementById;
    document.querySelector = originalQuerySelector;
});
