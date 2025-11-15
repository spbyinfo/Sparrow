# Mobile Layout Specifications - Sparrow App

**Visual reference for engineers implementing mobile layouts**

---

## 📱 Device Dimensions

### Target Viewports
```
┌─────────────────────────────────────┐
│ iPhone SE                           │
│ 375px × 667px                       │
│ Minimum supported width             │
└─────────────────────────────────────┘

┌──────────────────────────────────────┐
│ iPhone 12/13/14                      │
│ 390px × 844px                        │
│ Most common                          │
└──────────────────────────────────────┘

┌───────────────────────────────────────┐
│ iPhone 14 Pro Max                     │
│ 428px × 926px                         │
│ Maximum tested width                  │
└───────────────────────────────────────┘
```

---

## 🎯 Safe Zone Layout

### iPhone with Notch (e.g., iPhone 14 Pro)

```
┌─────────────────────────────────────────┐ ← Status Bar (47px on notched phones)
│   ╔═══╗    SAFE ZONE TOP    ╔══╗       │   env(safe-area-inset-top)
│   ║███║                      ║●●║       │
├───╚═══╝──────────────────────╚══╝───────┤
│ ┌───────────────────────────────────┐   │
│ │ HEADER (60px)                     │   │
│ │ Logo              Avatar          │   │
│ └───────────────────────────────────┘   │
├───────────────────────────────────────┬─┤
│                                       │▲│
│   SCROLLABLE CONTENT AREA             │║│
│   • pt-[60px] (header clearance)     │║│
│   • pb-[80px] (nav clearance)        │▓│
│   • px-4 (16px side margins)         │▓│
│                                       │▓│
│                                       │▼│
├───────────────────────────────────────┴─┤
│ ┌───────────────────────────────────┐   │
│ │ BOTTOM NAV (64px)                 │   │
│ │ [🎯] [📷] [💰] [📜] [👤]         │   │
│ └───────────────────────────────────┘   │
├─────────────────────────────────────────┤
│   SAFE ZONE BOTTOM (34px on new iPhones)│   env(safe-area-inset-bottom)
│          Home Indicator                 │
└─────────────────────────────────────────┘
```

---

## 📏 Header Specifications

### Mobile Header Breakdown

```
┌─────────────────────────────────────────────┐
│  HEADER (h: 60px + safe-area-inset-top)     │
│                                             │
│  [LOGO] Sparrow              [Avatar]       │
│   36×36                         32×32       │
│                                             │
│  ← 16px  →                   ← 16px  →      │
│  padding                     padding        │
└─────────────────────────────────────────────┘
     ↑                                    ↑
  Logo Area                        User Area
  - Icon: 36px circle                - Avatar: 32px
  - Brand name                       - Tap → Profile
  - Primary color
```

### CSS Implementation:
```css
header {
  height: 60px;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
}
```

---

## 🧭 Bottom Navigation Specifications

### 5-Item Grid Layout

```
┌─────────────────────────────────────────────────────────┐
│  BOTTOM NAV (h: 64px + safe-area-inset-bottom)          │
│                                                         │
│  ┌──────┬──────┬──────┬──────┬──────┐                  │
│  │ [🎯] │ [📷] │ [💰] │ [📜] │ [👤] │   Icons: 20×20   │
│  │      │      │      │      │      │                  │
│  │Bingo │ Scan │Credits│History│Profile│ Text: 10px   │
│  └──────┴──────┴──────┴──────┴──────┘                  │
│     ↑      ↑      ↑      ↑      ↑                       │
│   Equal width columns (grid-cols-5)                     │
│   Each column: 100% height for touch target            │
└─────────────────────────────────────────────────────────┘
```

### Touch Target Math (375px width):
```
Screen width: 375px
Columns: 5
Width per item: 375px ÷ 5 = 75px
Height per item: 64px

Touch area: 75px × 64px = 4,800px²
✅ Exceeds minimum 48×48 = 2,304px²
```

### State Visual:

**Inactive:**
```
  [Icon: stroke-2]
  text-muted-foreground (#6b7280)
```

**Active:**
```
  [Icon: stroke-[2.5]]  ← Thicker stroke
  text-primary (#059669)
```

---

## 🎲 Bingo Card Layout

### Card Container

