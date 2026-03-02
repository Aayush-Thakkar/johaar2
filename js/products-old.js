/**
 * Product Data Module
 * Loads products from individual JSON files in data/products/
 */

let products = {};

// Load all product files
async function loadProducts() {
  try {
    // Fetch the list of product files from the directory
    const productFiles = [
      'dell-latitude-7490.json',
      'lenovo-thinkpad-t480.json',
      'hp-elitebook-840-g6.json',
      'dell-xps-15-9570.json',
      'lenovo-ideapad-330.json',
      'microsoft-surface-laptop-3.json'
    ];
    
    const productPromises = productFiles.map(file => 
      fetch(`./data/products/${file}`).then(res => res.json())
    );
    
    const productArray = await Promise.all(productPromises);
    
    // Convert array to object with id as key
    products = productArray.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
    
    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    return getFallbackProducts();
  }
}

// Fallback products if JSON fails to load
function getFallbackProducts() {
  return {
    1: {
      id: 1,
      title: 'Dell Latitude 7490',
      desc: 'i7 8th Gen | 16GB RAM | 512GB SSD | 14" FHD | Backlit KB',
      price: 28500,
      tag: 'BEST SELLER',
      details: 'Refurbished business laptop with excellent build quality. Includes Windows 10 Pro, webcam, and multiple ports. Battery life up to 8 hours. Perfect for professionals and students.',
      image: './assets/products/dell-latitude-7490.jpg'
    },
    2: {
      id: 2,
      title: 'Lenovo ThinkPad T480',
      desc: 'i5 8th Gen | 8GB RAM | 256GB SSD | Dual Battery | Touchscreen',
      price: 24000,
      tag: 'WORKSTATION',
      details: 'Durable ThinkPad with MIL-STD certification. Expandable RAM, Thunderbolt 3, and long battery life with dual setup. Legendary keyboard quality.',
      image: './assets/products/lenovo-thinkpad-t480.jpg'
    },
    3: {
      id: 3,
      title: 'HP EliteBook 840 G6',
      desc: 'i7 8th Gen | 16GB RAM | 512GB SSD | Aluminum Body | Bang & Olufsen Audio',
      price: 31000,
      tag: 'ULTRABOOK',
      details: 'Premium ultrabook with privacy screen, fingerprint reader, and superior audio. Perfect for professionals who demand quality.',
      image: './assets/products/hp-elitebook-840.jpg'
    },
    4: {
      id: 4,
      title: 'Dell XPS 15 9570',
      desc: 'i7 8th Gen | 16GB RAM | 512GB SSD | GTX 1050Ti | 15.6" 4K Touch',
      price: 65000,
      tag: 'GAMING READY',
      details: 'High-end creator laptop with dedicated GPU. Ideal for video editing, gaming, and creative work. Stunning 4K display with touch support.',
      image: './assets/products/dell-xps-15.jpg'
    },
    5: {
      id: 5,
      title: 'Lenovo IdeaPad 330',
      desc: 'i3 8th Gen | 4GB RAM | 1TB HDD | 15.6" HD',
      price: 18500,
      tag: 'BUDGET PICK',
      details: 'Budget-friendly laptop for everyday use. Upgradable storage and RAM. Great for students and basic computing needs.',
      image: './assets/products/lenovo-ideapad-330.jpg'
    },
    6: {
      id: 6,
      title: 'Microsoft Surface Laptop 3',
      desc: 'i5 10th Gen | 8GB RAM | 256GB SSD | 13.5" Touch | Alcantara KB',
      price: 45000,
      tag: 'PREMIUM',
      details: 'Sleek and portable with PixelSense display. Great for productivity and light creative tasks. Premium Alcantara keyboard finish.',
      image: './assets/products/surface-laptop-3.jpg'
    }
  };
}

export { products };

/**
 * Render product cards to the DOM
 */
export async function renderProducts() {
  const grid = document.getElementById('inventory-grid');
  if (!grid) return;
  
  // Load products first
  await loadProducts();
  
  grid.innerHTML = '';
  
  Object.values(products).forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('tabindex', '0');
    
    // Add product image if available
    const imageHTML = product.image ? 
      `<img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.style.display='none'">` : '';
    
    card.innerHTML = `
      ${imageHTML}
      <span class="product-tag">${product.tag}</span>
      <h3>${product.title}</h3>
      <p>${product.desc}</p>
      <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
      <button type="button" class="add-to-cart" data-product-id="${product.id}" aria-label="Add ${product.title} to cart">
        Add to Cart
      </button>
    `;
    
    // Click to open modal
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-to-cart')) {
        window.dispatchEvent(new CustomEvent('open-product-modal', { detail: product.id }));
      }
    });
    
    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.target.classList.contains('add-to-cart')) {
        window.dispatchEvent(new CustomEvent('open-product-modal', { detail: product.id }));
      }
    });
    
    grid.appendChild(card);
  });
}

/**
 * Filter products based on search query
 */
export function filterProducts(query) {
  const cards = document.querySelectorAll('.product-card');
  const lowerQuery = query.toLowerCase();
  
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const matches = text.includes(lowerQuery);
    card.style.display = matches ? 'block' : 'none';
    
    // Highlight matched text (simple implementation)
    if (matches && query.length > 0) {
      card.style.borderColor = 'var(--accent-primary)';
    } else {
      card.style.borderColor = '';
    }
  });
}

/**
 * Initialize products module
 */
export async function initProducts() {
  await renderProducts();
}
