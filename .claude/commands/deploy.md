Deploy Sparklyn to production with Docker + Nginx.

```bash
# 1. Set production values in .env (NEXTAUTH_SECRET, Cloudinary, DATABASE_URL with postgres host)
# 2. Build and start
docker compose up --build -d

# 3. Run migrations
docker compose exec app npx prisma migrate deploy

# 4. Seed (first deploy only)
docker compose exec app npx prisma db seed

# 5. Check logs
docker compose logs -f app nginx
```

Access via Nginx:
- Site: http://localhost:81
- Admin: http://localhost:81/admin

Build targets:
```bash
docker build --target runner -t sparklyn:prod .
docker build --target dev    -t sparklyn:dev  .
```

To enable SSL: uncomment SSL lines in `nginx/nginx.conf` and mount certs.
