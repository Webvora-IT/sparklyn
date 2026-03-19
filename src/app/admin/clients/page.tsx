'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Users, Search, Mail, Phone, MapPin, CalendarDays, TrendingUp, Star } from 'lucide-react'
import AdminShell from '../AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Client {
  email: string
  name: string
  phone: string
  city: string
  bookingCount: number
  totalSpent: number
  lastBooking: string
  services: string[]
  statuses: string[]
}

export default function ClientsPage() {
  const { data: clients = [], isLoading } = useSWR<Client[]>('/api/admin/clients', fetcher)
  const [search, setSearch] = useState('')

  const filtered = (clients as Client[]).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = (clients as Client[]).reduce((sum, c) => sum + c.totalSpent, 0)
  const repeatClients = (clients as Client[]).filter(c => c.bookingCount > 1).length

  return (
    <AdminShell>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
              </div>
              <p className="text-gray-500 text-sm ml-12">{(clients as Client[]).length} clients uniques</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{(clients as Client[]).length}</p>
                <p className="text-xs text-gray-500">Clients total</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{repeatClients}</p>
                <p className="text-xs text-gray-500">Clients fidèles (2+ réservations)</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalRevenue > 0 ? `${totalRevenue.toFixed(0)} €` : '—'}
                </p>
                <p className="text-xs text-gray-500">Chiffre d'affaires total</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou ville..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white"
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <p>{search ? 'Aucun client trouvé' : 'Aucun client encore'}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Contact</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Ville</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Réservations</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Dépensé</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Dernière résa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((client, i) => (
                      <motion.tr
                        key={client.email}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {client.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{client.name}</p>
                              <p className="text-xs text-gray-500 md:hidden">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Mail size={11} />
                              <span className="truncate max-w-[180px]">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Phone size={11} />
                              {client.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin size={13} className="text-gray-400" />
                            {client.city}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              client.bookingCount > 1
                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {client.bookingCount} résa{client.bookingCount > 1 ? 's' : ''}
                            </span>
                            {client.bookingCount > 1 && (
                              <Star size={13} className="text-amber-400 fill-amber-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-sm font-semibold text-gray-900">
                            {client.totalSpent > 0 ? `${client.totalSpent.toFixed(0)} €` : '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CalendarDays size={12} />
                            {new Date(client.lastBooking).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
