'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CalendarDays, Send, Home, CheckCircle, Loader2 } from 'lucide-react'

const services = ['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Window Cleaning', 'Post-Construction', 'Carpet & Upholstery']
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
const frequencies = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly']

export default function Booking() {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    service: '', frequency: '', date: '', timeSlot: '', rooms: '',
    name: '', email: '', phone: '', address: '', city: '', notes: ''
  })

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: form.service,
          frequency: form.frequency,
          rooms: form.rooms ? parseInt(form.rooms) : undefined,
          date: form.date,
          timeSlot: form.timeSlot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          address: form.address,
          notes: form.notes,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Booking failed')
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 text-sm"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 mb-4">
            Book a Cleaning
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Schedule Your
            <span className="gradient-text"> Clean Today</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Fill in the form below and we&apos;ll confirm your booking within 2 hours.
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-primary-50 to-sky-50 rounded-3xl p-12 text-center border border-primary-200"
          >
            <CheckCircle size={64} className="text-primary-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-500 mb-6">We&apos;ve received your booking and will confirm within 2 hours.</p>
            <button
              onClick={() => { setSuccess(false); setStep(1); setForm({ service: '', frequency: '', date: '', timeSlot: '', rooms: '', name: '', email: '', phone: '', address: '', city: '', notes: '' }) }}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-full font-semibold"
            >
              Book Another
            </button>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl p-8 clean-shadow-lg border border-gray-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            {/* Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[{ label: 'Service', icon: Home }, { label: 'Schedule', icon: CalendarDays }, { label: 'Details', icon: Send }].map((s, i) => (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => step > i + 1 && setStep(i + 1)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      step === i + 1
                        ? 'bg-gradient-to-r from-primary-500 to-sky-500 text-white clean-shadow'
                        : step > i + 1
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <s.icon size={14} />
                    {s.label}
                  </button>
                  {i < 2 && <div className={`w-8 h-0.5 mx-1 ${step > i + 1 ? 'bg-primary-400' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Service */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div>
                    <label className={labelClass}>Service Type *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {services.map(s => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => update('service', s)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                            form.service === s
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 text-gray-600 hover:border-primary-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Frequency</label>
                    <div className="flex flex-wrap gap-3">
                      {frequencies.map(f => (
                        <button
                          type="button"
                          key={f}
                          onClick={() => update('frequency', f)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                            form.frequency === f
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 text-gray-600 hover:border-primary-300'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Number of Rooms</label>
                      <select value={form.rooms} onChange={e => update('rooms', e.target.value)} className={inputClass}>
                        <option value="">Select...</option>
                        <option>Studio</option>
                        <option>1 bedroom</option>
                        <option>2 bedrooms</option>
                        <option>3 bedrooms</option>
                        <option>4 bedrooms</option>
                        <option>5+ bedrooms</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <motion.button
                        type="button"
                        onClick={() => form.service && setStep(2)}
                        whileHover={{ scale: 1.02 }}
                        disabled={!form.service}
                        className="w-full py-3 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-xl font-semibold disabled:opacity-50 transition-opacity"
                      >
                        Next: Choose Date →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Schedule */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={e => update('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Preferred Time *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => update('timeSlot', slot)}
                            className={`py-2 rounded-lg border text-xs font-medium transition-all ${
                              form.timeSlot === slot
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-200 text-gray-600 hover:border-primary-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={() => form.date && form.timeSlot && setStep(3)}
                      whileHover={{ scale: 1.02 }}
                      disabled={!form.date || !form.timeSlot}
                      className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-xl font-semibold disabled:opacity-50"
                    >
                      Next: Your Details →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone *</label>
                      <input required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 234 567 890" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>City *</label>
                      <input required value={form.city} onChange={e => update('city', e.target.value)} placeholder="London" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Address *</label>
                    <input required value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 High Street" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Special Instructions</label>
                    <textarea rows={3} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Any specific areas to focus on, pets, allergies..." className={inputClass + ' resize-none'} />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                      ← Back
                    </button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-500 to-sky-500 text-white rounded-xl font-semibold disabled:opacity-70"
                    >
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Booking...</> : <><Send size={16} /> Confirm Booking</>}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
