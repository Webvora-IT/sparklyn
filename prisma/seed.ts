import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Sparklyn database...')

  // Seed services
  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Residential Cleaning',
        description: 'Complete home cleaning tailored to your needs.',
        icon: 'Home',
        features: ['Kitchen & Bathrooms', 'Bedrooms & Living areas', 'Dusting & Vacuuming', 'Mopping all floors'],
        priceFrom: 49,
        duration: '2-4 hours',
        popular: false,
        order: 1,
      },
      {
        title: 'Commercial Cleaning',
        description: 'Professional office and commercial space cleaning.',
        icon: 'Building',
        features: ['Office spaces', 'Reception areas', 'Bathrooms', 'Conference rooms'],
        priceFrom: 89,
        duration: '3-6 hours',
        popular: true,
        order: 2,
      },
      {
        title: 'Deep Cleaning',
        description: 'Thorough deep clean reaching every hidden corner.',
        icon: 'Sparkles',
        features: ['Inside appliances', 'Behind furniture', 'Grout & tiles', 'Window tracks'],
        priceFrom: 129,
        duration: '5-8 hours',
        popular: false,
        order: 3,
      },
      {
        title: 'Window Cleaning',
        description: 'Crystal clear windows inside and out.',
        icon: 'Eye',
        features: ['Interior windows', 'Exterior windows', 'Frames & sills', 'Conservatories'],
        priceFrom: 35,
        duration: '1-3 hours',
        popular: false,
        order: 4,
      },
    ],
  })

  // Seed reviews
  await prisma.review.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Emma Thompson',
        location: 'London, UK',
        service: 'Residential Cleaning',
        content: "Sparklyn has been cleaning my house for 6 months. Always on time, thorough, and they leave my home smelling fresh!",
        rating: 5,
        published: true,
      },
      {
        name: 'Michael Chen',
        location: 'Manchester, UK',
        service: 'Commercial Cleaning',
        content: "Professional, discreet, and our employees love coming to a clean workspace every morning.",
        rating: 5,
        published: true,
      },
      {
        name: 'Sophie Laurent',
        location: 'Birmingham, UK',
        service: 'Deep Cleaning',
        content: "Booked a deep clean before moving in. Results were incredible! Worth every penny.",
        rating: 5,
        published: true,
      },
    ],
  })

  // Seed pricing plans
  await prisma.pricingPlan.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Basic',
        price: 49,
        period: 'per visit',
        description: 'Perfect for regular maintenance cleaning',
        features: ['Up to 2 bedrooms', 'Kitchen & bathrooms', 'Dusting & vacuuming', '2 hour session', 'Certified cleaner'],
        popular: false,
      },
      {
        name: 'Premium',
        price: 89,
        period: 'per visit',
        description: 'Our most popular package for full homes',
        features: ['Up to 4 bedrooms', 'Full kitchen deep clean', 'All bathrooms', 'Window cleaning included', '4 hour session', 'Priority scheduling'],
        popular: true,
      },
      {
        name: 'Business',
        price: 149,
        period: 'per visit',
        description: 'Complete solution for offices & commercial spaces',
        features: ['Unlimited space', 'Office & common areas', 'Restrooms & kitchens', 'Dedicated account manager', 'Weekly or daily service'],
        popular: false,
      },
    ],
  })

  console.log('✅ Sparklyn seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
