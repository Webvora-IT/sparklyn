'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDays, Star, DollarSign, MessageSquare, ChevronRight } from 'lucide-react'
import AdminShell from './AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type Booking = { id: string; name: string; city: string; service: string; date: string; timeSlot?: string; status: string; price?: number }

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
  COMPLETED: 'bg-gray-100 text-gray-700 border-gray-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
}

export default function AdminDashboard() {
  const { data: apiStats } = useSWR('/api/admin/stats', fetcher)
  const { data: recentData = [] } = useSWR('/api/admin/bookings', fetcher)
  const recentBookings = (recentData as Booking[]).slice(0, 5)

  const stats = [
    { icon: CalendarDays, label: 'Pending Bookings', value: apiStats ? String(apiStats.pendingBookings) : '—', change: `${apiStats?.totalBookings ?? 0} total`, color: 'from-teal-400 to-teal-600' },
    { icon: DollarSign, label: 'Revenue', value: apiStats ? `€${Number(apiStats.revenue).toFixed(0)}` : '—', change: 'from completed', color: 'from-sky-400 to-sky-600' },
    { icon: MessageSquare, label: 'New Contacts', value: apiStats ? String(apiStats.totalContacts) : '—', change: 'unread messages', color: 'from-purple-400 to-purple-600' },
    { icon: Star, label: 'Published Reviews', value: apiStats ? String(apiStats.totalReviews) : '—', change: 'live on site', color: 'from-yellow-400 to-orange-500' },
  ]

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <AdminShell>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm">{today}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xs text-teal-600 font-medium mt-1">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Recent Bookings</h2>
              <Link href="/admin/bookings" className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left text-xs text-gray-400 uppercase px-5 py-3">Client</th>
                    <th className="text-left text-xs text-gray-400 uppercase px-5 py-3 hidden md:table-cell">Service</th>
                    <th className="text-left text-xs text-gray-400 uppercase px-5 py-3">Date</th>
                    <th className="text-left text-xs text-gray-400 uppercase px-5 py-3">Status</th>
                    <th className="text-right text-xs text-gray-400 uppercase px-5 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-gray-400 text-sm">No bookings yet</td></tr>
                  ) : recentBookings.map((booking, i) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center text-sm font-bold text-teal-600">
                            {booking.name[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{booking.name}</div>
                            <div className="text-xs text-gray-400">{booking.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-sm hidden md:table-cell">{booking.service}</td>
                      <td className="px-5 py-4 text-gray-600 text-sm">{new Date(booking.date).toLocaleDateString('fr-FR')} {booking.timeSlot}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-xs rounded-full border font-medium ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-semibold text-gray-900 text-sm">
                        {booking.price ? `€${booking.price}` : '—'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
