/**
 * JOHAAR COMPUTER - Main Application Entry
 * Modular ES6+ architecture with performance optimizations
 */

import { initThreeScene } from './js/three-scene.js';
import { initUI } from './js/ui.js';
import { initCart } from './js/cart.js';
import { initProducts } from './js/products.js';
import { showToast } from './js/utils.js';

// Check for WebGL support
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Initialize application
function init() {
  // Initialize UI interactions
  initUI();
  
  // Initialize cart functionality
  initCart();
  
  // Initialize products
  initProducts();
  
  // Initialize 3D scene if WebGL is supported
  if (checkWebGLSupport()) {
    initThreeScene();
  } else {
    console.warn('WebGL not supported, 3D scene disabled');
    showToast('3D visualization unavailable on this device');
  }
  
  // Pause animations when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause expensive operations
      window.dispatchEvent(new CustomEvent('pause-animations'));
    } else {
      // Resume operations
      window.dispatchEvent(new CustomEvent('resume-animations'));
    }
  });
}

// Wait for DOM and external scripts to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
