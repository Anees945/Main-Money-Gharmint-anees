# Money Gharmint — Premium Children's Clothing Store & Admin Operations Portal

A complete, production-grade e-commerce storefront and enterprise Admin Operations Portal for children's boutique apparel, curated outfits, and family matching sets.

---

## 🚀 How to Deploy on Vercel

### Method 1: Push to GitHub & Import into Vercel (Recommended)

1. **Extract the ZIP file** on your computer.
2. **Create a new GitHub repository** (e.g., `money-gharmint-store`) and push the project files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Money Gharmint Store and Admin Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/money-gharmint-store.git
   git push -u origin main
   ```
3. Open [Vercel Dashboard](https://vercel.com/new).
4. Click **"Import Project"** and select your GitHub repository.
5. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. *(Optional)* Under **Environment Variables**, you can customize your admin credentials:
   - `ADMIN_EMAIL` = `admin@moneygharmint.com`
   - `ADMIN_PASSWORD` = `your_strong_password_here`
7. Click **"Deploy"**. Your website will be live worldwide in ~1 minute!

---

### Method 2: Deploy directly with Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. In the extracted project folder, run:
   ```bash
   vercel
   ```
3. Follow the prompts (accept default settings). For production, run:
   ```bash
   vercel --prod
   ```

---

## 🔐 Admin Operations Portal Login

- **URL**: Click the **"Staff / Admin"** button in the Header or Footer, or navigate to `/admin`
- **Default Email**: `admin@moneygharmint.com`
- **Default Password**: `admin123`

### Admin Capabilities:
- **Orders Management**: Live order tracking, bulk status updates, courier tracking numbers, WhatsApp chat link, printable 4x6 thermal shipping labels, and official tax invoices.
- **Inventory & Stock**: Real-time stock counts, price adjustments, sale badges, and new garment creation with image selection.
- **Storefront Settings**: Store name, currency symbol, free delivery threshold, and announcement bar notifications.
- **Customer Directory**: Customer profiles, order histories, and contact numbers.

---

## 🛠 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local full-stack development server (Port 3000)
npm run dev

# 3. Build for production
npm run build
```

---

## 📦 Store Features Included
- **Storefront**: Hero promotions, Category filters (Boys, Girls, Baby & Newborn, Footwear, Dresses, Sets), Seasonal Collections.
- **Interactive Outfit Builder**: Mix-and-match shirts, pants, shoes, and accessories with instant bundle pricing.
- **Cart & Wishlist Drawers**: Persistent cart state, live shipping threshold meter, and promo codes (`WELCOME10`, `FAMILY15`, `KIDS20`).
- **Multi-Step Checkout**: Cash on Delivery (COD) and Direct Bank Transfer (Meezan Bank, IBAN, Raast ID) with instant WhatsApp receipt sharing.
- **Safe Dialogs**: Fully customized in-app confirmation modals (no browser blocking popups).
