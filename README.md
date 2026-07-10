# atwoodhale
The main site for Atwood and hale business. ready to be published and get going. used for advertising most of my work but for now it is based on only selling landing pages

# Atwood & Hale — Website

A static, production-ready business website and long-form sales page for Atwood & Hale, built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, build tools, or dependencies required.

## Running the site

Because it's fully static, you can either:

1. Open `index.html` directly in a browser, or
2. Serve the folder with any basic web server, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`

## File structure

```
index.html            Homepage / main sales page
contact.html          Enquiry form + contact details
privacy-policy.html   Privacy policy
disclaimer.html       Disclaimer / terms of use
404.html              Custom "page not found" page
style.css             All styling (single file, documented sections)
script.js             Mobile nav, footer year, form validation + WhatsApp redirect
robots.txt            Search engine crawl rules
sitemap.xml           XML sitemap
logo.png / logo-light.png   Wordmark (light/dark backgrounds)
favicon.ico / favicon-512.png
profile.jpg           Founder photo placeholder
work-1.jpg, work-2.jpg, work-3.jpg   Portfolio placeholders
og-image.jpg          Social share image (Open Graph / Twitter Card)
```

## Before going live — required changes

The site is fully written and functional, but a few things use placeholder or assumed values and should be reviewed before launch:

1. **Domain name.** All canonical URLs, Open Graph tags, and the sitemap assume the domain `https://atwoodhale.com`. If the real domain is different, find-and-replace `atwoodhale.com` across all HTML files, `robots.txt`, and `sitemap.xml`.
2. **Images.** `logo.png`, `logo-light.png`, `favicon.ico`, `profile.jpg`, `work-1.jpg`, `work-2.jpg`, `work-3.jpg`, and `og-image.jpg` are generated placeholders (navy/gold, labelled) so the site never shows a broken image icon. Replace them with real brand and project assets, keeping the same filenames, or update the `src` attributes if you rename them.
3. **Portfolio section.** The three "Selected Work" cards describe representative project types (real estate, study abroad, solar), not real past clients — intentionally, since the brief specified no fabricated testimonials, logos, or case studies. Replace with real project details as they become available.
4. **Contact form backend.** The form currently validates input, saves a local copy in the browser's `localStorage` (visible only to that browser, not sent anywhere), and redirects the visitor to WhatsApp with a pre-filled message. To actually receive submissions, connect a backend:
   - Look for the comment `BACKEND INTEGRATION POINT` in `script.js`.
   - Options: a form service (Formspree, Getform, Web3Forms), a serverless function, or your own backend endpoint.
   - Replace the `localStorage` block with a `fetch()` call to your chosen endpoint.

## Design notes

- Typography: **Inter** for all interface and body text, **Newsreader** (italic) used sparingly as a signature accent for key words and numerals — loaded via Google Fonts `<link>` tags (no build step required).
- Color: navy ink (`#10192e`) on white/off-white, with a muted brass gold (`#b4893d`) as the single accent color — chosen to fit the "Atwood & Hale" partner-firm name and read as credible rather than trend-driven.
- Dark mode follows the visitor's system preference automatically (`prefers-color-scheme`), no toggle needed.
- The FAQ accordion uses native `<details>`/`<summary>` elements — no JavaScript required, fully keyboard and screen-reader accessible.
- Every section on the homepage is tied to a specific conversion purpose (attention, trust, objection handling, or a call to action) per the project brief — sections that didn't serve one of those purposes were left out.

## Accessibility

- Semantic HTML throughout (`header`, `nav`, `main`, `section`, `footer`, correct heading hierarchy).
- Visible focus states on all interactive elements.
- Skip-to-content link on every page.
- Form fields have associated `<label>` elements and inline error messaging.
- Respects `prefers-reduced-motion`.

## SEO

- Unique `<title>` and meta description per page.
- Canonical URLs on every page.
- Open Graph and Twitter Card tags for link previews.
- `ProfessionalService` structured data (JSON-LD) on the homepage.
- `robots.txt` and `sitemap.xml` included.
