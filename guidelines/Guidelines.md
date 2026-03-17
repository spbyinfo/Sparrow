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

### Border Radius
* **Base radius:** 1.5rem (24px) - organic, flowing curves
* **Buttons/Cards:** Use the base radius for a cohesive look
* **Logos/Avatars:** Always `rounded-full`
* **Organic shapes:** Use `border-radius: 2rem 1rem 2rem 1rem` for asymmetric whimsy

### Spacing
* **Screen edges:** px-4 (16px) - critical for mobile
* **Component gaps:** gap-2 to gap-4 (8px - 16px)
* **Card padding:** p-4 or p-6 (16px or 24px)

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

## 🎯 Component Guidelines

### Buttons
* **Primary Button:** Saffron background, white text, 48px height, w-full on mobile
* **Secondary Button:** Outline variant with saffron border
* **Black Button:** Black background, white text for elegant moments

### Cards
* **Border:** 1px solid border color
* **Radius:** 24px (organic)
* **Padding:** 16px (p-4) or 24px (p-6)
* **Background:** White (#ffffff) on cream background

### Bingo Card
* **Grid:** 3×3 product cells
* **Gap:** 8px between cells
* **Aspect ratio:** 1:1 (square cells)
* **Direct tap to scan:** No separate scan page

## ♿️ Accessibility

### Required Standards
* **Color contrast:** Minimum AA (4.5:1), aim for AAA
* **Alt text:** Required on all images
* **Focus indicators:** 2px ring visible
* **Touch targets:** 48px × 48px minimum
* **Semantic HTML:** Use proper headings, labels, buttons

## 🚀 Performance

### Optimization Rules
* **Images:** Use WebP, lazy load below fold
* **Bundle size:** Keep JS < 200KB gzipped
* **Animations:** Keep under 200ms
* **Loading states:** Always indicate

### Mobile Performance Targets
* **First Contentful Paint:** < 1.8s
* **Time to Interactive:** < 3.8s
* **No layout shift:** Provide width/height for images