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

test('window.sortVehicles sorts values correctly', async () => {
    // Import and initialize category.js environment
    await import('../JS/category.js');
    global._triggerDOMContentLoaded();

    assert.ok(typeof window.sortVehicles === 'function', 'sortVehicles should be globally available');

    // Create a mock dataset
    window.filteredVehicles = [
        { id: 2, priceMonthly: 500, year: "2020" },
        { id: 1, priceMonthly: 300, year: "2018" },
        { id: 3, priceMonthly: 700, year: "2023" },
        { id: 4, priceMonthly: 300, year: "2019" },
    ];

    // Mock renderBatch to prevent DOM errors
    // The implementation of sortVehicles calls renderBatch(true), which updates current page and re-renders grid
    // For this test we only care about the sorting
    // Actually, `renderBatch` is a local function in `category.js`, so it's not on `global` or `window`.
    // However, we don't need to mock it if `grid.innerHTML` setter doesn't crash (we mocked DOM in setup).
    // Let's just run sortVehicles and check the array.

    // 1. Sort by price ascending
    window.sortVehicles('price_asc');
    // Ensure data actually updated and is what we expect
    assert.strictEqual(window.filteredVehicles[0].id, 1);
    assert.strictEqual(window.filteredVehicles[1].id, 4);
    assert.strictEqual(window.filteredVehicles[2].id, 2);
    assert.strictEqual(window.filteredVehicles[3].id, 3);

    // 2. Sort by price descending
    window.sortVehicles('price_desc');
    assert.strictEqual(window.filteredVehicles[0].id, 3);
    assert.strictEqual(window.filteredVehicles[1].id, 2);
    // 1 and 4 have same price, Array.prototype.sort is stable in modern JS, but order might be preserved from previous sort
    assert.strictEqual(window.filteredVehicles[2].priceMonthly, 300);
    assert.strictEqual(window.filteredVehicles[3].priceMonthly, 300);

    // 3. Sort by year ascending
    window.sortVehicles('year_asc');
    assert.strictEqual(window.filteredVehicles[0].id, 1);
    assert.strictEqual(window.filteredVehicles[1].id, 4);
    assert.strictEqual(window.filteredVehicles[2].id, 2);
    assert.strictEqual(window.filteredVehicles[3].id, 3);

    // 4. Sort by year descending
    window.sortVehicles('year_desc');
    assert.strictEqual(window.filteredVehicles[0].id, 3);
    assert.strictEqual(window.filteredVehicles[1].id, 2);
    assert.strictEqual(window.filteredVehicles[2].id, 4);
    assert.strictEqual(window.filteredVehicles[3].id, 1);

    // 5. Default sort (by id)
    window.sortVehicles('default');
    assert.strictEqual(window.filteredVehicles[0].id, 1);
    assert.strictEqual(window.filteredVehicles[1].id, 2);
    assert.strictEqual(window.filteredVehicles[2].id, 3);
    assert.strictEqual(window.filteredVehicles[3].id, 4);
});
