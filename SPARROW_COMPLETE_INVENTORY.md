# 📊 Sparrow App - Complete Inventory & Implementation Guide

## 🎨 Design System Variables

### Colors
```css
/* Primary Brand Colors */
--primary: #ff9933         /* Saffron - main brand, credits, achievements */
--secondary: #059669       /* Nature Green - actions, success */
--accent: #ffd700          /* Imperial Gold - special highlights */
--destructive: #dc143c     /* Royal Red - alerts, errors */
--utility: #4169e1         /* Divine Blue - utility actions */

/* Base Colors */
--background: #fffbf5      /* Cream background */
--foreground: #000000      /* Black text */
--card: #ffffff            /* White cards */
--muted: #f5f5f5          /* Light gray */
--muted-foreground: #666666 /* Gray text */
--border: #e5e5e5         /* Border color */
```

### Spacing System
```css
/* Padding/Margin Values */
px-4: 16px      /* Screen edges (critical for mobile) */
gap-2: 8px      /* Tight spacing */
gap-3: 12px     /* Medium spacing */
gap-4: 16px     /* Component gaps */
p-4: 16px       /* Card padding small */
p-6: 24px       /* Card padding large */
```

### Border Radius
```css
rounded-[1.5rem]: 24px           /* Base organic radius */
rounded-[2rem_1rem_2rem_1rem]   /* Asymmetric whimsy */
rounded-full                      /* Circular (logos, avatars, icons) */
```

### Touch Targets
```css
min-h-[48px]    /* Minimum button/tap height */
min-w-[48px]    /* Minimum button/tap width */
h-12: 48px      /* Standard button height */
w-12: 48px      /* Standard button width */
```

### Typography
```css
/* Sizes (used sparingly - semantic HTML preferred) */
text-xs: 12px
text-sm: 14px
text-base: 16px  /* Default mobile size */
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 32px

/* Weights */
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

### Safe Areas
```css
pt-safe         /* Top safe area (notch) */
pb-safe         /* Bottom safe area (home indicator) */
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

---

## 🧩 React Components

### Main Components (`/components`)
1. **App.tsx** - Main application entry point
2. **AuthChoice.tsx** - Auth selection screen (Sign In / Guest)
3. **SignInForm.tsx** - Sign in form with Hinge-style animations
4. **SignUpForm.tsx** - Sign up form
5. **UserDashboardLayout.tsx** - Main layout with bottom navigation
6. **BingoCard.tsx** - 3×3 bingo grid component
7. **BingoInstructions.tsx** - Onboarding walkthrough modal
8. **ScanModal.tsx** - Product scanning modal with camera view
9. **ProductDetailModal.tsx** - 3D product view after scanning
10. **MyCredits.tsx** - Credits page with transactions
11. **MyPass.tsx** - Partner businesses page
12. **UserProfile.tsx** - Profile page with eKYC
13. **EKYCVerification.tsx** - KYC verification component
14. **ReservationModal.tsx** - Reservation flow with swipe-to-confirm
15. **ReservationCircles.tsx** - Active reservations display
16. **SuggestBusinessForm.tsx** - Partner suggestion form

### UI Components (`/components/ui` - ShadCN)
1. **accordion.tsx** - Collapsible sections
2. **alert.tsx** - Notification messages
3. **alert-dialog.tsx** - Confirmation dialogs
4. **aspect-ratio.tsx** - Responsive image containers
5. **avatar.tsx** - User avatars with fallback
6. **badge.tsx** - Small labels/tags
7. **breadcrumb.tsx** - Navigation breadcrumbs
8. **button.tsx** - Primary button component
9. **calendar.tsx** - Date picker
10. **card.tsx** - Card container
11. **carousel.tsx** - Image/content carousels
12. **chart.tsx** - Data visualizations
13. **checkbox.tsx** - Checkbox inputs
14. **collapsible.tsx** - Expandable sections
15. **command.tsx** - Command menu
16. **context-menu.tsx** - Right-click menus
17. **dialog.tsx** - Modal dialogs
18. **drawer.tsx** - Slide-in panels
19. **dropdown-menu.tsx** - Dropdown menus
20. **form.tsx** - Form wrapper with validation
21. **hover-card.tsx** - Hover tooltips
22. **input.tsx** - Text input fields
23. **input-otp.tsx** - OTP code inputs
24. **label.tsx** - Form labels
25. **menubar.tsx** - Menu bar navigation
26. **navigation-menu.tsx** - Nav menus
27. **pagination.tsx** - Page navigation
28. **popover.tsx** - Floating popups
29. **progress.tsx** - Progress bars
30. **radio-group.tsx** - Radio button groups
31. **resizable.tsx** - Resizable panels
32. **scroll-area.tsx** - Custom scrollbars
33. **select.tsx** - Dropdown selects
34. **separator.tsx** - Divider lines
35. **sheet.tsx** - Bottom sheets
36. **sidebar.tsx** - Side navigation
37. **skeleton.tsx** - Loading placeholders
38. **slider.tsx** - Range sliders
39. **sonner.tsx** - Toast notifications
40. **switch.tsx** - Toggle switches
41. **table.tsx** - Data tables
42. **tabs.tsx** - Tab navigation
43. **textarea.tsx** - Multi-line text inputs
44. **toggle.tsx** - Toggle buttons
45. **toggle-group.tsx** - Toggle button groups
46. **tooltip.tsx** - Hover tooltips

### Utility Components
1. **ImageWithFallback.tsx** - Image with error handling

---

## 📐 Layout Patterns & Usage Guidelines

### 1. Full-Screen Layout Pattern
**Used in**: All main pages (Auth, Dashboard pages)

```tsx
<div className="flex flex-col h-screen bg-background">
  {/* Header with safe area */}
  <div style={{ paddingTop: 'max(env(safe-area-inset-top), 24px)' }}>
    {/* Header content */}
  </div>
  
  {/* Scrollable content */}
  <div className="flex-1 overflow-y-auto px-4">
    {/* Main content */}
  </div>
  
  {/* Bottom nav with safe area */}
  <nav style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
    {/* Navigation */}
  </nav>
</div>
```

**Usage Guidelines:**
- Always use `h-screen` for full viewport height
- Safe area padding is REQUIRED for notched devices
- Content must be in `flex-1 overflow-y-auto` for proper scrolling
- Never use `overflow-x-auto` (no horizontal scroll)
- Background should always be `bg-background` (cream)

---

### 2. Card Layout Pattern
**Used in**: Partner cards, product cells, reservation cards

```tsx
<div className="rounded-[2rem_1rem_2rem_1rem] border border-border bg-card p-4 shadow-sm">
  {/* Card content */}
</div>
```

**Usage Guidelines:**
- Use asymmetric radius for whimsical aesthetic
- Always include border (1px solid)
- Background should be white (`bg-card`)
- Padding: `p-4` (16px) for small cards, `p-6` (24px) for large
- Shadow: `shadow-sm` or none (rely on borders)

**Variations:**

```tsx
// Pressed state for interactive cards
className="... active:scale-[0.98] transition-all cursor-pointer"

// Selected/scanned state
className="... border-primary border-2"

// Disabled state
className="... opacity-50 cursor-not-allowed"
```

---

### 3. Button Layout Pattern
**Used in**: All CTAs, form submissions, navigation

