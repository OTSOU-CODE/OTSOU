import test from 'node:test';
import assert from 'node:assert';
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';

test('loadHistory error handling', async () => {
    const scriptPath = path.join(process.cwd(), 'JS', 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    let errorLogged = false;
    let loggedErrorObj = null;

    const sandbox = {
        console: {
            log: () => {},
            error: (msg, e) => {
                if (msg === 'Failed to load search history') {
                    errorLogged = true;
                    loggedErrorObj = e;
                }
            }
        },
        document: {
            addEventListener: () => {},
            documentElement: { setAttribute: () => {}, getAttribute: () => 'light' },
            getElementById: (id) => {
                if (id === 'search-toggle') return { addEventListener: () => {} };
                if (id === 'header-search-input') {
                    return {
                        addEventListener: (event, callback) => {
                            if (event === 'focus') {
                                sandbox._triggerFocus = callback;
                            }
                        },
                        value: ''
                    };
                }
                if (id === 'header-search-results') {
                    return { innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {} };
                }
                return { querySelector: () => ({ className: '' }) };
            },
            querySelector: (sel) => {
                if (sel === '.search-container') return { classList: { add: () => {}, remove: () => {} } };
                return { classList: { add: () => {}, remove: () => {} } };
            },
            querySelectorAll: () => {
                return [{ getAttribute: () => '#some-id', style: {}, addEventListener: () => {}, classList: { add: () => {}, remove: () => {} }, remove: () => {} }];
            },
            createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {}, addEventListener: () => {} }),
            createTextNode: () => ({})
        },
        window: {
            addEventListener: () => {},
            removeEventListener: () => {},
            matchMedia: () => ({ matches: false }),
            scrollTo: () => {}
        },
        navigator: {
            vibrate: () => {}
        },
        localStorage: {
            getItem: (key) => {
                if (key === 'searchHistory') {
                    return '{ invalid json ';
                }
                return null;
            },
            setItem: () => {}
        },
        fetch: () => Promise.resolve({ ok: true, text: () => Promise.resolve("brand,model,year\nToyota,Corolla,2020\n") }),
        IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
        setTimeout: global.setTimeout,
        clearTimeout: global.clearTimeout,
        JSON: global.JSON,
        SyntaxError: global.SyntaxError,
        Promise: global.Promise,
    };

    sandbox.window.document = sandbox.document;
    sandbox.globalThis = sandbox;

    // Create the context
    vm.createContext(sandbox);

    // Execute script
    vm.runInContext(scriptContent, sandbox);

    // Make sure we wait for anything microtask related
    await new Promise(r => setTimeout(r, 10));

    sandbox.initHeaderSearch();

    assert.ok(sandbox._triggerFocus, 'focusListener should be registered');

    sandbox._triggerFocus();

    assert.ok(errorLogged, 'Should log error when JSON parsing fails');
    assert.ok(loggedErrorObj instanceof SyntaxError, 'Logged error should be a SyntaxError');
});
