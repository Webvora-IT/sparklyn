'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { CalendarDays, Search, Check, X, Clock, Trash2, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminShell from '../AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
  COMPLETED: 'bg-gray-100 text-gray-600 border-gray-200',
  CANCELLED: 'bg-red-100 text-red-600 border-red-200',
}

export default function BookingsPage() {
  const { data: bookings = [], mutate, isLoading } = useSWR('/api/admin/bookings', fetcher)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    mutate()
    toast.success(`Status → ${status}`)
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    mutate()
    toast.success('Booking deleted')
  }

  const filtered = (bookings as any[]).filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminShell>
      <Toaster />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
                <CalendarDays size={18} className="text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            </div>
            <p className="text-gray-500 text-sm ml-12">{(bookings as any[]).length} total bookings</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white">
                {['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Client', 'Service', 'Date', 'City', 'Price', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((b: any) => (
                      <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{b.name}</div>
                          <div className="text-xs text-gray-500">{b.email}</div>
                          {b.phone && <div className="text-xs text-gray-400">{b.phone}</div>}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{b.service}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(b.date).toLocaleDateString('fr-FR')} {b.timeSlot}</td>
                        <td className="px-4 py-3 text-gray-600">{b.city}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{b.price ? `€${b.price}` : '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[b.status]}`}>{b.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {b.status === 'PENDING' && (
                              <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title="Confirm">
                                <Check size={14} />
                              </button>
                            )}
                            {b.status === 'CONFIRMED' && (
                              <button onClick={() => updateStatus(b.id, 'IN_PROGRESS')} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title="Start">
                                <Clock size={14} />
                              </button>
                            )}
                            {b.status === 'IN_PROGRESS' && (
                              <button onClick={() => updateStatus(b.id, 'COMPLETED')} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors" title="Complete">
                                <Check size={14} />
                              </button>
                            )}
                            {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                              <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="Cancel">
                                <X size={14} />
                              </button>
                            )}
                            <button onClick={() => deleteBooking(b.id)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">No bookings found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
