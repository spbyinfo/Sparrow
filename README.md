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

## 🌍 Environment Setup

### Required Environment Variables

Create a `.env.local` file (not committed to Git):

```bash
# Environment type
VITE_ENV=staging

# Supabase configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Custom API URL
VITE_API_URL=https://your-project.supabase.co/functions/v1/make-server-efcc1648
```

### Three-Environment Strategy

- **Staging** (`develop` branch): Daily development & testing
- **Pre-Production** (`staging` branch): Final validation
- **Production** (`main` branch): Live for users

See `DEPLOYMENT_GUIDE.md` for full deployment instructions.

## 🔐 Security

- Environment variables are **never committed** to Git
- Supabase Service Role Key is **only used server-side**
- All API routes require authentication where appropriate
- CORS configured for security

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
   git remote add origin https://github.com/YOUR-USERNAME/sparrow-app.git
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

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📱 Access on Mobile

Once deployed:
1. Open the Vercel URL on your phone
2. **iPhone**: Safari → Share → "Add to Home Screen"
3. **Android**: Chrome → Menu → "Add to Home Screen"

The app will open full-screen like a native app!

## 🛠️ Development Guidelines

See `guidelines/Guidelines.md` for:
- Brand identity & logo usage
- Design system rules
- Mobile-first development
- Component guidelines
- Accessibility standards
- Performance targets

## 📖 Additional Documentation

- `DEPLOYMENT_GUIDE.md` - Full 3-environment deployment setup
- `DEPLOYMENT_QUICK_START.md` - Quick deploy reference
- `DESIGN_SYSTEM.md` - Complete design specifications
- `MOBILE_IMPLEMENTATION_GUIDE.md` - Mobile optimization guide
- `RESERVATION_SYSTEM_GUIDE.md` - Backend API documentation

## 🤝 Contributing

This is a prototype app. For production deployment:
1. Set up proper database tables (not just KV store)
2. Configure Mapbox for live maps
3. Set up SMS/email services
4. Implement proper auth flows
5. Add analytics tracking

## 📄 License

Proprietary - Internal Sparrow Project

## 🐛 Troubleshooting

### Build fails on Vercel
- Check that all environment variables are set
- Verify `package.json` dependencies are correct
- Check Vercel build logs for specific errors

### Environment badge shows in production
- Verify `VITE_ENV=production` is set correctly
- Clear browser cache and hard reload

### Mobile app not full-screen
- Add to Home Screen from Safari (iOS) or Chrome (Android)
- Check that viewport meta tags are in `index.html`

## 📞 Support

For questions or issues:
- Check documentation in `/guidelines` folder
- Review deployment guides
- Check Vercel deployment logs

---

**Built with ❤️ for sustainable waste management in India** 🇮🇳
