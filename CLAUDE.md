# Mahila Vastra - Project Guide

## Project Overview
Mahila Vastra is a premium Indian traditional wear online boutique (sarees, kurtis, ethnic wear for women and children). This is a **static site** hosted on **GitHub Pages** with a custom domain `www.mahilavastra.in`.

## Tech Stack
- **Pure HTML/CSS/JS** — no frameworks, no build tools, no package manager
- **Hosting**: GitHub Pages (auto-deploys on push to `main` via `.github/workflows/static.yml`)
- **Domain**: `www.mahilavastra.in` (CNAME configured)
- **Analytics**: Google Analytics `G-4J6JE2HD1Q`
- **Google Search Console**: Verified via `google129a90ef79a80f93.html`

## Project Structure
```
index.html              — Main landing page (product catalog, hero, about, contact)
assets/css/styles.css   — Full design system (5000+ lines)
assets/js/script.js     — Interactive functionality (parallax, mobile menu, animations)
assets/images/          — All site images (catalog/, logo/, feedback/)
blog/                   — SEO blog articles (5 posts + index.html)
policies/               — Legal pages (privacy, refund, terms)
llms.txt                — AI discoverability (summary)
llms-full.txt           — AI discoverability (full details)
robots.txt              — Crawler rules (allows all including AI bots)
sitemap.xml             — XML sitemap for search engines
.well-known/            — AI plugin manifest
```

## Key Design Decisions
- **WhatsApp-based shopping model** — no cart/checkout; all orders via WhatsApp (+91 97319 24834)
- **Color scheme**: Burgundy (#8B2942) primary, Gold (#B89655) accent, Ivory (#FDF8F3) background
- **Fonts**: Cormorant Garamond (headings), Montserrat (body), Great Vibes (decorative)
- **No product prices on site** — prices shared via WhatsApp chat

## SEO & Structured Data
- JSON-LD schemas: `WebSite`, `ClothingStore`, `FAQPage`, `Article` (on blog posts)
- Open Graph + Twitter Cards on all pages
- `hreflang` tags for `en-in` locale
- Blog posts have cross-links ("Related Articles" section)
- `llms.txt` and `llms-full.txt` for AI search engines

## Deployment
Push to `main` triggers GitHub Pages deploy automatically. No build step needed — files are served as-is. The `.nojekyll` file ensures dot-prefixed directories (`.well-known/`) are served.

## Common Tasks

### Adding a new blog post
1. Create HTML file in `blog/` (copy existing post as template)
2. Add Google Analytics, OG tags, Twitter cards, Article JSON-LD, hreflang
3. Add "Related Articles" section linking to other posts
4. Update `blog/index.html` with the new post
5. Add URL to `sitemap.xml` with current date
6. Update `llms.txt` and `llms-full.txt` with new blog link
7. Add cross-links from existing blog posts to the new one

### Adding a new product category
1. Add catalog card HTML in `index.html` under appropriate section
2. Add product image to `assets/images/catalog/`
3. Use descriptive alt text: "Mahila Vastra [Product] - [Description]"
4. Include `width="400" height="500" loading="lazy"` on image
5. Update `llms-full.txt` with new category details

### Updating SEO
- Sitemap dates must be updated when content changes
- Structured data lives in `<script type="application/ld+json">` blocks in `<head>`
- Do NOT use `meta keywords` tag (Google ignores it)
- Do NOT use `Product` schema without price/image (causes Search Console errors)

## Important Notes
- Instagram: `@mahilavastra.in`
- Facebook: `facebook.com/mahilavastra.in`
- All WhatsApp links use: `https://wa.me/919731924834?text=...`
- Images are PNG format (no WebP conversion pipeline yet)
- Blog posts have inline `<style>` blocks (not in main stylesheet)
