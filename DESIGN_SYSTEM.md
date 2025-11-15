# Sparrow Mobile App - Design System Documentation

**Version:** 2.0  
**Last Updated:** November 2, 2025  
**Target Platform:** Mobile Web (iOS & Android)

---

## 🐦 Brand Identity

### Sparrow Logo
The official Sparrow logo features a watercolor-style sparrow perched on a branch with leaves, inside a green circular frame. The logo communicates warmth, friendliness, and environmental consciousness.

**Primary Logo Variant:** Red background (#074bfdceb3f0e9de0bf625a76c68d67a757c1173)  
**Display Size:** 80px × 80px circular (h-20 w-20)  
**Container:** `rounded-full` with `shadow-lg`  
**Usage:** Authentication screens, app headers, profile sections

---

## 📱 Mobile-First Philosophy

Sparrow is a **mobile-only** waste collection gamification app inspired by Indian cultural colors with Gaudí x Wes Anderson whimsy. All designs are optimized for handheld devices with one-handed usage in mind. Desktop views are not prioritized.

---

## 🎨 Design Tokens

### Color Palette - Indian Cultural Colors

#### Primary Colors
```css
--primary: #ff9933           /* Saffron - Sacred, spiritual, main brand color */
--primary-foreground: #ffffff /* White text on primary */
--secondary: #059669         /* Nature Green - Growth, new beginnings */
--secondary-foreground: #ffffff /* White text on secondary */
```

#### Accent & Specialty Colors
```css
--accent: #ffd700            /* Imperial Gold - Wealth, divinity, prosperity */
--accent-foreground: #2d2a26 /* Dark text on gold */
--destructive: #dc143c       /* Royal Red - Power, courage, auspiciousness */
--destructive-foreground: #ffffff /* White text on red */
--divine-blue: #4169e1       /* Divine energy and strength (utility) */
```

#### Background & Surface
```css
--background: #faf3e0        /* Cream - Warm neutral background */
--card: #ffffff              /* White card surfaces */
--muted: #f5f0e8            /* Light warm tint */
--border: rgba(255, 153, 51, 0.2) /* Saffron-tinted borders */
```

#### Text Colors
```css
--foreground: #2d2a26        /* Primary text - Warm dark brown */
--muted-foreground: #6b6661  /* Secondary text - Warm gray */
```

#### Chart Colors (for Credits/Analytics)
```css
--chart-1: #059669  /* Nature Green */
--chart-2: #4169e1  /* Divine Blue */
--chart-3: #ffd700  /* Imperial Gold */
--chart-4: #dc143c  /* Royal Red */
--chart-5: #ff9933  /* Saffron */
```

### Typography

#### Base Size
```css
--font-size: 16px   /* Root font size - optimized for mobile readability */
```

#### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
```

#### Type Scale
- **h1:** 2xl (24px) - Page titles
- **h2:** xl (20px) - Section headers
- **h3:** lg (18px) - Card titles
- **h4/p/button/input:** base (16px) - Body text
- **Small text:** sm (14px) - Captions, helper text
- **Tiny text:** xs (12px) - Labels, badges

### Spacing Scale

Uses Tailwind's default 4px scale:
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px

**Mobile Padding Standards:**
- Screen edges: `px-4` (16px)
- Card padding: `p-4` (16px) or `p-6` (24px)
- Component gaps: `gap-2` (8px) to `gap-4` (16px)

### Border Radius - Gaudí-Inspired Organic Curves
```css
--radius: 1.5rem (24px)       /* Base radius - flowing curves */
--radius-sm: calc(var(--radius) - 4px)  /* 20px */
--radius-md: calc(var(--radius) - 2px)  /* 22px */
--radius-lg: var(--radius)    /* 24px */
--radius-xl: calc(var(--radius) + 4px)  /* 28px */
--radius-organic: 2rem 1rem 2rem 1rem /* Asymmetric organic shape */
```

---

## 📐 Layout Specifications

### Mobile Viewport Assumptions
- **Target Width:** 375px - 428px (iPhone SE to iPhone Pro Max)
- **Minimum Touch Target:** 44x44px (Apple HIG) / 48x48px (Material Design)
- **Safe Zone Padding:** Automatic via CSS env() variables

### Safe Zones

#### CSS Implementation
```css
/* Applied to fixed elements (header, bottom nav) */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-left {
  padding-left: env(safe-area-inset-left);
}

.safe-area-right {
  padding-right: env(safe-area-inset-right);
}
```

#### Device Safezone Values
- **iPhone with notch:** Top ~47px, Bottom ~34px
- **iPhone without notch:** Top ~20px (status bar), Bottom 0px
- **Android:** Varies by device

### App Shell Layout

```
┌─────────────────────────────────┐
│ HEADER (Fixed)                  │ ← 60px height + safe-area-top
│ • Logo + User Avatar            │
├─────────────────────────────────┤
│                                 │
│ SCROLLABLE CONTENT              │
│ • pt-[60px] (header clearance) │
│ • pb-[80px] (nav clearance)    │
│ • px-4 (16px side padding)     │
│                                 │
│                                 │
├─────────────────────────────────┤
│ BOTTOM NAV (Fixed)              │ ← 64px height + safe-area-bottom
│ • 5 navigation items            │
└─────────────────────────────────┘
```

### Header Specifications

**Height:** 60px + safe-area-inset-top  
**Layout:**
- Left: Logo (36px × 36px) + Brand name
- Right: User avatar (32px × 32px)
- Padding: 16px horizontal
- Border: 1px bottom, rgba(0, 0, 0, 0.1)
- Background: Frosted glass effect `bg-card/95 backdrop-blur`

### Bottom Navigation Specifications

**Height:** 64px + safe-area-inset-bottom  
**Grid:** 5 equal columns  
**Each Item:**
- Icon: 20px × 20px
- Label: 10px font-size
- Vertical layout (icon above text)
- Gap: 4px between icon and label
- Active state: Primary color (Saffron #ff9933)
- Inactive state: Muted foreground (#6b6661)

**Touch Targets:** Full column width/height (minimum 64px)

**Navigation Items:**
1. Bingo (Grid3x3 icon)
2. Scan (Scan icon)
3. Credits (Coins icon)
4. History (History icon)
5. Profile (User icon)

---

## 🧩 Component Specifications

### Bingo Card Component

#### Grid Layout
- **3×3 grid** of product cards
- **Gap:** 8px between items
- **Aspect ratio:** 1:1 (square)
- **Cell border:** 2px
  - Unscanned: `border-border`
  - Scanned: `border-primary`

#### Product Cell States

**Unscanned:**
```
┌──────────────┐
│ Product Img  │
│              │
├──────────────┤
│ Name         │ ← Gradient overlay
│ 10pts        │ ← Badge
└──────────────┘
```

**Scanned:**
```
┌──────────────┐
│ Product Img  │
│      ✓       │ ← Green overlay with checkmark
├──────────────┤
│ Name         │
│ 10pts        │
└──────────────┘
```

#### Stats Cards (3-column grid)
- **Height:** Auto
- **Padding:** 12px
- **Border:** 1px, primary/20 opacity
- **Text alignment:** Center
- **Label:** 12px, muted-foreground
- **Value:** 18px, semibold, primary color
- **Sub-text:** 12px, muted-foreground

#### CTA Button
- **Width:** 100%
- **Height:** 48px
- **Border radius:** 24px (organic curves)
- **Background:** Primary (Saffron #ff9933)
- **Text:** White, 16px, medium weight
- **Icon:** Sparkles, 20px
- **Gap:** 8px
- **Active state:** scale(0.98)
- **Transition:** 150ms transform

### Scan Product Component

#### Mode Toggle
- **Layout:** 2-column grid
- **Background:** Muted (#f5f0e8)
- **Padding:** 4px
- **Border radius:** 24px
- **Active tab:** White background with shadow
- **Inactive tab:** Transparent with muted text

#### Camera Viewfinder
- **Aspect ratio:** 1:1
- **Max width:** 400px
- **Background:** Muted
- **Border radius:** 10px
- **Scanning overlay:** Dashed border, primary color
- **Icon size:** 64px

#### Manual Input
- **Input height:** 48px
- **Text alignment:** Center
- **Font size:** 18px
- **Placeholder:** "e.g., SKU001"
- **Text transform:** Uppercase

#### Success State
- **Icon container:** 64px circle, primary/10 background
- **Product image:** 96px × 96px
- **Product name:** h3 (18px), truncate
- **Brand:** 14px, muted-foreground
- **Badges:** 12px text, 20px height
- **Button height:** 48px

---

## 🎯 Touch Interaction Guidelines

### Minimum Touch Targets
- **Buttons:** 48px × 48px minimum
- **Bottom nav items:** Full column width/height
- **Cards:** Entire card surface (when tappable)
- **Bingo grid cells:** Calculated to maintain 1:1 aspect ratio

### Active States
```css
/* All tappable elements */
active:scale-[0.98]
transition-transform duration-150
```

### Disabled States
```css
disabled:opacity-50
disabled:cursor-not-allowed
```

### Tap Highlight Removal
```css
/* Applied globally to prevent blue flash on mobile */
-webkit-tap-highlight-color: transparent;
```

---

## 🎭 Animation Standards

### Component Transitions
- **Duration:** 150ms - 200ms (fast, responsive feel)
- **Easing:** ease-in-out (default)
- **Transform:** scale(0.98) for press states

### Loading States
- **Icon:** Pulse animation
- **Duration:** 2s
- **Timing:** ease-in-out infinite

### Whimsical Animations - Gaudí x Wes Anderson Style
```css
@keyframes gentle-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes organic-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes curve-morph {
  0%, 100% { border-radius: 2rem 1rem 2rem 1rem; }
  50% { border-radius: 1rem 2rem 1rem 2rem; }
}

.animate-gentle-float { animation: gentle-float 6s ease-in-out infinite; }
.animate-organic-pulse { animation: organic-pulse 4s ease-in-out infinite; }
.animate-curve-morph { animation: curve-morph 8s ease-in-out infinite; }
```

---

## 📊 Data Display Patterns

### Progress Indicators
- **Height:** 4px (thin) to 8px (prominent)
- **Border radius:** Full (9999px)
- **Background:** Muted
- **Fill:** Primary color

### Badges
- **Height:** 20px (compact) to 24px (standard)
- **Padding:** 6px - 12px horizontal
- **Border radius:** 6px
- **Font size:** 12px
- **Font weight:** Medium (500)

### Cards
- **Border:** 1px, border color
- **Border radius:** 10px
- **Padding:** 16px (mobile)
- **Shadow:** None by default (use border instead)
- **Hover:** N/A (mobile doesn't have hover)

---

## 🔤 Content Guidelines

### Text Truncation
- Use `truncate` class for single-line overflow
- Product names in grid: Always truncate
- Section headers: Allow wrap if needed

### Helper Text
- **Color:** muted-foreground (#6b6661)
- **Size:** 12px - 14px
- **Placement:** Below related input/section

### Empty States
- **Icon:** 64px, muted-foreground
- **Heading:** h3 (18px)
- **Description:** 14px, muted-foreground (#6b6661)
- **CTA button:** Optional

---

## ♿️ Accessibility

### Color Contrast
- **Primary text (#2d2a26) on cream (#faf3e0):** High contrast (AAA)
- **Muted text (#6b6661) on cream:** 4.5:1+ (AA)
- **White text on saffron (#ff9933):** 4.5:1+ (AA)
- **White text on green (#059669):** 4.5:1+ (AA)

### Focus Indicators
- **Outline:** 2px offset ring color
- **Visible on keyboard navigation**

### Touch Targets (WCAG 2.1 Level AAA)
- **Minimum:** 44px × 44px
- **Recommended:** 48px × 48px

---

## 📦 Component Checklist

When building a new component, ensure:

- [ ] Touch target is ≥48px
- [ ] Active state uses `active:scale-[0.98]`
- [ ] Text is readable (16px minimum for body)
- [ ] Respects safe-area-insets if fixed position
- [ ] Works within 375px viewport width
- [ ] No horizontal scroll on mobile
- [ ] Loading states are indicated
- [ ] Empty states are designed
- [ ] Error states are user-friendly

---

## 🚀 Performance Targets

### Mobile Performance
- **First Contentful Paint:** <1.8s
- **Time to Interactive:** <3.8s
- **Largest Contentful Paint:** <2.5s

### Image Optimization
- Use WebP where supported
- Lazy load images below fold
- Provide proper width/height attributes

### Bundle Size
- Keep JavaScript bundle <200KB (gzipped)
- Critical CSS inline
- Lazy load non-critical components

---

## 🧪 Testing Checklist

### Devices to Test
- [ ] iPhone SE (375px width)
- [ ] iPhone 12/13/14 (390px width)
- [ ] iPhone 14 Pro Max (428px width)
- [ ] Samsung Galaxy S21 (360px width)
- [ ] Pixel 5 (393px width)

### Scenarios
- [ ] One-handed thumb usage
- [ ] Bottom nav reachability
- [ ] Form input with keyboard open
- [ ] Landscape orientation
- [ ] Dark mode (if implemented)

---

## 📝 Notes for Engineers

1. **All layouts are mobile-first.** Desktop is not a priority.
2. **Use safezone classes** on all fixed-position elements.
3. **48px touch targets** are mandatory, not optional.
4. **Active states** should feel responsive (use transform scale).
5. **Animations** should be subtle and fast (<200ms).
6. **Test on real devices** with notches and home indicators.
7. **Images must have alt text** for screen readers.
8. **Focus states** must be visible for keyboard users.

---

**Questions?** Contact the design team or refer to `/styles/globals.css` for implementation details.
