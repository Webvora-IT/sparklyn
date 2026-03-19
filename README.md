# ✨ SPARKLYN — Premium Cleaning Services

> Plateforme web internationale pour une entreprise de nettoyage premium — réservation en ligne, gestion des clients et tableau de bord admin en temps réel.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)
![i18n](https://img.shields.io/badge/i18n-FR%20%7C%20EN%20%7C%20ES-green)

---

## 🎯 C'est quoi SPARKLYN ?

SPARKLYN est un **site vitrine + système de réservation** pour une entreprise de nettoyage professionnelle. Les clients peuvent découvrir les services, consulter les tarifs et **réserver en ligne en 3 étapes**. L'admin gère les réservations, suit les clients et configure le site depuis un tableau de bord dédié.

### Problème résolu
Les entreprises de nettoyage perdent des clients car elles n'ont pas de moyen simple pour réserver en ligne. SPARKLYN automatise la prise de réservation 24h/24, envoie des confirmations et permet à l'admin de tout gérer depuis une seule interface.

---

## 🎬 Démo Vidéo

> 📹 **[Voir la démo complète](./docs/demo/sparklyn-demo.mp4)**

https://github.com/user-attachments/assets/sparklyn-demo

---

## 📸 Captures d'Écran

### Page d'Accueil — Hero
![Hero section](./docs/screenshots/01-hero.png)
*Section héro avec formulaire de devis rapide*

### Services de Nettoyage
![Services grid](./docs/screenshots/02-services.png)
*6 services avec prix de départ et descriptions*

### Système de Réservation (3 étapes)
![Booking step 1](./docs/screenshots/03-booking-step1.png)
*Étape 1 — Choisir le service, fréquence et nombre de pièces*

![Booking step 2](./docs/screenshots/04-booking-step2.png)
*Étape 2 — Choisir la date et le créneau horaire*

![Booking step 3](./docs/screenshots/05-booking-step3.png)
*Étape 3 — Coordonnées et adresse de prestation*

### Plans Tarifaires
![Pricing plans](./docs/screenshots/06-pricing.png)
*3 formules : Essentiel, Premium, Entreprise*

### Avis Clients
![Reviews page](./docs/screenshots/07-reviews.png)
*Témoignages clients avec notes étoiles*

### Admin — Dashboard
![Admin dashboard](./docs/screenshots/08-admin-dashboard.png)
*Tableau de bord : réservations du jour, revenus, clients actifs*

### Admin — Gestion des Réservations
![Admin bookings](./docs/screenshots/09-admin-bookings.png)
*Gérer les statuts : PENDING → CONFIRMED → IN_PROGRESS → COMPLETED*

### Admin — Gestion des Clients
![Admin clients](./docs/screenshots/10-admin-clients.png)
*Profils clients agrégés depuis les réservations (sans modèle Client séparé)*

---

## 👥 Rôles Utilisateurs

### 🌐 Visiteur (Public)

| Action | Description |
|--------|-------------|
| Consulter les services | 6 types de nettoyage avec prix de base |
| Voir les tarifs | 3 plans (Essentiel, Premium, Entreprise) |
| Réserver en ligne | Formulaire 3 étapes → sauvegardé en base de données |
| Lire les avis | Témoignages clients avec notes |
| Changer de langue | FR, EN ou ES |
| Pages légales | Confidentialité, CGU, Cookies (RGPD) |

### 🔑 Admin

| Section | Capacités |
|---------|-----------|
| **Dashboard** | Stats live (réservations, revenus, clients actifs, réservations récentes) |
| **Réservations** | Confirmer, démarrer, annuler, supprimer — suivi du statut complet |
| **Clients** | Profils automatiques depuis les réservations (email, tel, ville, total dépensé) |
| **Avis** | CRUD des avis clients, publier/dépublier |
| **Contacts** | Consulter les messages du formulaire de contact |
| **Paramètres** | Infos entreprise, horaires, zones d'intervention, tarifs |

---

## 🔄 Comment ça marche ?

### Flux de réservation

```
Client                           Système                         Admin
  │                                 │                               │
  │── Choisit un service ──────────►│                               │
  │── Choisit date & heure ────────►│                               │
  │── Saisit ses coordonnées ──────►│── Sauvegarde en PostgreSQL    │
  │◄── Confirmation affichée ───────│                               │
  │                                 │── Notification admin ────────►│
  │                                 │                               │
  │                                 │◄── Admin confirme ────────────│
  │◄── Email de confirmation ───────│                               │
  │                                 │◄── Admin démarre prestation───│
  │                                 │◄── Admin marque terminée ─────│
```

### Statut des réservations

```
PENDING ──► CONFIRMED ──► IN_PROGRESS ──► COMPLETED
                │
                └──────────────────────► CANCELLED
```

### Architecture

```
Navigateur                  Next.js Server              PostgreSQL
    │                            │                           │
    │── GET /reservation ───────►│                           │
    │◄── Page SSR ───────────────│                           │
    │                            │                           │
    │── POST /api/booking ──────►│── INSERT booking ────────►│
    │◄── { success: true } ──────│◄── OK ────────────────────│
    │                            │                           │
    │── GET /admin ─────────────►│── SELECT stats ──────────►│
    │◄── Dashboard page ─────────│◄── data ──────────────────│
```

---

## 🧹 Services Proposés

| Service | Prix de départ | Description |
|---------|---------------|-------------|
| Nettoyage résidentiel | 49 € | Appartements et maisons |
| Nettoyage commercial | 89 € | Bureaux et locaux professionnels |
| Nettoyage en profondeur | 129 € | Nettoyage complet intensif |
| Nettoyage de vitres | 49 € | Fenêtres intérieures et extérieures |
| Post-construction | 199 € | Après travaux et rénovations |
| Tapis et meubles | 79 € | Shampoing et traitement textiles |

---

## 📁 Structure du Projet

```
sparklyn/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Pages publiques (FR/EN/ES)
│   │   │   ├── page.tsx       # Page d'accueil
│   │   │   ├── reservation/   # Formulaire de réservation
│   │   │   ├── avis/          # Page des avis clients
│   │   │   ├── privacy/       # Politique de confidentialité
│   │   │   ├── terms/         # Conditions d'utilisation
│   │   │   └── cookies/       # Politique cookies
│   │   ├── admin/             # Panel admin
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── login/
│   │   │   ├── bookings/      # Gestion réservations
│   │   │   ├── clients/       # Profils clients
│   │   │   ├── reviews/       # Avis clients
│   │   │   ├── contacts/      # Messages de contact
│   │   │   └── settings/      # Configuration
│   │   └── api/               # Routes API
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx           # Avec formulaire devis rapide
│   │   ├── Services.tsx       # 6 services
│   │   ├── HowItWorks.tsx     # Processus en 4 étapes
│   │   ├── Pricing.tsx        # 3 plans tarifaires
│   │   ├── Booking.tsx        # Formulaire 3 étapes
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx         # Avec liens légaux localisés
│   └── lib/                   # prisma, cloudinary, auth
├── messages/                  # fr.json, en.json, es.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml         # Production (port 81)
└── docker-compose.dev.yml     # Développement (port 3001)
```

---

## 🚀 Démarrage

### Prérequis
- Node.js 20+
- Docker & Docker Compose
- Compte [Cloudinary](https://cloudinary.com)

### 1. Installation

```bash
cd sparklyn
npm install
cp .env.example .env
```

### 2. Variables d'environnement (`.env`)

```env
DATABASE_URL="postgresql://sparklyn:sparklyn_password@localhost:5433/sparklyn_db"
NEXTAUTH_SECRET="your-secret"           # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3001"
ADMIN_EMAIL="admin@sparklyn.com"
ADMIN_PASSWORD="Admin@Sparklyn2024"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Développement avec Docker

```bash
docker compose -f docker-compose.dev.yml up --build

# Première fois
docker compose -f docker-compose.dev.yml exec app npx prisma migrate dev
docker compose -f docker-compose.dev.yml exec app npm run db:seed
```

Accès : **http://localhost:3001**

### 4. Production

```bash
docker compose up --build -d
docker compose exec app npx prisma migrate deploy
```

Accès : **http://localhost:81**

---

## 🔑 Panel Admin

| URL | Description |
|-----|-------------|
| `/admin/login` | Connexion admin |
| `/admin` | Dashboard (stats live + réservations récentes) |
| `/admin/bookings` | Confirmer, démarrer, annuler les réservations |
| `/admin/clients` | Profils clients agrégés depuis les réservations |
| `/admin/reviews` | Ajouter, modifier, publier/dépublier les avis |
| `/admin/contacts` | Consulter les messages de contact |
| `/admin/settings` | Infos entreprise, horaires, zones, tarifs |

**Identifiants par défaut :**
- Email : `admin@sparklyn.com`
- Password : `Admin@Sparklyn2024`

> ⚠️ Changer ces identifiants avant de déployer en production.

---

## 🌍 Internationalisation

| Locale | URL | Langue | Direction |
|--------|-----|--------|-----------|
| Français | `/` | Défaut | LTR |
| Anglais | `/en/` | English | LTR |
| Espagnol | `/es/` | Español | LTR |

---

## 🗄️ Modèles de Données

| Modèle | Description |
|--------|-------------|
| `User` | Administrateur |
| `Booking` | Réservation (service, date, statut, coordonnées) |
| `Contact` | Messages du formulaire de contact |
| `Service` | Services de nettoyage |
| `Review` | Avis clients |
| `PricingPlan` | Plans tarifaires |
| `SiteConfig` | Configuration globale |

> **Note :** Il n'y a pas de modèle `Client` séparé. Les profils clients sont agrégés dynamiquement depuis les réservations (groupés par email).

---

## 🎨 Design System

```
Fond :       #ffffff / #f9fafb (light)
Primaire :   #14b8a6 (teal-500)
Accent :     #0ea5e9 (sky-500)
Ombre :      0 4px 24px rgba(20,184,166,0.15)
Gradient :   Teal → Sky → Teal (animé)
```

---

## 📜 Licence

MIT — Fait avec ❤️ pour les entreprises de services
