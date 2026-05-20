# Component Snippets & Examples

This file contains reusable code snippets for common patterns in FAILFAST AI.

## Animation Patterns

### Fade In with Stagger
```tsx
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function StaggeredList({ items }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Hover Scale & Glow
```tsx
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="glass rounded-xl p-8"
  style={{
    boxShadow: "0 0 20px rgba(255, 59, 48, 0.5)"
  }}
>
  Content
</motion.div>
```

### Infinite Rotation
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }}
>
  <Icon />
</motion.div>
```

### Scroll Trigger Animation
```tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  Content appears when scrolled into view
</motion.section>
```

## Component Patterns

### Glass Card with Icon
```tsx
<div className="glass rounded-xl p-8 border border-white/10 hover:border-red-accent/30 transition-all group">
  <div className="w-12 h-12 rounded-lg bg-red-accent/10 flex items-center justify-center mb-4 group-hover:bg-red-accent/20">
    <IconComponent className="w-6 h-6 text-red-accent" />
  </div>
  <h3 className="text-xl font-bold mb-3">Title</h3>
  <p className="text-text-muted text-sm">Description</p>
</div>
```

### Metric Card
```tsx
<motion.div
  className="glass rounded-xl p-6 border border-white/10"
  whileHover={{ y: -5 }}
>
  <p className="text-text-muted text-sm mb-1">Label</p>
  <p className="text-3xl font-bold text-red-accent">72%</p>
  <p className="text-text-muted text-xs mt-2">Change info</p>
</motion.div>
```

### Button with Gradient
```tsx
<motion.button
  className="group relative px-8 py-4 bg-red-accent text-black-primary font-bold rounded-lg overflow-hidden"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <motion.span
    className="absolute inset-0 bg-gradient-to-r from-red-accent to-amber-accent opacity-0 group-hover:opacity-100 transition-opacity"
  />
  <span className="relative flex items-center gap-2">
    Button Text
    <ArrowRight className="w-5 h-5" />
  </span>
</motion.button>
```

### Progress Bar
```tsx
<div className="w-full bg-black-secondary rounded-full h-2 overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-red-accent to-amber-accent"
    initial={{ width: 0 }}
    animate={{ width: "65%" }}
    transition={{ duration: 1.5 }}
  />
</div>
```

## Styling Patterns

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map((item) => (
    <div key={item.id} className="glass rounded-xl p-6">
      {item.content}
    </div>
  ))}
</div>
```

### Full-Width Section with Padding
```tsx
<section className="relative min-h-screen py-20 px-4 grain overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-accent/5 to-transparent pointer-events-none" />
  
  <div className="relative z-10 max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Glassmorphism Container
```tsx
<div className="glass rounded-2xl p-8 border-2 border-red-accent/50">
  {/* Content with glassmorphism effect */}
</div>
```

### Text with Glow
```tsx
<motion.h1
  className="cinematic-text text-6xl md:text-7xl"
  animate={{ textShadow: ["0 0 10px rgba(255, 59, 48, 0.3)", "0 0 30px rgba(255, 59, 48, 0.8)"] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Text with glow effect
</motion.h1>
```

## Interactive Patterns

### Toggle Feature
```tsx
const [enabled, setEnabled] = useState(false)

return (
  <>
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? "ENABLED" : "DISABLED"}
    </button>
    
    {enabled && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Hidden content
      </motion.div>
    )}
  </>
)
```

### Hover Reveal
```tsx
const [hovered, setHovered] = useState(false)

<motion.div
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: hovered ? 1 : 0 }}
    transition={{ duration: 0.3 }}
  >
    Hover to reveal
  </motion.div>
</motion.div>
```

### Click to Copy
```tsx
const [copied, setCopied] = useState(false)

const handleCopy = async () => {
  await navigator.clipboard.writeText(textToCopy)
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}

<button onClick={handleCopy}>
  {copied ? "Copied!" : "Copy"}
</button>
```

## Animation Compositions

### Sequential Animation
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }}
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```

### Parallax Scroll Effect
```tsx
const y = useMotionValue(0)
const yRange = [0, 100]
const parallaxY = useTransform(y, yRange, [0, -100])

return (
  <motion.div style={{ y: parallaxY }}>
    Parallax content
  </motion.div>
)
```

## State Management Patterns

### Using useEffect for Animations
```tsx
useEffect(() => {
  gsap.to(element, {
    duration: 2,
    value: 100,
    onUpdate: function() {
      setState(this.targets()[0].value)
    }
  })
}, [])
```

### Animation Trigger on Scroll
```tsx
const controls = useAnimation()
const ref = useRef(null)

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      controls.start("visible")
    }
  })

  if (ref.current) {
    observer.observe(ref.current)
  }

  return () => observer.disconnect()
}, [controls])

<motion.div ref={ref} initial="hidden" animate={controls} />
```

## Performance Patterns

### Lazy Load Heavy Components
```tsx
import dynamic from "next/dynamic"

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>,
})

export default function Page() {
  return <HeavyComponent />
}
```

### Memoize Expensive Components
```tsx
import { memo } from "react"

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{data}</div>
})
```

### Optimize Animations with will-change
```tsx
<div className="will-change-transform">
  Animated content (use sparingly)
</div>
```

---

**Usage**: Copy and modify these snippets for your components.
**Last Updated**: 2024
