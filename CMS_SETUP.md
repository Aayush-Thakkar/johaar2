# 🎯 Decap CMS Setup Guide

## ✅ What's Done

1. ✅ Created `/admin` folder with Decap CMS
2. ✅ Moved products to `/data/products/` (individual JSON files)
3. ✅ Updated frontend to load from new location
4. ✅ Added Netlify Identity widget

---

## 🚀 Setup Steps (5 minutes)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Decap CMS for product management"
git push origin main
```

### Step 2: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Site settings** → **Identity**
4. Click **Enable Identity**

### Step 3: Enable Git Gateway

1. In Identity settings, scroll to **Services**
2. Click **Enable Git Gateway**

### Step 4: Invite Yourself as Admin

1. Go to **Identity** tab in Netlify dashboard
2. Click **Invite users**
3. Enter your email
4. Check your email and accept invitation
5. Set your password

---

## 🎉 Start Using CMS

1. Go to: `https://yoursite.netlify.app/admin`
2. Click **Login with Netlify Identity**
3. Enter your credentials
4. Start managing products!

---

## 📦 How to Add/Edit Products

### Add New Product:
1. Go to `/admin`
2. Click **Products** → **New Product**
3. Fill in:
   - Title: "Dell Latitude 7490"
   - Short Description: "i7 8th Gen | 16GB RAM"
   - Price: 28500
   - Tag: Select from dropdown
   - Brand: "Dell"
   - Condition: "Refurbished"
   - Details: Full description
   - Image: Upload or paste URL
   - Product ID: Next available number (7, 8, 9...)
4. Click **Publish**
5. Changes commit to GitHub automatically
6. Netlify rebuilds site (takes 1-2 minutes)
7. ✅ Product appears on website!

### Edit Existing Product:
1. Go to `/admin`
2. Click **Products**
3. Click on product to edit
4. Make changes
5. Click **Publish**
6. ✅ Updated on website after rebuild!

### Delete Product:
1. Go to `/admin`
2. Click **Products**
3. Click on product
4. Click **Delete**
5. Confirm
6. ✅ Removed from website!

---

## 🔒 Security

- ✅ Admin panel protected by Netlify Identity
- ✅ Only invited users can access
- ✅ All changes tracked in Git
- ✅ Can revert any change via GitHub

---

## 💡 Important Notes

1. **Product ID**: Must be unique for each product
2. **Images**: Can upload files or paste URLs
3. **Changes**: Take 1-2 minutes to appear (Netlify rebuild time)
4. **Backup**: All data in Git - safe and recoverable

---

## 🆘 Troubleshooting

### Can't access /admin
- Make sure Netlify Identity is enabled
- Check Git Gateway is enabled
- Clear browser cache

### Changes not appearing
- Wait 2-3 minutes for Netlify rebuild
- Check Netlify deploy logs
- Hard refresh browser (Cmd+Shift+R)

### Login not working
- Check you accepted email invitation
- Try "Forgot password" to reset
- Contact Netlify support if needed

---

## 📁 File Structure

```
johaar/
├── admin/
│   ├── config.yml          ← CMS configuration
│   └── index.html          ← CMS interface
├── data/
│   └── products/           ← Individual product JSON files
│       ├── dell-latitude-7490.json
│       ├── lenovo-thinkpad-t480.json
│       └── ...
├── js/
│   └── products.js         ← Updated to load from data/products/
└── index.html              ← Added Netlify Identity widget
```

---

## ✅ Success!

You now have a **Git-based CMS** that:
- ✅ No backend server needed
- ✅ No database needed
- ✅ Free forever
- ✅ Automatic backups (Git)
- ✅ Easy to use
- ✅ Secure

**Next:** Push to GitHub and enable Netlify Identity!
