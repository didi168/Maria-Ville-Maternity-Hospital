# Design Notes — Maria Ville Specialist Clinic & Maternity

## 1. Reference Analysis

- **Reference source:** Attached desktop screenshot (`media_1795636608603_6bd80d12.jpg`, Biztop layout).
- **Screenshot dimensions & assumed scale:** `602 × 1024 px` RGB image, representing a `1440 px` desktop viewport scaled at `0.418×` (`1440 / 602 = 2.392`). The screenshot covers the top ~3.2 sections of the page (top bar, header + hero, Section 2 "Our Approach", Section 3 "Who We Are?", and the top heading band of Section 4 "Our Services").
- **Lower sections continuation:** Sections below the screenshot crop (Full Services, HMO & Facility Standards, Patient Reviews, FAQ & Care Scope, 24/7 Contact & Appointment Request, Footer) extend the exact visual vocabulary of the upper sections: alternating `#F6F7F4` / `#FFFFFF` / `#083330` bands, rounded cards (`20px`–`24px`), pill buttons with circular `>>` badges, micro-starburst kickers, and crisp geometric typography.
- **Explicit user overrides applied:**
  1. **Brand colour palette & logo:** Replaced the corporate Biztop electric-lime palette with **Palette A (Botanical Emerald & Luminous Mint-Sage)** and a custom **Cradled Care** SVG emblem (`assets/svg/logo-placeholder.svg`), preserving the exact contrast architecture (Deep Dark Anchor + Luminous Accent + Warm Alabaster + White).
  2. **Mobile bottom CTA bar:** Explicitly **skipped** per user instruction — zero fixed or sticky CTA buttons on mobile.

---

## 2. Layout Tree & Measurements (at 1440 px desktop)

| Region | Measured Height / Width (at 1440 px) | Structure & Rhythm |
| :--- | :--- | :--- |
| **Container** | `max-width: 1140px` (`x ≈ 165px` to `1280px`) | Centered with `clamp(1rem, 4vw, 2.5rem)` horizontal gutter |
| **Top Utility Bar** | `~40px` tall, full-bleed `#7EE0B1` | 2-column flex row: tagline + email left, 24/7 + Hygeia HMO note right |
| **Header / Nav** | `~84px` tall, transparent over dark hero (transitions to subtle dark surface on scroll) | Left: emblem (`36px`) + wordmark; Center: 6 single-page anchor links; Right: pill CTA (`Book Appointment >>`) + mobile menu button (`< 1024px`) |
| **Hero** | `~760px` desktop height (`min-height: min(100dvh, 780px)`, `100vh` fallback) | Full-bleed editorial image on right blended with directional `#083330` dark-emerald overlay on left (`0%–52%`); left content column (`max-width: 580px`) with glass rating pill, uppercase `H1`, 2-line subcopy, pill CTA + circular `CALL US` phone action |
| **Section 2 — Our Approach** | Padding `clamp(4rem, 7vw, 6.25rem) 0`, `#F6F7F4` | Split 2-column header (`~52%` left kicker + `H2`, `~40%` right intro text) over a 3-column grid (`gap: 24px`, each card `~364px` wide) with signature **bottom-left inverted cutout notch** holding a pill button |
| **Section 3 — Who We Are** | Padding `clamp(4rem, 7vw, 6.25rem) 0`, `#FFFFFF` | 2-column asymmetric bento (`~48%` / `~48%`, `gap: 44px`). Left: `16:10` top photo + `38% / 62%` split (`10 Beds` Mint-Sage stat tile + `3:2` secondary photo). Right: kicker, `H2`, clinic story, `Explore Services >>` pill CTA + `MoH Licensed · Est. Dec 2017` badge, plus `48% / 52%` split bento cards (`4.4 / 5.0` rating + `Care & Access` chips) |
| **Section 4 — Our Services** | Padding `clamp(4rem, 7vw, 6.25rem) 0`, `#F6F7F4` | Mirrors reference bottom crop (`Our Services` kicker + `H2` left, quick-call CTA right) above a 3×2 responsive grid of all 6 verified services |
| **Section 5 — HMO & Facility Standards** | Padding `clamp(3.75rem, 6vw, 5.25rem) 0`, `#083330` | Deep emerald clinical assurance band highlighting Hygeia HMO (`ID: 5095`), MoH licence (`19/12/1/1/2/0036`), 24/7 10-bed inpatient care, wheelchair accessibility, and Debit/Credit/NFC payments |
| **Section 6 — Patient Reviews** | Padding `clamp(4rem, 7vw, 6rem) 0`, `#FFFFFF` | Verified `4.4 / 5.0 (5 Public Reviews)` summary header + 3-column bracketed placeholder review cards |
| **Section 7 — FAQ & Care Scope** | Padding `clamp(4rem, 7vw, 6rem) 0`, `#F6F7F4` | 2-column layout (intro + call card left, accessible accordion right) covering 24/7 care, Hygeia HMO/payments, accessibility, and transparent external referral pathways |
| **Section 8 — Contact & Appointment** | Padding `clamp(4rem, 7vw, 6.25rem) 0`, `#FFFFFF` | 2-column split: Deep Emerald direct-contact panel (`tel:`, WhatsApp, `mailto:`, address, map link, 24/7 hours) + warm alabaster static Appointment Request form (`<!-- TODO: connect to a form service -->`) |
| **Footer** | Padding `clamp(3.5rem, 5vw, 4.75rem) 0 calc(2rem + env(safe-area-inset-bottom))`, `#083330` | 4-column grid (Brand & logo, Quick Links, Core Services, Registration & Hours) + bottom baseline strip |

