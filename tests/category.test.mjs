import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('window.toggleFilter toggles values correctly', async () => {
    // Import and initialize category.js environment
    await import('../JS/category.js');
    global._triggerDOMContentLoaded();

    assert.ok(typeof window.toggleFilter === 'function', 'toggleFilter should be globally available');
    assert.ok(window.activeFilters, 'activeFilters should be exposed');

    // Make sure initial state is clean
    window.activeFilters.make.clear();
    window.activeFilters.model.clear();
    window.activeFilters.year.clear();

    // 1. Toggling element NOT in Set should ADD it
    assert.strictEqual(window.activeFilters.make.size, 0);
    window.toggleFilter('make', 'Toyota');
    assert.strictEqual(window.activeFilters.make.size, 1);
    assert.ok(window.activeFilters.make.has('Toyota'));

    // 2. Toggling element ALREADY in Set should REMOVE it
    window.toggleFilter('make', 'Toyota');
    assert.strictEqual(window.activeFilters.make.size, 0);
    assert.ok(!window.activeFilters.make.has('Toyota'));

    // 3. Toggling multiple elements in different filter types
    window.toggleFilter('make', 'Honda');
    window.toggleFilter('make', 'Ford');
    assert.strictEqual(window.activeFilters.make.size, 2);
    assert.ok(window.activeFilters.make.has('Honda'));
    assert.ok(window.activeFilters.make.has('Ford'));

    // Toggling models
    assert.strictEqual(window.activeFilters.model.size, 0);
    window.toggleFilter('model', 'Civic');
    window.toggleFilter('model', 'Accord');
    assert.strictEqual(window.activeFilters.model.size, 2);
    assert.ok(window.activeFilters.model.has('Civic'));
    assert.ok(window.activeFilters.model.has('Accord'));

    // Toggling years
    assert.strictEqual(window.activeFilters.year.size, 0);
    window.toggleFilter('year', '2023');
    window.toggleFilter('year', '2024');
    assert.strictEqual(window.activeFilters.year.size, 2);
    assert.ok(window.activeFilters.year.has('2023'));
    assert.ok(window.activeFilters.year.has('2024'));

    // Toggling off multiple
    window.toggleFilter('model', 'Civic');
    assert.strictEqual(window.activeFilters.model.size, 1);
    assert.ok(!window.activeFilters.model.has('Civic'));
    assert.ok(window.activeFilters.model.has('Accord'));

    window.toggleFilter('year', '2023');
    assert.strictEqual(window.activeFilters.year.size, 1);
    assert.ok(!window.activeFilters.year.has('2023'));
    assert.ok(window.activeFilters.year.has('2024'));

    // Cleanup
    window.activeFilters.make.clear();
    window.activeFilters.model.clear();
    window.activeFilters.year.clear();
});

test('loadVehicles shows error fallback on dataManager.init failure', async () => {
    // Import and initialize category.js environment
    // Note: since the file was imported in the first test, we don't necessarily need to re-import it
    // But dataManager is used in category.js. We need to override it.
    const { default: dataManager } = await import('../JS/DataManager.js');

    const mockGrid = { innerHTML: '', style: {}, children: [] };
    const originalGetElementById = document.getElementById;

    document.getElementById = (id) => {
        if (id === 'vehicleGrid') return mockGrid;
        return {
            innerHTML: '',
            style: {},
            classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
            addEventListener: () => {},
            querySelectorAll: () => [],
            querySelector: () => null,
            children: []
        };
    };

    const originalInit = dataManager.init;
    dataManager.init = async () => {
        throw new Error('Test Error');
    };

    const originalConsoleError = console.error;
    console.error = () => {};

    try {
        await import('../JS/category.js');
        global._triggerDOMContentLoaded();

        // Let event loop clear microtasks so the async loadVehicles completes
        await new Promise(resolve => setTimeout(resolve, 0));

        assert.ok(mockGrid.innerHTML.includes('Unable to load vehicles'), 'Grid should display error message title');
        assert.ok(mockGrid.innerHTML.includes('Test Error'), 'Grid should display the error message itself');
    } finally {
        document.getElementById = originalGetElementById;
        dataManager.init = originalInit;
        console.error = originalConsoleError;
    }
});
