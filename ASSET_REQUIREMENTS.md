# Sparrow - Asset Requirements & Specifications

## Overview
This document outlines all asset requirements for the Sparrow gamified waste collection app, including logos, product images, icons, and other visual elements needed for proper implementation.

---

## 1. Sparrow App Logo (Official Branding)

### 1.1 Primary App Logo
**Location:** `AuthChoice.tsx`, `LoginForm.tsx`, `UserSignupForm.tsx`

The official Sparrow logo features a watercolor-style sparrow perched on a branch with leaves, inside a green circular frame.

**Available Variations:**

| Background Color | Asset Path | Best Use Case |
|-----------------|------------|---------------|
| **Red** (Primary) | `figma:asset/074bfdceb3f0e9de0bf625a76c68d67a757c1173.png` | Primary app logo - vibrant and energetic |
| White | `figma:asset/f91a8415722f4ab4ae1e82d8569fc0b5a3724f40.png` | Alternative for specific contexts |
| Gold/Yellow | `figma:asset/5e51c243eaac10ef5ef9afe8b61d60cb6d29a0f9.png` | Premium features, achievements |

**Implementation Specifications:**

| Specification | Requirement |
|--------------|-------------|
| **Display Size** | 80px × 80px (h-20 w-20) circular |
| **Container Shape** | `rounded-full` - perfect circle |
| **Original Size** | 1024px × 1024px |
| **Format** | PNG with background color |
| **Object Fit** | `cover` - fills circular container |
| **Shadow** | `shadow-lg` - subtle elevation |
| **Usage Context** | Authentication screens, app header |

**Design Elements:**
- Sparrow illustration in watercolor/painterly style
- Green circular border frame
- Branch with blue leaves as perch
- Warm, friendly, approachable aesthetic
- Connects to environmental/nature theme

---

## 2. Brand Logos (Product Brands)

### 2.1 Product Detail Modal Display
**Location:** `ProductDetailModal.tsx`

| Specification | Requirement |
|--------------|-------------|
| **Display Size** | 48px × 48px (w-12 h-12) |
| **Container Size** | 64px × 64px (w-16 h-16) |
| **Recommended Upload Size** | **128px × 128px** minimum |
| **Optimal Upload Size** | **256px × 256px** (future-proof) |
| **Format** | SVG (preferred) or PNG |
| **Background** | Transparent |
| **Aspect Ratio** | 1:1 (square) or contained within square |
| **File Size** | < 50KB per logo |
| **Object Fit** | contain (preserves aspect ratio) |

**Use Case:** Displayed at the top of the product detail modal when users tap on a bingo card cell.

### 2.2 Future Bingo Card Cell Display (Reserved)
**Location:** `BingoCard.tsx` (currently not implemented)

| Specification | Requirement |
|--------------|-------------|
| **Potential Display Size** | 40px × 40px |
| **Recommended Upload Size** | **100px × 100px** minimum |
| **Format** | SVG (preferred) or PNG |
| **Background** | Transparent |

**Use Case:** If future design requires showing brand logos directly in the 3×3 bingo grid cells.

---

## 3. Product Images

### 3.1 Standard Product Images
**Location:** `App.tsx` - `image` field

| Specification | Requirement |
|--------------|-------------|
| **Display Context** | Legacy support, general views |
| **Recommended Size** | 800px × 800px |
| **Format** | JPEG or PNG |
| **Aspect Ratio** | 1:1 (square preferred) |
| **File Size** | < 200KB per image |
| **Background** | White or transparent |

### 3.2 3D Product Images
**Location:** `App.tsx` - `image3D` field, `ProductDetailModal.tsx`

| Specification | Requirement |
|--------------|-------------|
| **Display Size** | 256px × 256px (w-64 h-64) |
| **Recommended Upload Size** | **512px × 512px** |
| **Optimal Upload Size** | **1024px × 1024px** (high-quality) |
| **Format** | PNG with transparency |
| **Aspect Ratio** | 1:1 (square) |
| **File Size** | < 300KB per image |
| **Background** | Transparent |
| **Style** | Isometric or 3D rendered view |
| **Viewing Angle** | Front-facing with slight 3D perspective |

**Use Case:** Featured prominently in the product detail modal for visual appeal and product recognition.

---

## 4. Icons & UI Elements

### 4.1 System Icons
**Library:** Lucide React (already integrated)

Currently used icons:
- `Calendar` - Week header
- `Gift` - Reward tracking
- `Check` - Scanned items
- `Bell` - Pickup preferences
- `Languages` - Language selector
- `Package`, `Leaf`, `Trophy`, `User` - Navigation
- `ScanLine`, `X`, `ArrowLeft` - Actions

**No custom icon assets needed** - all icons are code-based from Lucide.

### 4.2 Category Icons (Future Enhancement)
If category-specific icons are needed for bingo cells:

| Specification | Requirement |
|--------------|-------------|
| **Size** | 32px × 32px display |
| **Upload Size** | 64px × 64px |
| **Format** | SVG preferred |
| **Style** | Line icons, 2px stroke weight |
| **Colors** | Single color (will be styled by app) |

---

## 5. Background & Decorative Assets

### 5.1 Design Panel Background
**Location:** `IndianDesignPanel.tsx`

**Current Implementation:** SVG patterns generated in code
- Gaudí-inspired mosaic tiles
- Organic wave patterns
- Mandala patterns
- Floating organic blobs

**No image assets needed** - all patterns are procedurally generated.

### 5.2 Body Background Texture
**Location:** `globals.css`

