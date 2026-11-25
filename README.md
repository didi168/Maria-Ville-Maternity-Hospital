# Maria Ville Specialist Clinic & Maternity — Landing Page

Static, single-page responsive website built with plain HTML, CSS, and vanilla JavaScript for **Maria Ville Specialist Clinic & Maternity** (*also listed on Google Maps as Maria Ville Maternity Hospital*), hosted on GitHub Pages with no build step.

## File Structure

```text
index.html              Main landing page (semantic HTML, MedicalClinic JSON-LD)
css/style.css           Design tokens (:root), base styles, notched cards, bento grid, responsive rules
js/main.js              Lenis + GSAP ScrollTrigger motion, accessible mobile drawer, FAQ accordion, static form UI
assets/
  svg/logo-placeholder.svg   Single-source SVG emblem used in header, footer, and favicon
  img/                       Optimised WebP desktop/tablet/mobile variants + 1200x630 og-image.jpg
docs/design-notes.md    Reference analysis, measurements, Palette A tokens, and motion notes
404.html                Custom fallback page
robots.txt              Search crawler directives
sitemap.xml             XML sitemap (update live URL before launch)
.nojekyll               Disables Jekyll processing on GitHub Pages
```

## How to Edit Business Details (`<!-- EDIT: ... -->` Markers)

Search for `<!-- EDIT:` in `index.html`, `robots.txt`, and `sitemap.xml` to update live clinic information:

| Marker | File(s) | What to Update |
| :--- | :--- | :--- |
| `canonical URL / live domain` | `index.html`, `robots.txt`, `sitemap.xml` | Replace `https://username.github.io/maria-ville-maternity-hospital/` with your real GitHub Pages URL or custom domain |
| `Primary & secondary phone numbers` | `index.html`, `404.html` | `+234 806 029 6224` and `+234 907 995 1517` |
| `Verify WhatsApp number` | `index.html`, `js/main.js` | Update `https://wa.me/2348060296224?...` (digits only, no `+` or leading `0`) |
| `Clinic email address` | `index.html` | `attahra017@gmail.com` |
| `Street address & Google Maps URL` | `index.html` | Confirm exact address string and paste your direct Google Maps share link |
| `Verified patient reviews` | `index.html` | Replace the three `[Patient review goes here]` cards with real quotes from Google Reviews |
| `<!-- TODO: connect to a form service -->` | `index.html`, `js/main.js` | Connect `#appointment-form` to Formspree, Web3Forms, or your clinic's backend endpoint |

## Design Tokens (`:root` in `css/style.css`)

All brand colours, type scales, radii, and spacing live at the top of `css/style.css`:

- `--color-primary-dark: #083330` (Deep Clinical Emerald)
- `--color-primary-mid: #0e4541` (Elevated Emerald Surface)
- `--color-accent: #7ee0b1` (Luminous Mint-Sage)
- `--color-accent-strong: #63d19d` (Mint-Sage Hover/Border)
- `--color-warm-accent: #d9785f` / `--color-warm-accent-text: #b8553d` (Warm Maternal Terracotta)
- `--color-surface-warm: #f6f7f4` (Warm Alabaster Canvas)
- `--font-display` (`Plus Jakarta Sans`) and `--font-body` (`DM Sans`)

## Swapping the Logo in One Edit

Replace `assets/svg/logo-placeholder.svg` with your final square SVG mark (recommended `viewBox="0 0 48 48"`). The header, mobile drawer, footer, and browser favicon all reference this single path automatically.

## Deploying on GitHub Pages

1. Push the repository to GitHub (`main` branch).
2. In your GitHub repository, open **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait 1–2 minutes for GitHub Pages to publish your live URL.
6. Update the canonical URL, Open Graph image URL, `robots.txt`, and `sitemap.xml` with the live URL and push the update.

### Adding a Custom Domain

1. In **Settings -> Pages -> Custom domain**, enter your domain (e.g. `mariavilleclinic.com.ng`) and save (GitHub will create a `CNAME` file).
2. At your DNS registrar, add `A` records pointing `@` to GitHub Pages' four IPv4 addresses (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` record for `www` pointing to `<your-username>.github.io`.
3. Once DNS propagates, tick **Enforce HTTPS** in GitHub Pages settings.
