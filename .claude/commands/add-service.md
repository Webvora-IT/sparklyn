Add a new cleaning service to Sparklyn.

**Option 1 — Via Admin Panel** (recommended):
1. Go to http://localhost:3001/admin (when service admin page is available)
2. Add via the services CRUD interface

**Option 2 — Via API**:
```bash
curl -X POST http://localhost:3001/api/admin/services \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Service",
    "description": "Service description",
    "icon": "Home",
    "features": ["Feature 1", "Feature 2"],
    "priceFrom": 59,
    "duration": "2-3 hours",
    "popular": false,
    "order": 7
  }'
```

**Option 3 — Via Seed** (`prisma/seed.ts`):
Add to the services array, then: `npm run db:seed`

**Add translations**: Update `services.items.[key]` in all 3 message files.

Available icons (Lucide): Home, Building, Sparkles, Window, Hammer, Sofa, Droplets, Star
