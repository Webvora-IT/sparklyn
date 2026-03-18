'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Building, Sparkles, Eye, Hammer, Armchair, ArrowRight, Check } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Complete home cleaning tailored to your needs. We clean every corner so you can relax.',
    features: ['Kitchen & Bathrooms', 'Bedrooms & Living areas', 'Dusting & Vacuuming', 'Mopping all floors'],
    priceFrom: '€49',
    duration: '2-4 hours',
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    popular: false,
  },
  {
    icon: Building,
    title: 'Commercial Cleaning',
    description: 'Professional office and commercial space cleaning. Keep your workspace spotless and productive.',
    features: ['Office spaces', 'Reception areas', 'Bathrooms', 'Conference rooms'],
    priceFrom: '€89',
    duration: '3-6 hours',
    color: 'from-sky-400 to-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    popular: true,
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'Thorough deep clean reaching every hidden corner. Perfect for moving in or seasonal refresh.',
    features: ['Inside appliances', 'Behind furniture', 'Grout & tiles', 'Window tracks'],
    priceFrom: '€129',
    duration: '5-8 hours',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    popular: false,
  },
  {
    icon: Eye,
    title: 'Window Cleaning',
    description: 'Crystal clear windows inside and out. Let the light in with streak-free professional cleaning.',
    features: ['Interior windows', 'Exterior windows', 'Frames & sills', 'Conservatories'],
    priceFrom: '€35',
    duration: '1-3 hours',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    popular: false,
  },
  {
    icon: Hammer,
    title: 'Post-Construction',
    description: 'Remove dust, debris and construction residue. Ready to move in clean after renovation.',
    features: ['Dust removal', 'Paint splashes', 'Construction debris', 'Final polish'],
    priceFrom: '€199',
    duration: '6-12 hours',
    color: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    popular: false,
  },
  {
    icon: Armchair,
    title: 'Carpet & Upholstery',
    description: 'Professional steam cleaning for carpets, sofas, and upholstery. Remove stains and allergens.',
    features: ['Carpet steam clean', 'Sofa & chairs', 'Stain removal', 'Deodorizing'],
    priceFrom: '€79',
    duration: '2-4 hours',
    color: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    popular: false,
  },
]

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Cleaning
            <br />
            <span className="gradient-text">For Every Space</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From regular home maintenance to one-off deep cleans, we have a service
            perfectly suited to your needs and budget.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-3xl p-6 border ${service.border} clean-shadow hover:clean-shadow-lg transition-all group overflow-hidden`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-sky-500 text-white text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>

                <ul className="space-y-2 mb-5">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-primary-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400">From</span>
                    <div className="text-2xl font-bold text-primary-600">{service.priceFrom}</div>
                    <span className="text-xs text-gray-400">{service.duration}</span>
                  </div>
                  <a
                    href="#booking"
                    className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 group/btn"
                  >
                    Book Now
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