```tsx
// Primary Button (Saffron)
<Button 
  className="h-12 min-h-[48px] w-full rounded-[1.5rem] bg-primary text-white active:scale-[0.98] transition-all"
  style={{ fontSize: '16px', fontWeight: '600' }}
>
  Button Text
</Button>

// Black Button (Special - Auth screens)
<Button 
  className="h-12 min-h-[48px] w-full rounded-[1.5rem] bg-black text-white active:scale-[0.98] transition-all"
  style={{ fontSize: '16px', fontWeight: '600' }}
>
  Sign In
</Button>

// Secondary Button (Outline)
<Button 
  variant="outline"
  className="h-12 min-h-[48px] w-full rounded-[1.5rem] border-primary text-primary active:scale-[0.98] transition-all"
  style={{ fontSize: '16px', fontWeight: '600' }}
>
  Cancel
</Button>

// Destructive Button
<Button 
  variant="destructive"
  className="h-12 min-h-[48px] rounded-[1.5rem] active:scale-[0.98] transition-all"
  style={{ fontSize: '16px', fontWeight: '600' }}
>
  Delete
</Button>
```

**Usage Guidelines:**
- ALWAYS minimum height 48px (touch target)
- ALWAYS include `active:scale-[0.98]` for press feedback
- Full width (`w-full`) on mobile for primary actions
- Inline size for secondary actions
- Explicit font-size (16px) and font-weight (600)
- Border radius: 24px (`rounded-[1.5rem]`)

---

### 4. Modal/Dialog Layout Pattern
**Used in**: ScanModal, ProductDetailModal, ReservationModal

```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-[90vw] rounded-[1.5rem] p-0 overflow-hidden">
    {/* Header */}
    <div className="relative p-4 border-b">
      <h2>Modal Title</h2>
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 active:scale-90"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
    
    {/* Scrollable Content */}
    <div className="p-4 max-h-[70vh] overflow-y-auto">
      {/* Content here */}
    </div>
    
    {/* Footer (optional) */}
    <div className="p-4 border-t bg-muted">
      <Button className="w-full">Action</Button>
    </div>
  </DialogContent>
</Dialog>
```

**Usage Guidelines:**
- Max width: 90vw for mobile breathing room
- Max height: 70vh for content, keep actions visible
- Close button: top-right, always accessible
- Rounded corners: 24px
- Header/footer with borders for visual hierarchy
- Content must be scrollable if it exceeds height

---

### 5. Bottom Sheet Layout Pattern
**Used in**: Mobile-specific modals, quick actions

```tsx
<Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent 
    side="bottom" 
    className="rounded-t-[1.5rem]"
    style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
  >
    {/* Drag handle */}
    <div className="w-12 h-1 rounded-full bg-muted mx-auto mb-4" />
    
    {/* Content */}
    <div className="space-y-4">
      {/* Sheet content */}
    </div>
  </SheetContent>
</Sheet>
```

**Usage Guidelines:**
- Always include drag handle for swipe-to-dismiss
- Round top corners only
- Account for safe area inset at bottom
- Use for contextual actions, filters, quick forms

---

### 6. Grid Layout Pattern (Bingo)
**Used in**: BingoCard 3×3 grid

```tsx
<div className="grid grid-cols-3 gap-2 p-4">
  {products.map((product) => (
    <div
      key={product.id}
      className={`
        aspect-square rounded-[1.5rem] border-2 overflow-hidden
        active:scale-95 transition-all cursor-pointer
        ${product.scanned ? 'border-primary' : 'border-border'}
      `}
      onClick={() => handleProductTap(product)}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
      {product.scanned && (
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
      )}
    </div>
  ))}
</div>
```

**Usage Guidelines:**
- 3×3 grid with 8px gap (`gap-2`)
- Aspect ratio 1:1 for square cells
- Border: 2px for scanned, 1px for unscanned
- Visual feedback: checkmark overlay on scanned
- Tap target: entire cell is tappable
- Images: `object-cover` to fill square

---

### 7. List Layout Pattern
**Used in**: Credits transactions, Pass partners, Profile sections

```tsx
<div className="space-y-3">
  {items.map((item) => (
    <div 
      key={item.id}
      className="rounded-[1.5rem] border border-border bg-card p-4 active:scale-[0.98] transition-all"
    >
      <div className="flex items-start gap-3">
        {/* Icon/Image */}
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
          {/* Icon or image */}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="truncate">{item.title}</h3>
          <p className="text-muted-foreground">{item.subtitle}</p>
        </div>
        
        {/* Action/Value */}
        <div className="shrink-0">
          {/* Badge, chevron, or value */}
        </div>
      </div>
    </div>
  ))}
</div>
```

**Usage Guidelines:**
- Vertical spacing: 12px (`space-y-3`)
- Each item is a card with padding
- Three-column layout: icon | content | action
- Content uses `flex-1 min-w-0` to allow text truncation
- Icons/avatars are 48px × 48px
- Press feedback on interactive items

---

### 8. Header Layout Pattern
**Used in**: All page headers

```tsx
// With back button
<div 
  className="flex items-center justify-between px-4 py-3 border-b"
  style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
>
  <button 
    onClick={onBack}
    className="p-2 rounded-full active:scale-90 transition-all"
  >
    <ChevronLeft className="h-6 w-6" />
  </button>
  <h1>Page Title</h1>
  <div className="w-10" /> {/* Spacer for centering */}
</div>

// With logo and credits
<div 
  className="flex items-center justify-between px-4 py-3"
  style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
>
  <img src={logo} className="h-10 w-10 rounded-full" alt="Sparrow" />
  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
    <span style={{ color: '#ffd700', fontWeight: '600' }}>★</span>
    <span style={{ fontWeight: '600' }}>{credits}</span>
  </div>
</div>
```

**Usage Guidelines:**
- Always account for safe area inset
- Use flexbox for alignment
- Back button: left-aligned, 40px tap target
- Title: centered when possible
- Credits: right-aligned with gold star
- Border bottom for separation

---

### 9. Bottom Navigation Pattern
**Used in**: UserDashboardLayout

```tsx
<nav 
  className="flex items-center justify-around border-t bg-card"
  style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
>
  {navItems.map((item) => (
    <button
      key={item.id}
      onClick={() => setActivePage(item.id)}
      className={`
        flex flex-col items-center gap-1 py-3 px-4 min-w-[60px]
        active:scale-90 transition-all
      `}
    >
      <item.icon 
        className={`h-5 w-5 ${activePage === item.id ? 'text-primary' : 'text-muted-foreground'}`}
      />
      <span 
        className="text-xs"
        style={{ 
          color: activePage === item.id ? '#ff9933' : '#666666',
          fontWeight: activePage === item.id ? '600' : '400'
        }}
      >
        {item.label}
      </span>
    </button>
  ))}
</nav>
```

