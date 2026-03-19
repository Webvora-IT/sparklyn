'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Send, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const services = [
  'Nettoyage résidentiel',
  'Nettoyage commercial',
  'Nettoyage en profondeur',
  'Nettoyage de vitres',
  'Après construction',
  'Tapis & revêtements',
]

export default function AvisPage() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [form, setForm] = useState({ name: '', location: '', service: '', content: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) { setError('Veuillez sélectionner une note.'); return }
    if (!form.name || !form.service || !form.content) { setError('Veuillez remplir tous les champs obligatoires.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors">
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
          >
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Merci pour votre avis !</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Votre témoignage a bien été soumis et sera publié après validation par notre équipe.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Retour à l&apos;accueil
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 rounded-full border border-teal-200 text-sm text-teal-600 mb-4">
                <Sparkles size={14} />
                <span>Témoignages clients</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Partagez votre expérience</h1>
              <p className="text-gray-500">Votre avis aide d&apos;autres clients à choisir Sparklyn avec confiance.</p>
            </div>

            <form onSubmit={submit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Votre note <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={36}
                        className={`transition-colors ${
                          star <= (hovered || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200 fill-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 self-center text-sm text-gray-500">
                      {['', 'Mauvais', 'Passable', 'Bien', 'Très bien', 'Excellent'][rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre nom <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Marie Dupont"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-sm"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <input
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="Paris"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-sm"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service utilisé <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-sm bg-white"
                >
                  <option value="">Sélectionner un service</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre témoignage <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Décrivez votre expérience avec Sparklyn..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-sm resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{form.content.length}/500 caractères</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
                Votre avis sera examiné par notre équipe avant d&apos;être publié. Merci pour votre confiance.
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {loading ? 'Envoi en cours...' : 'Soumettre mon avis'}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
