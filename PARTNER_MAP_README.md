# Partner Redemption Feature

## 🎯 Overview

The Partner Redemption feature replaces the "Earnings Trend" chart in the Pass page, allowing users to discover and redeem credits at partner businesses across India.

## 🗺️ What Was Built

### 1. **Mock Partner Data** (`/utils/mockPartnerData.ts`)
- 100 partner businesses across 10 major Indian cities
- Categories: Salons/Spas (💇), Entertainment (🎬), Fitness (🏋️), Dance Studios (💃), Music Schools (🎤)
- Each partner has deals ranging from 400-1200 credits
- Deal types: Percentage discounts, flat discounts, free services

### 2. **Partner List View Component** (`/components/PartnerListView.tsx`)
- Scrollable list of partner businesses
- Color-coded category badges
- Distance calculation from user location
- Filters: By category, "I Can Afford"
- Sorted by distance (nearest first)
- Redemption buttons with affordability checks
- Direct Google Maps integration for directions

### 3. **Request Partner Modal** (`/components/RequestPartnerModal.tsx`)
- Form to request new partner businesses
- Fields: Business name, category, address, city, notes
- Toast notifications on submission
- Helps Sparrow prioritize which businesses to approach

### 4. **MyPass Integration** (`/components/MyPass.tsx`)
- Replaced Earnings Trend chart with Partner List View
- Added "Request Partner" button in card header
- Scrollable list (300px height) for Pass page
- Redemption handler with alert/voucher code generation

## 🎨 Design Features

- **Saffron (#ff9933)** primary colors throughout
- **Organic border radius** (1.5rem, asymmetric curves)
- **Mobile-first** with touch-optimized controls
- **48px minimum** touch targets
- **Safe zone** optimized bottom drawer
- **Category emojis** for visual clarity

## 🚀 How It Works

### User Flow:
1. User opens **Pass page** → sees their credits at top
2. Scrolls down → sees scrollable list of partner locations
3. Can filter by:
   - Category (Salon, Entertainment, Fitness, Dance, Music)
   - Affordability (only show deals they can redeem)
4. List automatically sorted by distance (nearest first)
5. Taps on partner card → sees deal details
6. Sees deal info, distance, affordability check
7. Taps **"Redeem"** → generates voucher code
8. Can tap **"Directions"** → opens Google Maps

### Request New Partner:
1. User taps **"Request"** button in card header
2. Modal opens with form
3. User fills: Business name, category, address, city, notes
4. Submits → Sparrow team reaches out to business
5. If approved → business appears on map for all users

## 📊 Data Structure

```typescript
interface PartnerBusiness {
  id: string;
  name: string;
  category: 'salon' | 'entertainment' | 'fitness' | 'dance' | 'music';
  address: string;
  city: string;
  lat: number;
  lng: number;
  deal: {
    type: 'percentage_discount' | 'flat_discount' | 'free_service';
    creditsRequired: number;
    value: string; // "20% off" or "₹200 off"
    description: string;
    validUntil: string;
    terms: string;
  };
  status: 'active' | 'pending';
  requestedBy?: string;
  supportCount?: number;
}
```

## 🏙️ Cities & Distribution

**Total: 100 businesses across 10 cities**

| City | Count | Examples |
|------|-------|----------|
| Mumbai | 15 | Looks Salon Bandra, INOX Nariman, Gold's Gym Andheri |
| Delhi | 15 | PVR Citywalk, Cult.fit Lajpat, Dance Paradise Dwarka |
| Bangalore | 15 | Looks Indiranagar, Cult.fit Koramangala, Nrityanjali |
| Chennai | 12 | PVR Grand Mall, Bharatanatyam School Mylapore |
| Hyderabad | 12 | PVR Inorbit, Cult.fit Gachibowli, Kuchipudi Dance |
| Pune | 10 | INOX Amanora, Footloose Dance Academy |
| Kolkata | 8 | INOX South City, Nrityagram Dance Ensemble |
| Ahmedabad | 6 | PVR Acropolis, Garba Dance Academy |
| Jaipur | 4 | INOX Crystal Palm, Kathak Kendra |
| Lucknow | 3 | PVR Phoenix, Kathak Academy |

## 🎯 Future Enhancements

### Phase 2:
- [ ] Real-time Supabase integration for partner data
- [ ] User can "favorite" partner locations
- [ ] QR code generation for vouchers
- [ ] Business verification at redemption
- [ ] Credits deduction on redemption

### Phase 3:
- [ ] User reviews & ratings for partners
- [ ] Partner dashboard (businesses can see redemptions)
- [ ] Geolocation API for accurate user position
- [ ] Routing/navigation within app
- [ ] Push notifications for new partners nearby

### Phase 4:
- [ ] Partner tiers (Premium, Standard)
- [ ] Exclusive deals for high-credit users
- [ ] Seasonal promotions
- [ ] Gift credits to friends
- [ ] Social sharing of deals

## 💡 Design Decisions

**Why Replace Earnings Trend?**
- Pass page is about earning AND spending credits
- Map provides actionable value (where to redeem)
- More engaging than a static chart
- Drives partner adoption (businesses want to be on map)

**Why List View Instead of Map?**
- More reliable (no external library dependencies)
- Works in all environments
- Faster load times
- Better for mobile (less data usage)
- Sorted by distance (most useful first)

**Why Mock Data?**
- Allows rapid prototyping
- No backend dependency for demo
- Easy to test filtering/sorting logic
- Can replace with Supabase later

## 🐛 Known Limitations

1. **Static Data**: Partners are hardcoded, not from database
2. **No Real Redemption**: Alert-based voucher codes (placeholder)
3. **No Business Verification**: Can't verify user actually visited
4. **Basic Distance Calc**: Straight-line distance, not road distance
5. **No Visual Map**: List view only (can add map in future if needed)

## 📦 Dependencies

No external dependencies! Uses only built-in components and utilities.

## 🎨 Component Styling

All components follow Sparrow's design guidelines:
- Saffron (#ff9933) for primary actions
- Organic border radius (1.5rem, asymmetric)
- Mobile-first (works on 375px+)
- Touch-optimized (48px minimum)
- Safe zone padding for bottom drawer

## 🔗 Component Relationships

```
MyPass.tsx
├── PartnerListView.tsx
│   ├── ScrollArea (Partner Cards)
│   ├── Filters (Category, Affordability)
│   ├── Partner Cards
│   └── Action Buttons (Redeem, Directions)
└── RequestPartnerModal.tsx
    └── Form (Name, Category, Address, Notes)

mockPartnerData.ts
└── PARTNER_BUSINESSES array (100 businesses)
    └── Helper functions (getByCity, getByCategory, calculateDistance)
```

## 📱 Mobile Experience

- **Smooth scrolling** through partners
- **Tap cards** to select/highlight
- **Quick actions** (Redeem, Directions) on each card
- **Filter buttons** with organic borders
- **Compact cards** optimized for mobile
- **Safe zone** respected for scrolling

---

**Built with ❤️ for Sparrow** 🐦
Gamifying waste collection, one credit at a time! ♻️
