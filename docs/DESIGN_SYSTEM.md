# DEADPOOL AI - Design System

## Brand Identity

**Name**: DEADPOOL AI
**Tagline**: "Your startup is under investigation"
**Mood**: Intelligent, Futuristic, Brutal, Premium, Immersive
**Inspiration**: Apple × Interstellar × Linear.app × Stripe × Vercel

## Color Palette

### Primary Colors
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Black Primary | `#050505` | 5, 5, 5 | Main backgrounds |
| Black Secondary | `#0D0D0D` | 13, 13, 13 | Card backgrounds |
| Black Tertiary | `#1A1A1A` | 26, 26, 26 | Hover states |

### Accent Colors
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Red Accent | `#FF3B30` | 255, 59, 48 | Primary action, warnings |
| Red Hover | `#FF5B50` | 255, 91, 80 | Hover state |
| Red Dark | `#E8271F` | 232, 39, 31 | Pressed state |
| Amber Accent | `#FFB020` | 255, 176, 32 | Secondary accent |
| Amber Hover | `#FFC540` | 255, 197, 64 | Hover state |
| Amber Dark | `#E89D00` | 232, 157, 0 | Pressed state |

### Text Colors
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Text Primary | `#F5F5F5` | 245, 245, 245 | Main body text |
| Text Secondary | `#E0E0E0` | 224, 224, 224 | Secondary text |
| Text Muted | `#8A8A8A` | 138, 138, 138 | Tertiary/disabled text |
| Text Muted Hover | `#A0A0A0` | 160, 160, 160 | Muted hover state |

### Semantic Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#4ADE80` | Positive indicators |
| Warning | `#FFB020` | Warning states |
| Error | `#FF3B30` | Error states |
| Info | `#3B82F6` | Information |

## Typography

### Font Families
1. **Space Grotesk** - Headlines, cinematic text
   - Weight: 700 (bold)
   - Letter spacing: -0.02em
   - Line height: 1.1

2. **Satoshi** - Alternative headlines (optional)
   - Weight: 700
   - Letter spacing: normal

3. **Inter** - Body text and UI
   - Weight: 400, 500, 600
   - Letter spacing: normal

### Type Hierarchy

#### Cinematic Headlines
- Font: Space Grotesk
- Size: 6xl-8xl (48px-96px)
- Weight: 700
- Letter spacing: -0.02em
- Usage: Main section headlines

#### Large Headlines
- Font: Space Grotesk
- Size: 5xl (48px)
- Weight: 700
- Letter spacing: -0.01em
- Usage: Section titles

#### Medium Headlines
- Font: Space Grotesk
- Size: 3xl (30px)
- Weight: 700
- Usage: Subsection titles

#### Small Headlines
- Font: Inter
- Size: lg (18px)
- Weight: 600
- Usage: Card titles

#### Body Text
- Font: Inter
- Size: base (16px)
- Weight: 400
- Line height: 1.6
- Usage: Main content

#### Small Text
- Font: Inter
- Size: sm (14px)
- Weight: 400
- Color: text-muted
- Usage: Secondary info, captions

#### Tiny Text
- Font: Inter
- Size: xs (12px)
- Weight: 400
- Color: text-muted
- Usage: Timestamps, badges

## Spacing System

TailwindCSS 4-unit scale (4px increments)

```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 80px (5rem)
```

### Margin/Padding Guidelines
- Small sections: `mb-8` or `py-8`
- Medium sections: `mb-12` or `py-12`
- Large sections: `mb-20` or `py-20`
- Grid gaps: `gap-4` to `gap-8`
- Card padding: `p-6` or `p-8`
- Text spacing: `mb-2` to `mb-4`

## Border Radius

```
sm: 4px (0.25rem)
md: 8px (0.5rem)
lg: 12px (0.75rem)
xl: 16px (1rem)
full: 9999px
```

### Usage Guidelines
- Buttons: `rounded-lg`
- Cards: `rounded-xl` or `rounded-2xl`
- Small elements: `rounded-md` or `rounded-lg`
- Full circles: `rounded-full`

## Visual Effects

