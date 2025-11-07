# 🎫 Sparrow Reservation System - Complete Guide

## ✅ What's Built

Your reservation system is now **fully functional** and connected to Supabase! Here's what works:

### Backend (Supabase Edge Functions)
- ✅ Create reservations with unique confirmation codes (e.g., `SPARROW-H7K9M2`)
- ✅ Track inventory (how many services available)
- ✅ Get user reservations
- ✅ Look up reservations by code
- ✅ Mark reservations as redeemed
- ✅ Cancel reservations

### Frontend
- ✅ Users can reserve services from the Pass page
- ✅ Real-time inventory updates (decrements when reserved)
- ✅ Confirmation codes shown to users via toast notification
- ✅ Works with guest users (no login required initially)

---

## 🚀 How to Use Right Now (Testing)

### 1. Test the Flow (No Partners Yet)
Right now, all 12 businesses shown in the app have **hardcoded inventory** (the numbers you see like "12 left", "8 left"). The system works like this:

1. User clicks on a business → Modal opens
2. User clicks "Purchase Reservation" → Backend creates reservation
3. User sees: **Toast notification with code like "Reserved! Code: SPARROW-A7K9M2"**
4. Inventory decreases: 12 → 11 → 10...

**Try it:** 
- Go to Pass page
- Click on "Looks Hair & Nail Salon - Bandra" (shows 12 left)
- Click "Purchase Reservation"
- You'll see a toast with your confirmation code!

---

## 📞 When You Get Your First Real Partner

Let's say you call **"Looks Hair & Nail Salon"** and they agree to give you **50 haircuts** this month at ₹250 each (normally ₹400).

### Step 1: Set Inventory via Browser Console

1. Open your app in Chrome
2. Press `F12` → Console tab
3. Paste this code:

```javascript
// Import the helper
import { setBusinessInventory } from '/utils/inventory-manager.ts';

// Set 50 services for business ID "1" (Looks Salon)
await setBusinessInventory('1', 50, '2025-01');
```

**Or use fetch directly:**

```javascript
await fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-efcc1648/inventory', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  },
  body: JSON.stringify({
    businessId: '1',
    available: 50,
    month: '2025-01'
  })
});
```

### Step 2: Users Start Reserving

- User opens Pass page → Sees "50 left" for Looks Salon
- User reserves → Inventory: 50 → 49 → 48...
- User gets code: **SPARROW-A7K9M2**
- User shows code at salon

### Step 3: Verify at the Business (You or Staff)

When user arrives at the salon with code `SPARROW-A7K9M2`, you can verify it:

```javascript
import { verifyReservationCode } from '/utils/inventory-manager.ts';

const reservation = await verifyReservationCode('SPARROW-A7K9M2');
console.log(reservation);
// Shows: user name, email, phone, business name, created date
```

### Step 4: Mark as Redeemed (After Service)

```javascript
import { markAsRedeemed } from '/utils/inventory-manager.ts';

await markAsRedeemed('reservation-uuid-here');
// Moves from "reserved" to "redeemed" in your reconciliation
```

---

## 📊 Monthly Reconciliation

At end of month, you can get all reservations for a business:

```javascript
// Get all reservations for Looks Salon (ID: "1")
const allReservations = await fetch(
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-efcc1648/reservations/business/1'
).then(r => r.json());

// Filter by status
const active = allReservations.filter(r => r.status === 'active');
const redeemed = allReservations.filter(r => r.status === 'redeemed');
const cancelled = allReservations.filter(r => r.status === 'cancelled');

console.log(`Total redeemed: ${redeemed.length}`);
// Call salon: "Hey, 42 customers used their codes this month!"
```

---

## 🎯 Your Workflow (First 3 Months)

### Week 1: Get Partners
1. Call 5 local businesses
2. Pitch: "We'll bring you customers and pay upfront for 20-50 services"
3. Negotiate bulk rate (e.g., ₹250 vs ₹400 retail)

### Week 2: Set Inventory
For each partner, run in console:
```javascript
await setBusinessInventory('1', 50, '2025-01'); // Looks Salon - 50 haircuts
await setBusinessInventory('2', 30, '2025-01'); // Cinema - 30 tickets
await setBusinessInventory('4', 20, '2025-01'); // Yoga - 20 classes
```

### Week 3-4: Users Reserve
- Users see real inventory on Pass page
- Each reservation generates unique code
- Inventory decrements automatically
- You get data on who reserved what

### End of Month: Reconcile
1. Export all reservations from database
2. Call each partner: "Here's the list of 27 codes that were used"
3. Partner confirms: "Yes, we served 27 customers"
4. You pay partner (if not already paid upfront)

---

## 🔧 Advanced: Adding New Businesses

Currently, the 12 businesses are hardcoded in `/components/MyPass.tsx`. When you get a NEW partner not in the list:

### Option A: Add to Hardcoded List (Quick)
Edit `/components/MyPass.tsx` → `partners` array:

```typescript
{
  id: '13', // Unique ID
  name: 'Chai Point - Andheri',
  category: 'Food & Beverage',
  location: 'Andheri East, Mumbai',
  area: 'MIDC',
  credits: 150,
  originalPrice: 300,
  servicesLeft: 0, // Will be overridden by backend
  pickupTime: 'Available today 8:00 AM - 10:00 PM',
  rating: 4.5,
  distance: '2.5 km',
  image: 'https://images.unsplash.com/photo-...',
  logo: '☕',
  badge: 'Popular'
},
```

Then set inventory:
```javascript
await setBusinessInventory('13', 100, '2025-01');
```

### Option B: Build Admin Panel (Later)
When you have 50+ partners, build a simple admin page where you can:
- Add new businesses via form
- Set monthly inventory
- View all reservations
- Export reconciliation reports

---

## 📱 User Experience Right Now

1. **User scans products** → Earns credits (currently not required since Pass is FREE)
2. **User opens Pass tab** → Sees 12 partner businesses
3. **User clicks on "Looks Salon"** → Modal opens showing details
4. **User clicks "Purchase Reservation"** → Gets confirmation code
5. **Toast shows: "Reserved! Code: SPARROW-A7K9M2"** ← User screenshots this
6. **User visits salon** → Shows screenshot to staff
7. **Staff checks code** → Provides service

---

## 🐛 Troubleshooting

### "No services available"
Check inventory:
```javascript
const inv = await fetch('https://...supabase.co/functions/v1/make-server-efcc1648/inventory/1')
  .then(r => r.json());
console.log(inv); // Shows available count
```

### "Failed to create reservation"
Check console for errors. Common issues:
- Business ID doesn't match
- Inventory is 0
- Network error

### Inventory not updating
The frontend fetches inventory on page load. If you add inventory while page is open, refresh the Pass page to see updates.

---

## 💾 Data Storage

Everything is stored in Supabase KV store:

```
reservation:{uuid} → Full reservation object
reservation:user:{userId}:{timestamp} → Index for user lookups
reservation:code:{SPARROW-CODE} → Index for code lookups
inventory:{businessId} → Current inventory state
```

---

## 🎉 Next Steps

1. **Test it right now** - Make a test reservation and see the confirmation code
2. **Get your first partner** - Call a local salon/cafe
3. **Set their inventory** - Use the console commands above
4. **Watch it work** - Users reserve, you reconcile, everyone's happy!

When you have 5+ partners actively using this, we can build a proper admin dashboard. For now, browser console + monthly phone calls = MVP perfection! 🚀
