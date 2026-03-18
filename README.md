# ✨ SPARKLYN — Premium Cleaning Services

> International premium cleaning company website offering residential, commercial, deep cleaning, and more — built for scale.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)

---

## ✨ Features

- **Light theme** — Clean professional design with teal accents
- **Multilingual** — French (default), English, Spanish via `next-intl`
- **Online Booking** — 3-step booking form → saved to database
- **Dynamic Admin Panel** — Manage bookings, reviews, settings in real-time
- **Cloudinary** — Image upload for services and team
- **Authentication** — NextAuth.js with JWT
- **Nginx** — Reverse proxy with gzip, rate limiting, security headers
- **Docker** — Multi-stage builds (dev / builder / production)
- **Animations** — Framer Motion with scroll-triggered effects

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Database | PostgreSQL 16 + Prisma ORM |
| Auth | NextAuth.js (JWT) |
| Images | Cloudinary v2 |
| i18n | next-intl (FR / EN / ES) |
| Deployment | Docker + Nginx |

## 📁 Project Structure

```
sparklyn/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Public pages (locale-aware)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── admin/             # Admin panel
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── login/         # Auth
│   │   │   ├── bookings/      # Booking management
│   │   │   ├── reviews/       # Customer reviews
│   │   │   └── settings/      # Site config
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── Navbar.tsx         # With LanguageSwitcher
│   │   ├── Hero.tsx           # With quick quote form
│   │   ├── Services.tsx       # 6 cleaning services
│   │   ├── HowItWorks.tsx     # 4-step process
│   │   ├── Pricing.tsx        # 3 pricing plans
│   │   ├── Booking.tsx        # 3-step booking form
│   │   ├── Testimonials.tsx   # Customer reviews
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ImageUpload.tsx
│   ├── lib/                   # prisma, cloudinary, auth
│   └── i18n.ts
├── messages/                  # fr.json, en.json, es.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── nginx/
│   ├── nginx.conf             # Production
│   └── nginx.dev.conf         # Development
├── Dockerfile                 # Multi-stage
├── docker-compose.yml         # Production (port 81)
└── docker-compose.dev.yml     # Development (port 3001)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- A [Cloudinary](https://cloudinary.com) account

### 1. Clone & Install

```bash
git clone https://github.com/ibrahim-a-developper/sparklyn.git
cd sparklyn
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```env
DATABASE_URL="postgresql://sparklyn:sparklyn_password@localhost:5433/sparklyn_db"
NEXTAUTH_SECRET="your-secret-here"           # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3001"
ADMIN_EMAIL="admin@sparklyn.com"
ADMIN_PASSWORD="Admin@Sparklyn2024"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Start Development

```bash
# Start DB + Nginx + App with HMR
docker compose -f docker-compose.dev.yml up --build

# First time: run migrations & seed
docker compose -f docker-compose.dev.yml exec app npx prisma migrate dev
docker compose -f docker-compose.dev.yml exec app npm run db:seed
```

Access: **http://localhost:3001**

### 4. Production Deploy

```bash
docker compose up --build -d
docker compose exec app npx prisma migrate deploy
```

Access via Nginx: **http://localhost:81**

## 📅 Booking System

The 3-step booking flow:

```
Step 1 — Service    →  Service type, frequency, rooms
Step 2 — Schedule   →  Date + time slot
Step 3 — Details    →  Name, email, phone, city, address, notes
```

### Booking Status Workflow

```
PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
                    ↘ CANCELLED
```

## 🔑 Admin Panel

| URL | Description |
|---|---|
| `/admin/login` | Login page |
| `/admin` | Dashboard (live stats + recent bookings) |
| `/admin/bookings` | Confirm, start, cancel, delete bookings |
| `/admin/reviews` | Add, edit, publish/unpublish reviews |
| `/admin/settings` | Company info, hours, service areas |

**Default credentials:**
- Email: `admin@sparklyn.com`
- Password: `Admin@Sparklyn2024`

> ⚠️ Change these credentials before deploying to production.

## 🌍 Internationalization

| Locale | URL | Language |
|---|---|---|
| French | `/` | Default (no prefix) |
| English | `/en/` | English |
| Spanish | `/es/` | Spanish |

## 🧹 Services

| Service | Starting Price |
|---|---|
| Residential Cleaning | €49 |
| Commercial Cleaning | €89 |
| Deep Cleaning | €129 |
| Window Cleaning | €49 |
| Post-Construction | €199 |
| Carpet & Upholstery | €79 |

## 🐳 Docker Stages

| Stage | Target | Use |
|---|---|---|
| `base` | — | Node 20 Alpine |
| `dev-deps` | — | All dependencies |
| `dev` | `dev` | Hot reload dev server |
| `builder` | `builder` | Next.js production build |
| `runner` | `runner` | Minimal production image |

## 🗄️ Database Schema

Models: `User` · `Booking` · `Contact` · `Service` · `Review` · `PricingPlan` · `SiteConfig`

```bash
npx prisma studio          # Visual DB editor
npx prisma migrate dev     # Create migration
npx prisma db seed         # Seed data
```

## 🎨 Design System

```
Background:  #ffffff / #f9fafb
Primary:     #14b8a6 (teal-500)
Accent:      #0ea5e9 (sky-500)
Shadow:      0 4px 24px rgba(20,184,166,0.15)
Gradient:    Teal → Sky → Teal (animated)
```

## 📜 License

MIT — Built with ❤️ by [Ibrahim](https://github.com/ibrahim-a-developper)
