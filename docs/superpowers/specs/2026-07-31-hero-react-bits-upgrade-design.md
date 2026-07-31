# Hero Section Upgrade — React Bits Components

Date: 2026-07-31
Status: approved
Type: Visual/interaction enhancement (single section)

## Goal

Tambah wow-factor ke hero section dengan 3 React Bits components, tanpa mengubah layout bento/glass yang sudah ada atau menyentuh section lain. Fokus di first impression untuk visitor baru.

## Scope

**In scope:**
- Hero section (`components/sections/hero.tsx`)
- Tambah stats mini baru di hero (content dari `profile.stats` yang sudah ada)
- Install 3 React Bits components via shadcn CLI registry
- Reduced-motion fallback path

**Out of scope:**
- Sections lain (Technologies, About, Experience, Projects, Certifications, Contact)
- `components/Particles.tsx` (OGL)
- `lib/portfolio.ts` content (reuse data yang sudah ada)
- Light theme variant
- New pages atau routing
- Mobile-specific layout (cuma disable tilt di mobile)

## Komponen

### 1. `SplitText` — nama "Azmi."

Replace `<h1>` plain dengan SplitText component. Character-by-character reveal dengan stagger animation.

**Props:**
- `text`: "Azmi." (string)
- `className`: className heading existing (preserve gradient, sizing, tracking)
- `delay`: 30 (ms antar karakter)
- `duration`: 0.6 (detik per char)
- `ease`: "power3.out"
- `splitType`: "chars"
- `from`/`to`: opacity 0 + y: 20 → opacity 1 + y: 0
- `threshold`: 0 (trigger on mount, above the fold)
- `rootMargin`: "-50px"

**Behavior:**
- On mount: animate from invisible to visible
- IntersectionObserver fallback kalau mount trigger gagal (defensive)
- `prefers-reduced-motion: reduce` → render plain text, no animation

**Install:** `npx shadcn@latest add @react-bits/SplitText-TS-TW`

### 2. `CountUp` — 3 mini stats

Tambah section stats mini di hero, di bawah CTAs. 3 stats dari `profile.stats` yang sudah ada di `lib/portfolio.ts`.

**Data source:** `profile.stats` (sudah ada, tidak perlu edit)
- "7+ Years" → number 7
- "40k+ Users" → number 40 (suffix "k+")
- "10+ Projects" → number 10 (suffix "+")

**Props per CountUp:**
- `from`: 0
- `to`: extracted numeric value dari stat.value
- `duration`: 2 (detik)
- `ease`: "easeOut"
- `suffix`: extracted dari stat.value (regex: ambil non-digit suffix)
- `className`: monospace, besar, brand-colored

**Layout:**
- 3 kolom inline dengan separator vertikal tipis (border-l)
- Monospace number besar (text-2xl atau text-3xl, brand color)
- Label kecil muted di bawah (text-xs text-muted-foreground)
- Margin top dari CTAs: `mt-8` atau `mt-10`
- Mobile: stack vertikal tanpa separator, atau tetap inline (tergantung space)

**Animation trigger:** GSAP ScrollTrigger atau IntersectionObserver, delay 200ms setelah SplitText selesai
- `prefers-reduced-motion: reduce` → render final value langsung, no counting

**Install:** `npx shadcn@latest add @react-bits/CountUp-TS-TW`

### 3. `TiltedCard` — portrait

Wrap portrait container existing dengan TiltedCard. Glass frame, gradient glow, border tetap — cuma tambah tilt on mouse move.

**Props:**
- `rotateAmplitude`: 12 (derajat max)
- `scaleOnHover`: 1.02 (subtle lift)
- `children`: existing portrait markup (Image + decorative elements)
- `className`: preserve existing wrapper classNames

**Behavior:**
- Desktop: track mouse, rotate card X+Y based on cursor position
- Reset on mouse leave dengan smooth transition
- Mobile (no hover capability): tilt dimatikan via media query check atau feature detection (`window.matchMedia('(hover: hover)').matches`)

**Install:** `npx shadcn@latest add @react-bits/TiltedCard-TS-TW`

## Layout

Hero structure (after upgrade):

