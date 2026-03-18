'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: 49,
    period: 'per visit',
    description: 'Perfect for regular maintenance cleaning',
    features: [
      'Up to 2 bedrooms',
      'Kitchen & bathrooms',
      'Dusting & vacuuming',
      'Mopping floors',
      '2 hour session',
      'Certified cleaner',
    ],
    cta: 'Book Basic',
    popular: false,
    color: 'border-gray-200',
    btnClass: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  },
  {
    name: 'Premium',
    price: 89,
    period: 'per visit',
    description: 'Our most popular package for full homes',
    features: [
      'Up to 4 bedrooms',
      'Full kitchen deep clean',
      'All bathrooms',
      'Inside fridges & ovens',
      'Window cleaning included',
      '4 hour session',
      'Priority scheduling',
      '100% satisfaction guarantee',
    ],
    cta: 'Book Premium',
    popular: true,
    color: 'border-primary-500',
    btnClass: 'bg-gradient-to-r from-primary-500 to-sky-500 text-white',
  },
  {
    name: 'Business',
    price: 149,
    period: 'per visit',
    description: 'Complete solution for offices & commercial spaces',
    features: [
      'Unlimited space',
      'Office & common areas',
      'Restrooms & kitchens',
      'Conference rooms',
      'Weekly or daily service',
      'Dedicated account manager',
      'After-hours availability',
      'Custom frequency plans',
    ],
    cta: 'Book Business',
    popular: false,
    color: 'border-gray-200',
    btnClass: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  },
]

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <br />
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No hidden fees. No surprises. Choose the plan that works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white rounded-3xl p-8 border-2 ${plan.color} transition-all ${
                plan.popular ? 'clean-shadow-lg scale-105' : 'clean-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary-500 to-sky-500 text-white text-xs font-bold rounded-full">
                  <Zap size={12} /> MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">€{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href="#booking"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-center py-3.5 rounded-2xl font-semibold transition-all ${plan.btnClass}`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          All prices include materials and equipment. VAT may apply.
          <a href="#contact" className="text-primary-600 hover:underline ml-1">Contact us for custom quotes.</a>
        </motion.p>
      </div>
    </section>
  )
}
