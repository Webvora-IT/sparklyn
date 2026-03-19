'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, Calendar, Clock, MapPin, CheckCircle, XCircle, Clock4, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  PENDING:     { label: 'En attente',        icon: Clock4,        color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  CONFIRMED:   { label: 'Confirmée',          icon: CheckCircle,   color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-200' },
  IN_PROGRESS: { label: 'En cours',           icon: AlertCircle,   color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  COMPLETED:   { label: 'Terminée',           icon: CheckCircle,   color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  CANCELLED:   { label: 'Annulée',            icon: XCircle,       color: 'text-red-500',    bg: 'bg-red-50',    border: 'border-red-200' },
}

interface Booking {
  id: string
  name: string
  email: string
  service: string
  date: string
  timeSlot: string
  address: string
  city: string
  status: string
  createdAt: string
}

export default function ReservationPage() {
  const [email, setEmail] = useState('')
  const [reference, setReference] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const search = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email && !reference) { setError('Saisissez votre email ou référence de réservation.'); return }
    setLoading(true); setError(''); setSearched(false)
    try {
      const res = await fetch('/api/booking/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined, bookingId: reference || undefined }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Aucune réservation trouvée.'); setBookings([]); }
      else { setBookings(data.bookings || []) }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false); setSearched(true)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors">
            <ArrowLeft size={16} /> Retour à l&apos;accueil
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 rounded-full border border-teal-200 text-sm text-teal-600 mb-4">
            <Search size={14} /> Suivi de réservation
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vérifier ma réservation</h1>
          <p className="text-gray-500">Entrez votre email ou numéro de référence pour retrouver vos réservations.</p>
        </motion.div>

        {/* Search form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={search}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Référence</label>
              <input
                type="text"
                value={reference}
                onChange={e => setReference(e.target.value.toUpperCase())}
                placeholder="Ex: A1B2C3D4"
                maxLength={8}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-4">
              <XCircle size={16} /> {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : <Search size={18} />}
            {loading ? 'Recherche...' : 'Rechercher'}
          </motion.button>
        </motion.form>

        {/* Results */}
        {searched && bookings.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-sm text-gray-500">{bookings.length} réservation{bookings.length > 1 ? 's' : ''} trouvée{bookings.length > 1 ? 's' : ''}</p>
            {bookings.map((booking) => {
              const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG['PENDING']
              const StatusIcon = status.icon
              return (
                <div key={booking.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Référence</p>
                      <p className="font-mono font-bold text-gray-900 text-sm">#{booking.id.slice(-8).toUpperCase()}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${status.color} ${status.bg} ${status.border}`}>
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-teal-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Service</p>
                        <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-sky-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar size={16} className="text-sky-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(booking.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock size={16} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Créneau</p>
                        <p className="text-sm font-medium text-gray-900">{booking.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={16} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Adresse</p>
                        <p className="text-sm font-medium text-gray-900">{booking.address}, {booking.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Réservation créée le {new Date(booking.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* Help text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Besoin d&apos;aide ?{' '}
            <Link href="/#contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Contactez-nous
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
