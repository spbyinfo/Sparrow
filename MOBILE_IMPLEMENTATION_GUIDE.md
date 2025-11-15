# Mobile Implementation Guide - Sparrow App

## 🎯 Quick Start Checklist

This guide ensures your HTML/React setup is optimized for mobile devices.

---

## 1. HTML Meta Tags (Critical)

Add these meta tags to your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Essential mobile meta tags -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
  
  <!-- PWA Meta Tags -->
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#059669" />
  
  <!-- App Info -->
  <meta name="application-name" content="Sparrow" />
  <meta name="apple-mobile-web-app-title" content="Sparrow" />
  
  <title>Sparrow - Play. Scan. Earn.</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### Key Points:
- `viewport-fit=cover` enables safe-area-inset support
- `user-scalable=yes` allows users to zoom (accessibility)
- `maximum-scale=5.0` prevents zoom lock while maintaining UX
- `theme-color` matches your brand primary color

---

## 2. CSS Safe Zone Implementation

The app uses CSS environment variables for device safe zones. This is **already implemented** in `/styles/globals.css`:

```css
/* These classes are ready to use */
.safe-area-top { padding-top: env(safe-area-inset-top); }
.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
.safe-area-left { padding-left: env(safe-area-inset-left); }
.safe-area-right { padding-right: env(safe-area-inset-right); }
```

### Usage:
Apply these classes to **fixed-position elements only**:

```tsx
// ✅ CORRECT - Fixed header
<header className="fixed top-0 safe-area-top">
  {/* Header content */}
</header>

// ✅ CORRECT - Fixed bottom navigation
<nav className="fixed bottom-0 safe-area-bottom">
  {/* Nav items */}
</nav>

// ❌ WRONG - Don't apply to scrollable content
<main className="safe-area-top"> {/* NO! */}
  {/* This will add double padding */}
</main>
```

---

## 3. Layout Structure

### Recommended App Shell:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HEADER: Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border safe-area-top">
        <div className="px-4 py-3">
          {/* Logo, User Avatar */}
        </div>
      </header>

      {/* MAIN: Scrollable content */}
      <main className="flex-1 overflow-y-auto pt-[60px] pb-[80px]">
        <div className="px-4 py-4">
          {/* Your page content */}
        </div>
      </main>

      {/* BOTTOM NAV: Fixed at bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          {/* Nav items */}
        </div>
      </nav>
    </div>
  );
}
```

### Critical Spacing:
- Header height: `60px` (adjust `pt-[60px]` if you change header)
- Bottom nav height: `64px` (adjust `pb-[80px]` if you change nav)
- Side padding: `px-4` (16px) on all scrollable content

---

## 4. Touch Optimization

### Prevent Touch Artifacts:

```css
/* Already in globals.css */
@media (hover: none) {
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  button, a {
    user-select: none;
    -webkit-user-select: none;
  }
}
```

### Active States for Buttons:

```tsx
// ✅ Good - Provides visual feedback
<Button className="active:scale-[0.98] transition-transform">
  Click Me
</Button>

// ❌ Bad - No feedback on mobile
<Button className="hover:bg-primary"> {/* hover doesn't work on mobile */}
  Click Me
</Button>
```

---

## 5. Component Sizing Guidelines

### Touch Targets (Minimum Sizes):

```tsx
// Navigation Items
<button className="h-16 w-full"> {/* 64px height */}
  <Icon className="w-5 h-5" /> {/* 20px icons */}
  <span className="text-[10px]">Label</span>
</button>

// Primary Buttons
<Button size="lg" className="w-full h-12"> {/* 48px height */}
  Action
</Button>

// Input Fields
<Input className="h-12 text-base"> {/* 48px height, 16px text */}
  
// Cards/Grid Items
<div className="aspect-square"> {/* Square items */}
  {/* Bingo cell */}
</div>
```

### Typography:
```tsx
// Page Title
<h2>Weekly Challenge</h2> {/* 20px, auto from globals.css */}

// Body Text
<p>Description here</p> {/* 16px, auto from globals.css */}

// Small Text
<p className="text-sm">Helper text</p> {/* 14px */}

// Tiny Text (labels, badges)
<span className="text-xs">10pts</span> {/* 12px */}
```

---

## 6. Image Optimization

### Using ImageWithFallback Component:

```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src="https://images.unsplash.com/photo-example?w=400"
  alt="Product name"
  className="w-full h-full object-cover"
