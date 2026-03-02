/**
 * Shopping Cart Module
 * Handles cart state, localStorage persistence, and UI updates
 */

import { products } from './products.js';
import { showToast } from './utils.js';

const CART_STORAGE_KEY = 'johaar_cart';
let cart = [];

/**
 * Load cart from localStorage
 */
function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    cart = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load cart:', e);
    cart = [];
  }
  updateCartUI();
}

/**
 * Save cart to localStorage
 */
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
}

/**
 * Add product to cart
 */
export function addToCart(productId) {
  const product = products[productId];
  if (!product) return;
  
  cart.push({ ...product });
  saveCart();
  updateCartUI();
  showToast(`${product.title} added to cart`);
}

/**
 * Remove product from cart by index
 */
export function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    const product = cart[index];
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`${product.title} removed from cart`);
  }
}

/**
 * Clear entire cart
 */
export function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

/**
 * Get cart total
 */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

/**
 * Update cart UI (sidebar and count badge)
 */
function updateCartUI() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');
  
  if (!cartItemsEl || !cartTotalEl || !cartCountEl) return;
  
  // Update count badge
  cartCountEl.textContent = cart.length;
  cartCountEl.setAttribute('aria-label', `${cart.length} items in cart`);
  
  // Update cart items
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">Your cart is empty</p>';
  } else {
    cartItemsEl.innerHTML = '';
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.setAttribute('role', 'listitem');
      div.innerHTML = `
        <span>${item.title} — ₹${item.price.toLocaleString('en-IN')}</span>
        <button type="button" data-remove-index="${index}" aria-label="Remove ${item.title}">Remove</button>
      `;
      cartItemsEl.appendChild(div);
    });
  }
  
  // Update total
  const total = getCartTotal();
  cartTotalEl.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
}

/**
 * Toggle cart sidebar
 */
export function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const toggle = document.getElementById('cart-toggle');
  const canvas = document.getElementById('webgl-canvas');
  
  if (!sidebar) return;
  
  const isHidden = sidebar.hasAttribute('hidden');
  
  if (isHidden) {
    sidebar.removeAttribute('hidden');
    toggle?.setAttribute('aria-expanded', 'true');
    canvas?.classList.add('canvas--dimmed');
    // Trap focus in cart
    trapFocus(sidebar);
  } else {
    sidebar.setAttribute('hidden', '');
    toggle?.setAttribute('aria-expanded', 'false');
    canvas?.classList.remove('canvas--dimmed');
  }
}

/**
 * Simple focus trap for accessibility
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  firstFocusable?.focus();
  
  element.addEventListener('keydown', function trapHandler(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
    
    if (e.key === 'Escape') {
      toggleCart();
      element.removeEventListener('keydown', trapHandler);
    }
  });
}

/**
 * Handle checkout
 */
function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  
  const total = getCartTotal();
  const confirmed = confirm(
    `Proceed to checkout?\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nThis is a demo. No payment will be processed.`
  );
  
  if (confirmed) {
    showToast('Order placed successfully! (Demo mode)');
    clearCart();
    toggleCart();
  }
}

/**
 * Initialize cart module
 */
export function initCart() {
  loadCart();
  
  // Cart toggle button
  const cartToggle = document.getElementById('cart-toggle');
  cartToggle?.addEventListener('click', toggleCart);
  
  // Close cart button
  const closeCart = document.getElementById('close-cart');
  closeCart?.addEventListener('click', toggleCart);
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn?.addEventListener('click', handleCheckout);
  
  // Event delegation for add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      e.stopPropagation();
      const productId = parseInt(e.target.dataset.productId);
      if (productId) {
        addToCart(productId);
      }
    }
    
    // Remove from cart
    if (e.target.hasAttribute('data-remove-index')) {
      const index = parseInt(e.target.dataset.removeIndex);
      removeFromCart(index);
    }
  });
  
  // Close cart on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('cart-sidebar');
      if (sidebar && !sidebar.hasAttribute('hidden')) {
        toggleCart();
      }
    }
  });
}
