import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

// Import the module. Note that it sets window.DataManager and exports a default instance.
import dataManager from '../JS/DataManager.js';

test('DataManager.init() vehicle cache - should only call fetchVehicles once', async () => {
    // 1. Reset the instance state to simulate a fresh load
    dataManager.loadPromise = null;
    dataManager.isLoaded = false;
    dataManager.vehicles = [];

    let fetchCallCount = 0;

    // 2. Spy on fetchVehicles to track how many times it gets called
    const originalFetchVehicles = dataManager.fetchVehicles.bind(dataManager);
    dataManager.fetchVehicles = async () => {
        fetchCallCount++;
        return originalFetchVehicles();
    };

    try {
        // 3. Call init() twice concurrently
        const promise1 = dataManager.init();
        const promise2 = dataManager.init();

        // Both promises should resolve to the same vehicles array
        const [result1, result2] = await Promise.all([promise1, promise2]);

        // 4. Assert fetchVehicles was only called once
        assert.strictEqual(fetchCallCount, 1, 'fetchVehicles should be called exactly once during concurrent init() calls');
        assert.ok(result1.length > 0, 'Vehicles should be loaded');
        assert.strictEqual(result1, result2, 'Both init() calls should return the same array instance');

        // 5. Call init() again sequentially after the promise has resolved
        const result3 = await dataManager.init();

        // Assert fetchCallCount is still 1
        assert.strictEqual(fetchCallCount, 1, 'fetchVehicles should still only have been called once after subsequent sequential init() call');
        assert.strictEqual(result1, result3, 'Sequential init() call should return the same array instance');

    } finally {
        // Restore the original method to avoid affecting other tests
        dataManager.fetchVehicles = originalFetchVehicles;
    }
});