**Usage Guidelines:**
- 4 items maximum for thumb reach
- Equal spacing with `justify-around`
- Safe area inset at bottom (critical)
- Active state: saffron color (#ff9933)
- Icon size: 20px × 20px
- Label: 12px, weight 600 when active
- Min width per item: 60px
- Press feedback: scale down

---

### 10. Form Layout Pattern
**Used in**: SignIn, SignUp, eKYC, SuggestBusiness

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  {/* Input group */}
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="your@email.com"
      className="h-12 rounded-[1.5rem]"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  
  {/* Input group with error */}
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      type="password"
      className={`h-12 rounded-[1.5rem] ${error ? 'border-destructive' : ''}`}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    {error && (
      <p className="text-xs text-destructive">{error}</p>
    )}
  </div>
  
  {/* Submit button */}
  <Button 
    type="submit" 
    className="w-full h-12 rounded-[1.5rem] bg-primary"
    disabled={loading}
  >
    {loading ? 'Loading...' : 'Submit'}
  </Button>
</form>
```

**Usage Guidelines:**
- Vertical spacing: 16px (`space-y-4`)
- Label above input, 8px gap (`space-y-2`)
- Input height: 48px minimum
- Border radius: 24px
- Error text: 12px, red color, below input
- Submit button: full width, bottom of form
- Loading state: disable button, show loading text
- Placeholder text: helpful examples

---

## 🗂️ State Management Patterns

### App.tsx - Global State
```typescript
// Authentication state
const [authView, setAuthView] = useState<'auth' | 'dashboard'>('auth')
const [userName, setUserName] = useState('')
const [isGuest, setIsGuest] = useState(false)

// Navigation state
const [activePage, setActivePage] = useState<'bingo' | 'credits' | 'pass' | 'profile'>('bingo')

// User data state
const [userCredits, setUserCredits] = useState(0)
const [userProfile, setUserProfile] = useState<UserProfile>({
  name: '',
  email: '',
  phone: '',
  address: '',
  kycVerified: false
})

// Bingo game state
const [bingoProducts, setBingoProducts] = useState<BingoProduct[]>([])

// Transactions state
const [transactions, setTransactions] = useState<Transaction[]>([])

// Pickup history state
const [pickupHistory, setPickupHistory] = useState<PickupRecord[]>([])

// Reservations state
const [activeReservations, setActiveReservations] = useState<Reservation[]>([])
```

**State Flow: Authentication**
```
Initial: authView = 'auth'
↓
User taps "Sign In" or "Continue as Guest"
↓
If Guest: 
  - setIsGuest(true)
  - setUserName('Guest User')
  - setAuthView('dashboard')
  - setUserCredits(0)
↓
If Sign In Success:
  - setIsGuest(false)
  - setUserName(user.name)
  - setAuthView('dashboard')
  - Load user data (credits, transactions, profile)
```

**State Flow: Scanning Product**
```
User taps product in bingo grid
↓
BingoCard sets selectedProduct
↓
Opens ScanModal
↓
User scans/enters SKU
↓
If valid:
  - Update bingoProducts (mark as scanned)
  - Add transaction (+credits)
  - Update userCredits (+product.credits)
  - Open ProductDetailModal
  - Show success toast
↓
If invalid:
  - Show error toast
  - Keep modal open
```

**State Flow: Making Reservation**
```
User taps partner card in Pass page
↓
MyPass sets selectedPartner
↓
Opens ReservationModal
↓
User swipes to confirm arrival
↓
User taps "Purchase"
↓
If sufficient credits:
  - Call API to create reservation
  - Deduct credits: setUserCredits(current - partner.credits)
  - Add to activeReservations
  - Generate confirmation code
  - Show success toast with code
  - Close modal
↓
If insufficient credits:
  - Show error toast
  - Keep modal open
↓
If profile incomplete:
  - Show "Complete Profile" message
  - Redirect to Profile page
```

---

### BingoCard - Component State
```typescript
const [selectedProduct, setSelectedProduct] = useState<BingoProduct | null>(null)
const [isScanModalOpen, setIsScanModalOpen] = useState(false)
const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
const [showInstructions, setShowInstructions] = useState(false)

// On mount: Check if first time user
useEffect(() => {
  const hasSeenInstructions = localStorage.getItem('sparrow_bingo_instructions')
  if (!hasSeenInstructions) {
    setShowInstructions(true)
  }
}, [])

// Handle product tap
const handleProductTap = (product: BingoProduct) => {
  if (product.scanned) {
    // Already scanned, show detail
    setSelectedProduct(product)
    setIsDetailModalOpen(true)
  } else {
    // Not scanned, open scan modal
    setSelectedProduct(product)
    setIsScanModalOpen(true)
  }
}

// Handle scan complete
const handleScanComplete = (sku: string) => {
  setIsScanModalOpen(false)
  
  // Verify SKU matches
  if (sku === selectedProduct?.sku) {
    onProductScanned(selectedProduct)
    setIsDetailModalOpen(true)
  } else {
    toast.error('SKU does not match. Please scan the correct product.')
  }
}
```

**Usage Guidelines:**
- Use local storage for one-time instructions
- Separate modals for scanning vs. viewing
- Selected product drives which modal to show
- Always validate SKU before marking as scanned

---

### ScanModal - Component State
```typescript
const [scanMethod, setScanMethod] = useState<'camera' | 'manual' | null>(null)
const [manualSKU, setManualSKU] = useState('')
const [isProcessing, setIsProcessing] = useState(false)
const [cameraReady, setCameraReady] = useState(false)

// Handle manual SKU submit
const handleManualSubmit = () => {
  if (manualSKU.trim() === '') {
    toast.error('Please enter an SKU')
    return
  }
  
  setIsProcessing(true)
  
  // Simulate scan processing
  setTimeout(() => {
    setIsProcessing(false)
    onScanComplete(manualSKU.trim())
    setManualSKU('')
    setScanMethod(null)
  }, 1000)
}

// Handle camera scan
const handleCameraScan = (detectedSKU: string) => {
  setIsProcessing(true)
  
  setTimeout(() => {
    setIsProcessing(false)
    onScanComplete(detectedSKU)
    setScanMethod(null)
  }, 1000)
}
```

**Usage Guidelines:**
- Two scan methods: camera or manual entry
- Processing state prevents double-submission
- Clear input after successful scan
- Reset method selection on close
- Always provide feedback (loading, success, error)

---

### MyPass - Component State
```typescript
const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
const [showMapControls, setShowMapControls] = useState(false)
const [distance, setDistance] = useState([3]) // km
const [sortBy, setSortBy] = useState('Relevance')
const [favorites, setFavorites] = useState<Set<string>>(new Set())
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState<string>('All')
const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
const [partnersInventory, setPartnersInventory] = useState<Record<string, number>>({})

// Load inventory on mount
useEffect(() => {
  loadAllInventory()
}, [])

const loadAllInventory = async () => {
  const inventory: Record<string, number> = {}
  for (const partner of partners) {
    const stock = await getBusinessInventory(partner.id)
    inventory[partner.id] = stock
  }
  setPartnersInventory(inventory)
}

// Filter partners
const filteredPartners = partners.filter((partner) => {
  // Search filter
  if (searchQuery && !partner.name.toLowerCase().includes(searchQuery.toLowerCase())) {
    return false
  }
  
  // Category filter
  if (selectedCategory !== 'All' && partner.category !== selectedCategory) {
    return false
  }
  
  // Distance filter
  const partnerDistance = parseFloat(partner.distance)
  if (partnerDistance > distance[0]) {
    return false
  }
  
  return true
})

// Sort partners
const sortedPartners = [...filteredPartners].sort((a, b) => {
  switch (sortBy) {
    case 'Distance':
      return parseFloat(a.distance) - parseFloat(b.distance)
    case 'Credits':
      return a.credits - b.credits
    case 'Rating':
      return b.rating - a.rating
    default:
      return 0 // Relevance - no sorting
  }
})
```

**Usage Guidelines:**
- Multiple filters can be active simultaneously
- Inventory loads once on mount, updates after reservations
- Favorites persist in localStorage
- Search is case-insensitive partial match
- Filters apply before sorting
- Empty states for no results

---

### ReservationModal - Component State
```typescript
const [swipeProgress, setSwipeProgress] = useState(0)
const [isArrivalConfirmed, setIsArrivalConfirmed] = useState(false)
const [bookingId, setBookingId] = useState('')
const [isPurchased, setIsPurchased] = useState(false)
const [isProcessing, setIsProcessing] = useState(false)

// Handle swipe to confirm arrival
const handleSwipe = (progress: number) => {
  setSwipeProgress(progress)
  
  if (progress >= 90) {
    setIsArrivalConfirmed(true)
    setSwipeProgress(100)
  }
}

// Handle purchase
const handlePurchase = async () => {
  if (!partner) return
  
  // Check credits
  if (userCredits < partner.credits) {
    toast.error('Insufficient credits')
    return
  }
  
  // Check profile
  if (!userProfile?.kycVerified) {
    toast.error('Please complete your profile first')
    return
  }
  
  setIsProcessing(true)
  
  try {
    // Create reservation
    const reservation = await createReservation({
      userId: 'user-id',
      businessId: partner.id,
      businessName: partner.name,
      service: partner.category,
      credits: partner.credits
    })
    
    setBookingId(reservation.confirmationCode)
    onPurchase(partner.id, partner.credits)
    setIsPurchased(true)
    
    toast.success(`Reservation confirmed! Code: ${reservation.confirmationCode}`)
  } catch (error) {
    toast.error('Failed to create reservation')
  } finally {
    setIsProcessing(false)
  }
}

// Reset on close
const handleClose = () => {
  setSwipeProgress(0)
  setIsArrivalConfirmed(false)
  setBookingId('')
  setIsPurchased(false)
  onClose()
}
```

**Usage Guidelines:**
- Swipe must reach 90% to confirm
- Purchase disabled until arrival confirmed
- Check credits and profile before API call
- Show loading state during processing
- Display confirmation code immediately
- Reset all state on close

---

## 📝 Content & Copy Guidelines

### Tone of Voice
- **Friendly**: "Hey there! Ready to play bingo and save the planet?"
- **Encouraging**: "Great job! You've earned 50 credits!"
- **Clear**: "Scan the product's barcode to mark it as collected"
- **Indian Context**: Use familiar terms (lakh, crore, PIN code, Aadhaar)

### Button Labels
```typescript
// Primary Actions
"Sign In"
"Continue as Guest"
"Get Started"
"Scan Product"
"Purchase"
"Confirm"
"Save"
"Submit"

// Secondary Actions
"Cancel"
"Go Back"
"Skip"
"Maybe Later"
"Learn More"

// Destructive Actions
"Delete"
"Remove"
"Cancel Reservation"
```

### Empty States
```typescript
// No scanned products yet
"Start scanning products to earn credits and play bingo!"

// No transactions
"Your credit transactions will appear here once you start scanning products."

// No reservations
"You haven't made any reservations yet. Check out our partner businesses!"

// No search results
"No partners found matching your search."

// No inventory
"This service is currently unavailable. Check back soon!"
```

### Error Messages
```typescript
// Form validation
"Please enter a valid email address"
"Password must be at least 8 characters"
"Please fill in all required fields"
"Invalid Aadhaar number (must be 12 digits)"
"Invalid PAN format (ABCDE1234F)"

// API errors
"Failed to load products. Please try again."
"Unable to create reservation. Please check your connection."
"Session expired. Please sign in again."

// Business logic errors
"Insufficient credits to make this reservation"
"This product has already been scanned"
"SKU does not match. Please scan the correct product."
"Please complete your profile before making a reservation"
```

### Success Messages
```typescript
// Scanning
"Product scanned! +50 credits earned"
"Bingo! You've completed the card! Bonus: +100 credits"

// Reservations
"Reservation confirmed! Code: SPARROW-ABC123"
"Pickup scheduled for tomorrow at 10 AM"

// Profile
"Profile updated successfully"
"KYC verification complete"

// General
"Changes saved"
"Transaction complete"
```

### Instructional Text
```typescript
// Bingo Instructions
"Tap any product to scan it using your camera or enter the SKU manually"
"Collect all 9 products this week to complete your bingo card and earn bonus credits"
"The more you recycle, the more credits you earn!"

// Scanning
"Point your camera at the product barcode"
"Make sure the barcode is clearly visible"
"Can't scan? Enter the SKU manually below"

// Reservations
"Swipe right to confirm you're on your way"
"You'll receive a confirmation code to show at the partner business"
"Credits will be deducted only after confirmation"

// KYC
"We need to verify your identity to enable all features"
"Your information is secure and encrypted"
"This is a one-time process"
```

### Placeholder Text
```typescript
// Forms
"Enter your email"
"Choose a password"
"Enter 12-digit Aadhaar number"
"ABCDE1234F"
"Search for services..."
"Enter SKU (e.g., SKU12345)"

// Text areas
"Tell us about the business you'd like to see on Sparrow..."
"Additional notes (optional)"
```

### Confirmation Dialogs
```typescript
// Destructive actions
"Are you sure you want to cancel this reservation?"
"Delete transaction history? This cannot be undone."
"Sign out of your account?"

// Info confirmations
"Complete your profile to unlock this feature"
"Guest accounts have limited access. Sign in for full features?"
```

---

## 📊 Data Models & TypeScript Interfaces

### Core Types
```typescript
interface BingoProduct {
  id: string                    // Unique product ID
  sku: string                   // Product SKU (scannable)
  name: string                  // Product name
  category: string              // "Soft Drink" | "Dairy" | "Personal Care" | etc.
  brandLogo: string             // Brand logo URL
  image: string                 // Product image URL
  image3D: string               // 3D render URL
  plasticType: string           // "PETE #1" | "HDPE #2" | etc.
  description: string           // Product description
  recyclable: boolean           // Can be recycled?
  scanned: boolean              // Has user scanned it?
  credits: number               // Credits earned on scan
}

interface Transaction {
  id: string                    // Unique transaction ID
  date: string                  // "Dec 25, 2024"
  time: string                  // "10:30 AM"
  description: string           // "Scanned Coca-Cola Bottle"
  credits: number               // +50 or -100 (positive = earned, negative = spent)
}

interface PickupRecord {
  id: string                    // Unique pickup ID
  date: string                  // "Dec 25, 2024"
  scheduledTime: string         // "10:00 AM - 12:00 PM"
  completedTime?: string        // "11:30 AM" (if completed)
  status: 'scheduled' | 'completed' | 'cancelled'
  itemsCount: number            // Number of items collected
  items: string[]               // ["Coca-Cola Bottle", "Milk Carton"]
  address: string               // Pickup address
  credits: number               // Credits earned for this pickup
  pickupAgent?: string          // Agent name (if completed)
  pickupId: string              // Pickup confirmation ID
}

interface Reservation {
  id: string                    // Unique reservation ID
  partnerName: string           // "Lakme Salon"
  partnerLogo: string           // Partner logo emoji
  location: string              // "Bandra West"
  time: string                  // "Valid until 8 PM today"
  service: string               // "Hair & Beauty"
  confirmationCode: string      // "SPARROW-ABC123"
  createdAt: string            // ISO timestamp
  status: 'active' | 'redeemed' | 'cancelled'
  credits: number              // Credits spent
}

interface Partner {
  id: string                    // Unique partner ID
  name: string                  // "Lakme Salon"
  category: string              // "Beauty & Grooming"
  location: string              // "Shop 12, Bandra West"
  area: string                  // "Bandra"
  credits: number               // 0 (currently free)
  originalPrice: number         // ₹800
  servicesLeft: number          // 5 (inventory count)
  pickupTime: string            // "Pick up by 8 PM today"
  rating: number                // 4.8
  distance: string              // "1.2 km"
  image: string                 // Partner image URL
  logo: string                  // Emoji "💇"
  badge?: 'Popular' | 'Selling fast'  // Optional badge
}

interface UserProfile {
  name: string                  // User's full name
  email: string                 // Email address
  phone: string                 // 10-digit phone
  address: string               // Full address
  kycVerified: boolean          // Has completed eKYC?
  aadhaar?: string             // 12-digit Aadhaar (optional)
  pan?: string                 // PAN card (optional)
}

interface ScanEvent {
  id: string                    // Unique scan ID
  userId: string                // User who scanned
  productId: string             // Product scanned
  sku: string                   // SKU scanned
  timestamp: string             // ISO timestamp
  location?: {                  // Optional geolocation
    lat: number
    lng: number
  }
  method: 'camera' | 'manual'   // How was it scanned?
}

interface InventoryItem {
  businessId: string            // Partner business ID
  available: number             // Current inventory count
  lastUpdated: string          // ISO timestamp
}
```

---

## 🎬 Animations & Transitions

### Active States
```css
/* Button press - large elements */
active:scale-[0.98]
transition-all duration-150

/* Button press - medium elements */
active:scale-95
transition-all duration-150

/* Icon press - small elements */
active:scale-90
transition-all duration-150

/* Card press */
active:scale-[0.98]
transition-transform duration-200
```

### Transition Durations
```css
duration-150    /* Fast - button presses, icon taps */
duration-200    /* Standard - cards, modals, page transitions */
duration-300    /* Slow - large modals, sheet animations */
```

### Custom Animations
```css
/* Loading pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

/* Slide up (bottom sheets, modals) */
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Bounce (success checkmark) */
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Shimmer (loading skeleton) */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

**Usage Guidelines:**
- Use `transition-all` for general transitions
- Specific properties for performance: `transition-transform`, `transition-opacity`
- Keep durations under 300ms for responsiveness
- Use cubic-bezier for natural motion
- Apply animations to transform and opacity only (GPU-accelerated)

---

## 🖼️ Assets & Icons

### Logo
- **Primary Logo**: `figma:asset/074bfdceb3f0e9de0bf625a76c68d67a757c1173.png`
- **Size**: 80px × 80px (auth), 40px × 40px (header)
- **Shape**: `rounded-full` with `shadow-lg`
- **Usage**: Always circular, never distorted

### Icons (Lucide React)
```typescript
// Navigation Icons
import { Home, CreditCard, Gift, User } from 'lucide-react'

// Action Icons
import { 
  Search, Store, MapPin, Heart, X, 
  ChevronDown, ChevronRight, ChevronLeft,
  Check, CheckCircle, Plus, Minus, Trash2 
} from 'lucide-react'

// Info Icons
import { 
  Info, AlertCircle, Clock, Calendar, Star,
  Camera, Scan, BookOpen, HelpCircle
} from 'lucide-react'

// Category Icons
import { Gift, CreditCard, History, QrCode } from 'lucide-react'
```

**Icon Sizes:**
```tsx
// Navigation (bottom bar)
<Home className="h-5 w-5" />

// Headers/actions
<Search className="h-6 w-6" />

// Large CTAs
<Camera className="h-8 w-8" />

// Decorative
<Star className="h-4 w-4" />
```

### Partner Logos (Emoji)
```typescript
const categoryEmojis = {
  'Beauty & Grooming': '💇',
  'Entertainment': '🎬',
  'Healthcare': '⚕️',
  'Fitness & Wellness': '🧘',
  'Arts & Learning': '🎨',
  'Professional Services': '📸',
  'Automotive Services': '🚗',
  'Food & Beverage': '☕'
}
```

**Usage:**
```tsx
<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
  <span className="text-2xl">💇</span>
</div>
```

### Product Categories
```typescript
const categories = [
  'Soft Drink',
  'Dairy',
  'Personal Care',
  'Bottled Water',
  'Juice',
  'Snacks',
  'Household',
  'Beverages'
]
```

### Plastic Types
```typescript
const plasticTypes = [
  { code: '1', name: 'PETE', recyclable: true },
  { code: '2', name: 'HDPE', recyclable: true },
  { code: '3', name: 'PVC', recyclable: false },
  { code: '4', name: 'LDPE', recyclable: true },
  { code: '5', name: 'PP', recyclable: true },
  { code: '6', name: 'PS', recyclable: false },
  { code: '7', name: 'Other', recyclable: false }
]
```

---

## 🔌 Backend / API

### Supabase Endpoints
```
BASE: https://${projectId}.supabase.co/functions/v1/make-server-efcc1648
```

#### Product Endpoints
```typescript
// Get all products
GET /products
Response: BingoProduct[]

// Get single product by SKU
GET /products/:sku
Response: BingoProduct

// Seed initial products (admin)
POST /products/seed
Response: { message: string, count: number }
```

#### Scan Tracking
```typescript
// Record a scan event
POST /scans
Body: {
  userId: string
  productId: string
  sku: string
  method: 'camera' | 'manual'
  location?: { lat: number, lng: number }
}
Response: ScanEvent
```

#### Analytics (Future)
```typescript
// Brand overview
GET /analytics/:brandId/overview
Response: {
  totalScans: number
  uniqueUsers: number
  topProducts: Product[]
}

// Geographic data
GET /analytics/:brandId/geography
Response: {
  regions: Array<{
    state: string
    scans: number
  }>
}

// Product performance
GET /analytics/:brandId/products
Response: Array<{
  productId: string
  scans: number
  users: number
}>
```

#### Reservations
```typescript
// Create a reservation
POST /reservations
Body: {
  userId: string
  businessId: string
  businessName: string
  service: string
  credits: number
}
Response: {
  id: string
  confirmationCode: string  // "SPARROW-XXXXXX"
  createdAt: string
}

// Get user's reservations
GET /reservations/user/:userId
Response: Reservation[]

// Look up reservation by code
GET /reservations/code/:code
Response: Reservation

// Mark as redeemed
POST /reservations/:id/redeem
Body: { businessId: string }
Response: { success: boolean }

// Cancel reservation
POST /reservations/:id/cancel
Response: { success: boolean }
```

#### Inventory Management
```typescript
// Set inventory for a business
POST /inventory
Body: {
  businessId: string
  available: number
}
Response: { success: boolean }

// Get current inventory
GET /inventory/:businessId
Response: {
  businessId: string
  available: number
  lastUpdated: string
}
```

### Utility Functions (`/utils/inventory-manager.ts`)
```typescript
// Set business inventory
export async function setBusinessInventory(
  businessId: string, 
  count: number
): Promise<void>

// Get business inventory
export async function getBusinessInventory(
  businessId: string
): Promise<number>

// Create reservation
export async function createReservation(params: {
  userId: string
  businessId: string
  businessName: string
  service: string
  credits: number
}): Promise<{
  id: string
  confirmationCode: string
  createdAt: string
}>

// Get user reservations
export async function getUserReservations(
  userId: string
): Promise<Reservation[]>

// Verify confirmation code
export async function verifyReservationCode(
  code: string
): Promise<Reservation | null>

// Mark as redeemed
export async function markAsRedeemed(
  reservationId: string,
  businessId: string
): Promise<boolean>
```

**Usage Example:**
```typescript
// In MyPass component
const handleReservation = async () => {
  try {
    const reservation = await createReservation({
      userId: 'user-123',
      businessId: partner.id,
      businessName: partner.name,
      service: partner.category,
      credits: partner.credits
    })
    
    toast.success(`Confirmed! Code: ${reservation.confirmationCode}`)
  } catch (error) {
    toast.error('Failed to create reservation')
  }
}
```

---

## 🎯 Navigation Structure & User Flows

### Bottom Navigation (4 items)
1. **Bingo** (Home icon) - Main 3×3 game
2. **Credits** (CreditCard icon) - Credits & transactions
3. **Pass** (Gift icon) - Partner businesses
4. **Profile** (User icon) - User profile & settings

### Complete User Flows

#### Flow 1: New User Onboarding
```
1. App Launch
   ├─ AuthChoice screen
   │  ├─ Sparrow logo (80×80, centered)
   │  ├─ "Sign In" button (black)
   │  └─ "Continue as Guest" button (outline)
   │
2. User taps "Continue as Guest"
   ├─ setIsGuest(true)
   ├─ setUserName('Guest User')
   ├─ setAuthView('dashboard')
   │
3. Dashboard loads (Bingo page)
   ├─ Check localStorage for 'sparrow_bingo_instructions'
   ├─ If not found: Show BingoInstructions modal
   │  ├─ 3-slide walkthrough
   │  ├─ "How to play" + "Earn credits" + "Win prizes"
   │  └─ "Got it!" button
   ├─ Set flag in localStorage
   │
4. User sees Bingo grid (3×3)
   ├─ 9 product cells
   ├─ All unscanned (gray border)
   ├─ Header: Logo + 0 credits
   │
5. User taps a product cell
   ├─ setSelectedProduct(product)
   ├─ Open ScanModal
   │  ├─ Product name at top
   │  ├─ Two options: "Use Camera" | "Enter Manually"
   │
6. User selects "Enter Manually"
   ├─ Show input field
   ├─ User types SKU
   ├─ Taps "Confirm"
   │
7. If SKU matches:
   ├─ Close ScanModal
   ├─ Update bingoProducts (scanned: true)
   ├─ Add transaction (+50 credits)
   ├─ Update userCredits (+50)
   ├─ Open ProductDetailModal
   │  ├─ 3D product image
   │  ├─ "Recycling info" section
   │  ├─ "+50 credits earned" badge
   ├─ Show success toast
   │
8. User closes ProductDetailModal
   ├─ Back to Bingo grid
   ├─ Scanned cell now has green border + checkmark
   ├─ Header shows 50 credits
```

#### Flow 2: Making a Reservation
```
1. User taps "Pass" in bottom nav
   ├─ setActivePage('pass')
   ├─ MyPass component mounts
   │
2. MyPass loads inventory
   ├─ Call getBusinessInventory() for each partner
   ├─ Update partnersInventory state
   │
3. User sees partner listings
   ├─ 12 partner cards
   ├─ Each shows: logo, name, category, distance, rating
   ├─ Badge: "Popular" or "Selling fast"
   ├─ "5 services left" (inventory count)
   │
4. User taps "Search" icon
   ├─ Search bar appears
   ├─ User types "salon"
   ├─ Filtered list shows only salons
   │
5. User taps a partner card
   ├─ setSelectedPartner(partner)
   ├─ Open ReservationModal
   │  ├─ Partner image (full width)
   │  ├─ Partner details
   │  ├─ "Swipe to confirm you're arriving" slider
   │
6. User swipes right
   ├─ setSwipeProgress(0 → 100)
   ├─ When progress >= 90: setIsArrivalConfirmed(true)
   ├─ "Purchase" button becomes enabled
   │
7. User taps "Purchase"
   ├─ Check if userProfile.kycVerified
   │  ├─ If NO: Show toast "Complete your profile first"
   │  │  └─ Redirect to Profile page
   │  │
   │  ├─ If YES: Proceed
   │     ├─ Check if userCredits >= partner.credits
   │     │  ├─ If NO: Show toast "Insufficient credits"
   │     │  │
   │     │  ├─ If YES: Create reservation
   │     │     ├─ Call createReservation()
   │     │     ├─ API returns confirmationCode
   │     │     ├─ Deduct credits
   │     │     ├─ Add to activeReservations
   │     │     ├─ Show toast with code
   │     │     ├─ setIsPurchased(true)
   │     │     └─ Modal shows confirmation screen
   │
8. Confirmation screen shows:
   ├─ Green checkmark
   ├─ "Reservation Confirmed!"
   ├─ Confirmation code: "SPARROW-ABC123"
   ├─ Partner address
   ├─ "Valid until 8 PM today"
   │
9. User taps "Done"
   ├─ Close modal
   ├─ Credits updated in header
   ├─ Partner card now shows "4 services left"
```

#### Flow 3: Profile Completion (eKYC)
```
1. User taps "Profile" in bottom nav
   ├─ setActivePage('profile')
   ├─ UserProfile component mounts
   │
2. User sees profile screen
   ├─ Guest user: Limited info
   │  ├─ Name: "Guest User"
   │  ├─ Alert: "Sign in to unlock all features"
   │  ├─ "Complete Profile" button (disabled)
   │
   ├─ Signed-in user: Full access
   │  ├─ Profile details
   │  ├─ KYC status badge
   │  │  ├─ If verified: Green badge "Verified"
   │  │  └─ If not: Yellow badge "Complete KYC"
   │
3. User taps "Complete KYC"
   ├─ Open EKYCVerification component
   │  ├─ Form with fields:
   │  │  ├─ Full Name
   │  │  ├─ Email
   │  │  ├─ Phone (10 digits)
   │  │  ├─ Address
   │  │  ├─ Aadhaar (12 digits)
   │  │  └─ PAN (ABCDE1234F format)
   │
4. User fills form
   ├─ Real-time validation
   │  ├─ Aadhaar: Must be 12 digits
   │  ├─ PAN: Must match regex ^[A-Z]{5}[0-9]{4}[A-Z]$
   │  ├─ Phone: Must be 10 digits
   │  ├─ Email: Must be valid format
   │
5. User taps "Verify & Save"
   ├─ Validation passes
   ├─ Update userProfile state
   ├─ Set kycVerified: true
   ├─ Show success toast
   ├─ Badge changes to "Verified"
   ├─ Unlock reservation features
```

#### Flow 4: Viewing Credits & Transactions
```
1. User taps "Credits" in bottom nav
   ├─ setActivePage('credits')
   ├─ MyCredits component mounts
   │
2. User sees credits screen
   ├─ Header
   │  ├─ Total credits (large, saffron color)
   │  ├─ "Schedule Pickup" button
   │
   ├─ Recent transactions list
   │  ├─ Each transaction shows:
   │  │  ├─ Icon (based on type)
   │  │  ├─ Description
   │  │  ├─ Date & time
   │  │  └─ Credits (+/- value)
   │
3. User taps "Schedule Pickup"
   ├─ Open pickup scheduling flow
   │  ├─ Select date & time
   │  ├─ Confirm address
   │  ├─ List items to be picked up
   │  ├─ Submit
   │
4. Pickup scheduled
   ├─ Add to pickupHistory
   ├─ Status: 'scheduled'
   ├─ Show confirmation toast
   ├─ Return to credits screen
```

---

## 🗃️ File Structure

```
/
├── App.tsx                          # Main app entry point
├── package.json                     # Project dependencies & scripts
├── Guidelines.md                    # Design system guidelines
├── RESERVATION_SYSTEM_GUIDE.md      # Reservation backend docs
├── SPARROW_COMPLETE_INVENTORY.md    # This file - complete inventory
├── DEPLOYMENT_GUIDE.md              # Full deployment guide (3 environments)
├── DEPLOYMENT_QUICK_START.md        # Quick deployment reference
│
├── /components
│   ├── AuthChoice.tsx               # Auth selection screen
│   ├── SignInForm.tsx               # Sign in form
│   ├── SignUpForm.tsx               # Sign up form
│   ├── UserDashboardLayout.tsx      # Main dashboard layout
│   ├── BingoCard.tsx                # 3×3 bingo grid
│   ├── BingoInstructions.tsx        # Onboarding walkthrough
│   ├── ScanModal.tsx                # Product scanning modal
│   ├── ProductDetailModal.tsx       # Product detail view
│   ├── MyCredits.tsx                # Credits & transactions page
│   ├── MyPass.tsx                   # Partner businesses page
│   ├── UserProfile.tsx              # User profile page
│   ├── EKYCVerification.tsx         # KYC verification form
│   ├── ReservationModal.tsx         # Reservation flow
│   ├── ReservationCircles.tsx       # Active reservations display
│   ├── SuggestBusinessForm.tsx      # Partner suggestion form
│   ├── EnvironmentBadge.tsx         # Environment indicator (Staging/Pre-Prod)
│   │
│   ├── /ui                          # ShadCN components (46 files)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   └── ...
│   │
│   └── /figma
│       └── ImageWithFallback.tsx    # Image with error handling
│
├── /utils
│   ├── inventory-manager.ts         # Reservation & inventory utilities
│   ├── environment.ts                # Environment config (Staging/Pre-Prod/Prod)
│   └── /supabase
│       └── info.tsx                 # Supabase config
│
├── /supabase/functions/server
│   ├── index.tsx                    # Main Hono server
│   └── kv_store.tsx                 # KV database utilities (protected)
│
└── /styles
    └── globals.css                   # Global styles & design tokens
```

---

## 🎨 Component Props Reference

### App.tsx
```typescript
// No props - top-level component
// Manages global state and routing
```

### BingoCard
```typescript
interface BingoCardProps {
  products: BingoProduct[]                      // 9 products for the grid
  onProductScanned: (product: BingoProduct) => void  // Callback when product is scanned
}

// Usage
<BingoCard 
  products={bingoProducts}
  onProductScanned={handleProductScanned}
/>
```

### ScanModal
```typescript
interface ScanModalProps {
  isOpen: boolean                    // Modal visibility
  onClose: () => void                // Close callback
  onScanComplete: (sku: string) => void  // Called with scanned SKU
  productName: string                // Product being scanned
}

// Usage
<ScanModal
  isOpen={isScanModalOpen}
  onClose={() => setIsScanModalOpen(false)}
  onScanComplete={handleScanComplete}
  productName={selectedProduct?.name || ''}
/>
```

### ProductDetailModal
```typescript
interface ProductDetailModalProps {
  isOpen: boolean                    // Modal visibility
  onClose: () => void                // Close callback
  product: BingoProduct | null       // Product to display
}

// Usage
<ProductDetailModal
  isOpen={isDetailModalOpen}
  onClose={() => setIsDetailModalOpen(false)}
  product={selectedProduct}
/>
```

### MyCredits
```typescript
interface MyCreditsProps {
  totalCredits: number               // User's total credits
  transactions: Transaction[]        // Transaction history
  onSchedulePickup?: () => void      // Optional pickup callback
}

// Usage
<MyCredits
  totalCredits={userCredits}
  transactions={transactions}
  onSchedulePickup={handleSchedulePickup}
/>
```

### MyPass
```typescript
interface MyPassProps {
  totalCredits: number               // For reservation validation
  transactions: Transaction[]        // To show in UI
  bingoProducts: BingoProduct[]      // To check scanned status
  userProfile?: UserProfile          // For KYC check
  onNavigateToProfile?: () => void   // Redirect to profile
}

// Usage
<MyPass
  totalCredits={userCredits}
  transactions={transactions}
  bingoProducts={bingoProducts}
  userProfile={userProfile}
  onNavigateToProfile={() => setActivePage('profile')}
/>
```

### ReservationModal
```typescript
interface ReservationModalProps {
  isOpen: boolean                    // Modal visibility
  onClose: () => void                // Close callback
  partner: Partner | null            // Partner business details
  onPurchase: (partnerId: string, credits: number) => void  // Purchase callback
  userCredits: number                // For validation
  hasPurchased?: boolean             // External purchase state
  userProfile?: UserProfile          // For KYC validation
  onNavigateToProfile?: () => void   // Redirect to profile
}

// Usage
<ReservationModal
  isOpen={isReservationModalOpen}
  onClose={() => setIsReservationModalOpen(false)}
  partner={selectedPartner}
  onPurchase={handlePurchase}
  userCredits={userCredits}
  userProfile={userProfile}
  onNavigateToProfile={() => setActivePage('profile')}
/>
```

### ReservationCircles
```typescript
interface ReservationCirclesProps {
  reservations: Reservation[]        // Active reservations
}

// Usage
<ReservationCircles reservations={activeReservations} />
```

### UserProfile
```typescript
interface UserProfileProps {
  profile: UserProfile               // User profile data
  onUpdate: (profile: UserProfile) => void  // Update callback
  isGuest: boolean                   // Guest mode flag
}

// Usage
<UserProfile
  profile={userProfile}
  onUpdate={handleProfileUpdate}
  isGuest={isGuest}
/>
```

### EKYCVerification
```typescript
interface EKYCVerificationProps {
  onVerificationComplete: (profile: UserProfile) => void  // Success callback
  initialData?: Partial<UserProfile>  // Pre-fill data
}

// Usage
<EKYCVerification
  onVerificationComplete={handleKYCComplete}
  initialData={{ name: userName, email: userEmail }}
/>
```

---

## ✅ Feature Flags / Toggles

```typescript
// Current feature states
const FEATURES = {
  guestAccess: true,           // Allow guest login
  eKYCRequired: true,          // Require profile completion for reservations
  walkthrough: true,           // Show bingo instructions on first visit
  reservationsEnabled: true,   // Enable Pass page reservations
  creditsRequired: false,      // Pass services are FREE (credits = 0)
  scanningEnabled: true,       // Product scanning active
  cameraScanning: false,       // Camera scanning (not implemented yet)
  manualSKU: true,            // Manual SKU entry enabled
  pickupScheduling: false,     // Schedule pickup feature (future)
  socialSharing: false,        // Share achievements (future)
  pushNotifications: false,    // Push notifications (future)
  analytics: true,             // Track scan events
}
```

**Usage:**
```typescript
// Conditionally render features
{FEATURES.pickupScheduling && (
  <Button onClick={handleSchedulePickup}>
    Schedule Pickup
  </Button>
)}

// Disable features in guest mode
const canReserve = !isGuest && FEATURES.reservationsEnabled
```

---

## 🧪 Testing Checklist

### Device Testing
- [ ] iPhone SE (375px width)
- [ ] iPhone 14 Pro (393px width)
- [ ] iPhone 14 Pro Max (428px width)
- [ ] iPad Mini (768px width)
- [ ] Android devices (various)

### Safe Area Testing
- [ ] Top safe area on notched devices
- [ ] Bottom safe area on gesture devices
- [ ] Landscape orientation (if supported)
- [ ] Split screen mode

### Feature Testing

#### Authentication
- [ ] Sign in with email/password
- [ ] Sign up new account
- [ ] Guest access
- [ ] Session persistence
- [ ] Sign out

#### Bingo Game
- [ ] First-time walkthrough shows
- [ ] Walkthrough doesn't repeat
- [ ] Tap unscanned product opens ScanModal
- [ ] Tap scanned product opens ProductDetailModal
- [ ] Manual SKU entry works
- [ ] Invalid SKU shows error
- [ ] Credits update after scan
- [ ] Transaction is recorded
- [ ] Grid visual states (scanned vs unscanned)

#### Credits Page
- [ ] Total credits display correctly
- [ ] Transactions list shows all history
- [ ] Transactions sorted by date (newest first)
- [ ] Empty state when no transactions

#### Pass Page
- [ ] Partner listings load
- [ ] Inventory counts display
- [ ] Search filters work
- [ ] Category filter works
- [ ] Distance filter works
- [ ] Sort options work
- [ ] Favorites toggle
- [ ] Map view toggle (future)
- [ ] Reservation flow works
- [ ] Credits deducted correctly
- [ ] Confirmation code generated
- [ ] Empty state when no partners match

#### Reservations
- [ ] Swipe to confirm arrival
- [ ] Purchase disabled until swipe complete
- [ ] KYC check before purchase
- [ ] Credits validation
- [ ] Confirmation code displayed
- [ ] Reservation added to active list
- [ ] Inventory decremented

#### Profile
- [ ] Guest mode shows limited access
- [ ] eKYC form validation
- [ ] Aadhaar format validation
- [ ] PAN format validation
- [ ] Phone number validation
- [ ] Profile updates save
- [ ] KYC badge updates

### UI/UX Testing
- [ ] All touch targets ≥ 48px × 48px
- [ ] Active states provide feedback
- [ ] Loading states show during async operations
- [ ] Error messages are clear and helpful
- [ ] Success messages confirm actions
- [ ] No horizontal scroll on any screen
- [ ] Smooth transitions (no jank)
- [ ] Text is readable (contrast, size)
- [ ] Icons are recognizable
- [ ] Modals are dismissible

### Accessibility
- [ ] Screen reader support
- [ ] Keyboard navigation (desktop)
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Semantic HTML used
- [ ] Color contrast meets WCAG AA
- [ ] Form labels associated with inputs

### Performance
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] No layout shift
- [ ] Images lazy load
- [ ] Smooth 60fps animations

