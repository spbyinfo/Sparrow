# Sparrow Product Scanning & B2B Analytics - Complete Guide

## 🎯 Quick Start

### How Product Scans Work

1. **User opens app** → Sees 3×3 bingo grid with products
2. **Taps a product** → Views 3D product detail
3. **Taps "Scan Product"** → Opens scan modal
4. **Scans barcode** (camera) or enters SKU (manual)
5. **Backend records scan** → Anonymous data saved
6. **Credits awarded** → User earns points
7. **B2B dashboard updates** → Brands see analytics

---

## 📦 Product Data Structure

### Each Product Has:

```typescript
{
  id: "1",                    // Unique identifier
  sku: "CC-500ML-PET",        // Stock Keeping Unit (barcode)
  name: "Coca-Cola 500ml",    // Product name
  category: "Soft Drink",     // Product category
  brand: "Coca-Cola",         // Brand name
  brandId: "coca-cola",       // Brand ID for B2B (URL-safe)
  brandLogo: "url",           // Brand logo image
  image: "url",               // Product image
  image3D: "url",             // 3D product view
  plasticType: "PETE #1",     // Plastic classification
  description: "...",         // Recyclability info
  recyclable: true,           // Can be recycled?
  credits: 10                 // Points earned per scan
}
```

### How SKU Links to Product:

1. Each physical product has a **barcode** printed on it
2. The barcode encodes the **SKU** (e.g., "CC-500ML-PET")
3. When user scans, we read the SKU from barcode
4. We match SKU against our product database
5. If match found → scan recorded, credits awarded

---

## 🔄 Complete Scan Flow

### Step-by-Step Technical Flow:

```
1. USER ACTION
   └─> Tap product in bingo grid
       └─> Triggers ProductDetailModal
           └─> Shows 3D view, name, plastic type, credits

2. SCAN INITIATION
   └─> User taps "Scan Product" button
       └─> Opens ScanModal component
           └─> Choice: Camera or Manual entry

3. BARCODE SCANNING
   └─> Camera mode: Scan physical barcode
       └─> Extract SKU from barcode
           └─> Verify SKU matches expected product
   
   └─> Manual mode: Type SKU manually
       └─> Verify against expected SKU

4. BACKEND RECORDING (recordScan API call)
   └─> Validate product exists
       └─> Generate unique scanId (UUID)
           └─> Create scan event object:
               {
                 scanId: "uuid",
                 sku: "CC-500ML-PET",
                 timestamp: 1699296000000,
                 city: "Mumbai",
                 area: "Bandra West",
                 pincode: "400050",
                 scanMethod: "camera",
                 credits: 10
               }
           └─> Save to database (KV store)
               └─> Create indexes:
                   - scan:{scanId}
                   - scan:sku:{sku}:{timestamp}
                   - scan:brand:{brandId}:{timestamp}
                   - scan:date:{date}:{timestamp}
               └─> Update daily aggregates:
                   - stats:brand:{brandId}:{date}

5. USER FEEDBACK
   └─> Show success animation
       └─> Display credits earned
           └─> Update bingo grid (mark as scanned)
               └─> Schedule pickup for next milk run
```

---

## 🏢 B2B Platform Architecture

### What Brands See (Anonymous Analytics)

#### Dashboard Sections:

**1. Overview Metrics**
```
┌─────────────────────────────────────────┐
│  Total Scans: 1,234                     │
│  This Week: 156                         │
│  This Month: 587                        │
│  Credits Issued: 12,340                 │
└─────────────────────────────────────────┘
```

**2. Time Series Chart**
```
Scans Over Time (30 days)
     │
 150 │           ╱╲
     │          ╱  ╲
 100 │    ╱╲   ╱    ╲
     │   ╱  ╲ ╱      ╲
  50 │  ╱    ╲        ╲
     │ ╱               ╲
   0 └─────────────────────────
     Oct 7  Oct 14  Oct 21  Oct 28
```

**3. Geographic Distribution**
```
Top Cities:
  Mumbai: 45%    (560 scans)
  Delhi: 25%     (312 scans)
  Bangalore: 15% (187 scans)
  Chennai: 10%   (124 scans)
  Pune: 5%       (62 scans)
```

**4. Product Performance**
```
Top Products by Scans:
  1. Coca-Cola 500ml     - 234 scans
  2. Pepsi 1L            - 189 scans
  3. Coca-Cola 1L        - 145 scans
```

**5. Active Neighborhoods**
```
Most Active Areas:
  1. Bandra West (Mumbai)
  2. Koramangala (Bangalore)
  3. Connaught Place (Delhi)
```

### Privacy-First Design 🔒

**What we DON'T store:**
- ❌ User ID
- ❌ User name
- ❌ Email address
- ❌ Phone number
- ❌ Exact GPS coordinates
- ❌ Any personally identifiable information

**What we DO store:**
- ✅ Product SKU
- ✅ City and neighborhood (aggregated)
- ✅ Date and time
- ✅ Scan method (camera/manual)
- ✅ Credits awarded

**Result:** Brands get valuable market insights WITHOUT compromising user privacy.

---

## 🚀 Setup Instructions

### 1. Seed Products to Database

**Option A: Use Admin Panel**

```tsx
import { AdminPanel } from './components/AdminPanel';

// Add to your App.tsx
<AdminPanel />
```

Navigate to Admin Panel → Setup tab → Click "Seed Database"

**Option B: Manual API Call**

```typescript
import { seedProducts } from './utils/api';
import { SAMPLE_PRODUCTS } from './utils/seedData';

await seedProducts(SAMPLE_PRODUCTS);
```

This creates 9 products across brands:
- Coca-Cola
- Amul  
- Bisleri
- Nestlé
- Dove
- Frooti
- PepsiCo
- Dabur Real
- Ponds

