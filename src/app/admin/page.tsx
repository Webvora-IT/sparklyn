'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, CalendarDays, Users, Star,
  Settings, LogOut, Menu, X, TrendingUp,
  Sparkles, Bell, Search, ChevronRight, DollarSign, MessageSquare,
  type LucideIcon,
} from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type NavItem = { icon: LucideIcon; label: string; href: string; active?: boolean; badge?: string }
type Booking = { name: string; city: string; service: string; date: string; timeSlot?: string; status: string; price: number }

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
  { icon: CalendarDays, label: 'Bookings', href: '/admin/bookings' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
  COMPLETED: 'bg-gray-100 text-gray-700 border-gray-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { data: apiStats } = useSWR('/api/admin/stats', fetcher)
  const { data: recentData = [] } = useSWR('/api/admin/bookings', fetcher)
  const recentBookings = recentData.slice(0, 5)

  const stats = [
    { icon: CalendarDays, label: 'Pending Bookings', value: apiStats ? String(apiStats.pendingBookings) : '—', change: `${apiStats?.totalBookings ?? 0} total`, color: 'from-teal-400 to-teal-600', bg: 'bg-teal-50' },
    { icon: DollarSign, label: 'Revenue', value: apiStats ? `€${apiStats.revenue.toFixed(0)}` : '—', change: 'from completed', color: 'from-sky-400 to-sky-600', bg: 'bg-sky-50' },
    { icon: MessageSquare, label: 'New Contacts', value: apiStats ? String(apiStats.totalContacts) : '—', change: 'unread messages', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
    { icon: Star, label: 'Published Reviews', value: apiStats ? String(apiStats.totalReviews) : '—', change: 'live on site', color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-50' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-sky-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-gray-900 text-lg">SPARKLYN</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, href, badge, active }) => (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  active
                    ? 'bg-gradient-to-r from-primary-500 to-sky-500 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="text-sm font-medium flex-1">{label}</span>
                    {badge && (
                      <span className={`px-1.5 py-0.5 text-xs rounded-full font-bold ${active ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-600'}`}>
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link href="/">
            <motion.div
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-all"
            >
              <LogOut size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Back to Site</span>}
            </motion.div>
          </Link>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search bookings..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-sky-500 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-gray-900">Admin</div>
                <div className="text-xs text-gray-400">admin@sparklyn.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm">Monday, March 17, 2024</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 clean-shadow hover:clean-shadow-lg transition-all"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon size={20} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{stat.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 clean-shadow overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Bookings</h2>
                <Link href="/admin/bookings">
                  <span className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All <ChevronRight size={14} />
                  </span>
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
                    {recentBookings.map((booking: Booking, i: number) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-sky-100 flex items-center justify-center text-sm font-bold text-primary-600">
                              {booking.name[0]}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{booking.name}</div>
                              <div className="text-xs text-gray-400 hidden lg:block">{booking.city}</div>
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
                        <td className="px-5 py-4 text-right font-semibold text-gray-900 text-sm">{booking.price ? '€' + booking.price : '—'}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