---

## 📝 Code Quality & Conventions

### Naming Conventions
```typescript
// Components: PascalCase
MyComponent.tsx
BingoCard.tsx
UserProfile.tsx

// Utilities: camelCase
inventoryManager.ts
formatDate.ts
validateSKU.ts

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = '...'
const MAX_BINGO_PRODUCTS = 9
const DEFAULT_CREDITS = 0

// State: camelCase with descriptive names
const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedProduct, setSelectedProduct] = useState<BingoProduct | null>(null)

// Event handlers: handle + Action
const handleSubmit = () => {}
const handleProductTap = () => {}
const handleClose = () => {}

// Booleans: is/has/should prefix
const isGuest = false
const hasCompletedKYC = true
const shouldShowInstructions = false
```

### File Organization
```
/components
  ├─ Main components (AuthChoice, BingoCard, etc.)
  ├─ /ui (ShadCN primitives only)
  └─ /figma (Figma-specific utilities)

/utils
  ├─ Shared utilities (API calls, formatting, validation)
  └─ /supabase (Supabase-specific)

/styles
  └─ globals.css (global styles, tokens, animations)

/supabase/functions/server
  ├─ index.tsx (server routes)
  └─ kv_store.tsx (database utilities - PROTECTED)
```

### TypeScript Best Practices
```typescript
// Always use interfaces for props
interface MyComponentProps {
  title: string
  count: number
  onAction: () => void
}

// Export types when shared
export interface BingoProduct {
  // ...
}

// Use explicit return types
function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0)
}

// Avoid 'any' - use 'unknown' or specific types
// ❌ Bad
const data: any = await fetchData()

// ✅ Good
const data: BingoProduct[] = await fetchData()

// Use optional chaining
const credits = user?.profile?.credits ?? 0

// Use type guards
if (typeof value === 'string') {
  // TypeScript knows value is string
}
```

