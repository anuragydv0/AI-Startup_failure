# FAILFAST AI - Development Guide

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Overview

FAILFAST AI is a cinematic, premium AI SaaS landing page and dashboard for predicting startup failures. Built with Next.js, TailwindCSS, Framer Motion, and GSAP.

## File Organization

### Root Level Files
- `layout.tsx` - Next.js 14 root layout with font imports
- `globals.css` - Global styles, animations, utilities
- `page.tsx` - Main landing page (home)
- `tailwind.config.ts` - TailwindCSS theme configuration
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `package.json` - Dependencies and scripts

### Component Files
All components use `"use client"` directive for client-side interactivity.

#### Landing Page Components
1. **Navigation.tsx** - Fixed top navigation bar
   - Logo and branding
   - Menu items (Features, Roast Mode, Dashboard, Pricing)
   - Sign In CTA

2. **HeroSection.tsx** - Animated hero section
   - Main headline with glowing effects
   - Subheadline and CTA buttons
   - Animated background gradients
   - Floating statistics
   - Scroll indicator

3. **FeaturesSection.tsx** - Feature showcase
   - 4-column feature grid
   - Icon + title + description
   - Hover effects

4. **LiveAnalysisSection.tsx** - AI analysis showcase
   - Upload area with drag-and-drop
   - Real-time progress tracking
   - Terminal-style logs
   - Warning panels

5. **FailureComparisonSection.tsx** - Startup graveyard
   - Interactive 3D floating cards
   - 5 famous failed startups
   - Similarity matching
   - Detailed analysis view

6. **RoastModeSection.tsx** - Brutal AI commentary
   - Toggle-enable feature
   - Aggressive UI styling
   - Share functionality
   - Copy to clipboard

7. **CTASection.tsx** - Call-to-action section
   - Large centered CTA
   - Supporting benefits
   - Secondary actions

#### Dashboard Component
- **Dashboard.tsx** - Full intelligence report
  - Metrics grid (4 KPIs)
  - Category breakdown charts
  - Founder assessment
  - Competition heatmap
  - Critical warnings

#### Utility Components
- **Navigation.tsx** - Reusable nav bar
- **3D-Background.tsx** - Animated grid floor + particles
- **RiskGauge.tsx** - Animated risk meter visualization

### Utility Files
- `utils.ts` - Helper functions (classnames, formatting)
- `animations.ts` - Animation presets and variants
- `animationPresets.ts` - Extended animation configurations
- `colors.ts` - Centralized color system

### Configuration Files
- `next.config.js` - Next.js build configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.ts` - Tailwind theme and plugins
- `postcss.config.js` - CSS processing
- `.eslintrc.json` - Linting rules
- `.gitignore` - Git ignore patterns
- `package.json` - Dependencies and scripts

## Color System

### Tailwind Configuration
The tailwind.config.ts extends default colors:

```javascript
colors: {
  "black-primary": "#050505",
  "black-secondary": "#0D0D0D",
  "red-accent": "#FF3B30",
  "amber-accent": "#FFB020",
  "text-primary": "#F5F5F5",
  "text-muted": "#8A8A8A",
}
```

### Usage
```tsx
<div className="bg-black-primary text-text-primary">
  <span className="text-red-accent">Highlighted</span>
</div>
```

## Animation System

### Framer Motion
All animations use Framer Motion for React components.

```tsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### GSAP
Used for complex choreography and sequencing:

```tsx
import gsap from "gsap"

useEffect(() => {
  gsap.to(element, {
    duration: 2,
    value: 100,
    ease: "power2.out"
  })
}, [])
```

### Presets
Common animation patterns in `animationPresets.ts`:
- `fadeInUp` - Fade in with upward motion
- `fadeInScale` - Fade in with scale transform
- `slideInLeft/Right` - Slide from sides
- `glowPulse` - Glowing box-shadow animation
- `floatUp` - Gentle floating motion
- `rotateSlow` - Continuous slow rotation

## Component Structure

### Standard Component Pattern
```tsx
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

interface ComponentProps {
  // Props interface
}

const MyComponent = (props: ComponentProps) => {
  const [state, setState] = useState(false)

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      Content
    </motion.section>
  )
}

export default MyComponent
```

## Responsive Design

### Breakpoints (TailwindCSS)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Usage
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Performance Optimization

### Key Strategies
1. Code splitting via Next.js dynamic imports
2. Image optimization
3. Animation optimization for 60fps
4. Lazy loading heavy assets
5. CSS minification
6. Tree-shaking unused code

### Animation Performance
- Use `transform` and `opacity` for GPU acceleration
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Profile with Chrome DevTools Performance tab

## Development Workflow

### Creating a New Component
1. Create new .tsx file in appropriate location
2. Add "use client" if interactive
3. Define TypeScript interface for props
4. Use Framer Motion for animations
5. Implement responsive design
6. Add to appropriate page/section

### Adding Animations
1. Reference `animationPresets.ts` for patterns
2. Use `variants` for Framer Motion
3. Set `initial`, `animate`, `exit` states
4. Use `transition` for timing
5. Test for 60fps performance

### Styling New Components
1. Use TailwindCSS utilities primarily
2. Reference custom colors in `tailwind.config.ts`
3. Add global CSS to `globals.css` if needed
4. Use `glass`, `glow-red`, `cinematic-text` classes
5. Keep mobile-first approach

## Testing

### Manual Testing Checklist
- [ ] Mobile responsiveness (all breakpoints)
- [ ] Touch interactions on mobile
- [ ] Hover effects on desktop
- [ ] Animation smoothness (no janky frames)
- [ ] All links functional
- [ ] Form inputs working
- [ ] Cross-browser compatibility

### Performance Testing
```bash
npm run build
npm run start
# Test at http://localhost:3000
```

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Hosting Options
- Vercel (recommended - native Next.js support)
- Netlify
- AWS Amplify
- Self-hosted (Node.js server)

## Common Tasks

### Adding a New Section
1. Create component file with proper naming
2. Add animations and styling
3. Import in `page.tsx`
4. Add to component hierarchy
5. Update Navigation menu if needed

### Modifying Colors
Edit `tailwind.config.ts` colors object and references in `colors.ts`

### Adjusting Animations
Update `animationPresets.ts` or modify component transition props

### Changing Fonts
Modify font imports in `layout.tsx` and tailwind config

## Troubleshooting

### Animations Not Smooth
- Check for layout shifts (use fixed widths)
- Verify transform/opacity animations
- Profile with DevTools Performance
- Reduce particle count if needed

### Styling Not Applying
- Clear `.next` build cache: `rm -rf .next`
- Verify TailwindCSS content paths
- Check class naming (no hyphens in custom names)

### Build Errors
- Install dependencies: `npm install`
- Clear cache: `npm run build --reset`
- Check TypeScript errors: `npx tsc`

## Best Practices

1. **Keep components focused** - One responsibility per component
2. **Use TypeScript** - Define all prop interfaces
3. **Mobile first** - Design for mobile, then enhance
4. **Optimize animations** - Use transform/opacity, not dimensions
5. **Semantic HTML** - Use proper heading hierarchy
6. **Accessibility** - Include alt text, focus states
7. **Clean code** - Remove console logs, unused imports
8. **Documentation** - Comment complex logic

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://gsap.com/docs/)
- [React Documentation](https://react.dev)

## Support

For issues or questions:
1. Check the README.md
2. Review component documentation
3. Search existing issues
4. Create new issue with details

---

**Last Updated**: 2024
**Status**: Production Ready
