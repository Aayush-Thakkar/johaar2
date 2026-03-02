/**
 * UI Module
 * Handles modals, search, forms, and general UI interactions
 */

import { products } from './products.js';
import { filterProducts } from './products.js';
import { showToast } from './utils.js';

let currentModalProductId = null;

/**
 * Open product modal
 */
function openProductModal(productId) {
  const product = products[productId];
  if (!product) return;
  
  currentModalProductId = productId;
  
  const modal = document.getElementById('product-modal');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const price = document.getElementById('modal-price');
  const details = document.getElementById('modal-details');
  const canvas = document.getElementById('webgl-canvas');
  
  if (!modal) return;
  
  title.textContent = product.title;
  desc.textContent = product.desc;
  price.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  details.textContent = product.details;
  
  modal.removeAttribute('hidden');
  canvas?.classList.add('canvas--dimmed');
  
  // Focus first focusable element
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn?.focus();
  
  // Trap focus
  trapFocusInModal(modal);
}

/**
 * Close product modal
 */
function closeProductModal() {
  const modal = document.getElementById('product-modal');
  const canvas = document.getElementById('webgl-canvas');
  if (!modal) return;
  
  modal.setAttribute('hidden', '');
  canvas?.classList.remove('canvas--dimmed');
  currentModalProductId = null;
}

/**
 * Trap focus within modal for accessibility
 */
function trapFocusInModal(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  function handleTabKey(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }
  
  modal.addEventListener('keydown', handleTabKey);
}

/**
 * Handle search input with debouncing
 */
let searchTimeout;
function handleSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    filterProducts(query);
  }, 300);
}

/**
 * Handle contact form submission
 */
function handleContactForm(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // In production, send to backend API
  console.log('Form submitted:', Object.fromEntries(formData));
  
  showToast('Request submitted! We\'ll contact you soon.');
  form.reset();
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const offset = 80; // Account for fixed nav
  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Initialize UI module
 */
export function initUI() {
  // Modal close handlers
  const modal = document.getElementById('product-modal');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeProductModal);
  });
  
  // Close modal on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeProductModal();
    }
  });
  
  // Modal add to cart
  const modalAddCart = document.getElementById('modal-add-cart');
  modalAddCart?.addEventListener('click', () => {
    if (currentModalProductId) {
      window.dispatchEvent(new CustomEvent('add-to-cart', { 
        detail: currentModalProductId 
      }));
      closeProductModal();
    }
  });
  
  // Listen for open modal events
  window.addEventListener('open-product-modal', (e) => {
    openProductModal(e.detail);
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  searchInput?.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });
  
  searchBtn?.addEventListener('click', () => {
    handleSearch(searchInput.value);
  });
  
  // Contact form
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', handleContactForm);
  
  // Smooth scroll for CTA buttons
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.dataset.scrollTo;
      if (target) {
        scrollToSection(target);
      }
    });
  });
  
  // Navigation links smooth scroll
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      scrollToSection(target);
    });
  });
  
  // Footer links smooth scroll
  document.querySelectorAll('footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      scrollToSection(target);
    });
  });
}
