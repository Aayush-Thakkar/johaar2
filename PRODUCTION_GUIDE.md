# 🚀 Production Deployment Guide - Johaar Computer

## ✅ Pre-Deployment Checklist

### 1. **Update Product Images**
Replace placeholder image paths in `products.json`:
```json
"image": "./assets/products/dell-latitude-7490.jpg"
```
- Create folder: `assets/products/`
- Add product images (recommended: 800x600px, WebP format)
- Update all 6 product image paths

### 2. **Netlify Forms Setup**
✅ Already configured! The contact form includes:
- `data-netlify="true"` attribute
- `netlify-honeypot="bot-field"` for spam protection
- Hidden `form-name` input field

**After deployment:**
1. Go to Netlify Dashboard → Forms
2. Enable form notifications (email/Slack)
3. Test the form submission

### 3. **Update Contact Information**
Verify all contact details in `index.html`:
- ✅ Phone: +91-8982776402
- ✅ WhatsApp: +91-8982776402
- ✅ Email: info@johaarcomputer.com
- ✅ Address: Millennium Plaza, GE Road, Raipur
- ✅ Google Maps: Embedded correctly

### 4. **SEO & Meta Tags**
Update these in `index.html` before deployment:
- `<meta property="og:url">` - Replace with actual domain
- `<meta property="og:image">` - Add og-image.jpg (1200x630px)
- `<meta name="twitter:image">` - Same as og:image
- Schema.org `@id` and `url` fields

### 5. **Sitemap Configuration**
Update `sitemap.xml` with your actual domain:
```xml
<loc>https://www.johaarcomputer.com/</loc>
```
Replace all instances of `johaarcomputer.com` with your actual domain.

---

## 🌐 Netlify Deployment Steps

### Option A: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

### Option B: Deploy via Git (Recommended)
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Johaar Computer website"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Custom Domain Setup:**
   - Go to Site settings → Domain management
   - Add custom domain: `johaarcomputer.com`
   - Configure DNS records as instructed

---

## 📱 Post-Deployment Tasks

### 1. Test All Features
- [ ] Contact form submission
- [ ] WhatsApp button (opens chat)
- [ ] Click-to-call button
- [ ] Google Maps embed loads
- [ ] Product cards display correctly
- [ ] Cart functionality works
- [ ] Mobile responsiveness
- [ ] All links work

### 2. Performance Optimization
```bash
# Test performance
npx lighthouse https://your-domain.com --view
```

**Optimization tips:**
- Compress images (use TinyPNG or Squoosh)
- Convert images to WebP format
- Enable Netlify's Asset Optimization (Settings → Build & deploy)

### 3. SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check Open Graph tags with [OpenGraph.xyz](https://www.opengraph.xyz/)

### 4. Analytics Setup (Optional)
Add Google Analytics to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔧 Environment Configuration

### Netlify Environment Variables (if needed)
Go to Site settings → Environment variables:
- `CONTACT_EMAIL` - For form notifications
- `WHATSAPP_NUMBER` - 918982776402

---

## 📊 Monitoring & Maintenance

### Weekly Tasks
- Check form submissions in Netlify Dashboard
- Update product inventory in `products.json`
- Monitor site performance

### Monthly Tasks
- Update `lastmod` dates in `sitemap.xml`
- Review and respond to customer inquiries
- Check Google Search Console for SEO issues

---

## 🆘 Troubleshooting

### Forms Not Working
1. Ensure `data-netlify="true"` is present
2. Check Netlify Dashboard → Forms for submissions
3. Verify form name matches hidden input

### Images Not Loading
1. Check file paths are correct
2. Ensure images are in `assets/products/` folder
3. Verify image file extensions match JSON

### WhatsApp Button Not Working
- Verify number format: `918982776402` (no + or spaces)
- Test link: `https://wa.me/918982776402`

---

## 📞 Support

For technical issues:
- Netlify Docs: https://docs.netlify.com
- Contact: info@johaarcomputer.com

---

## 🎉 Launch Checklist

Before going live:
- [ ] All product images uploaded
- [ ] Contact form tested
- [ ] WhatsApp & call buttons tested
- [ ] Google Maps loads correctly
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic on Netlify)
- [ ] Sitemap submitted to Google
- [ ] Social media links updated
- [ ] 404 page works
- [ ] Mobile version tested

**Your website is ready to launch! 🚀**
