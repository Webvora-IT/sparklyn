'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Star } from 'lucide-react'
import { useLocale } from 'next-intl'

const footerLinks = {
  Services: [
    'Residential Cleaning',
    'Commercial Cleaning',
    'Deep Cleaning',
    'Window Cleaning',
    'Post-Construction',
    'Carpet & Upholstery',
  ],
  Company: ['About Us', 'Our Team', 'Careers', 'Blog', 'Press Kit'],
  Support: ['FAQ', 'Contact Us', 'Book a Clean', 'Vérifier ma réservation', 'Laisser un avis'],
}

const certifications = ['✓ Fully Insured', '✓ DBS Checked', '✓ Eco-Certified', '✓ ISO 9001']

function FooterLinks({ footerLinks }: { footerLinks: Record<string, string[]> }) {
  const locale = useLocale()
  return (
    <>
      {Object.entries(footerLinks).map(([title, links]) => (
        <div key={title}>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
          <ul className="space-y-2.5">
            {links.map((link) => (
              <li key={link}>
                {link === 'Laisser un avis' ? (
                  <Link
                    href={`/${locale}/avis`}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 transition-all duration-200 rounded" />
                    {link}
                  </Link>
                ) : link === 'Vérifier ma réservation' ? (
                  <Link
                    href={`/${locale}/reservation`}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 transition-all duration-200 rounded" />
                    {link}
                  </Link>
                ) : (
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 transition-all duration-200 rounded" />
                    {link}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 overflow-hidden">
      {/* Top CTA Banner */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 py-14 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-yellow-300 fill-yellow-300" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Prêt pour un Intérieur Impeccable ?
            </h2>
            <p className="text-primary-100 mb-7 text-lg max-w-xl mx-auto">
              Rejoignez plus de 500 clients satisfaits. Réservez votre premier nettoyage aujourd'hui !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-primary-50 transition-colors shadow-xl"
              >
                Réserver Maintenant →
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 border-2 border-white/60 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Devis Gratuit
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-sky-500 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">SPARKLYN</span>
            </div>

            <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-5">
              Services de nettoyage premium, écologiques et professionnels pour les particuliers et les entreprises.
              Fiables, ponctuels et toujours irréprochables.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+442079460000" className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors group">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                  <Phone size={13} className="text-primary-400 group-hover:text-white" />
                </div>
                +44 20 7946 0000
              </a>
              <a href="mailto:hello@sparklyn.com" className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors group">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                  <Mail size={13} className="text-primary-400 group-hover:text-white" />
                </div>
                hello@sparklyn.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <MapPin size={13} className="text-primary-400" />
                </div>
                UK & Europe
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <FooterLinks footerLinks={footerLinks} />
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-800">
          {certifications.map((cert, i) => (
            <span key={i} className="px-3 py-1.5 bg-gray-800 text-primary-400 text-xs font-medium rounded-full border border-gray-700">
              {cert}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 Sparklyn. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Politique de confidentialité', "Conditions d'utilisation", 'Cookies'].map((link) => (
              <a key={link} href="#" className="hover:text-gray-300 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
