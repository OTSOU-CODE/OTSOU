import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const codePath = path.resolve('JS/image-preview.js');
const codeString = fs.readFileSync(codePath, 'utf8');

describe('image-preview.js', () => {
    let context;

    beforeEach(() => {
        // Create a sandbox context based on our global mock
        context = vm.createContext({
            ...global,
            window: {
                ...global.window,
                location: { search: '' },
                history: { pushState: () => {} },
                dispatchEvent: () => {}
            },
            document: {
                ...global.document,
                getElementById: (id) => {
                    return {
                        id,
                        textContent: '',
                        innerHTML: '',
                        src: '',
                        classList: { add: () => {}, remove: () => {} },
                        style: {},
                        appendChild: () => {},
                        querySelectorAll: () => []
                    };
                },
                querySelectorAll: () => [],
                querySelector: () => {
                    return {
                        textContent: '',
                        style: {},
                        classList: { add: () => {}, remove: () => {} }
                    };
                },
                createElement: () => {
                    return {
                        className: '',
                        style: {},
                        appendChild: () => {}
                    };
                },
                addEventListener: () => {}
            },
            localStorage: {
                getItem: () => null,
                setItem: () => {}
            },
            URLSearchParams: global.URLSearchParams || URLSearchParams,
            URL: global.URL || URL,
            setTimeout: global.setTimeout,
            CustomEvent: global.CustomEvent || class CustomEvent {}
        });

        // Evaluate the code in the sandbox context
        vm.runInContext(codeString, context);
    });

    describe('initPDP() - URL parsing and index boundary handling', () => {
        test('should default to index 0 when no index parameter is provided', () => {
            context.window.location.search = '';
            context.initPDP();
            const currentImageIndex = vm.runInContext('currentImageIndex', context);
            assert.strictEqual(currentImageIndex, 0);
        });

        test('should correctly parse a valid index parameter', () => {
            context.window.location.search = '?index=2';
            context.initPDP();
            const currentImageIndex = vm.runInContext('currentImageIndex', context);
            assert.strictEqual(currentImageIndex, 2);
        });

        test('should fallback to 0 when index is negative', () => {
            context.window.location.search = '?index=-1';
            context.initPDP();
            const currentImageIndex = vm.runInContext('currentImageIndex', context);
            assert.strictEqual(currentImageIndex, 0);
        });

        test('should fallback to 0 when index exceeds galleryData length', () => {
            const galleryDataLength = vm.runInContext('galleryData.length', context);
            context.window.location.search = `?index=${galleryDataLength}`;
            context.initPDP();
            const currentImageIndex = vm.runInContext('currentImageIndex', context);
            assert.strictEqual(currentImageIndex, 0);
        });

        test('should fallback to 0 when index is an invalid string', () => {
            context.window.location.search = '?index=abc';
            context.initPDP();
            const currentImageIndex = vm.runInContext('currentImageIndex', context);
            assert.strictEqual(currentImageIndex, 0);
        });
    });
});
