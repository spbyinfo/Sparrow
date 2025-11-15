# Sparrow B2B Platform - Setup & Usage Guide

## 🎯 Overview

This guide explains how the Sparrow app tracks product scans and provides analytics to brand partners through the B2B platform.

---

## 📊 How Product Scans Are Tracked

### 1. **Product Data Structure**

Each product in Sparrow has these key fields:

```typescript
{
  id: string;           // Unique ID (1, 2, 3...)
  sku: string;          // Stock Keeping Unit (e.g., "CC-500ML-PET")
  name: string;         // Product name
  category: string;     // Category (Soft Drink, Dairy, etc.)
  brand: string;        // Brand name (e.g., "Coca-Cola")
  brandId: string;      // Brand identifier for B2B (e.g., "coca-cola")
  brandLogo: string;    // Logo URL
  image: string;        // Product image
  image3D: string;      // 3D product view
  plasticType: string;  // Plastic type (PETE #1, HDPE #2, etc.)
  description: string;  // Recyclability info
  recyclable: boolean;  // Is it recyclable?
  credits: number;      // Credits earned per scan
}
```

### 2. **When a User Scans a Product**

**User Flow:**
1. User taps a product in the bingo grid
2. Views 3D product detail modal
3. Taps "Scan Product" button
4. Scans barcode with camera OR enters SKU manually
5. Product is verified against expected SKU
6. **Scan is recorded to backend** ✨

**Backend Recording:**
The scan is saved with these details:
- Product SKU
- Timestamp
- Location (city, area, pincode) - but NO user identity
- Scan method (camera vs manual)
- Credits awarded

**What Gets Stored:**
```json
{
  "scanId": "uuid-here",
  "sku": "CC-500ML-PET",
  "timestamp": 1699296000000,
  "date": "2024-11-06",
  "time": "14:30",
  "city": "Mumbai",
  "area": "Bandra West",
  "pincode": "400050",
  "scanMethod": "camera",
  "credits": 10
}
```

**Privacy First 🔒**
- NO user ID
- NO name, email, or phone number
- Only aggregated location (city/area, not GPS coordinates)

### 3. **Data Indexing**

For efficient querying, scans are indexed multiple ways:

- `scan:{scanId}` - Individual scan record
- `scan:sku:{sku}:{timestamp}` - By product
- `scan:brand:{brandId}:{timestamp}` - By brand
- `scan:date:{date}:{timestamp}` - By date

Plus daily aggregated stats:
- `stats:brand:{brandId}:{date}` - Daily brand totals

---

## 🏢 B2B Analytics Platform

### What Brands Can See

The B2B dashboard shows **anonymous, aggregated data**:

#### 1. **Overview Metrics**
- Total scans (all time)
- Scans this week
- Scans this month
- Total credits distributed

#### 2. **Time Series Analysis**
- Daily scan volume over last 7/30 days
- Peak scanning hours
- Day-of-week patterns
- Growth trends

#### 3. **Geographic Distribution**
- Scans by city (top 5 cities)
- Most active neighborhoods
- Regional insights

#### 4. **Product Performance**
- Which SKUs get scanned most
- Credits distributed per product
- Category breakdown
- Scan method preferences

---

## 🚀 Setting Up the B2B Platform

### Step 1: Seed the Database

**Option A: Using the DatabaseSetup Component**

Add this to your App.tsx temporarily:

```tsx
import { DatabaseSetup } from './components/DatabaseSetup';

// In your render:
<DatabaseSetup />
```

Click "Seed Database" to populate products.

**Option B: Manual API Call**

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d9888d31/products/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d @seedData.json
```

### Step 2: Test Scanning Flow

1. Navigate to Bingo page
2. Tap any product
3. View product details
4. Scan using camera or manual SKU entry
5. Check browser console for API logs
6. Verify scan is recorded

### Step 3: View B2B Analytics

**Add to your app:**

```tsx
import { B2BAnalyticsDashboard } from './components/B2BAnalyticsDashboard';

<B2BAnalyticsDashboard 
  brandId="coca-cola" 
  brandName="Coca-Cola" 
