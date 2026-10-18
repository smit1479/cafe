# NOIR & CRÈME — Artisanal Iced Latte Scrollytelling Experience

A luxury, Awwwards-level interactive scrollytelling experience crafted with **Next.js 14 App Router**, **Framer Motion**, **Tailwind CSS**, and an optimized **HTML5 Canvas** 120-frame image sequence renderer.

---

## Architecture & Core Mechanics

1. **Sticky Canvas (`components/IcedLatteExperience.tsx`)**:
   - `400vh` outer scroll container with a sticky `100vh` canvas viewport.
   - High-DPI screen support (`window.devicePixelRatio` clamped to 2 for crisp rendering without GPU memory bloat).
   - Optical aspect-ratio preservation (`object-fit: contain` equivalent) centered on screen with void blending (`#050505`).
   - `useScroll` combined with `useSpring` (`stiffness: 100`, `damping: 30`) for physically believable fluid responsiveness.
   - `requestAnimationFrame` ticker scheduling to prevent redundant redraws.

2. **Asset Preloader & Luxury Loading Screen**:
   - Parallel preloading of all 120 frames with progress counter (0% to 100%).
   - Fallback hierarchy: loads `.webp` by default, falls back to `.jpg` frames, or triggers an ambient procedural canvas.
   - Minimalist coffee-themed spinner and progress bar.

3. **Four Storytelling Beats (`useTransform` normalized transitions)**:
   - **Beat A (0%–20%)**: *COLD. CREAMY. UNFORGETTABLE.*
   - **Beat B (25%–45%)**: *A BEAUTIFUL COLLISION.* (Aligned left)
   - **Beat C (50%–70%)**: *CHILLED TO PERFECTION.* (Aligned right)
   - **Beat D (75%–95%)**: *MAKE TIME TASTE BETTER.* (Centered with CTA)

---

## Directory Structure

```
iced-latte/
├── app/
│   ├── globals.css              # Custom dark theme, scrollbars, typography
│   ├── layout.tsx               # Luxury metadata, Google Fonts (Inter + Cormorant)
│   └── page.tsx                 # Main landing page & storytelling layout
├── components/
│   └── IcedLatteExperience.tsx  # Sticky canvas, sequence preloader & beats
├── public/
│   └── sequence/                # 120 animation frames
│       ├── frame_0.webp (or .jpg)
│       └── ...
│       └── frame_119.webp (or .jpg)
├── scripts/
│   └── convert-to-webp.sh       # Script to convert jpg frames to webp
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Setup & Running

```bash
# 1. Navigate to the project
cd /Users/smit/.gemini/antigravity/scratch/iced-latte

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```
