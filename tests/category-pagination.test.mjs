import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('renderBatch pagination logic and page limits', async () => {
    // Import and initialize category.js environment
    global.window.scrollTo = () => {};

    // Create elements that category.js looks for
    const paginationEl = document.getElementById('pagination');
    const filterBar = document.getElementById('filterBar');
    filterBar.getBoundingClientRect = () => ({ top: 100 });

    await import('../JS/category.js');
    global._triggerDOMContentLoaded();

    assert.ok(typeof window._renderBatch === 'function', '_renderBatch should be exposed');
    assert.ok(typeof window._setFilteredVehicles === 'function', '_setFilteredVehicles should be exposed');
    assert.ok(typeof window.changePage === 'function', 'changePage should be exposed');
    assert.ok(typeof window._getCurrentPage === 'function', '_getCurrentPage should be exposed');

    // Make sure we have a clean state with batchSize = 12
    const batchSize = 12;

    // Test Case 1: Less than one batch
    window._setFilteredVehicles(Array(5).fill({
      id: "1", brand: "A", model: "B", year: "2020",
      realImagePath: "", price: "100"
    }));
    window._renderBatch(true);

    assert.strictEqual(window._getCurrentPage(), 1, 'Current page should be 1');
    assert.strictEqual(paginationEl.style.display, 'none', 'Pagination should be hidden for 1 page');

    // Test Case 2: Exactly one batch
    window._setFilteredVehicles(Array(batchSize).fill({
      id: "1", brand: "A", model: "B", year: "2020",
      realImagePath: "", price: "100"
    }));
    window._renderBatch(true);

    assert.strictEqual(window._getCurrentPage(), 1, 'Current page should be 1');
    assert.strictEqual(paginationEl.style.display, 'none', 'Pagination should be hidden for exactly 1 page');

    // Test Case 3: More than one batch
    window._setFilteredVehicles(Array(batchSize + 1).fill({
      id: "1", brand: "A", model: "B", year: "2020",
      realImagePath: "", price: "100"
    }));
    window._renderBatch(true);

    assert.strictEqual(window._getCurrentPage(), 1, 'Current page should be reset to 1');
    assert.strictEqual(paginationEl.style.display, 'flex', 'Pagination should be shown for >1 pages');
    assert.ok(paginationEl.innerHTML.includes('disabled'), 'Prev button should be disabled on page 1');

    // Test Case 4: Change to valid page
    window.changePage(2);
    assert.strictEqual(window._getCurrentPage(), 2, 'Should change to page 2');

    // Test Case 5: Change to invalid page (below 1)
    window.changePage(0);
    assert.strictEqual(window._getCurrentPage(), 2, 'Should not change to page 0');
    window.changePage(-5);
    assert.strictEqual(window._getCurrentPage(), 2, 'Should not change to negative page');

    // Test Case 6: Change to invalid page (above totalPages)
    // For 13 items, totalPages is 2
    window.changePage(3);
    assert.strictEqual(window._getCurrentPage(), 2, 'Should not change to page 3 when max is 2');

    // Test Case 7: Resetting to page 1 via renderBatch
    window._renderBatch(true);
    assert.strictEqual(window._getCurrentPage(), 1, 'renderBatch(true) should reset to page 1');

    // Test Case 8: Total pages calculation logic testing via changePage limits
    window._setFilteredVehicles(Array(batchSize * 3).fill({
        id: "1", brand: "A", model: "B", year: "2020",
        realImagePath: "", price: "100"
    })); // 3 pages exactly

    window._renderBatch(true);

    window.changePage(3);
    assert.strictEqual(window._getCurrentPage(), 3, 'Should allow changing to last page');

    window.changePage(4);
    assert.strictEqual(window._getCurrentPage(), 3, 'Should not change past last page');
});
