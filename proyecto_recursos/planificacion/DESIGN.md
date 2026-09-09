---
name: Industrial Steel & Satin Gold
description: A premium, subtle dark steel blue theme combined with warm satin gold accents, optimized for readability, visual depth, and professional industrial representation.
colors:
  bg-main: "#0F131D"      # Deep steel navy background (non-flat, readable)
  bg-alt: "#161B26"       # Lighter steel navy for cards and panels
  bg-deep: "#090C12"      # Ultra-deep steel navy for footers and page base
  bg-topbar: "rgba(15, 19, 29, 0.94)" # Semi-translucent topbar
  gold: "#EAB308"         # Satin Amber Gold accent
  gold-hover: "#FACC15"   # Bright Satin Gold
  text-white: "#FFFFFF"   # Highlight headers
  text-primary: "#E2E8F0" # Slate 200 for high-readability body text
  text-gray: "#94A3B8"    # Slate 400 for secondary copy
  text-dark: "#64748B"    # Slate 500 for captions and borders
  border: "#222936"       # Refined slate-blue borders
  border-strong: "#303B4E" # High-contrast slate-blue borders
  hero-overlay: "linear-gradient(135deg, rgba(15, 19, 29, 0.96) 40%, rgba(234, 179, 8, 0.05) 75%, transparent 100%)"
rounded:
  xs: 1px
  sm: 2px
  md: 4px
  lg: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  card:
    backgroundColor: "{colors.bg-alt}"
    borderColor: "{colors.border}"
    borderRadius: "{rounded.sm}"
    boxShadow: "0 8px 30px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "#0F131D"
    borderRadius: "{rounded.sm}"
    boxShadow: "0 4px 12px rgba(234, 179, 8, 0.2)"
  button-outline:
    backgroundColor: "transparent"
    borderColor: "rgba(255, 255, 255, 0.15)"
    textColor: "{colors.text-white}"
    borderRadius: "{rounded.sm}"
---

# Design System: Industrial Steel & Satin Gold

## Overview
This design system defines a premium industrial aesthetic for **Voladuras San Luis S.R.L.**, replacing the previous flat black background with a deep steel-navy blue. The goal is to provide a non-fatiguing, highly readable reading environment that enhances the promotional and technical message of the brand while delivering visual relief and tactile depth.

## Colors
- **Main Background (`#0F131D`):** A sophisticated dark blue-gray steel background. It provides excellent contrast for text without the harshness of pure black.
- **Card Background (`#161B26`):** Creates elevation and structure. The color difference with the main background is subtle yet distinct.
- **Accent Gold (`#EAB308`):** Restrained, warm industrial gold, used exclusively for highlights, CTAs, and active indicators.

## Elevation & Depth (Relief)
To remove the "flat" feel and add "relieve profesional" (tactile relief):
1. **Inset Top Highlights:** Cards and sections feature an inner top shadow `inset 0 1px 0 rgba(255, 255, 255, 0.04)` to simulate a bevel / light reflection on the top edge.
2. **Layered Shadows:** Drop shadows are tinted to dark blue (`rgba(0, 0, 0, 0.35)`) and balanced to avoid looking like separate floating elements.
3. **Smooth State Transitions:** Interactive elements slide down on click (`transform: scale(0.98) translateY(1px)`) and glow softly on hover.

## Shapes
- **Sharp & Technical Geometry:** Border-radius is kept strictly between `0px` and `2px` for main structural components and `4px` for buttons. This aligns with the heavy industry and mining theme.

## Do's and Don'ts
- **Do** ensure contrast between body text and backgrounds passes WCAG AA (min 4.5:1).
- **Don't** use generic black overlays or flat boundaries.
- **Do** use the satin gold accent sparingly to draw attention, never as a background for large text.
