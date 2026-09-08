# Blue Star Plastic Industries - Website Files

## 📁 File Structure

```
public/
├── index.html              # Homepage with 10 product cards
├── contact.html            # Contact page with Web3Forms form
├── product-template.html   # Reusable template for product pages
├── about.html              # About page (to be created)
├── chajjas.html            # FRP Chajjas product page
├── jali.html               # GRC Jali Panels product page
├── cornices.html           # GRC Cornices product page
├── columns.html            # GRC Columns product page
├── frp-rectangular.html    # FRP Rectangular Planters
├── frp-square.html         # FRP Square Planters
├── frp-cylinder.html       # FRP Vertical Cylinders
├── frp-round.html          # FRP Round & Design Planters
├── frp-tree.html           # FRP Tree Planters
└── frp-urn.html            # FRP Urn & Cone Planters
```

---

## 🎨 Design System

### Colors
- **Navy**: `#0c1e3a` (primary), `#071427` (dark), `#152c4f` (medium)
- **Accent**: `#f5a81c` (amber), `#ffc258` (light), `#d98e0b` (dark)
- **Paper**: `#f6f8fb` (background)
- **Text**: `#0c1e3a` (dark), `#6b7280` (gray)

### Fonts
- **Display**: Bebas Neue (headings)
- **Body**: IBM Plex Sans (body text)
- **Mono**: IBM Plex Mono (labels, codes)

### Components
- **Buttons**: Amber background with navy shadow, hover lift effect
- **Cards**: White background, border, hover lift + shadow
- **Header**: Sticky, white with backdrop blur, shadow on scroll
- **Footer**: Navy background with amber accents
- **WhatsApp**: Fixed bottom-right, green with pulse animation

---

## 📝 How to Create Product Pages

### Step 1: Copy the Template
Copy `product-template.html` and rename it to your product filename (e.g., `chajjas.html`).

### Step 2: Update Meta Tags
Replace all `[placeholder]` text in the `<head>` section:

```html
<title>[Product Name] | Blue Star Plastic Industries</title>
<meta name="description" content="[150 char description]" />
<meta property="og:title" content="[Product Name] | Blue Star Plastic Industries" />
<meta property="og:description" content="[Product description]" />
<meta property="og:image" content="https://placehold.co/1200x630/0c1e3a/f5a81c?text=[PRODUCT+NAME]" />
```

### Step 3: Update Hero Section
Replace placeholders in the hero section:

```html
<p class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-accent-400">
  [PRODUCT CODE] · [FRP/GRC]
</p>

<h1 class="mt-5 font-display text-[52px] leading-[0.96] tracking-[0.015em] text-white sm:text-7xl xl:text-[88px]">
  [Product Name]
</h1>

<p class="mt-7 max-w-2xl text-lg leading-relaxed text-gray-300">
  [Product subtitle - brief description]
</p>
```

### Step 4: Update Features Grid
Replace the 3 feature cards with your product's key features:

```html
<!-- Feature 1 -->
<div class="feature-card group border border-gray-200 bg-paper p-7">
  <div class="flex h-14 w-14 items-center justify-center border border-navy-800 text-navy-800">
    <!-- Replace with your SVG icon -->
    <svg>...</svg>
  </div>
  <h3 class="mt-5 font-display text-2xl tracking-[0.03em] text-navy-900">[Feature Title]</h3>
  <p class="mt-2 text-sm leading-relaxed text-gray-600">[Feature description]</p>
</div>
```

### Step 5: Update Design Variations
Replace the 4 variation cards with your product's design options:

```html
<!-- Variation 1 -->
<div class="variation-card group border border-gray-200 bg-white overflow-hidden">
  <div class="aspect-square overflow-hidden bg-gray-200">
    <img src="[image-url]" alt="[Variation Name]" class="h-full w-full object-cover" />
  </div>
  <div class="p-5">
    <h3 class="font-display text-xl tracking-[0.02em] text-navy-900">[Variation Title]</h3>
    <p class="mt-1 text-xs text-gray-500">[Brief description]</p>
  </div>
</div>
```

### Step 6: Update Watermark Text
Change the large watermark text in the hero section:

```html
<span class="pointer-events-none absolute -bottom-6 right-0 select-none font-display text-[20vw] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(228,236,246,0.08)] md:text-[14vw]" aria-hidden="true">
  [PRODUCT]
</span>
```

---

## 📧 Contact Form Setup

### Web3Forms Integration

1. **Get your access key** from [Web3Forms](https://web3forms.com/)
2. **Replace the placeholder** in `contact.html`:

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
```

3. **Replace with your actual key**:

```html
<input type="hidden" name="access_key" value="abc123-def456-ghi789">
```

4. **Enable production submission** (uncomment the fetch code in the script section):

```javascript
// Remove e.preventDefault() and uncomment this:
fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  body: new FormData(form)
})
.then(function (r) { return r.json(); })
.then(function (data) {
  if (data.success) {
    form.classList.add('hidden');
    successEl.classList.remove('hidden');
  }
});
```

---

## 🎯 SEO Checklist

For each product page, ensure:

- [ ] Unique `<title>` (under 60 characters)
- [ ] Unique `<meta name="description">` (under 150 characters)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Descriptive alt text on all images
- [ ] Semantic HTML structure (h1, h2, h3 hierarchy)
- [ ] Internal links to other product pages
- [ ] External links to contact page

---

## 📱 Mobile Responsiveness

All pages are mobile-first and responsive:

- **Mobile**: Single column layout, hamburger menu
- **Tablet**: 2-column grids where applicable
- **Desktop**: Full navigation, multi-column grids

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🔧 Customization Tips

### Change Brand Colors
Edit the Tailwind config in each HTML file:

```javascript
colors: {
  navy: {
    900: '#0c1e3a',  // Change this
  },
  accent: {
    500: '#f5a81c',  // Change this
  },
}
```

### Add Custom Icons
Use SVG icons from [Heroicons](https://heroicons.com/) or [Feather Icons](https://feathericons.com/).

### Update Contact Info
Search and replace across all files:
- Phone: `+91 91520 91020`
- Email: `sales@bluestarplastic.in`
- Address: `Taloja MIDC, Navi Mumbai — 410208`

---

## 🚀 Deployment

### Static Hosting (Recommended)
Upload the `public/` folder to:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Traditional Hosting
Upload via FTP to your web server's public directory.

---

## 📞 Support

For questions about:
- **Web3Forms**: [web3forms.com](https://web3forms.com/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **Google Fonts**: [fonts.google.com](https://fonts.google.com/)

---

## ✅ Launch Checklist

Before going live:

- [ ] Replace all placeholder text in product pages
- [ ] Add real product images (replace placehold.co URLs)
- [ ] Set Web3Forms access key in contact.html
- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Test mobile responsiveness
- [ ] Add Google Analytics (optional)
- [ ] Add Facebook Pixel (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Test all phone and email links

---

**Built with ❤️ using HTML5, Tailwind CSS, and vanilla JavaScript**