### Glassmorphism
```css
.glass {
  background: rgba(13, 13, 13, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Glow Effects
- **Red Glow**: `box-shadow: 0 0 20px rgba(255, 59, 48, 0.5)`
- **Red Large**: `box-shadow: 0 0 40px rgba(255, 59, 48, 0.8)`
- **Amber Glow**: `box-shadow: 0 0 20px rgba(255, 176, 32, 0.5)`

### Grain Overlay
Subtle SVG noise overlay at 3-5% opacity

### Gradients
- **Red to Amber**: `linear-gradient(45deg, #FF3B30, #FFB020)`
- **Dark Transparent**: `linear-gradient(180deg, rgba(5, 5, 5, 0.8), rgba(5, 5, 5, 0))`
- **Accent Radial**: `radial-gradient(circle, rgba(255, 59, 48, 0.2), transparent)`

## Components

### Buttons

#### Primary Button
- Background: Red Accent
- Text: Black Primary
- Padding: px-8 py-4
- Border radius: lg
- Font weight: bold
- Hover: Scale 1.05, glow effect
- Active: Scale 0.95

#### Secondary Button
- Background: Transparent
- Border: 2px solid text-muted
- Text: text-primary
- Padding: px-8 py-4
- Border radius: lg
- Font weight: bold
- Hover: Border changes to red-accent

#### Ghost Button
- Background: Transparent
- Text: text-primary
- Padding: px-6 py-2
- Hover: bg-red-accent/10

### Cards

#### Glass Card
- Background: rgba(13, 13, 13, 0.6)
- Backdrop filter: blur(20px)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: xl or 2xl
- Padding: p-6 or p-8
- Hover: Scale 1.02, border-red-accent/30

#### Metric Card
- Same as Glass Card
- Icon area: w-12 h-12, bg-red-accent/10
- Value: Large bold text
- Label: Small muted text

### Input Fields

#### Text Input
- Background: bg-black-secondary
- Border: border-white/10
- Border radius: md
- Padding: px-4 py-2
- Focus: border-red-accent, outline-none
- Font: Inter regular

#### Upload Area
- Background: glass
- Border: 2px dashed border-red-accent/30
- Hover: border-red-accent/60
- Padding: p-8 or p-12
- Border radius: 2xl

## Animations

### Timings
- Fast: 300ms
- Normal: 600ms
- Slow: 1000ms
- Cinematic: 1500ms

### Easing Functions
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`
- Power Out: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Power In: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Common Animations
- **Fade In**: Opacity 0 → 1
- **Slide Up**: Y-axis 30px → 0
- **Scale In**: Scale 0.9 → 1
- **Glow Pulse**: Box-shadow intensity oscillation
- **Float**: Y-axis -20px oscillation
- **Rotate**: Full 360° rotation

### Stagger Patterns
- Component stagger: 50ms
- Section stagger: 100ms
- Item stagger: 150ms

## Layout

### Grid System
- Max width: 1536px (2xl)
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Gap: gap-4, gap-6, or gap-8

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+
- Wide: > 1536px

### Section Padding
- Small: py-8
- Medium: py-12
- Large: py-20
- Hero/Full: min-h-screen

## Micro Interactions

### Hover States
- Buttons: Scale 1.05
- Cards: Y-axis -5px, border change
- Icons: Rotate 10°
- Links: Text-shadow glow, color change

### Active States
- Buttons: Scale 0.95
- Buttons: Slight brightness increase

### Focus States
- Keyboard focus: outline-red-accent
- Focus ring: ring-2 ring-red-accent

### Loading States
- Spinner: Rotating icon with glow
- Progress bar: Animated width increase
- Skeleton: Shimmer effect

## Accessibility

### Color Contrast
- Primary text on dark: WCAG AAA (7:1+)
- Secondary text on dark: WCAG AA (4.5:1+)
- Links: Underlined or distinct color

### Focus Management
- All interactive elements: Visible focus ring
- Tab order: Logical and intuitive
- Keyboard navigation: Full support

### Text Hierarchy
- Headings: Proper h1-h6 semantic use
- Links: Distinguishable from body text
- Form labels: Associated with inputs

### Motion
- Respect `prefers-reduced-motion`
- Provide non-animated alternatives
- Test with animations disabled

## Documentation References

### Color Variables
- TailwindCSS: `tailwind.config.ts`
- TypeScript: `colors.ts`
- CSS: `globals.css`

### Animation Presets
- Framer Motion: Component files
- GSAP: Complex sequences
- Presets: `animationPresets.ts`

### Component Examples
- Hero: `HeroSection.tsx`
- Cards: `FailureComparisonSection.tsx`
- Forms: `LiveAnalysisSection.tsx`
- Dashboard: `Dashboard.tsx`

## Usage Examples

### Applying Design System

#### Color Usage
```tsx
// Primary text on dark background
<div className="text-text-primary">Main content</div>

// Secondary/muted text
<p className="text-text-muted">Secondary info</p>

// Red accent for emphasis
<span className="text-red-accent">Important</span>
```

#### Typography
```tsx
// Cinematic headline
<h1 className="cinematic-text text-6xl md:text-7xl">Main Title</h1>

// Medium headline
<h2 className="font-grotesk font-bold text-3xl">Section Title</h2>

// Body text
<p className="text-base leading-relaxed">Body text content</p>
```

#### Spacing
```tsx
// Section padding
<section className="py-20 px-4">
  {/* Content */}
</section>

// Card spacing
<div className="p-8 mb-6">
  {/* Card content */}
</div>
```

#### Components
```tsx
// Glass card
<div className="glass rounded-xl p-8 border border-white/10">
  {/* Content */}
</div>

// Primary button
<button className="px-8 py-4 bg-red-accent text-black-primary font-bold rounded-lg">
  Action
</button>
```

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Production Ready
