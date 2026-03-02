/**
 * Simple Cart Logic Tests
 * Run with: node tests/cart.test.js
 * Or use Jest/Mocha for proper test runner
 */

// Mock localStorage for Node.js environment
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };
}

// Simple test framework
function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.error(`❌ ${description}`);
    console.error(`   ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Mock products
const mockProducts = {
  1: { id: 1, title: 'Test Laptop 1', price: 25000 },
  2: { id: 2, title: 'Test Laptop 2', price: 30000 }
};

// Simple cart implementation for testing
class Cart {
  constructor() {
    this.items = [];
  }
  
  add(product) {
    this.items.push(product);
  }
  
  remove(index) {
    this.items.splice(index, 1);
  }
  
  clear() {
    this.items = [];
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  getCount() {
    return this.items.length;
  }
  
  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  
  load() {
    const stored = localStorage.getItem('cart');
    this.items = stored ? JSON.parse(stored) : [];
  }
}

// Run tests
console.log('\n🧪 Running Cart Tests...\n');

test('Cart starts empty', () => {
  const cart = new Cart();
  assert(cart.getCount() === 0, 'Cart should be empty');
});

test('Can add item to cart', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  assert(cart.getCount() === 1, 'Cart should have 1 item');
});

test('Can add multiple items', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  cart.add(mockProducts[2]);
  assert(cart.getCount() === 2, 'Cart should have 2 items');
});

test('Can remove item from cart', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  cart.add(mockProducts[2]);
  cart.remove(0);
  assert(cart.getCount() === 1, 'Cart should have 1 item after removal');
});

test('Can clear cart', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  cart.add(mockProducts[2]);
  cart.clear();
  assert(cart.getCount() === 0, 'Cart should be empty after clear');
});

test('Calculates total correctly', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  cart.add(mockProducts[2]);
  const expected = 25000 + 30000;
  assert(cart.getTotal() === expected, `Total should be ${expected}`);
});

test('Can save to localStorage', () => {
  const cart = new Cart();
  cart.add(mockProducts[1]);
  cart.save();
  const stored = localStorage.getItem('cart');
  assert(stored !== null, 'Cart should be saved to localStorage');
});

test('Can load from localStorage', () => {
  localStorage.clear();
  const cart1 = new Cart();
  cart1.add(mockProducts[1]);
  cart1.add(mockProducts[2]);
  cart1.save();
  
  const cart2 = new Cart();
  cart2.load();
  assert(cart2.getCount() === 2, 'Cart should load 2 items from localStorage');
  assert(cart2.getTotal() === 55000, 'Loaded cart should have correct total');
});

test('Handles empty localStorage gracefully', () => {
  localStorage.clear();
  const cart = new Cart();
  cart.load();
  assert(cart.getCount() === 0, 'Cart should be empty when localStorage is empty');
});

console.log('\n✨ All tests completed!\n');
