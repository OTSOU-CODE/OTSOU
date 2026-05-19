# Blueprint: Data Management

## 1. Module Description

This blueprint outlines how vehicle and service data is structured, loaded, and queried across the Sherif-Auto platform. It relies on a Vanilla JS Singleton pattern (`DataManager`), prioritizing performance and avoiding heavy external state management libraries.

## 2. File Map

- **Data Manager:** `JS/DataManager.js`
- **Data Source:** `JS/vehicles_data.js` (Contains the raw JSON/Object data)
- **Config:** `JS/config.js` (Contains path maps and brand logo mappings)

## 3. Logic & State (DataManager.js)

The `DataManager` class follows the Singleton pattern (`DataManager.instance`). It initializes once and caches data for fast subsequent reads, reducing redundant fetching or parsing.

### Core Properties

- `vehicles`: Array of vehicle objects extracted and flattened from `VEHICLES_DATA`.
- `services`: Hardcoded array of shop services (e.g., Oil Change, Brake Service).
- `brands`: An object tracking the frequency/count of each brand in the dataset.
- `isLoaded`: Boolean flag indicating if data has been fetched.

### Detailed Function Registry

- `init()`: Async function that calls `fetchVehicles()` and sets `isLoaded = true`. Returns a promise protecting against multiple instantiations.
- `fetchVehicles()`: Flattens the structured `VEHICLES_DATA` into a 1D array, populates `this.vehicles`, and calls `_extractBrands()`.
- `_extractBrands()`: Internal helper that counts occurrences of each car brand for generating filtering/UI badges.
- `search(query)`: Takes a string, lowercases it, and returns an object `{ vehicles, services }` containing up to 5 matching vehicles and 3 matching services.
- `getAllVehicles()`: Returns the cached `vehicles` array.

## 4. Backend Dependencies

Currently, the `DataManager` fetches mock/static data from `vehicles_data.js` (imported asynchronously). The architecture is designed to easily swap `VEHICLES_DATA` with a Firebase fetch stream without modifying the UI components relying on `search()` or `init()`.

## 5. Maintenance Guide

- **Adding a Car:** Edit `JS/vehicles_data.js`. The `DataManager` automatically flattens the nested structures into a consumable array.
- **Brand Images:** Mapped in `JS/config.js` under `CONFIG.images.brands`. If a new brand is added to the data, its corresponding logo path must be added to `config.js` to ensure the UI renders correctly.
