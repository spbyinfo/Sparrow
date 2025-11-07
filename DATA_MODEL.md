# Sparrow Data Model & B2B Platform Architecture

## Overview
This document explains how product scans are tracked, stored, and presented to brand partners through the B2B analytics platform.

---

## 📦 Product Data Model

### Product Schema
Each product in the Sparrow ecosystem has the following structure:

```typescript
interface Product {
  id: string;           // Unique product ID (e.g., "1", "2", "3")
  sku: string;          // Stock Keeping Unit (e.g., "CC-500ML-PET")
  name: string;         // Product name (e.g., "Coca-Cola 500ml")
  category: string;     // Category (e.g., "Soft Drink", "Dairy")
  brand: string;        // Brand name (e.g., "Coca-Cola", "Amul", "Bisleri")
  brandId: string;      // Brand ID for B2B dashboard access
  brandLogo: string;    // URL to brand logo
  image: string;        // Product image URL
  image3D: string;      // 3D product view URL
  plasticType: string;  // Plastic classification (e.g., "PETE #1", "HDPE #2")
  description: string;  // Recyclability info
  recyclable: boolean;  // Can it be recycled?
  credits: number;      // Credits earned per scan
}
```

### Product Storage
Products are stored in the KV store with the key pattern:
- **Key:** `product:{sku}` (e.g., `product:CC-500ML-PET`)
- **Value:** JSON stringified Product object

---

## 🎯 Scan Data Model

### Scan Event Schema
When a user scans a product, we record:

```typescript
interface ScanEvent {
  scanId: string;         // Unique scan ID (UUID)
  sku: string;            // Product SKU scanned
  timestamp: number;      // Unix timestamp (ms)
  date: string;           // ISO date string (YYYY-MM-DD)
  time: string;           // Time (HH:mm)
  city: string;           // City (e.g., "Mumbai", "Delhi")
  area: string;           // Area/neighborhood (e.g., "Bandra West")
  pincode: string;        // 6-digit PIN code
  scanMethod: 'camera' | 'manual';  // How was it scanned?
  credits: number;        // Credits awarded
  // Privacy: NO user ID or personal information
}
```

### Privacy-First Design
⚠️ **IMPORTANT:** Scan events are **completely anonymous**
- No user ID stored
- No phone number or email
- No name or personal identifiers
- Only aggregated location data (city/area, not exact coordinates)

This allows brands to see market trends without violating user privacy.

### Scan Storage
Scans are stored with multiple indexing strategies:

1. **Individual Scan Record:**
   - **Key:** `scan:{scanId}`
   - **Value:** JSON stringified ScanEvent

2. **SKU Index (for product-specific queries):**
   - **Key:** `scan:sku:{sku}:{timestamp}`
   - **Value:** scanId

3. **Date Index (for time-series queries):**
   - **Key:** `scan:date:{YYYY-MM-DD}:{timestamp}`
   - **Value:** scanId

4. **Brand Index (for B2B dashboard):**
   - **Key:** `scan:brand:{brandId}:{timestamp}`
   - **Value:** scanId

---

## 🏢 B2B Platform Architecture

### Brand Access
Brands access the B2B platform with credentials:
- **Brand ID:** Unique identifier (e.g., "coca-cola", "amul")
- **API Key:** Secure token for authentication

### B2B Dashboard Features

#### 1. **Overview Stats**
- Total scans (all-time)
- Scans this week/month
- Total credits distributed
- Active products

#### 2. **Scan Analytics**
- **Time Series Chart:** Scans per day over last 30 days
- **Peak Times:** Hour-of-day distribution
- **Day of Week:** Which days see most scans?

#### 3. **Geographic Distribution**
- **City Breakdown:** Scans by city (pie chart)
- **Top Areas:** Most active neighborhoods
- **Heatmap:** Visual representation (future feature)

#### 4. **Product Performance**
- **SKU Rankings:** Which products get scanned most?
- **Credits Distribution:** Total credits per product
- **Scan Method:** Camera vs Manual entry

#### 5. **Trends & Insights**
- **Growth Rate:** Week-over-week, month-over-month
- **Seasonal Patterns:** Identify trends
- **Engagement Score:** Scans per active user (aggregated)

---

## 🔐 Authentication Flow

### User Authentication
Users sign in with:
- Phone number (10 digits)
- OTP verification
- OR "Skip for now" guest mode

In guest mode:
- Full access to scanning
- Credits tracked in localStorage
- Data syncs on sign-up

### Brand Authentication
Brands access B2B dashboard with:
- Brand email
- Password
- OR API key for programmatic access

---

## 📊 Data Aggregation

### Real-Time Aggregation
When a scan occurs:
1. Record individual scan event
2. Update brand daily stats: `stats:brand:{brandId}:{YYYY-MM-DD}`
3. Update product daily stats: `stats:product:{sku}:{YYYY-MM-DD}`
4. Update city stats: `stats:city:{city}:{YYYY-MM-DD}`

### Aggregated Stats Schema
```typescript
interface DailyStats {
  date: string;           // YYYY-MM-DD
  totalScans: number;     // Count of scans
  uniqueAreas: string[];  // Unique areas scanned from
  scansByCityMap: Record<string, number>;  // City -> count
  scansByHourMap: Record<number, number>;  // Hour (0-23) -> count
  totalCredits: number;   // Credits distributed
}
```

---

## 🛠️ Implementation Notes

### Current State
✅ Product data structure defined in App.tsx
✅ Basic scan flow with SKU verification
✅ Mock scan submission

### To Implement
🔲 Backend API endpoints for scan tracking
🔲 Product seeding in KV store
🔲 Real scan recording with location data
🔲 B2B dashboard component
🔲 Brand authentication
🔲 Analytics API endpoints
🔲 Data export functionality (CSV)

### Migration Path
1. **Phase 1:** Set up backend endpoints
2. **Phase 2:** Connect frontend scan flow to backend
3. **Phase 3:** Build B2B analytics dashboard
4. **Phase 4:** Add brand authentication
5. **Phase 5:** Advanced analytics (trends, predictions)

---

## 📈 Sample Queries

### Get All Scans for a Brand
```typescript
const brandScans = await kv.getByPrefix(`scan:brand:${brandId}`);
```

### Get Scans for a Product
```typescript
const productScans = await kv.getByPrefix(`scan:sku:${sku}`);
```

### Get Scans for a Date
```typescript
const dailyScans = await kv.getByPrefix(`scan:date:${date}`);
```

### Get Daily Aggregates
```typescript
const stats = await kv.get(`stats:brand:${brandId}:${date}`);
```

---

## 🚀 Next Steps

1. Review and approve data model
2. Implement backend API endpoints
3. Update scan flow to record data
4. Build B2B analytics dashboard
5. Test with sample data
6. Deploy and onboard first brand partner

---

**Questions or feedback?** Let me know what changes are needed!