### React Best Practices
```typescript
// Use functional components
export function MyComponent({ title, count }: MyComponentProps) {
  // ...
}

// Destructure props
export function BingoCard({ products, onProductScanned }: BingoCardProps) {
  // ...
}

// Use custom hooks for reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue] as const
}

// Memoize expensive calculations
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => a.name.localeCompare(b.name))
}, [products])

// Use useCallback for event handlers passed to children
const handleSubmit = useCallback(() => {
  // Submit logic
}, [dependencies])
```

---

## 🌍 Localization (Future)

### Supported Languages (Planned)
- **English (en)** - Primary
- **Hindi (hi)** - Planned
- **Marathi (mr)** - Planned
- **Tamil (ta)** - Planned

### Number Formatting
```typescript
// Indian numbering system
const formatIndianNumber = (num: number): string => {
  return num.toLocaleString('en-IN')
}

// Examples:
1,00,000     // 1 lakh
10,00,000    // 10 lakh
1,00,00,000  // 1 crore
```

### Currency
```typescript
// Indian Rupee
const formatCurrency = (amount: number): string => {
  return `₹${formatIndianNumber(amount)}`
}

// Examples:
₹500
₹1,200
₹10,00,000
```

### Date/Time Formatting
```typescript
// Indian date format: DD/MM/YYYY
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN').format(date)
}

// Examples:
25/12/2024
01/01/2025

// Time format: 12-hour with AM/PM
const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date)
}

// Examples:
10:30 AM
3:45 PM
```