```
<section id="top" className="relative overflow-hidden px-5 pt-16">
  [ambient glow orbs — unchanged]
  
  <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
    
    {/* LEFT — 60% */}
    <div className="lg:col-span-7">
      [Available badge — unchanged]
      
      <h1 [SplitText wrapper] className="...">
        <SplitText text="Azmi." [existing gradient classes] />
      </h1>
      
      <p [role description — unchanged, still data-animate]>
        ...
      </p>
      
      <div [CTAs — unchanged] data-animate>
        [Contact Me button] [Download CV link]
      </div>
      
      {/* NEW: stats mini */}
      <div className="mt-8 flex items-center gap-6" data-animate>
        {profile.stats.slice(0, 3).map(s => (
          <div className="flex-1">
            <CountUp from={0} to={extractNumber(s.value)} suffix={extractSuffix(s.value)} className="font-mono text-2xl font-semibold text-brand" />
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* RIGHT — 40% */}
    <div className="relative lg:col-span-5" data-animate>
      [gradient glow border — unchanged]
      
      <TiltedCard className="..." rotateAmplitude={12} scaleOnHover={1.02}>
        [existing portrait markup]
      </TiltedCard>
    </div>
    
  </div>
</section>
```

## File structure

**New files:**
- `components/reactbits/split-text.tsx` (installed via shadcn)
- `components/reactbits/count-up.tsx` (installed via shadcn)
- `components/reactbits/tilted-card.tsx` (installed via shadcn)

**Modified files:**
- `components/sections/hero.tsx` (tambah stats, swap h1, wrap portrait)

**Folder `components/reactbits/`** dibuat agar React Bits components terpisah dari `components/reui/` dan `components/ui/`.

## Implementation notes

- Extract numeric value dari `stat.value`:
  ```ts
  const extractNumber = (v: string) => parseInt(v.replace(/[^0-9]/g, ''), 10)
  const extractSuffix = (v: string) => v.replace(/[0-9]/g, '').trim()
  ```
  Helper ini inline di hero.tsx, tidak perlu file terpisah (1-2 line).

- Stats dipotong ke 3 pertama saja (`profile.stats.slice(0, 3)`) untuk fit di hero. Sisa stats tetap di About section.

- `prefers-reduced-motion` handling: setiap React Bits component (atau wrapper) cek matchMedia dan skip animation. Untuk CountUp specifically, set `to` langsung render tanpa animate.

- GSAP `data-animate` masih handle role paragraph + CTAs fade-up. SplitText & CountUp independent (punya animation sendiri). Coordination: visual sequencing — SplitText jalan duluan (on mount), CountUp jalan setelah delay 200ms via IntersectionObserver.

- TiltedCard tidak pakai GSAP — pure CSS transform + JS mouse tracking. Tidak konflik dengan `data-animate`.

- Bundle size: 3 React Bits components total ~5-15 KB gzipped (estimasi, mostly CSS). Acceptable untuk single-page portfolio.

## Responsive behavior

- **Desktop (lg+):** Semua 3 komponen aktif. Stats inline 3-kol dengan separator. TiltedCard tilt on hover.
- **Tablet (md):** Semua aktif, stats inline. TiltedCard tilt on hover.
- **Mobile (sm):** SplitText tetap, CountUp stack vertikal (atau tetap inline kalau space cukup), TiltedCard tilt dimatikan (no hover). Layout lain mengikuti current responsive behavior.

## Risks & mitigations

- **Risk:** React Bits components depend on `framer-motion` atau `gsap` (perlu dicek setelah install)
  **Mitigation:** GSAP sudah ada di project. Kalau mereka butuh framer-motion, install sebagai dependency. Tambah ke package.json via `npm install`.
- **Risk:** Stats dengan suffix non-numeric (misal "100%") tidak bisa di-CountUp
  **Mitigation:** Slice ke 3 pertama dari `profile.stats` — pastikan yang dipakai numeric. Kalau ada yang non-numeric, fallback render plain text.
- **Risk:** TiltedCard bisa konflik dengan existing hover effect di portrait card (border-glow, scale)
  **Mitigation:** TiltedCard cuma handle rotate, scale subtle (1.02). Border glow + decorative elements tetap.
- **Risk:** Bundle size bengkak
  **Mitigation:** Monitor dengan `next build`, kalau >20 KB tambahan, pertimbangkan drop 1 komponen.

## Verify

- `npm run typecheck` (zero errors)
- `npm run lint` (zero warnings)
- `npm run build` (success, check bundle size)
- Manual visual check:
  - Hero on load: name reveal character-by-character ✓
  - Scroll trigger: stats count from 0 to value ✓
  - Hover portrait: tilt smoothly + slight scale ✓
  - Mobile (375px): no tilt, stats readable, name still animates ✓
- Reduced-motion path: name plain, stats final value, portrait static ✓
- Lighthouse performance: pastikan tidak ada regression (target: tetap >90)

## Skipped (not in scope)

- Light theme variant
- Section lain
- New content/stats data
- Custom animation library (pakai React Bits as-is)
- A/B testing different stats