/>
```

### Best Practices:
- Add `?w=400` to Unsplash URLs (mobile doesn't need full resolution)
- Always provide `alt` text for screen readers
- Use `object-cover` for fill behavior
- Use `aspect-ratio` utilities to prevent layout shift

---

## 7. Testing Checklist

### Before Deployment:

**Devices to Test:**
- [ ] iPhone SE (smallest modern iPhone - 375px)
- [ ] iPhone 14 Pro (with notch)
- [ ] Android phone (Samsung/Pixel)

**Features to Verify:**
- [ ] Safe zones work on notched devices
- [ ] Bottom navigation is reachable with thumb
- [ ] No horizontal scroll
- [ ] All buttons have 48px+ touch targets
- [ ] Active states work (buttons scale on press)
- [ ] Forms work when keyboard is open
- [ ] Images load and don't break layout
- [ ] Text is readable (minimum 16px for body)

**Accessibility:**
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] Screen reader labels present
- [ ] Zoom works (pinch to zoom)

---

## 8. Performance Optimization

### Code Splitting:
```tsx
// Lazy load heavy components
const BingoCard = lazy(() => import('./components/BingoCard'));
const MyCredits = lazy(() => import('./components/MyCredits'));

<Suspense fallback={<LoadingSpinner />}>
  <BingoCard />
</Suspense>
```

### Image Loading:
```tsx
// Lazy load images below the fold
<ImageWithFallback
  src={imgUrl}
  loading="lazy" // Native lazy loading
  alt="Product"
/>
```

### Bundle Size:
- Use tree-shakeable imports: `import { Button } from './ui/button'`
- Avoid importing entire icon libraries
- Use dynamic imports for routes

---

## 9. Common Mobile Issues & Fixes

### Issue: Content hidden under header/nav
**Fix:** Add padding to main content
```tsx
<main className="pt-[60px] pb-[80px]">
  {/* Ensures content isn't hidden */}
</main>
```

### Issue: Touch targets too small
**Fix:** Ensure minimum 48px height/width
```tsx
<button className="min-h-[48px] min-w-[48px]">
```

### Issue: Layout shifts when loading
**Fix:** Use aspect-ratio and skeleton states
```tsx
<div className="aspect-square bg-muted animate-pulse">
  {/* Placeholder while loading */}
</div>
```

### Issue: Input zoom on iOS
**Fix:** Use 16px font size minimum
```tsx
<Input className="text-base" /> {/* 16px prevents zoom */}
```

### Issue: Horizontal overflow
**Fix:** Add overflow-x-hidden to body
```css
body {
  overflow-x: hidden;
  width: 100%;
}
```

---

## 10. PWA Enhancements (Optional)

### Manifest.json:
```json
{
  "name": "Sparrow",
  "short_name": "Sparrow",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#059669",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker (Basic):
```js
// Cache static assets
const CACHE_NAME = 'sparrow-v1';
const urlsToCache = ['/', '/styles/globals.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

---

## 11. Debugging Tips

### View Safe Area Insets:
```css
/* Temporarily add to see the insets */
.safe-area-top {
  background: red !important;
}
```

### Device Simulation:
- Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)
- Select device with notch (iPhone 14 Pro)
- Enable "Show device frame"

### Touch Testing:
- Use real device, not just simulator
- Test with one hand (thumb navigation)
- Try in different orientations

---

## 12. Deployment Considerations

### Environment Variables:
```env
# Add to .env
VITE_APP_NAME=Sparrow
VITE_PRIMARY_COLOR=#059669
```

### Build Optimization:
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck
```

### CDN for Images:
- Consider using a CDN for product images
- Implement responsive images with srcset
- Use modern formats (WebP, AVIF)

---

## ✅ Final Pre-Launch Checklist

- [ ] HTML meta tags configured
- [ ] Safe zones tested on notched device
- [ ] All touch targets ≥48px
- [ ] No horizontal scroll on 375px width
- [ ] Text is readable (16px minimum)
- [ ] Images optimized and lazy loaded
- [ ] Active states provide feedback
- [ ] Bottom nav is thumb-reachable
- [ ] Forms work with keyboard open
- [ ] Color contrast meets WCAG AA
- [ ] Performance: LCP < 2.5s
- [ ] Tested on real iOS & Android devices

---

**Questions?** Refer to `/DESIGN_SYSTEM.md` for detailed design specs or `/styles/globals.css` for implementation.