---

## 3. Colour Tokens (Sampled Reference vs. Approved Brand Palette A)

| Role | Reference Sampled Hex | Brand Palette A Token | Hex Value | WCAG Contrast Notes |
| :--- | :--- | :--- | :--- | :--- |
| Deep Anchor Dark | `#063231` | `--color-primary-dark` | `#083330` | White text `13.76:1` (AAA) |
| Deep Surface Elevated | `#0A403E` | `--color-primary-mid` | `#0E4541` | White text `10.55:1` (AAA) |
| Luminous Brand Accent | `#AFF173` / `#B6F67E` | `--color-accent` | `#7EE0B1` | `#083330` text `8.64:1` (AAA); on `#083330` `8.64:1` (AAA) |
| Accent Hover / Soft | `#9BE55E` | `--color-accent-strong` | `#63D19D` | `#083330` text `7.42:1` (AAA) |
| Warm Maternal Accent | — | `--color-warm-accent` | `#D9785F` (decorative) / `#B8553D` (text/UI) | `#B8553D` on `#FFFFFF` `4.77:1` (AA) |
| Rating Star Gold (Dark) | `#F4B740` | `--color-star-dark` | `#F2BE54` | On `#083330` `8.04:1` (AAA) |
| Rating Star Amber (Light) | `#E5A024` | `--color-star-light` | `#B87B14` | On `#F6F7F4` `3.32:1` (AA UI) |
| Warm Canvas Surface | `#F8F8F0` | `--color-surface-warm` | `#F6F7F4` | `#083330` text `12.79:1` (AAA) |
| Pure Surface | `#FFFFFF` | `--color-surface-white` | `#FFFFFF` | `#083330` text `13.76:1` (AAA) |
| Muted Body Text (Light) | `#556563` | `--color-text-muted` | `#455A57` | On `#FFFFFF` `7.36:1`; on `#F6F7F4` `6.84:1` (AA/AAA) |
| Muted Body Text (Accent) | `#1B3B38` | `--color-text-on-accent-muted` | `#16423E` | On `#7EE0B1` `7.00:1` (AAA) |
| Soft Text (Dark) | `#CED8D7` | `--color-text-on-dark-muted` | `#D6E5E2` | On `#083330` `10.59:1` (AAA) |
| Hairline Border (Light) | `#E6EAE6` | `--color-border-light` | `#DFE5E1` | Subtle card & input dividers |
| Hairline Border (Dark) | `rgba(255,255,255,0.14)` | `--color-border-dark` | `rgba(255, 255, 255, 0.14)` | Dark header/pill borders |

---

## 4. Typography

The reference uses a clean geometric neo-grotesque pairing (closest Google Fonts match: **Plus Jakarta Sans** for crisp uppercase display headlines and tight headings, paired with **DM Sans** for calm, high-legibility body copy and UI controls).