**Current Implementation:** CSS radial gradients in Indian cultural colors
- Saffron (#ff9933)
- Imperial Gold (#ffd700)
- Nature Green (#059669)
- Divine Blue (#4169e1)
- Royal Red (#dc143c)

**No image assets needed** - all textures are CSS-based.

---

## 6. Avatar & User Profile Images

### 6.1 User Avatars
**Location:** `UserProfile.tsx`, `Avatar` component

| Specification | Requirement |
|--------------|-------------|
| **Display Size** | 40px × 40px (standard) |
| **Large Display** | 96px × 96px (profile page) |
| **Recommended Upload Size** | **256px × 256px** |
| **Format** | JPEG or PNG |
| **Aspect Ratio** | 1:1 (square, will be cropped to circle) |
| **File Size** | < 150KB |
| **Fallback** | Initial-based avatar (automatic) |

---

## 7. Social Login Provider Logos

### 7.1 OAuth Provider Icons
**Location:** `SocialLoginButtons.tsx`

Currently implemented:
- Google icon (SVG in code)
- Apple icon (SVG in code)
- Phone icon (Lucide)

**No image assets needed** - all icons are code-based.

---

## 8. Product Data Fields Summary

When adding new products to the `bingoProducts` array in `App.tsx`, ensure each product has:

```typescript
{
  id: string;              // Unique identifier
  sku: string;             // Product SKU code
  name: string;            // Full product name
  category: string;        // Product category
  brandLogo: string;       // 128px × 128px PNG/SVG
  image: string;           // 800px × 800px (legacy)
  image3D: string;         // 512px × 512px PNG with transparency
  plasticType: string;     // e.g., "PETE #1", "HDPE #2"
  description: string;     // Recycling information
  recyclable: boolean;     // true/false
  scanned: boolean;        // false (initial state)
  credits: number;         // Credit value (e.g., 150)
}
```

---

## 9. Image Hosting & Delivery

### 9.1 Current Implementation
- Using Unsplash API for placeholder images
- Direct URL references in product data

### 9.2 Production Recommendations
- **CDN:** Use a CDN (Cloudflare Images, Cloudinary, or AWS CloudFront)
- **Optimization:** Serve WebP format with fallback
- **Responsive:** Implement srcset for different screen densities
- **Lazy Loading:** Implement lazy loading for product images
- **Caching:** Set appropriate cache headers (1 year for immutable assets)

### 9.3 File Naming Convention
```
brand-logos/
  ├── coca-cola-128.png
  ├── amul-128.png
  ├── dove-128.png
  └── ...

product-images/
  ├── coca-cola-500ml-800.jpg
  ├── amul-milk-1l-800.jpg
  └── ...

product-3d/
  ├── coca-cola-500ml-3d-512.png
  ├── amul-milk-1l-3d-512.png
  └── ...
```

---

## 10. Design Color Palette Reference

For creating assets that match the app's visual identity:

### Primary Colors (Indian Cultural)
- **Saffron:** `#ff9933` - Spiritual commitment, sacrifice
- **Imperial Gold:** `#ffd700` - Wealth, divinity, prosperity
- **Royal Red:** `#dc143c` - Power, courage, auspiciousness
- **Nature Green:** `#059669` - Growth, new beginnings
- **Divine Blue:** `#4169e1` - Divine energy, strength

### Supporting Colors
- **Saffron Light:** `#ffb366`
- **Gold Light:** `#ffe44d`
- **Green Light:** `#06b584`
- **Blue Light:** `#6b8ef5`
- **Cream Background:** `#faf3e0`

### Usage in Assets
When creating custom graphics or product mockups, use these colors to maintain visual consistency with the Gaudí × Wes Anderson aesthetic.

---

## 11. Accessibility Requirements

### 11.1 Image Alt Text
All images must have descriptive alt text:
- **Brand logos:** "Brand name logo"
- **Product images:** "Product name - size"
- **3D renders:** "3D view of product name"

### 11.2 Contrast Requirements
- Text on colored backgrounds: Minimum 4.5:1 contrast ratio
- Icons on colored backgrounds: Minimum 3:1 contrast ratio

### 11.3 File Size Optimization
To ensure fast loading on slower connections:
- Total page weight target: < 2MB
- Individual images: < 300KB
- Logos: < 50KB
- Use progressive JPEG or optimized PNG

---

## 12. Asset Preparation Checklist

Before adding new product assets:

- [ ] Brand logo prepared at 256×256px, PNG/SVG, transparent background
- [ ] Product image prepared at 800×800px, JPEG/PNG
- [ ] 3D product render prepared at 512×512px, PNG, transparent background
- [ ] All images optimized (compressed without visible quality loss)
- [ ] File sizes verified (within limits specified above)
- [ ] Alt text prepared for accessibility
- [ ] Images tested on retina/high-DPI displays
- [ ] Images tested on slow connections (3G simulation)

---

## 12. Future Enhancements

### 12.1 Potential New Asset Requirements
- **Reward item images** - For displaying prizes in rewards catalog
- **Tutorial/onboarding illustrations** - For first-time user education
- **Empty state illustrations** - For when no data is available
- **Category hero images** - For category-specific views
- **Achievement badges** - For gamification milestones

### 12.2 Animation Assets
- **Lottie animations** - For scan success, reward unlocks
- **Micro-interactions** - For button presses, transitions
- **Loading animations** - Custom branded loading indicators

---

## 13. Contact & Asset Submission

When preparing assets for integration:

1. **Format:** Follow specifications exactly as outlined above
2. **Naming:** Use descriptive, kebab-case filenames
3. **Organization:** Group by type (logos, products, 3d-renders)
4. **Delivery:** Provide via zip file or cloud storage link
5. **Documentation:** Include asset manifest listing all files

---

**Document Version:** 1.0  
**Last Updated:** November 2, 2025  
**Maintained By:** Sparrow Development Team
