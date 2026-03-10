import test from 'node:test';
import assert from 'node:assert';
import './setup.mjs';
import { updateCartItemQty } from '../JS/cart-drawer.js';

test('updateCartItemQty functionality', async (t) => {
    // Helper to reset and mock localStorage
    const setupCart = (cartArray) => {
        global.localStorage.setItem('cart_items', JSON.stringify(cartArray));
    };

    const getCart = () => {
        return JSON.parse(global.localStorage.getItem('cart_items') || '[]');
    };

    await t.test('should increase quantity correctly', () => {
        setupCart([{ id: 1, quantity: 1 }]);
        updateCartItemQty(0, 1);
        const cart = getCart();
        assert.strictEqual(cart[0].quantity, 2);
    });

    await t.test('should decrease quantity correctly', () => {
        setupCart([{ id: 1, quantity: 2 }]);
        updateCartItemQty(0, -1);
        const cart = getCart();
        assert.strictEqual(cart[0].quantity, 1);
    });

    await t.test('should remove item when quantity drops to 0', () => {
        setupCart([{ id: 1, quantity: 1 }]);
        updateCartItemQty(0, -1);
        const cart = getCart();
        assert.strictEqual(cart.length, 0);
    });

    await t.test('should handle invalid index gracefully', () => {
        setupCart([{ id: 1, quantity: 1 }]);
        updateCartItemQty(1, 1);
        const cart = getCart();
        assert.strictEqual(cart[0].quantity, 1);
        assert.strictEqual(cart.length, 1);
    });

    await t.test('should remove item when quantity drops below 0', () => {
        setupCart([{ id: 1, quantity: 1 }]);
        updateCartItemQty(0, -2);
        const cart = getCart();
        assert.strictEqual(cart.length, 0);
    });
});
