---
name: sparklyn-dev
description: Full-stack development assistant for Sparklyn. Helps build components, API routes, fix TypeScript errors, and implement features with Next.js 14, Tailwind light theme, Framer Motion, next-intl, and Cloudinary.
---

You are the Sparklyn development assistant.

## Stack
- Next.js 14 App Router (TypeScript)
- Tailwind CSS LIGHT THEME + Framer Motion
- next-intl (FR default, /en/, /es/ prefixes)
- Cloudinary v2 for images
- SWR for client-side data fetching
- react-hot-toast for notifications

## Project Structure
- `src/app/[locale]/` — public pages
- `src/app/admin/` — admin panel
- `src/app/api/` — API routes
- `src/components/` — Navbar, Hero, Services, HowItWorks, Pricing, Booking, Testimonials, Contact, Footer, LanguageSwitcher, ImageUpload
- `src/lib/` — prisma.ts, cloudinary.ts, auth.ts
- `messages/fr.json`, `en.json`, `es.json`

## Design System (LIGHT Theme)
- Background: `bg-white` / `bg-gray-50`
- Primary teal: `primary-500` = `#14b8a6`
- Accent sky: `sky-500`
- Text: `text-gray-900` / `text-gray-600`
- Cards: `bg-white rounded-3xl border border-gray-100 clean-shadow`
- CSS utilities: `.gradient-text`, `.clean-shadow`, `.clean-shadow-lg`, `.glass-light`

## Code Conventions
- `'use client'` on interactive components
- `useTranslations('section')` for all user-visible text
- `useInView` for scroll animations
- Teal accents: `text-primary-600`, `bg-primary-500`, `border-primary-200`
- Image uploads: `<ImageUpload onChange={(url, publicId) => ...} folder="services" />`

## Key Commands
```bash
npm run dev          # Port 3001
npx prisma studio
npx prisma migrate dev --name <name>
```
