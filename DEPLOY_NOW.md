# 🚀 Quick Deployment Checklist

## Before Deployment

### 1. Add Product Images (5 min)
```bash
# Place these 6 images in: assets/products/
dell-latitude-7490.jpg
lenovo-thinkpad-t480.jpg
hp-elitebook-840.jpg
dell-xps-15.jpg
lenovo-ideapad-330.jpg
surface-laptop-3.jpg
```
**Specs:** 800x600px, <200KB each

### 2. Update Domain (2 min)
**Files to update:**
- `sitemap.xml` - Replace all `johaarcomputer.com` with your domain
- `index.html` - Update `<meta property="og:url">` (line ~10)

### 3. Add OG Image (Optional, 3 min)
- Create: `assets/og-image.jpg` (1200x630px)
- Shows when sharing on social media

---

## Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag the `johaar` folder
3. Done! ✅

### Option 2: Git Deploy (Recommended)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Johaar Computer website"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Connect on Netlify
# - Go to app.netlify.com
# - "Add new site" → "Import from Git"
# - Select your repo
# - Deploy!
```

---

## After Deployment

### Test These (5 min)
- [ ] Contact form works (check Netlify Dashboard → Forms)
- [ ] WhatsApp button opens chat
- [ ] Call button opens dialer
- [ ] Google Maps loads
- [ ] All sections scroll smoothly
- [ ] Mobile version looks good

### SEO Setup (10 min)
1. **Google Search Console:**
   - Add property: your-domain.com
   - Submit sitemap: your-domain.com/sitemap.xml

2. **Test Rich Results:**
   - Go to: https://search.google.com/test/rich-results
   - Enter your URL
   - Verify LocalBusiness schema

---

## Quick Edits

### Update Products
Edit `products.json`:
```json
{
  "id": 7,
  "title": "New Laptop",
  "desc": "Specs here",
  "price": 25000,
  "tag": "NEW",
  "details": "Full description",
  "image": "./assets/products/new-laptop.jpg",
  "brand": "Dell",
  "condition": "Refurbished"
}
```

### Update Contact Info
Edit `index.html` - Search for:
- Phone: `8982776402`
- Email: `info@johaarcomputer.com`
- Address: `Millennium Plaza`

### Update Services/Pricing
Edit `index.html` - Find `<ul class="services-list">`

---

## Troubleshooting

### Forms Not Working?
1. Check Netlify Dashboard → Forms
2. Ensure `data-netlify="true"` is in form tag
3. Redeploy if needed

### Images Not Showing?
1. Check file names match `products.json`
2. Verify images are in `assets/products/`
3. Clear browser cache

### WhatsApp Not Opening?
- Number format must be: `918982776402` (no + or spaces)
- Test link: https://wa.me/918982776402

---

## Performance Tips

### Optimize Images
```bash
# Use these free tools:
# - TinyPNG.com (compress)
# - Squoosh.app (convert to WebP)
```

### Enable Netlify Optimizations
- Go to: Site settings → Build & deploy → Post processing
- Enable: Asset optimization, Image optimization

### Test Performance
```bash
npx lighthouse https://your-domain.com --view
```
**Target:** 90+ score on all metrics

---

## Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Forms:** https://docs.netlify.com/forms/setup/
- **Google Search Console:** https://search.google.com/search-console

---

## 🎉 You're Ready!

**Estimated time to deploy:** 15-20 minutes

**What you have:**
✅ Working contact form (Netlify)
✅ WhatsApp button (8982776402)
✅ Click-to-call button
✅ Google Maps embed
✅ Product structure (add images)
✅ Editable products.json
✅ SEO optimized (sitemap, robots.txt, schema)
✅ 404 page
✅ Production guide

**Next step:** Add product images → Deploy → Test → Launch! 🚀
