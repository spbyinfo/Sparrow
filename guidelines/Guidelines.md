# Sparrow App - Development Guidelines

## 🐦 Brand Identity & Theme

### Logo Usage
* **Primary Logo:** Red background Sparrow logo (`figma:asset/074bfdceb3f0e9de0bf625a76c68d67a757c1173.png`)
* **Display Size:** 80px × 80px for auth screens, 40px × 40px for headers/inline
* **Shape:** Always circular (`rounded-full`) with `shadow-lg`
* **Never:** Distort, crop, or change colors of the logo

### Color Philosophy
Sparrow uses **Indian cultural colors** with **Gaudí x Wes Anderson whimsy**:
* **Saffron (#ff9933):** Primary brand color - sacred, spiritual
* **Nature Green (#059669):** Secondary - growth, sustainability
* **Imperial Gold (#ffd700):** Accent - wealth, achievement
* **Royal Red (#dc143c):** Destructive/alerts - power, urgency
* **Divine Blue (#4169e1):** Utility - divine energy

---

## 🎨 Design System Rules

### Typography
* **Never override base typography** unless specifically requested
* Default font-size is 16px for mobile readability
* Use semantic HTML (h1, h2, h3, p) - they have pre-defined styles
* Avoid Tailwind text classes (text-2xl, font-bold) unless necessary

### Color Usage
* **Primary actions:** Saffron background with white text
* **Secondary actions:** Nature green or outline variant
* **Success states:** Nature green
* **Error/destructive:** Royal red
* **Achievements/credits:** Imperial gold accents
* **Never:** Use colors outside the defined palette

### Border Radius
* **Base radius:** 1.5rem (24px) - organic, flowing curves
* **Buttons/Cards:** Use the base radius for a cohesive look
* **Logos/Avatars:** Always `rounded-full`
* **Organic shapes:** Use `border-radius: 2rem 1rem 2rem 1rem` for asymmetric whimsy

### Spacing
* **Screen edges:** px-4 (16px) - critical for mobile
* **Component gaps:** gap-2 to gap-4 (8px - 16px)
* **Card padding:** p-4 or p-6 (16px or 24px)

---

## 📱 Mobile-First Development

### Critical Rules
* **Touch targets:** Minimum 48px × 48px (buttons, tappable areas)
* **Safe zones:** Use safe-area-inset for fixed headers/navbars
* **One-handed usage:** Keep important actions in thumb reach (bottom 2/3 of screen)
* **No horizontal scroll:** Never on mobile viewports

### Navigation
* **Bottom nav only:** 4 items maximum (Bingo, Credits, History, Profile)
* **Scanning:** Integrated into bingo experience via ScanModal
* **Active state:** Saffron color (#ff9933)
* **Icon size:** 20px × 20px in nav

### Interactive States
* **Press feedback:** `active:scale-[0.98]` on all tappable elements
* **Transitions:** 150ms - 200ms for responsive feel
* **Disabled:** `opacity-50` and `cursor-not-allowed`
* **No tap highlight:** Applied globally via `-webkit-tap-highlight-color: transparent`

---

## 🎯 Component Guidelines

### Buttons
* **Primary Button**
  * Background: Saffron (#ff9933)
  * Text: White, 16px, medium weight
  * Height: 48px minimum
  * Full width on mobile (w-full)
  * Border radius: 24px (organic curves)
  * Use for: Main actions (Sign In, Schedule Pickup, Complete Setup)

* **Secondary Button**
  * Variant: outline
  * Border: Saffron with transparent background
  * Use for: Alternative actions (Cancel, Go Back)

* **Black Button (Special)**
  * Background: Black (#000000)
  * Text: White
  * Use for: Sign In button, elegant aesthetic moments

### Cards
* **Border:** 1px solid border color
* **Radius:** 24px (organic)
* **Padding:** 16px (p-4) or 24px (p-6)
* **Shadow:** Minimal or none (rely on borders)
* **Background:** White (#ffffff) on cream background

### Bingo Card
* **Grid:** 3×3 product cells
* **Gap:** 8px between cells
* **Aspect ratio:** 1:1 (square cells)
* **Border states:**
  * Unscanned: border-border (subtle)
  * Scanned: border-primary (saffron, 2px)
* **Direct tap to scan:** No separate scan page

### Modals & Overlays
* **ScanModal:** Slides up from bottom
* **Background:** Semi-transparent overlay
* **Close action:** Swipe down or X button
* **Safe zone:** Account for bottom insets

---

## ♿️ Accessibility

### Required Standards
* **Color contrast:** Minimum AA (4.5:1), aim for AAA
* **Alt text:** Required on all images (product images, logos, icons)
* **Focus indicators:** 2px ring visible on keyboard navigation
* **Touch targets:** 48px × 48px minimum (WCAG AAA)
* **Semantic HTML:** Use proper headings, labels, buttons

### Text
* **Body text:** 16px minimum for mobile
* **Helper text:** 12px - 14px
* **Line height:** 1.5 for readability
* **Truncate:** Long product names in grids

---

## 🚀 Performance

### Optimization Rules
* **Images:** Use WebP where supported, lazy load below fold
* **Bundle size:** Keep JS < 200KB gzipped
* **Animations:** Keep under 200ms, use transform/opacity only
* **Loading states:** Always indicate (pulse, spinner)

### Mobile Performance Targets
* **First Contentful Paint:** < 1.8s
* **Time to Interactive:** < 3.8s
* **No layout shift:** Provide width/height for images

---

## 🧪 Testing Checklist

Before shipping any feature:
- [ ] Works on iPhone SE (375px)
- [ ] Works on iPhone Pro Max (428px)
- [ ] Touch targets are ≥ 48px
- [ ] Active states feel responsive
- [ ] Safe zones respected on notched devices
- [ ] One-handed thumb reach tested
- [ ] Loading/error/empty states designed
- [ ] No horizontal scroll
- [ ] Images have alt text

---

## 🎭 Sparrow-Specific Features

### Gamification Elements
* **Credits display:** Imperial gold (#ffd700) for visual impact
* **Bingo progress:** Green checkmarks on scanned items
* **Achievement badges:** Round, colorful, whimsical
* **Progress bars:** Thin (4px-8px), rounded, primary color fill

### India Context
* **KYC verification:** Aadhaar (12 digits) and PAN (format: ABCDE1234F)
* **Phone numbers:** 10 digits
* **PIN codes:** 6 digits
* **Language support:** Prepare for Hindi/regional languages

### Waste Management Theme
* **Product categories:** Soft Drink, Dairy, Personal Care, Bottled Water, Juice, etc.
* **Plastic types:** PETE #1, HDPE #2, LDPE #4, PP #5, etc.
* **Credits system:** Points for proper disposal
* **Pickup scheduling:** Core feature, not afterthought

---

## 📝 Code Quality

### General Rules
* Use flexbox and grid, avoid absolute positioning unless necessary
* Keep components small and focused
* Extract helper functions into utils
* Use TypeScript interfaces for props
* Refactor as you go

### File Organization
* Components in `/components`
* UI components in `/components/ui` (ShadCN only)
* Utils in `/utils`
* Never create files in protected directories

---

**Questions?** Refer to:
* `/DESIGN_SYSTEM.md` for detailed specs
* `/ASSET_REQUIREMENTS.md` for image/logo specs  
* `/styles/globals.css` for color tokens and animations
