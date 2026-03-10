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
