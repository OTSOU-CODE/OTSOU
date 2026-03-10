import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';

test('gallery page initialization', async (t) => {
    const code = fs.readFileSync('./JS/gallery-page.js', 'utf8');
    // Change const to var so we can overwrite galleryData in tests
    const modifiedCode = code.replace('const galleryData =', 'var galleryData =');

    await t.test('initGallery gracefully returns when gallery-grid is not found', () => {
        const context = vm.createContext({
            ...global,
            document: {
                ...global.document,
                getElementById: () => null
            }
        });
        vm.runInContext(modifiedCode, context);
        assert.doesNotThrow(() => {
            context.initGallery();
        });
    });

    await t.test('initGallery creates gallery items and triggers animations', () => {
        let mockGridChildren = [];
        let innerHTMLSet = [];

        const mockGrid = {
            id: 'gallery-grid',
            get innerHTML() { return ''; },
            set innerHTML(val) { innerHTMLSet.push(val); },
            appendChild: (child) => {
                mockGridChildren.push(child);
            }
        };

        const mockDocument = {
            ...global.document,
            getElementById: (id) => id === 'gallery-grid' ? mockGrid : null,
            createElement: (tag) => {
                const el = {
                    tagName: tag,
                    attributes: {},
                    setAttribute: function(name, value) {
                        this.attributes[name] = value;
                    },
                    classes: new Set(),
                    classList: {
                        add: function(cls) { el.classes.add(cls); },
                        remove: function(cls) { el.classes.delete(cls); },
                        contains: function(cls) { return el.classes.has(cls); }
                    },
                    listeners: {},
                    addEventListener: function(event, callback) {
                        this.listeners[event] = callback;
                    },
                    click: function() {
                        if (this.listeners['click']) this.listeners['click']();
                    },
                    style: {}
                };
                return el;
            },
            querySelectorAll: (selector) => {
                if (selector === '.gallery-item') return mockGridChildren;
                return [];
            }
        };

        // Mock setTimeout to execute immediately
        const mockSetTimeout = (cb) => cb();

        let locationHref = '';
        const context = vm.createContext({
            ...global,
            document: mockDocument,
            setTimeout: mockSetTimeout,
            window: {
                ...global.window,
                location: {
                    get href() { return locationHref; },
                    set href(val) { locationHref = val; }
                }
            }
        });
        vm.runInContext(modifiedCode, context);

        context.initGallery();

        // 1. Should first clear, then show loading, then clear again in loadGalleryImages
        assert.strictEqual(innerHTMLSet[0], '', 'Should clear first');
        assert.ok(innerHTMLSet[1].includes('gallery-loading'), 'Should show loading state');
        assert.strictEqual(innerHTMLSet[2], '', 'Should clear loading state');

        // 3. Should append children based on galleryData
        assert.strictEqual(mockGridChildren.length, context.galleryData.length, 'Should append all gallery items');

        // 4. Verify a child has proper attributes and content
        assert.strictEqual(mockGridChildren[0].className, 'gallery-item', 'Should have correct class');
        assert.strictEqual(mockGridChildren[0].attributes['data-index'], 0, 'Should set data-index');
        assert.ok(mockGridChildren[0].innerHTML.includes('Black-&-Orange'), 'Should contain image source');

        // 5. Check animations were triggered (classList.add('visible') inside nested setTimeouts)
        assert.strictEqual(mockGridChildren[0].classes.has('visible'), true, 'Should trigger animation visibility');

        // 6. Test click event navigates to image preview
        mockGridChildren[0].click();
        assert.strictEqual(locationHref, 'image-preview.html?index=0', 'Click should navigate to preview page');
    });

    await t.test('loadGalleryImages shows empty state when galleryData is empty', () => {
        let innerHTMLSet = [];

        const mockGrid = {
            id: 'gallery-grid',
            get innerHTML() { return ''; },
            set innerHTML(val) { innerHTMLSet.push(val); },
            appendChild: () => {}
        };

        const mockDocument = {
            ...global.document,
            getElementById: (id) => id === 'gallery-grid' ? mockGrid : null
        };

        const context = vm.createContext({
            ...global,
            document: mockDocument
        });

        // Modify code again for this context specifically
        vm.runInContext(modifiedCode, context);

        // Override gallery data
        context.galleryData = [];

        context.loadGalleryImages();

        // Should call showEmptyState which sets innerHTML to No Images Available
        assert.ok(innerHTMLSet.some(html => html.includes('No Images Available')), 'Should show empty state HTML');
    });

    await t.test('gallery items have correct touch events', () => {
        let mockGridChildren = [];

        const mockGrid = {
            id: 'gallery-grid',
            get innerHTML() { return ''; },
            set innerHTML(val) { },
            appendChild: (child) => {
                mockGridChildren.push(child);
            }
        };

        const mockDocument = {
            ...global.document,
            getElementById: (id) => id === 'gallery-grid' ? mockGrid : null,
            createElement: (tag) => {
                const el = {
                    tagName: tag,
                    attributes: {},
                    setAttribute: function(name, value) {
                        this.attributes[name] = value;
                    },
                    classes: new Set(),
                    classList: {
                        add: function(cls) { el.classes.add(cls); },
                        remove: function(cls) { el.classes.delete(cls); },
                        contains: function(cls) { return el.classes.has(cls); }
                    },
                    listeners: {},
                    addEventListener: function(event, callback) {
                        this.listeners[event] = callback;
                    },
                    style: {}
                };
                return el;
            },
            querySelectorAll: () => []
        };

        const context = vm.createContext({
            ...global,
            document: mockDocument,
            setTimeout: (cb) => cb(),
            window: { ...global.window }
        });

        vm.runInContext(modifiedCode, context);
        context.initGallery();

        const firstItem = mockGridChildren[0];

        // Ensure touchstart sets transform scale
        assert.ok(firstItem.listeners['touchstart'], 'Should have touchstart listener');

        // Manually trigger touchstart, binding 'this' to firstItem
        firstItem.listeners['touchstart'].call(firstItem);
        assert.strictEqual(firstItem.style.transform, 'scale(0.98)', 'Should apply scale on touchstart');

        // Ensure touchend clears transform
        assert.ok(firstItem.listeners['touchend'], 'Should have touchend listener');

        // Manually trigger touchend, binding 'this' to firstItem
        firstItem.listeners['touchend'].call(firstItem);
        assert.strictEqual(firstItem.style.transform, '', 'Should clear scale on touchend');
    });
});
