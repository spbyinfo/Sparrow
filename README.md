# Sparrow 🐦

> **Gamified waste collection meets premium service marketplace**

A mobile-first React app where users play bingo with product packaging to earn credits, then redeem them for exclusive time-based passes at partner salons, cafes, and service providers across India.

![Sparrow Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript) ![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)

---

## ✨ Features

### 🎮 For Users
- **3×3 Bingo Gameplay** - Scan 9 product SKUs weekly to complete your card
- **Tier System** - Unlock Bronze → Silver → Gold → Platinum tiers for more concurrent reservations
- **Pass Marketplace** - Browse time-based passes for hair salons, spas, fitness, and more
- **Smart Scheduling** - Book exact appointment times at partner venues
- **Active Reservations** - Track bookings with Order ID & Completion ID
- **Swipe to Complete** - Gestural interaction to confirm service completion
- **Pickup Scheduling** - Choose when we collect your scanned items
- **Multi-language Support** - English + Hindi (expandable)

### 💇 For Partners
- **Service Management** - Create passes with custom pricing & schedules
- **Booking Dashboard** - Real-time reservation tracking
- **Photo Verification** - Capture service completion proof
- **Analytics** - Track bookings, revenue, and customer metrics
- **Calendar Sync** - Google Calendar integration
- **Sparrow DSL** - Proprietary scheduling language for region-based availability

---

## 🎨 Design Philosophy

**Gaudí × Wes Anderson Whimsy meets Indian Cultural Colors**

- **Saffron (#ff9933)** - Primary brand, sacred & spiritual
- **Nature Green (#059669)** - Growth, sustainability, success
- **Imperial Gold (#ffd700)** - Achievements, credits, rewards
- **Royal Red (#dc143c)** - Alerts, power, destructive actions
- **Divine Blue (#4169e1)** - Utility, divine energy

### Signature Elements
- **Rhombic shapes:** `rounded-[1rem_0.3rem_1rem_0.3rem]`
- **Organic curves:** 24px base border radius
- **Playful shadows:** `shadow-[2px_2px_0px_rgba(220,20,60,0.3)]`
- **48px touch targets** - Perfect for one-handed mobile use
- **Safe area support** - Notched devices (iPhone 14 Pro, etc.)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **Motion (Framer Motion)** - Smooth animations
- **Lucide React** - Icon library
- **ShadCN UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Sonner** - Toast notifications

### Backend Ready
- **Supabase** - PostgreSQL database + Auth (configured)
- **Hono** - Edge-optimized API framework (ready)
- **REST API** - Clean data layer architecture

### Deployment
- **Vercel** - Recommended (one-click deploy)
- **GitHub Pages** - Alternative
- **Cloudflare Pages** - Alternative

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/spbyinfo/Sparrow.git
cd Sparrow

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:5173
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
Sparrow/
├── src/
│   ├── App.tsx                      # Main app with routing
│   ├── main.tsx                     # React entry point
│   ├── components/
│   │   ├── BingoCard.tsx            # 3×3 gameplay (900+ lines)
│   │   ├── MyPass.tsx               # Pass marketplace (500+ lines)
│   │   ├── History.tsx              # Booking history
│   │   ├── UserProfile.tsx          # User settings & KYC
│   │   ├── PartnerDashboard.tsx     # Partner management
│   │   ├── [50+ more components]
│   │   └── ui/                      # ShadCN components
│   └── routes.ts                    # React Router config
├── data/
│   ├── partners.ts                  # Partner/salon data
│   └── products.ts                  # Product catalog
├── utils/
│   ├── api.ts                       # API integration
│   └── constants.ts                 # App constants
├── styles/
│   └── globals.css                  # Design system
├── public/                          # Static assets
├── Guidelines.md                    # Development standards
└── DEPLOYMENT_COMPLETE.md           # Full deployment docs
```

---

## 📸 Screenshots

### User Journey
1. **Auth Screen** - Dual login (User/Partner)
2. **Bingo Board** - 3×3 grid with product silhouettes
3. **Scan Modal** - Camera + manual SKU entry
4. **Pass Marketplace** - Browse partner offers
5. **Booking Flow** - Select time slot, confirm
6. **Active Reservations** - Swipe to complete
7. **History** - All bookings with filters

### Partner Dashboard
1. **Service Creation** - Build custom passes
2. **Schedule Management** - Weekly availability
3. **Bookings** - Real-time reservation list
4. **Analytics** - Revenue & customer insights

---

## 🎯 Key User Flows

### Complete a Bingo Card
1. Open app → Bingo tab
2. Tap any product circle
3. Scan barcode/QR or enter SKU
4. Earn credits instantly
5. Repeat for all 9 products
6. Unlock tier upgrades

### Book a Service Pass
1. Navigate to Pass tab
2. Browse partner offers
3. Select a service
4. Choose exact time slot
5. Pay with credits or ₹
6. Receive Order ID confirmation

### Complete a Reservation
1. Arrive at partner venue
2. Show Order ID to partner
3. Receive service
4. Swipe to complete in app
5. Both parties get Completion ID
6. Service marked complete

---

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/spbyinfo/Sparrow)

1. Click button above or:
2. Go to [vercel.com](https://vercel.com)
3. Import `spbyinfo/Sparrow` repository
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables (optional)
6. Deploy! 🎉

### Other Platforms

- **Netlify:** Drag & drop `dist` folder
- **GitHub Pages:** Use `gh-pages` branch
- **Cloudflare Pages:** Connect repo, auto-deploy

---

## 📚 Documentation

- **[Guidelines.md](./Guidelines.md)** - Development standards, design system, accessibility
- **[DEPLOYMENT_COMPLETE.md](./DEPLOYMENT_COMPLETE.md)** - Full deployment guide, architecture overview

---

## 🤝 Contributing

Sparrow is a proprietary project, but we welcome feedback!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

Proprietary © 2026 Sparrow. All rights reserved.

---

## 👥 Team

**Built with Jony Ive-level attention to detail**

- Design System: Indian cultural colors + Gaudí whimsy
- Mobile-First: 48px touch targets, safe area support
- Accessibility: WCAG AA compliant
- Performance: < 200ms interactions, < 200KB JS bundle

---

## 📧 Contact

For questions, partnerships, or support:
- GitHub Issues: [Create Issue](https://github.com/spbyinfo/Sparrow/issues)
- Email: support@sparrow.app (example)

---

## ⭐ Acknowledgments

- **React Team** - Incredible framework
- **Tailwind Labs** - Beautiful utility-first CSS
- **ShadCN** - Accessible component primitives
- **Vercel** - Seamless deployment platform
- **Supabase** - Backend-as-a-service magic

---

<div align="center">

**Made with ❤️ in India**

[![GitHub stars](https://img.shields.io/github/stars/spbyinfo/Sparrow?style=social)](https://github.com/spbyinfo/Sparrow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/spbyinfo/Sparrow?style=social)](https://github.com/spbyinfo/Sparrow/network/members)

[View Live Demo](#) • [Report Bug](https://github.com/spbyinfo/Sparrow/issues) • [Request Feature](https://github.com/spbyinfo/Sparrow/issues)

</div>
