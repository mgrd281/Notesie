# App Icon & Splash Screen Guide

## App Icon Creation

### Requirements
- **Filename**: `assets/icon.png`
- **Size**: 1024 x 1024 pixels
- **Format**: PNG with transparency
- **Safe zone**: 108 x 108 pixels (center area visible in all corners)

### Design Approach
The Notesie icon should be:
- Minimalist and modern
- Soft yellow/gold with cream accents
- Simple notepad or pen design
- Scalable at all sizes (from 16px to 1024px)

### Option 1: Use Online Tools
1. Go to https://www.figma.com or https://www.canva.com
2. Create a 1024x1024 artboard
3. Design using:
   - Soft yellow (#FFF8DC) or warm gold (#F5DEB3)
   - Cream (#FFFBF5) highlights
   - Dark gray (#2D2D2D) accents or outlines
4. Export as PNG

### Option 2: SVG to PNG Conversion
Save the SVG below as `notesie-icon.svg`, then convert it:

```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1024" height="1024" fill="#FFF8DC" rx="200"/>
  
  <!-- Notepad -->
  <rect x="280" y="200" width="480" height="600" fill="#FFFFFF" rx="40" stroke="#F5DEB3" stroke-width="8"/>
  
  <!-- Lines -->
  <line x1="320" y1="280" x2="720" y2="280" stroke="#F5DEB3" stroke-width="12" stroke-linecap="round"/>
  <line x1="320" y1="380" x2="720" y2="380" stroke="#F5DEB3" stroke-width="12" stroke-linecap="round"/>
  <line x1="320" y1="480" x2="720" y2="480" stroke="#F5DEB3" stroke-width="12" stroke-linecap="round"/>
  <line x1="320" y1="580" x2="600" y2="580" stroke="#F5DEB3" stroke-width="12" stroke-linecap="round"/>
  
  <!-- Pen tip (decorative) -->
  <circle cx="750" cy="200" r="60" fill="#2D2D2D" opacity="0.1"/>
</svg>
```

**To convert**:
1. Use online converter: https://cloudconvert.com/svg-to-png
2. Or use ImageMagick: `convert -background none -density 1 notesie-icon.svg -define png:color-type=6 icon.png`
3. Or use Adobe tools/Figma's export feature

### Option 3: Professional Design (Recommended for App Store)
- Hire a designer on Fiverr, 99designs, or Upwork
- Budget: $50-300
- Ask for: Minimalist notepad icon in warm colors, 1024x1024 PNG

---

## Splash Screen Creation

### Requirements
- **Filename**: `assets/splash.png`
- **Size**: 1284 x 2778 pixels (iPhone 14 Pro Max)
- **Format**: PNG
- **Background Color**: Use `backgroundColor: "#FFFBF5"` in app.json

### Design Approach
The splash screen should include:
- Brand logo (centered)
- App name
- Optional tagline
- App icon
- Soft cream background

### SVG Splash Screen Template

```svg
<svg width="1284" height="2778" viewBox="0 0 1284 2778" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1284" height="2778" fill="#FFFBF5"/>
  
  <!-- Logo/Icon Circle (centered vertically around 1200px) -->
  <circle cx="642" cy="1200" r="140" fill="#FFF8DC" stroke="#F5DEB3" stroke-width="4"/>
  
  <!-- Notepad in circle -->
  <rect x="570" y="1100" width="144" height="200" fill="#FFFFFF" rx="12"/>
  <line x1="590" y1="1140" x2="710" y2="1140" stroke="#F5DEB3" stroke-width="4" stroke-linecap="round"/>
  <line x1="590" y1="1190" x2="710" y2="1190" stroke="#F5DEB3" stroke-width="4" stroke-linecap="round"/>
  <line x1="590" y1="1240" x2="710" y2="1240" stroke="#F5DEB3" stroke-width="4" stroke-linecap="round"/>
  
  <!-- App Name -->
  <text x="642" y="1480" font-size="80" font-weight="700" text-anchor="middle" fill="#2D2D2D" font-family="Arial, sans-serif">
    Notesie
  </text>
  
  <!-- Optional tagline -->
  <text x="642" y="1560" font-size="28" text-anchor="middle" fill="#808080" font-family="Arial, sans-serif">
    Notes Made Simple
  </text>
</svg>
```

### Tools to Create Splash Screen
1. **Figma** (recommended):
   - Create 1284x2778 artboard
   - Design splash screen
   - Export as PNG

2. **Canva**:
   - Search for "App Splash Screen"
   - Customize with Notesie branding
   - Download as PNG

3. **Online Generators**:
   - https://makeappicon.com/ (also handles splash screens)
   - https://www.appicon.co/
   - https://www.icon-generators.com/

---

## Using Make App Icon

1. Go to https://makeappicon.com/
2. Upload your 1024x1024 icon
3. Download the package (includes all sizes)
4. Extract to `assets/`
5. Update `app.json` to reference the correct icon files

---

## Adaptive Icon (Android)

For Android, you also need:
- **Filename**: `assets/adaptive-icon.png`
- **Size**: 1080 x 1080 pixels
- **Safe zone**: Center circle of 540x540 pixels

### Creating Adaptive Icon
Use the same design but ensure important elements are in the center circle.

---

## Quick Setup

### Fastest Way
1. Use Canva or Figma
2. Create icon and splash using templates
3. Export as PNG (1024x1024 for icon, 1284x2778 for splash)
4. Copy to `assets/` folder
5. Ensure filenames match app.json

### File Checklist
```
assets/
├── icon.png              (1024x1024) ✓
├── splash.png            (1284x2778) ✓
├── adaptive-icon.png     (1080x1080, Android)
└── favicon.png           (512x512, web)
```

---

## Design Resources

**Color Picker Tools**:
- https://coolors.co/ (find complementary colors)
- https://www.colordot.it/ (intuitive color selection)

**Icon Design Inspiration**:
- https://dribbble.com/search/note-app
- https://www.behance.net/ (search "note taking app")
- Apple Notes, Notion, Microsoft OneNote

**Free Design Assets**:
- https://unsplash.com/ (background images)
- https://www.flaticon.com/ (icons)
- https://www.undraw.co/ (illustrations)

---

## Production Checklist

Before submitting to App Store:

- [ ] Icon is 1024x1024 PNG
- [ ] Splash screen is 1284x2778 PNG
- [ ] Both files are in `assets/` folder
- [ ] app.json references correct filenames
- [ ] Icon looks good at all sizes (test in Figma)
- [ ] Icon has no alpha transparency (use solid background for corners)
- [ ] Colors match brand guidelines
- [ ] Logo is centered and visible

---

## Questions?

Visit Apple's App Store Icon Design Guidelines:
https://developer.apple.com/design/human-interface-guidelines/app-icons
