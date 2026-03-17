# 🐦 Sparrow - Gamified Waste Collection App

A mobile-first web app that gamifies waste collection in India through a weekly bingo game. Users scan product SKUs, earn green credits, and book surprise services at partner venues.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile-First Design

- **Safe zone optimized** for iPhone notches
- **Touch-friendly** 48px minimum touch targets
- **Bottom navigation** for one-handed use
- **Works like a native app** when added to home screen

## 🎨 Design System

- **Indian cultural colors**: Saffron, Imperial Gold, Royal Red, Nature Green
- **Gaudí x Wes Anderson aesthetic**: Organic curves, whimsical asymmetry
- **24px border radius** for flowing, organic shapes
- **Mobile-first typography** with 16px base font

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Backend**: Supabase (Edge Functions + KV Store)
- **Deployment**: Vercel
- **DSL**: Proprietary Sparrow DSL for card scheduling

## 📦 Project Structure

```
sparrow-app/
├── src/
│   └── main.tsx              # App entry point
├── App.tsx                   # Main app component
├── components/               # React components
│   ├── ui/                   # Shadcn components
│   ├── BingoCard.tsx         # 3×3 bingo game
│   ├── MyPass.tsx            # Partner reservations
│   ├── MyCredits.tsx         # Credits & transactions
│   └── UserProfile.tsx       # Profile & KYC
├── lib/
│   └── sparrow-dsl/          # Sparrow DSL system
│       ├── types.ts          # Type definitions
│       ├── parser.ts         # DSL parser
│       ├── scheduler.ts      # Card scheduler
│       ├── interpreter.ts    # DSL interpreter
│       └── examples/         # Example configs
├── styles/
│   └── globals.css           # Design tokens & styles
├── utils/
│   ├── api.ts                # API utilities
│   ├── environment.ts        # Multi-env config
│   └── supabase/             # Supabase client
├── supabase/
│   └── functions/server/     # Edge functions
└── guidelines/
    └── Guidelines.md         # Development guidelines

```

## 🐦 Sparrow DSL

Proprietary domain-specific language for managing bingo cards, regions, and scheduling:

- **Region-based** card configurations (Mumbai, Delhi, Bangalore, etc.)
- **Time-based** automatic card rotation
- **Tier-based** visibility (Bronze → Platinum)
- **Product management** with seasonal availability
- **Automated scheduling** with cron-like syntax

See `/lib/sparrow-dsl/README.md` for full documentation.

## 📊 Features

### Core Features
- ✅ **3×3 Bingo Game**: Scan product SKUs to complete weekly boards
- ✅ **Credits System**: Earn credits for proper waste disposal
- ✅ **Pass System**: Book surprise services at partner venues
- ✅ **eKYC Verification**: Aadhaar & PAN verification for rewards
- ✅ **Guest Access**: Try before signup
- ✅ **Multi-environment**: Staging, Pre-Prod, Production

### Backend Features
- ✅ **Reservation System**: 7 API endpoints on Supabase
- ✅ **Confirmation Codes**: Order ID system (no QR codes)
- ✅ **Inventory Management**: Real-time availability tracking
- ✅ **Partner Integration**: TooGoodToGo-style surprise services

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deploy

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/spbyinfo/Sparrow.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Add Environment Variables** in Vercel:
   - `VITE_ENV` = `production`
   - `VITE_SUPABASE_URL` = Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase Anon Key

## 📱 Access on Mobile

Once deployed:
1. Open the Vercel URL on your phone
2. **iPhone**: Safari → Share → "Add to Home Screen"
3. **Android**: Chrome → Menu → "Add to Home Screen"

The app will open full-screen like a native app!

## 📖 Documentation

See the `/docs` folder for detailed guides:

- `SPARROW_DSL_GUIDE.md` - Complete DSL documentation
- `DEPLOYMENT_GUIDE.md` - Full 3-environment deployment setup
- `DESIGN_SYSTEM.md` - Complete design specifications
- `Guidelines.md` - Development guidelines

## 📄 License

Proprietary - Internal Sparrow Project

---

**Built with ❤️ for sustainable waste management in India** 🇮🇳