- **Fonts:** `Plus Jakarta Sans` (`600`, `700`, `800`) + `DM Sans` (`400`, `500`, `600`, `700`), loaded via Google Fonts with `display=swap`, `preconnect`, and system metric-matched fallbacks (`'Plus Jakarta Sans', 'Segoe UI', system-ui, -apple-system, sans-serif` and `'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif`).
- **Fluid Type Scale (`clamp()`):**
  - Hero `H1`: `clamp(2.125rem, 4.4vw, 3.625rem)` (`34px`–`58px`), `line-height: 1.08`, `letter-spacing: -0.025em`, `font-weight: 800`, uppercase.
  - Section `H2`: `clamp(1.75rem, 3vw, 2.625rem)` (`28px`–`42px`), `line-height: 1.16`, `letter-spacing: -0.02em`, `font-weight: 700`.
  - Card `H3`: `clamp(1.1875rem, 1.5vw, 1.375rem)` (`19px`–`22px`), `line-height: 1.28`, `font-weight: 700`.
  - Body text: `1rem` (`16px` minimum across all screens), `line-height: 1.65`.
  - Kicker / micro-labels: `0.8125rem`–`0.875rem` (`13px`–`14px`), `font-weight: 600`.
  - Bento big stat (`10`, `4.4`): `clamp(2rem, 3vw, 2.75rem)`, `font-weight: 800`.

---

## 5. Radii, Borders, Shadows & Signature Notched Card Geometry

- **Radii:**
  - Cards & bento photos: `20px` (`--radius-lg`)
  - Compact bento tiles & form container: `16px` (`--radius-md`)
  - Inputs & subtle chips: `10px` (`--radius-sm`)
  - Pill buttons, rating pill, tags: `999px` (`--radius-pill`)
- **Signature Notched Card (`Section 2 — Our Approach`):**
  - In the reference, each of the 3 feature cards sits on the `#F6F7F4` section canvas and features an **inverted bottom-left corner cutout** (`~168px` wide × `54px` tall) filled with the section background colour `#F6F7F4`, creating smooth concave corner fillets where the cutout meets the card body, with the pill CTA (`Explore More >>`) nestled cleanly inside the notch.
  - Built in pure CSS using a corner cutout wrapper (`background: var(--color-surface-warm); border-top-right-radius: 22px;`) paired with `::before` and `::after` concave quarter-circle `radial-gradient` masks matching each card's surface colour (`#FFFFFF`, `#7EE0B1`, `#083330`). Zero jagged edges, responsive at every viewport width.
- **Shadows:** Ultra-light architectural lift on white cards only (`0 8px 28px rgba(8, 51, 48, 0.045)`), reduced/removed on mobile to keep low-end Android rendering fast.
- **Icons:** Clean inline **Lucide-style SVGs** (`stroke-width: 1.75`, crisp geometric stroke icons matching the thin-line Biztop icon treatment), plus the custom `8-point` starburst kicker ornament from the reference.

---

## 6. Motion & Responsiveness Philosophy

- **Feel:** Calm, assured, and clinical — never bouncy or frantic. Hero elements stagger in smoothly on load (`0.65s`, `power3.out`, `y: 22px`, `opacity: 0`). Below-the-fold sections reveal cleanly with ScrollTrigger (`start: 'top 86%'`, `once: true`) animating strictly `transform` and `opacity`.
- **Smooth Scroll:** Lenis desktop smooth scroll synced directly to GSAP's ticker (`lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((time) => lenis.raf(time * 1000)); gsap.ticker.lagSmoothing(0);`), while keeping native touch scrolling on touch devices (`smoothTouch: false`, Lenis bypassed on `(pointer: coarse)` and disabled completely for `prefers-reduced-motion: reduce`).
- **Mobile Stability:** `ScrollTrigger.config({ ignoreMobileResize: true })`, refresh on `orientationchange`, lightened `gsap.matchMedia()` reveals on `< 768px`, and **zero fixed bottom CTA buttons** on mobile.
- **Progressive Enhancement:** Content remains 100% visible without JS or if CDNs fail: animation hiding activates only when an inline `<head>` script sets `document.documentElement.classList.add('js')` AND GSAP loads cleanly, backed by `<noscript>` rules and a short `1.8s` failsafe visibility timeout.
