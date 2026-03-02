# Johaar Computer - Production-Ready Storefront

A modern, accessible single-page application for a computer repair and refurbished laptop business. Features an interactive 3D laptop disassembly visualization built with Three.js.

## 🚀 Quick Start

### Prerequisites
- Modern web browser with ES6+ support
- Local development server (optional but recommended)

### Running Locally

#### Option 1: Simple HTTP Server (Python)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
```

#### Option 3: VS Code Live Server
Install the "Live Server" extension and click "Go Live" in the status bar.

### File Structure
```
johaar/
├── index.html          # Main HTML file
├── styles.css          # All styles (extracted from inline)
├── app.js             # Main application entry point
├── js/
│   ├── three-scene.js # 3D visualization module
│   ├── ui.js          # UI interactions (modals, search, forms)
│   ├── cart.js        # Shopping cart with localStorage
│   ├── products.js    # Product data and rendering
│   └── utils.js       # Shared utilities
├── assets/
│   ├── favicon.svg    # Site favicon
│   └── og-image.jpg   # Open Graph image (add your own)
└── README.md          # This file
```

## 📦 Features

### Core Functionality
- ✅ **Interactive 3D Laptop Model** - Scroll-triggered disassembly animation
- ✅ **Product Catalog** - 6 refurbished laptops with detailed specs
- ✅ **Shopping Cart** - Persistent cart with localStorage
- ✅ **Search** - Real-time product filtering
- ✅ **Contact Form** - Inquiry submission with toast notifications
- ✅ **Responsive Design** - Mobile-first approach

### Accessibility (WCAG AA)
- ✅ Keyboard navigation support
- ✅ Focus management in modals and cart
- ✅ ARIA labels and roles
- ✅ Screen reader friendly
- ✅ Skip to main content link
- ✅ Respects `prefers-reduced-motion`
- ✅ High contrast text (4.5:1 minimum)

### Performance Optimizations
- ✅ **Debounced raycasting** (60ms) - Reduces CPU on hover
- ✅ **Throttled mousemove** - Smooth parallax without jank
- ✅ **Paused animations** - When page is hidden (visibilitychange)
- ✅ **Simplified geometry** - Reduced polygon count for mobile
- ✅ **Material reuse** - Single material instances
- ✅ **Conditional shadows** - Disabled on mobile devices
- ✅ **Optimized lighting** - Minimal light sources
- ✅ **localStorage caching** - Cart persists across sessions

## 🎨 Design System

### Typography
- **UI Font**: Inter (Google Fonts)
- **Display Font**: Space Grotesk (Google Fonts)
- **Scale**: 12px / 14px / 16px / 18px / 20px / 24px / 32px / 40px / 56px

### Colors
```css
Primary:   #2563eb (Blue)
Secondary: #10b981 (Green)
Tertiary:  #8b5cf6 (Purple)
Text:      #1a1a1a / #666666 / #999999
Background: #fafafa / #ffffff
```

### Spacing
Based on 8px grid: 4px / 8px / 16px / 24px / 32px / 48px / 64px

## 🔧 Customization

### Adding Products
Edit `js/products.js`:
```javascript
export const products = {
  7: {
    id: 7,
    title: 'Your Product',
    desc: 'Short description',
    price: 25000,
    tag: 'NEW',
    details: 'Long description...'
  }
};
```

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-primary: #your-color;
  --accent-secondary: #your-color;
}
```

### Modifying 3D Scene
Edit `js/three-scene.js` - adjust camera position, lighting, or geometry.

## 📊 Performance Metrics

### Target Metrics (Local Dev)
- **Time to Interactive**: < 2.5s
- **First Contentful Paint**: < 1.5s
- **Frame Rate**: 60fps (< 3% drops)
- **Lighthouse Scores**:
  - Performance: ≥ 70
  - Accessibility: ≥ 90
  - Best Practices: ≥ 80
  - SEO: ≥ 90

### Optimization Notes
1. **Three.js Scene**: Simplified geometry, reused materials, conditional features
2. **Raycasting**: Throttled to 60ms to prevent CPU spikes
3. **Scroll Animations**: Disabled when `prefers-reduced-motion` is set
4. **Mobile**: Reduced quality (no antialiasing, no shadows, simplified models)
5. **Visibility API**: Pauses animations when tab is hidden

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Search filters products correctly
- [ ] Add to cart updates count badge
- [ ] Cart persists after page reload
- [ ] Modal opens/closes with keyboard (ESC)
- [ ] Form submission shows toast
- [ ] 3D scene renders without errors
- [ ] Responsive on mobile (< 768px)
- [ ] Works with JavaScript disabled (graceful degradation)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Accessibility Testing
```bash
# Run Lighthouse audit
npx lighthouse http://localhost:8000 --view

# Check with screen reader
# macOS: VoiceOver (Cmd+F5)
# Windows: NVDA (free)
```

## 🚢 Production Build (Optional)

### Using Parcel (Recommended)
```bash
npm init -y
npm install --save-dev parcel

# Add to package.json
"scripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html --public-url ./"
}

# Development
npm run dev

# Production build
npm run build
```

Output will be in `dist/` folder.

### Using esbuild
```bash
npm install --save-dev esbuild

# Build
npx esbuild app.js --bundle --minify --outfile=dist/app.min.js
```

### Manual Optimization
1. Minify CSS: Use [cssnano](https://cssnano.co/)
2. Minify JS: Use [Terser](https://terser.org/)
3. Compress images: Use [Squoosh](https://squoosh.app/)
4. Enable gzip/brotli on server

## 📝 Environment Variables

For production, update these values in `index.html`:
- `og:image` - Your actual Open Graph image URL
- `og:url` - Your actual domain
- Contact phone/email in contact section
- Social media links in footer

## 🐛 Known Issues

1. **WebGL not supported**: Gracefully degrades, shows warning toast
2. **localStorage disabled**: Cart won't persist (still works in session)
3. **Older browsers**: May not support ES6 modules (use build step)

## 📄 License

Proprietary - Johaar Computer © 2024

## 🤝 Support

For issues or questions:
- Email: info@johaarcomputer.com
- Phone: +91-123-456-7890
- Location: Millennium Plaza, GE Road, Raipur

---

**Built with**: HTML5, CSS3, JavaScript ES6+, Three.js, GSAP
**Performance**: Optimized for 60fps on mid-range devices
**Accessibility**: WCAG 2.1 AA compliant
