# SPARKLYN — Premium Cleaning Services Website

## Project Overview
SPARKLYN is a premium, international cleaning company website offering residential, commercial, deep cleaning, window cleaning, post-construction, and carpet/upholstery services.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (light theme) + Framer Motion
- **Database**: PostgreSQL via Prisma ORM
- **Deployment**: Docker + Docker Compose
- **Port**: 3001 (dev), 3001 (Docker)

## Project Structure
```
src/
  app/
    page.tsx              # Main landing page
    layout.tsx            # Root layout
    globals.css           # Global styles + custom utilities
    admin/                # Admin panel
      page.tsx            # Dashboard (bookings, revenue, clients)
      bookings/           # Booking management
      clients/            # Client management
      reviews/            # Reviews management
      settings/           # Site settings
    api/
      booking/route.ts    # Booking form API
  components/
    Navbar.tsx            # White navbar with scroll shadow
    Hero.tsx              # Hero + quick quote form
    Services.tsx          # 6 service cards
    HowItWorks.tsx        # 4-step process
    Pricing.tsx           # 3 pricing plans
    Booking.tsx           # 3-step booking form
    Testimonials.tsx      # Customer reviews
    Contact.tsx           # Contact form + info
    Footer.tsx            # Footer with CTA banner
  lib/
    prisma.ts             # Prisma client
    utils.ts              # cn() utility
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Seed data
```

## Design System — LIGHT THEME
- **Background**: White (`#ffffff`) / Gray-50 (`#f9fafb`)
- **Primary**: Teal (`#14b8a6` / `primary-500`)
- **Accent**: Sky blue (`#0ea5e9`)
- **Text**: Gray-900 / Gray-600
- **Shadow**: `clean-shadow` = `0 4px 24px rgba(20,184,166,0.15)`
- **Gradient text**: Teal → Sky → Teal (animated)

## CSS Utilities (globals.css)
```css
.gradient-text      /* Animated teal/sky gradient text */
.clean-shadow       /* Soft teal shadow */
.clean-shadow-lg    /* Larger teal shadow */
.glass-light        /* White glass effect */
```

## Database Schema
Models: User, Booking, Contact, Service, Review, PricingPlan

## Booking Status Flow
PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
                    ↘ CANCELLED

## Environment Variables
```bash
DATABASE_URL="postgresql://sparklyn:sparklyn_password@localhost:5433/sparklyn_db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3001"
```

## Commands
```bash
# Development
npm install
cp .env.example .env
docker-compose up postgres -d
npx prisma migrate dev
npm run dev                    # → http://localhost:3001

# Production
docker-compose up -d --build

# Database
npm run prisma:studio
npm run prisma:migrate
```

## Admin Panel
- URL: `/admin`
- Light theme matching main site style
- Sections: Dashboard, Bookings, Clients, Reviews, Settings

## Key Features
1. Quick quote form embedded in hero
2. 6 cleaning service cards with pricing
3. 4-step "How It Works" process
4. 3-tier pricing plans
5. 3-step booking form (service → schedule → details)
6. Customer reviews with star ratings
7. Contact form
8. Full admin panel with booking management

## Code Conventions
- `'use client'` for ALL interactive components
- Framer Motion for animations
- `useInView` from react-intersection-observer for scroll animations
- Light mode classes: `bg-white`, `text-gray-900`, `border-gray-200`
- Teal accents: `text-primary-600`, `bg-primary-500`, `border-primary-200`
- Cards: `bg-white rounded-3xl p-6 border border-gray-100 clean-shadow`

## Agents Available (in .claude/agents/)
- `sparklyn-dev` — Component development assistant
- `sparklyn-db` — Database & booking queries
- `sparklyn-admin` — Admin panel specialist
- `sparklyn-booking` — Booking system expert

## Skills Available (in .claude/commands/)
- `/dev` — Start development environment
- `/deploy` — Docker deployment
- `/new-component` — Create new component
- `/add-service` — Add a new cleaning service
