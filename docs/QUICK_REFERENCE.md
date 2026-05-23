# ⚡ DEADPOOL AI - Quick Reference

## 🚀 Installation (Copy & Paste)

```bash
cd AI-StartUP-Failure
npm install
npm run dev
```

Open: http://localhost:3000

## 📚 Documentation Map

| What? | Where? | Read Time |
|-------|--------|-----------|
| Quick overview | PROJECT_SUMMARY.md | 5 min |
| Install & setup | SETUP_GUIDE.md | 10 min |
| Project info | README.md | 5 min |
| Dev guide | DEVELOPMENT.md | 15 min |
| Design system | DESIGN_SYSTEM.md | 10 min |
| Code examples | SNIPPETS.md | 10 min |
| File list | FILE_INDEX.md | 5 min |

## 🎨 Color Quick Reference

```
Black Primary:     #050505  (bg-black-primary)
Black Secondary:   #0D0D0D  (bg-black-secondary)
Red Accent:        #FF3B30  (text-red-accent)
Amber Accent:      #FFB020  (text-amber-accent)
Text Primary:      #F5F5F5  (text-text-primary)
Text Muted:        #8A8A8A  (text-text-muted)
```

## 🧩 Component Quick Links

| Component | File | Usage |
|-----------|------|-------|
| Nav bar | Navigation.tsx | Fixed header |
| Hero | HeroSection.tsx | Main hero |
| Features | FeaturesSection.tsx | Feature cards |
| Analysis | LiveAnalysisSection.tsx | AI demo |
| Startup graveyard | FailureComparisonSection.tsx | Failure cards |
| Roast mode | RoastModeSection.tsx | Brutal AI |
| CTA | CTASection.tsx | Call-to-action |
| Dashboard | Dashboard.tsx | Dashboard grid |
| Gauge | RiskGauge.tsx | Risk meter |
| Background | 3D-Background.tsx | Particles + grid |

## 🎬 Common Tasks

### Change Brand Color
Edit `tailwind.config.ts`:
```typescript
colors: {
  "red-accent": "#FF3B30",  // ← Change this
  "amber-accent": "#FFB020", // ← Change this
}
```

### Add Animation
Use preset from `animationPresets.ts`:
```tsx
<motion.div
  animate={{ opacity: [0.3, 0.5, 0.3] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Animated content
</motion.div>
```

### Create New Section
1. Create file: `MySectionName.tsx`
2. Add `"use client"` at top
3. Use Framer Motion
4. Import in `page.tsx`
5. Add to component hierarchy

### Change Font
Edit `layout.tsx` font imports and `tailwind.config.ts`

### Adjust Spacing
Use TailwindCSS units:
- `p-4` = 1rem padding
- `m-8` = 2rem margin
- `gap-6` = 1.5rem gap

## 📱 Responsive Breakpoints

```
Mobile:      < 640px  (sm)
Tablet:      640-1024 (md, lg)
Desktop:     1024+    (lg, xl)
Ultra-wide:  1536+    (2xl)
```

Usage:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## ✨ Animation Patterns

### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
```

### Slide Up
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

### Scale
```tsx
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
```

### Hover Effect
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## 🎯 File Structure

```
Root Files:
├── layout.tsx          ← Root layout
├── page.tsx            ← Home page
├── globals.css         ← Global styles
├── tailwind.config.ts  ← Theme config
└── package.json        ← Dependencies

Components (*.tsx):
├── Navigation.tsx
├── HeroSection.tsx
├── FeaturesSection.tsx
├── LiveAnalysisSection.tsx
├── FailureComparisonSection.tsx
├── RoastModeSection.tsx
├── CTASection.tsx
├── Dashboard.tsx
├── RiskGauge.tsx
└── 3D-Background.tsx

Utilities:
├── utils.ts
├── colors.ts
├── animations.ts
└── animationPresets.ts
```

## 🚀 Deploy Commands

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build Locally
```bash
npm run build
npm run start
```

## 🔍 Debugging Tips

### Check Performance
```
Chrome DevTools → Performance tab
Look for: Green 60fps target
```

### TypeScript Errors
```bash
npx tsc --noEmit
```

### ESLint Issues
```bash
npm run lint
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 💡 Pro Tips

1. **Mobile First** - Test mobile before desktop
2. **Use DevTools** - Chrome DevTools is your friend
3. **Reference SNIPPETS** - Copy animation patterns
4. **Stick to Colors** - Use the color system
5. **Read Components** - Learn from existing code
6. **Test Performance** - Use LightHouse

## 🎨 Glassmorphism Shortcut

```tsx
<div className="glass rounded-xl p-8 border border-white/10">
  Automatic glass effect!
</div>
```

Equivalent to:
```css
background: rgba(13, 13, 13, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## ⚡ Glow Effect Shortcut

```tsx
<div className="glow-red">
  Red glow effect
</div>
```

## 🎬 Typography Classes

```
cinematic-text     ← Space Grotesk bold headlines
text-glow          ← Text glow effect
```

## 🔧 NPM Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Run production
npm run lint       # Check linting
```

## 📞 Emergency Commands

```bash
# Port in use?
npx kill-port 3000

# Build failing?
rm -rf .next && npm run build

# Weird styling?
npx tailwindcss rebuild

# Type errors?
npx tsc --noEmit
```

## 📍 Main Pages

- **Home**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard (add when created)

## 🎯 Next Steps

1. ✅ Install: `npm install`
2. ✅ Start: `npm run dev`
3. ✅ Explore: Visit all sections
4. ✅ Read: Check DEVELOPMENT.md
5. ✅ Customize: Edit components
6. ✅ Deploy: Follow SETUP_GUIDE.md

## ❓ Need Help?

- **Install issues** → See SETUP_GUIDE.md
- **Dev questions** → See DEVELOPMENT.md
- **Design questions** → See DESIGN_SYSTEM.md
- **Code examples** → See SNIPPETS.md
- **File locations** → See FILE_INDEX.md

## ✅ Quick Checklist

- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Visited http://localhost:3000
- [ ] Scrolled through sections
- [ ] Read PROJECT_SUMMARY.md
- [ ] Read DEVELOPMENT.md
- [ ] Explored component files
- [ ] Ready to customize

---

**Print this page for quick reference!**

**Status**: ✅ Ready to Ship
**Last Updated**: January 2024
