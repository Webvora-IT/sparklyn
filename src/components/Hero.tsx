'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Star, Shield, Leaf, Clock, ArrowRight, CheckCircle } from 'lucide-react'

const bubbles = [
  { size: 80, top: '10%', left: '5%', delay: 0 },
  { size: 50, top: '20%', right: '10%', delay: 1 },
  { size: 120, bottom: '20%', left: '3%', delay: 2 },
  { size: 60, top: '50%', right: '5%', delay: 0.5 },
  { size: 40, bottom: '30%', right: '15%', delay: 1.5 },
]

const services = [
  'Residential Cleaning',
  'Commercial Cleaning',
  'Deep Cleaning',
  'Window Cleaning',
  'Post-Construction',
  'Carpet Cleaning',
]

const trustBadges = [
  { icon: Shield, text: 'Fully Insured' },
  { icon: Leaf, text: 'Eco-Friendly' },
  { icon: Star, text: '5-Star Rated' },
  { icon: Clock, text: 'On-Time Guarantee' },
]

const stats = [
  { value: '10K+', label: 'Homes Cleaned' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '8+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
]

export default function Hero() {
  const [selectedService, setSelectedService] = useState('')

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-sky-50">
      {/* Animated bubbles */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-400/10 pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: (b as any).left,
            right: (b as any).right,
            bottom: (b as any).bottom,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4 + b.delay, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-100 to-sky-100 rounded-full -translate-x-1/4 opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full -translate-x-1/3 translate-y-1/3 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-6 border border-primary-200"
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Trusted by 500+ families &amp; businesses
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
            >
              Spotless Clean,
              <br />
              <span className="gradient-text">Every Time.</span>
              <br />
              <span className="text-4xl md:text-5xl text-gray-500 font-semibold">Guaranteed.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              Sparklyn provides premium, eco-friendly cleaning services for homes and businesses.
              Professional cleaners, flexible scheduling, and a 100% satisfaction guarantee.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {trustBadges.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon size={14} className="text-primary-600" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-full font-semibold text-lg clean-shadow-lg hover:opacity-90 transition-opacity"
              >
                Book Your Cleaning
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-200 text-primary-700 rounded-full font-semibold hover:bg-primary-50 transition-colors"
              >
                Our Services
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Quick booking card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 clean-shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Quote</h3>
            <p className="text-gray-500 text-sm mb-6">No commitment. Instant pricing.</p>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Choose service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Postcode</label>
                <input
                  placeholder="e.g. SW1A 1AA"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50">
                  <option value="">Select size...</option>
                  <option>Studio / 1 Bedroom</option>
                  <option>2-3 Bedrooms</option>
                  <option>4-5 Bedrooms</option>
                  <option>Large Property</option>
                  <option>Office / Commercial</option>
                </select>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-xl font-semibold clean-shadow hover:opacity-90 transition-opacity"
              >
                Get My Free Quote →
              </motion.button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-1 text-sm text-gray-400">
              <CheckCircle size={14} className="text-green-500" />
              No credit card required
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 text-center clean-shadow border border-gray-100"
            >
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
