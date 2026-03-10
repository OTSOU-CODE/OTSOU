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

test('applyFilters works correctly', async () => {
    // Import and initialize category.js environment
    await import('../JS/category.js');
    global._triggerDOMContentLoaded();

    // Since initialization is async, ensure the mock setup is complete
    assert.ok(typeof window.__applyFilters === 'function', 'applyFilters should be globally available');

    const mockVehicles = [
        { id: 1, brand: 'Toyota', model: 'Corolla', year: '2020', realImagePath: 'images/placeholder.jpg' },
        { id: 2, brand: 'Toyota', model: 'Camry', year: '2021', realImagePath: 'real-image.jpg' },
        { id: 3, brand: 'Honda', model: 'Civic', year: '2019', realImagePath: 'images/placeholder.jpg' },
        { id: 4, brand: 'Honda', model: 'Accord', year: '2020', realImagePath: 'images/placeholder.jpg' },
        { id: 5, brand: 'Ford', model: 'Mustang', year: '2022', realImagePath: 'images/placeholder.jpg' },
    ];

    window.__setAllVehicles(mockVehicles);

    // Clear filters to start fresh
    window.activeFilters.make.clear();
    window.activeFilters.model.clear();
    window.activeFilters.year.clear();

    // 1. Initial state (no filters) -> all vehicles
    window.__applyFilters();
    let filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 5, 'No filters should return all vehicles');

    // 2. Filter by Make
    window.activeFilters.make.add('Toyota');
    window.__applyFilters();
    filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 2, 'Should filter by make (Toyota)');
    assert.ok(filtered.every(v => v.brand === 'Toyota'));

    // Image priority: if only make is selected, real images should come first
    // In our mock, Camry has a real image, Corolla has placeholder.
    assert.strictEqual(filtered[0].model, 'Camry', 'Should prioritize vehicles with actual images');
    assert.strictEqual(filtered[1].model, 'Corolla');

    // 3. Filter by Model
    window.activeFilters.make.clear();
    window.activeFilters.model.add('Civic');
    window.__applyFilters();
    filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 1, 'Should filter by model (Civic)');
    assert.strictEqual(filtered[0].model, 'Civic');

    // 4. Filter by Year (matches '2020')
    window.activeFilters.model.clear();
    window.activeFilters.year.add('2020');
    window.__applyFilters();
    filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 2, 'Should filter by year (2020)');
    assert.ok(filtered.every(v => v.year === '2020'));

    // 5. Multiple Filters (Make: Honda, Year: 2020)
    window.activeFilters.make.add('Honda');
    window.__applyFilters();
    filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 1, 'Should filter by make and year');
    assert.strictEqual(filtered[0].brand, 'Honda');
    assert.strictEqual(filtered[0].year, '2020');

    // Multiple Models (Make: Honda, Model: Accord OR Civic)
    window.activeFilters.year.clear();
    window.activeFilters.model.add('Accord');
    window.activeFilters.model.add('Civic');
    window.__applyFilters();
    filtered = window.__getFilteredVehicles();
    assert.strictEqual(filtered.length, 2, 'Should filter by multiple models under same make');
    assert.ok(filtered.every(v => v.brand === 'Honda' && (v.model === 'Accord' || v.model === 'Civic')));

    // Cleanup
    window.activeFilters.make.clear();
    window.activeFilters.model.clear();
    window.activeFilters.year.clear();
});