```
┌───────────────────────────────────────────┐
│  BINGO CARD (max-width: 600px, centered)  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Weekly Challenge      [BINGO! 🏆]   │  │
│  │ Oct 20 - Oct 26                     │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────┐  ┌─────┐  ┌─────┐               │
│  │ 3/9 │  │ 25  │  │  2  │  Stats Cards  │
│  │ ━━  │  │ 💎  │  │lines│  (grid-cols-3)│
│  └─────┘  └─────┘  └─────┘               │
│                                           │
│  ┌───────────────────────────────────┐    │
│  │  BINGO GRID (3×3)                 │    │
│  │                                   │    │
│  │  ┌───┐ ┌───┐ ┌───┐               │    │
│  │  │ ✓ │ │   │ │   │  Row 1        │    │
│  │  └───┘ └───┘ └───┘               │    │
│  │  ┌───┐ ┌───┐ ┌───┐               │    │
│  │  │   │ │   │ │   │  Row 2        │    │
│  │  └───┘ └───┘ └───┘               │    │
│  │  ┌───┐ ┌───┐ ┌───┐               │    │
│  │  │ ✓ │ │   │ │   │  Row 3        │    │
│  │  └───┘ └───┘ └───┘               │    │
│  │                                   │    │
│  │  Gap: 8px between cells          │    │
│  │  Aspect ratio: 1:1 (square)      │    │
│  └───────────────────────────────────┘    │
│                                           │
│  ┌───────────────────────────────────┐    │
│  │  [✨ Scan a Product Now]          │    │ CTA Button
│  └───────────────────────────────────┘    │ h: 48px
└───────────────────────────────────────────┘
```

### Bingo Cell Detail (Single Product)

```
┌─────────────────────────┐
│                         │
│   Product Image         │  Aspect: 1:1
│   (object-cover)        │
│                         │
├─────────────────────────┤  Gradient overlay
│ Coca-Cola 500ml         │  from-black/80
│ [10pts]                 │  Text: 10px
└─────────────────────────┘  Badge: 9px
    ↑
  Border:
  - Unscanned: border-border (gray)
  - Scanned: border-primary (green) + overlay
```

### Cell Sizing (for 375px screen):
```
Content width: 375px - (16px × 2) = 343px  (minus padding)
Grid gap: 8px × 2 = 16px
Available: 343px - 16px = 327px
Per cell: 327px ÷ 3 = 109px

Each cell: 109px × 109px (square)
```

---

## 📷 Scan Product Layout

### Camera Mode

```
┌───────────────────────────────────────┐
│  SCAN PRODUCT                         │
│  Scan the SKU barcode or enter it     │
│  manually                             │
├───────────────────────────────────────┤
│                                       │
│  ┌─────────────┬─────────────┐        │  Mode Toggle
│  │   [📷]      │   [⌨️]      │        │  grid-cols-2
│  │   Camera    │   Manual    │        │
│  └─────────────┴─────────────┘        │
│       ↑ Active                        │
│                                       │
│  ┌───────────────────────────────┐    │
│  │                               │    │
│  │   ┌─────────────────────┐     │    │
│  │   │     [📷]            │     │    │  Camera
│  │   │                     │     │    │  Viewfinder
│  │   │   Scanning...       │     │    │  aspect-square
│  │   │                     │     │    │  max-w: 400px
│  │   └─────────────────────┘     │    │
│  │      ↑ Dashed border          │    │
│  │        (primary color)        │    │
│  │                               │    │
│  │  ┌───────────────────────┐    │    │
│  │  │  Start Camera Scan    │    │    │  Button
│  │  └───────────────────────┘    │    │  h: 48px
│  └───────────────────────────────┘    │
└───────────────────────────────────────┘
```

### Success State

```
┌───────────────────────────────────────┐
│         [✓] Product Recognized!       │
│     This product is on your card      │
├───────────────────────────────────────┤
│  ┌───────────────────────────────┐    │
│  │  ┌──────┐                     │    │
│  │  │ IMG  │  Coca-Cola 500ml    │    │  Product Card
│  │  │ 96px │  Coca-Cola          │    │  flex layout
│  │  └──────┘  [SKU001] [10 💎]   │    │
│  └───────────────────────────────┘    │
│                                       │
│  ┌───────────────────────────────┐    │
│  │ Schedule Pickup & Earn Credits│    │  Primary CTA
│  └───────────────────────────────┘    │  h: 48px
│  ┌───────────────────────────────┐    │
│  │ Scan Another Product          │    │  Secondary
│  └───────────────────────────────┘    │  h: 48px
└───────────────────────────────────────┘
```

---

## 💳 Stats Card Pattern

### Used in Bingo, Credits, Profile pages

```
┌─────────────────┐
│  Progress       │ ← Label (12px, muted)
│                 │
│     3/9         │ ← Value (18px, semibold, primary)
│    ━━━━         │ ← Progress bar (4px)
│                 │
│  of 9 total     │ ← Sub-text (12px, muted)
└─────────────────┘
  ↑
Border: 1px, primary/20
Padding: 12px
Border radius: 10px
```

### 3-Column Grid

```
┌─────────┬─────────┬─────────┐
│  Card   │  Card   │  Card   │
│   #1    │   #2    │   #3    │
└─────────┴─────────┴─────────┘
       gap-2 (8px)
```