---

## 📊 Performance Targets & Optimization

### Metrics
```
First Contentful Paint (FCP):  < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI):      < 3.8s
Cumulative Layout Shift (CLS):  < 0.1
First Input Delay (FID):        < 100ms

JavaScript Bundle Size:         < 200KB gzipped
CSS Bundle Size:                < 50KB gzipped
Image Total Size:               < 500KB (lazy loaded)
```

### Optimization Strategies

#### Images
```tsx
// Use ImageWithFallback for all dynamic images
<ImageWithFallback 
  src={product.image}
  alt={product.name}
  className="w-full h-full object-cover"
  loading="lazy"  // Native lazy loading
/>

// Provide dimensions to prevent layout shift
<img 
  src={logo}
  width={40}
  height={40}
  alt="Sparrow"
/>
```

#### Code Splitting (Future)
```typescript
// Lazy load heavy components
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'))

// Use with Suspense
<Suspense fallback={<Skeleton />}>
  <ProductDetailModal product={selectedProduct} />
</Suspense>
```

#### Animations
```css
/* Only animate transform and opacity (GPU-accelerated) */
.button {
  transition: transform 150ms, opacity 150ms;
}

.button:active {
  transform: scale(0.98);
}

/* Avoid animating: width, height, margin, padding, top, left */
```

