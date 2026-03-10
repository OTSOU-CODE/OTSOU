import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('loadHistory error handling when localStorage has invalid JSON', async () => {
    const scriptContent = fs.readFileSync(path.join(__dirname, '../JS/script.js'), 'utf8');

    // Extract the loadHistory function as a string from script.js
    const startIdx = scriptContent.indexOf('const loadHistory = () => {');
    const endStr = '    };';
    const endIdx = scriptContent.indexOf(endStr, startIdx);

    if (startIdx === -1 || endIdx === -1) {
        assert.fail("Could not find loadHistory function in script.js");
    }

    const loadHistoryFnStr = scriptContent.substring(startIdx, endIdx + endStr.length);

    let loggedError = null;

    const mockConsole = {
        error: (msg, e) => {
            loggedError = { msg, e };
        }
    };

    let getCalledWith = null;
    const mockLocalStorage = {
        getItem: (key) => {
            getCalledWith = key;
            return '{invalid-json'; // Invalid JSON to trigger the catch block
        }
    };

    // Construct an executable function passing the mocks
    const wrappedFn = new Function('localStorage', 'console', loadHistoryFnStr + ' return loadHistory();');

    // Execute the function
    const result = wrappedFn(mockLocalStorage, mockConsole);

    // Verify localStorage.getItem was called with the correct key
    assert.strictEqual(getCalledWith, 'searchHistory');

    // Verify console.error was called with the correct message and exception
    assert.ok(loggedError, 'Expected console.error to be called');
    assert.strictEqual(loggedError.msg, 'Failed to load search history');
    assert.ok(loggedError.e instanceof SyntaxError, 'Expected a SyntaxError to be caught');

    // Verify the fallback return value is an empty array
    assert.deepStrictEqual(result, [], 'Expected fallback to be an empty array');
});

test('loadHistory successful parse', async () => {
    const scriptContent = fs.readFileSync(path.join(__dirname, '../JS/script.js'), 'utf8');
    const startIdx = scriptContent.indexOf('const loadHistory = () => {');
    const endStr = '    };';
    const endIdx = scriptContent.indexOf(endStr, startIdx);
    const loadHistoryFnStr = scriptContent.substring(startIdx, endIdx + endStr.length);

    const mockConsole = {
        error: () => { assert.fail("Should not call console.error on valid JSON") }
    };

    const mockLocalStorage = {
        getItem: (key) => '["Toyota", "Ford"]' // Valid JSON
    };

    const wrappedFn = new Function('localStorage', 'console', loadHistoryFnStr + ' return loadHistory();');

    const result = wrappedFn(mockLocalStorage, mockConsole);

    assert.deepStrictEqual(result, ["Toyota", "Ford"]);
});