### 2. Test Scanning Flow

1. Open Sparrow app
2. Navigate to Bingo page
3. Tap any product (e.g., Coca-Cola)
4. View product details
5. Click "Scan Product"
6. Choose Camera or Manual
7. For manual: Enter exact SKU (e.g., "CC-500ML-PET")
8. Watch success animation
9. Check browser console for API logs

### 3. Generate Test Data

**Option A: Use Admin Panel**

Navigate to Admin Panel → Test Data tab → Generate scans

**Option B: Use Component Directly**

```tsx
import { GenerateTestScans } from './components/GenerateTestScans';

<GenerateTestScans />
```

This creates realistic test scans:
- Random products from all brands
- 5 major Indian cities (Mumbai, Delhi, Bangalore, Chennai, Pune)
- Realistic neighborhoods
- Mix of camera and manual scans

### 4. View B2B Analytics

**Option A: Use Admin Panel**

Navigate to Admin Panel → Analytics tab → Select brand

**Option B: Embed Dashboard**

```tsx
import { B2BAnalyticsDashboard } from './components/B2BAnalyticsDashboard';

<B2BAnalyticsDashboard 
  brandId="coca-cola"
  brandName="Coca-Cola"
/>
```

---

## 🔧 Integration Points

### Location Data

Currently uses hardcoded Mumbai location. To integrate real location:

```typescript
// 1. Request location during onboarding
const [userLocation, setUserLocation] = useState({
  city: '',
  area: '',
  pincode: ''
});

// 2. Save to user profile
// 3. Pass to scan recording
await recordScan({
  sku: product.sku,
  city: userLocation.city,      // from profile
  area: userLocation.area,       // from profile
  pincode: userLocation.pincode, // from profile
  scanMethod: 'camera',
  credits: product.credits,
});
```

### Brand Authentication

For production, add brand login:

```typescript
// Simple approach
const BRANDS = {
  'coca-cola': { password: 'xxx', name: 'Coca-Cola' },
  'amul': { password: 'xxx', name: 'Amul' },
};

// Or use Supabase Auth
const { data: { user } } = await supabase.auth.signInWithPassword({
  email: 'brand@coca-cola.com',
  password: 'secure-password'
});
```

---

## 📊 Data Storage Schema

### KV Store Keys

```
# Products
product:CC-500ML-PET          → { id, sku, name, brand, ... }
product:AMUL-1L-HDPE          → { id, sku, name, brand, ... }

# Individual Scans
scan:{uuid}                   → { scanId, sku, timestamp, city, ... }

# Indexes
scan:sku:CC-500ML-PET:1699296000000         → scanId
scan:brand:coca-cola:1699296000000          → scanId  
scan:date:2024-11-06:1699296000000          → scanId

# Daily Aggregates
stats:brand:coca-cola:2024-11-06            → { totalScans, cities, ... }
```

### Query Examples

```typescript
// Get all Coca-Cola scans
const scans = await kv.getByPrefix('scan:brand:coca-cola');

// Get scans for specific product
const productScans = await kv.getByPrefix('scan:sku:CC-500ML-PET');

// Get daily stats
const dailyStats = await kv.get('stats:brand:coca-cola:2024-11-06');
```

---

## 🎓 Key Concepts

### SKU (Stock Keeping Unit)
- Unique identifier for each product variant
- Format: `{BRAND}-{SIZE}-{MATERIAL}`
- Example: `CC-500ML-PET` = Coca-Cola 500ml PET bottle
- Encoded in product barcode

### Brand ID
- URL-safe brand identifier
- Lowercase, hyphenated
- Example: `coca-cola`, `dabur-real`
- Used for B2B dashboard routing and data filtering

### Scan Event
- Anonymous record of a single scan
- Privacy-first (no user info)
- Includes: SKU, location, timestamp, method
- Immutable once created

### Daily Aggregates
- Pre-computed statistics per brand per day
- Faster queries for analytics
- Updated on each scan
- Includes: total scans, cities, hours, credits

---

## 🐛 Troubleshooting

### "Scan not recorded"
- **Check:** Browser console for errors
- **Verify:** Supabase credentials in `/utils/supabase/info.tsx`
- **Test:** Health endpoint at `/make-server-d9888d31/health`
- **Solution:** Ensure backend server is running

### "Products not loading"
- **Check:** Database has been seeded
- **Verify:** API returns products at `/products` endpoint
- **Solution:** Run database seed command

### "Analytics empty"
- **Check:** Scans exist for selected brand
- **Verify:** Brand ID matches product brandId
- **Solution:** Generate test scans or wait for real user scans

### "SKU doesn't match"
- **Check:** Entered exact SKU (case-sensitive)
- **Verify:** Product exists in database with that SKU
- **Solution:** Check product SKU in database, use manual entry

---

## 📈 Production Checklist

- [ ] Seed production database with real products
- [ ] Integrate real user location (not hardcoded Mumbai)
- [ ] Add brand authentication (login system)
- [ ] Set up monitoring and error logging
- [ ] Configure rate limiting on scan endpoint
- [ ] Add data export (CSV) for brands
- [ ] Implement caching for analytics queries
- [ ] Add email alerts for brands (weekly summaries)
- [ ] Create brand onboarding flow
- [ ] Write API documentation for brands

---

## 🎉 Summary

**For Users:**
Scan products → Earn credits → Schedule pickup → Get rewards

**For Brands:**
Anonymous scan data → Market insights → Geographic trends → Product performance

**Privacy:**
No personal data stored → Only aggregated analytics → GDPR compliant

**Technical:**
SKU-based tracking → KV store database → REST API → React dashboard

---

**You're ready to go! 🐦✨**

Start by seeding the database, then test scanning, then view analytics in the B2B dashboard.