#### State Management
```typescript
// Avoid unnecessary re-renders with useMemo
const filteredPartners = useMemo(() => {
  return partners.filter(/* ... */)
}, [partners, searchQuery, selectedCategory])

// Batch state updates
const handlePurchase = () => {
  // ❌ Bad: Multiple re-renders
  setIsProcessing(true)
  setUserCredits(credits - cost)
  setActiveReservations([...reservations, newReservation])
  
  // ✅ Good: Single re-render
  setAppState(prev => ({
    ...prev,
    isProcessing: true,
    userCredits: prev.userCredits - cost,
    activeReservations: [...prev.activeReservations, newReservation]
  }))
}
```

---

## 🔐 Security Best Practices

### Environment Variables
```bash
# NEVER commit these to git
SUPABASE_SERVICE_ROLE_KEY=xxx  # Server-side only
SUPABASE_ANON_KEY=xxx          # Client-side safe
```

### API Security
```typescript
// Always validate user input
const validateSKU = (sku: string): boolean => {
  return /^SKU[A-Z0-9]{5,10}$/.test(sku)
}

// Sanitize user input before display
const sanitizeText = (text: string): string => {
  return text.trim().replace(/[<>]/g, '')
}

// Use environment variables for API keys
const apiKey = import.meta.env.VITE_API_KEY

// Never expose service role key in frontend
// ❌ Bad
const supabase = createClient(url, serviceRoleKey)

// ✅ Good
const supabase = createClient(url, anonKey)
```

