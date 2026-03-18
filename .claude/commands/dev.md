Start the Sparklyn development environment.

With full Docker stack (nginx + HMR):
```bash
docker compose -f docker-compose.dev.yml up --build
```
Access: http://localhost:3001

Or local dev (faster):
```bash
# Terminal 1 — DB only
docker compose -f docker-compose.dev.yml up postgres -d

# Terminal 2 — Next.js
npm run dev   # → http://localhost:3001
```

First-time setup:
```bash
npm install
cp .env.example .env   # Fill in Cloudinary vars
npx prisma migrate dev
npm run db:seed
```

Admin: http://localhost:3001/admin (admin@sparklyn.com / Admin@Sparklyn2024)
