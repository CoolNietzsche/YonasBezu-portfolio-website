# Yonas Bezu — Circus Artist Portfolio

One-page portfolio for Yonas Bezu, an Ethiopian circus artist (Bouncing Ball & Hat Juggling).
Built with React + Vite. It's a fully static site, so no server is needed.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Changing pictures

All images are in `client/public/images/`. To swap a photo, replace the file and keep the **same name**:

| File | Where it appears |
| --- | --- |
| `hero.jpg` | Full-width top banner (landscape, ~1920×1080) |
| `act-bouncing-ball.jpg` | Bouncing Ball act card + showreel poster (portrait, ~1200×1500) |
| `act-hat-juggling.jpg` | Hat Juggling act card + showreel poster (portrait, ~1200×1500) |
| `gallery/01.jpg` … | Gallery strip (portrait, ~900×1250) |
| `og-image.jpg` | Preview image when the link is shared (1200×630) |
| `mark.svg` | Logo mark |

To add or remove gallery photos, edit the `galleryItems` list near the top of `client/src/pages/Home.tsx`.
Contact details are in the `CONTACT` object in the same file.

Keep each JPG under ~400 KB (export at quality 80) so the site loads quickly.

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