### Data Privacy
```typescript
// Don't log sensitive data
console.log('User:', user.email)  // ❌ Bad
console.log('User:', user.id)     // ✅ Good

// Mask sensitive info in UI
const maskAadhaar = (aadhaar: string): string => {
  return `XXXX XXXX ${aadhaar.slice(-4)}`
}

// Encrypt sensitive data at rest (Supabase handles this)
```

---

## 📞 Error Handling Patterns

### API Errors
```typescript
const handleAPICall = async () => {
  try {
    const data = await fetchData()
    return data
  } catch (error) {
    if (error instanceof TypeError) {
      toast.error('Network error. Please check your connection.')
    } else if (error.status === 401) {
      toast.error('Session expired. Please sign in again.')
      setAuthView('auth')
    } else if (error.status === 404) {
      toast.error('Resource not found.')
    } else {
      toast.error('Something went wrong. Please try again.')
      console.error('API Error:', error)
    }
  }
}
```

### Form Validation
```typescript
const validateForm = (data: FormData): string[] => {
  const errors: string[] = []
  
  if (!data.email) {
    errors.push('Email is required')
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Email is invalid')
  }
  
  if (!data.password) {
    errors.push('Password is required')
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  
  return errors
}
```

### User Feedback
```typescript
// Success
toast.success('Product scanned! +50 credits earned')

// Error
toast.error('Failed to scan product. Please try again.')

// Warning
toast.warning('Please complete your profile to continue')

// Info
toast.info('New products available this week!')
```

---

**Last Updated**: January 2025  
**Maintained By**: Sparrow Team  
**Status**: Production Ready MVP 🚀  
**Version**: 1.0.0