---

## 🎨 Touch State Visual Feedback

### Button Press Animation

**Normal State:**
```
┌─────────────────────────┐
│    Action Button        │
│    scale: 1.0           │
└─────────────────────────┘
```

**Active State (finger down):**
```
┌────────────────────────┐
│   Action Button        │
│   scale: 0.98          │  ← Slightly smaller
└────────────────────────┘    transition: 150ms
```

### Navigation Item Active

**Inactive:**
```
  [Icon]      stroke: 2
  Label       color: muted-foreground
              opacity: 0.7
```

**Active:**
```
  [Icon]      stroke: 2.5 (thicker)
  Label       color: primary
              font-weight: medium
```

---

## 📐 Spacing System Cheatsheet

### Container Padding (Horizontal)
```
┌─────────────────────────────────────────┐
│ ← 16px                           16px → │
│        Scrollable Content               │
│                                         │
│        max-width: 600px                 │
│        margin: 0 auto                   │
└─────────────────────────────────────────┘
```

### Vertical Spacing
```
Component Stack:
┌─────────────────┐
│  Component 1    │
└─────────────────┘
       ↕ gap-4 (16px)
┌─────────────────┐
│  Component 2    │
└─────────────────┘
       ↕ gap-4 (16px)
┌─────────────────┐
│  Component 3    │
└─────────────────┘
```

### Card Internal Padding
```
┌─────────────────────────────────────┐
│  ↕ 16px                             │
│                                     │
│  ← 16px →  Content  ← 16px →        │
│                                     │
│  ↕ 16px                             │
└─────────────────────────────────────┘
```

---

## ⚡ Quick Reference Table

| Element | Width | Height | Padding | Border Radius |
|---------|-------|--------|---------|---------------|
| Header | 100% | 60px | 12px 16px | 0 |
| Bottom Nav | 100% | 64px | 0 | 0 |
| Primary Button | 100% | 48px | - | 10px |
| Input Field | 100% | 48px | 12px 16px | 10px |
| Avatar (Header) | 32px | 32px | - | 9999px |
| Logo Icon | 36px | 36px | - | 10px |
| Nav Icon | 20px | 20px | - | - |
| Bingo Cell | 1:1 | 1:1 | - | 10px |
| Product Image | varies | varies | - | 10px |
| Badge | auto | 20px | 6px 12px | 6px |
| Stats Card | auto | auto | 12px | 10px |

---

## 🎯 Z-Index Layers

```
Layer 5: Modals, Dialogs         z-50
Layer 4: Fixed Header            z-50
Layer 3: Fixed Bottom Nav        z-50
Layer 2: Dropdown Menus          z-40
Layer 1: Cards, Content          z-0 (default)
```

---

## 📱 One-Handed Usage Zone

### Thumb Reach Map (Right-handed, iPhone size)

```
┌─────────────────────────────────┐
│                                 │ ← Hard to reach
│  ⚠️ Avoid critical actions     │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ✅ Natural reach       │   │ ← Easy reach
│  │                         │   │
│  │  ┌─────────────────┐    │   │
│  │  │  👍 Sweet spot  │    │   │ ← Optimal
│  │  │                 │    │   │
│  │  └─────────────────┘    │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│ [Nav] [Nav] [Nav] [Nav] [Nav]  │ ← Perfect for thumb
└─────────────────────────────────┘
```

**Design Implications:**
- Critical actions (Scan, Bingo) in bottom nav ✅
- Secondary actions (Profile) can be top-right ✅
- Avoid important buttons in top-left ⚠️

---

## ✅ Layout Validation Checklist

```
[ ] Header is fixed at top with safe-area-top
[ ] Bottom nav is fixed at bottom with safe-area-bottom
[ ] Content has pt-[60px] clearance for header
[ ] Content has pb-[80px] clearance for bottom nav
[ ] All horizontal content has px-4 padding
[ ] No content width exceeds viewport (no horizontal scroll)
[ ] All touch targets are ≥48px
[ ] Bingo grid maintains 1:1 aspect ratio
[ ] Images use aspect-ratio to prevent layout shift
[ ] Buttons have active:scale-[0.98] feedback
[ ] Navigation items change color when active
[ ] Text is readable (16px minimum for body)
[ ] Cards use consistent border-radius (10px)
[ ] Spacing follows 4px system (gap-2, gap-4, etc.)
```

---

**For implementation details, see:**
- `/DESIGN_SYSTEM.md` - Design tokens and component specs
- `/MOBILE_IMPLEMENTATION_GUIDE.md` - Code examples and best practices
- `/styles/globals.css` - CSS implementation

**Questions?** Measure twice, code once! 📐