/>
```

**Available Brand IDs:**
- `coca-cola` - Coca-Cola products
- `amul` - Amul dairy products
- `bisleri` - Bisleri water bottles
- `nestle` - Nestlé products
- `dove` - Dove personal care
- `frooti` - Frooti juices
- `pepsico` - Pepsi products
- `dabur-real` - Real juices
- `ponds` - Ponds personal care

---

## 📡 API Endpoints

### Product Endpoints

**Get All Products**
```
GET /make-server-d9888d31/products
```

**Get Product by SKU**
```
GET /make-server-d9888d31/products/:sku
```

**Seed Products** (one-time setup)
```
POST /make-server-d9888d31/products/seed
Body: [{ product objects }]
```

### Scan Tracking Endpoints

**Record a Scan**
```
POST /make-server-d9888d31/scans
Body: {
  sku: string,
  city: string,
  area: string,
  pincode: string,
  scanMethod?: 'camera' | 'manual',
  credits?: number
}
```

### Analytics Endpoints

**Brand Overview**
```
GET /make-server-d9888d31/analytics/:brandId/overview
Returns: total scans, daily stats, credits
```

**Geographic Distribution**
```
GET /make-server-d9888d31/analytics/:brandId/geography?days=30
Returns: city breakdown, top areas
```

**Product Performance**
```
GET /make-server-d9888d31/analytics/:brandId/products
Returns: scan counts per product
```

---

## 🔧 Implementation Checklist

### Initial Setup
- [x] Backend API endpoints created
- [x] Scan recording integrated in ScanModal
- [x] Product seed data prepared
- [x] B2B dashboard component built
- [ ] Database seeded with products
- [ ] Test scans recorded
- [ ] Analytics verified

### User Location Integration
Currently using hardcoded location:
```typescript
city: 'Mumbai',
area: 'Bandra West',
pincode: '400050'
```

**To implement real location:**

1. Request user location permission during onboarding
2. Store in user profile
3. Pass to scan recording

```typescript
// In user profile setup
const [userLocation, setUserLocation] = useState({
  city: '',
  area: '',
  pincode: ''
});

// When recording scan
await recordScan({
  sku: product.sku,
  city: userLocation.city,
  area: userLocation.area,
  pincode: userLocation.pincode,
  scanMethod: 'camera',
  credits: product.credits,
});
```

### Brand Authentication
For production, add brand login:

```typescript
// Simple brand auth
const BRAND_CREDENTIALS = {
  'coca-cola': { password: 'secure-password', brandId: 'coca-cola' },
  'amul': { password: 'secure-password', brandId: 'amul' },
  // etc...
};
```

Or integrate with Supabase Auth for proper user management.

---

## 📈 Sample Data Flow

### Example: User Scans Coca-Cola Bottle

1. **User Action:** 
   - Opens Sparrow app
   - Taps Coca-Cola in bingo grid
   - Scans barcode

2. **Frontend:**
   ```typescript
   await recordScan({
     sku: 'CC-500ML-PET',
     city: 'Mumbai',
     area: 'Bandra West',
     pincode: '400050',
     scanMethod: 'camera',
     credits: 10
   });
   ```

3. **Backend Processing:**
   - Validates SKU exists
   - Generates unique scan ID
   - Stores scan record
   - Creates indexes (by SKU, brand, date)
   - Updates daily stats for Coca-Cola brand

4. **B2B Dashboard Updates:**
   - Total scans +1
   - Mumbai city count +1
   - Bandra West area added to active areas
   - Coca-Cola 500ml product scan count +1
   - Daily chart shows new data point

---

## 🎓 Best Practices

### For Developers

1. **Always validate SKU** before recording scan
2. **Handle API errors gracefully** with user-friendly messages
3. **Log errors** to console for debugging
4. **Use TypeScript types** for type safety
5. **Test with sample data** before production

### For Data Privacy

1. **Never store user IDs** with scan data
2. **Anonymize location** (city/area, not GPS)
3. **Aggregate data** for analytics
4. **Clear privacy policy** for users
5. **GDPR compliance** for user data

### For Performance

1. **Batch API calls** when possible
2. **Cache analytics data** (refresh every 5 min)
3. **Paginate large datasets**
4. **Use daily aggregates** instead of querying all scans
5. **Index by date** for time-series queries

---

## 🐛 Troubleshooting

### Scans Not Recording
- Check browser console for errors
- Verify Supabase project ID and anon key in `/utils/supabase/info.tsx`
- Ensure backend server is running
- Check network tab for API response

### Analytics Not Loading
- Verify brand ID is correct
- Check if products have been seeded
- Ensure scans exist for that brand
- Look for CORS errors

### Products Not Showing
- Run database seed command
- Check KV store has `product:*` keys
- Verify API endpoint returns products

---

## 📞 Support

For issues or questions:
1. Check browser console logs
2. Review network requests
3. Verify API responses
4. Check Supabase logs

---

## 🎉 Next Steps

1. **Seed database** with sample products
2. **Test scanning flow** end-to-end
3. **Generate sample scans** for testing
4. **View analytics** in B2B dashboard
5. **Refine location tracking**
6. **Add brand authentication**
7. **Deploy to production**

Good luck with Sparrow! 🐦✨
