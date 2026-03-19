'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, CalendarDays, Star, Settings, LogOut,
  Menu, X, Bell, Sparkles, Wrench, MessageSquare, ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = { icon: LucideIcon; label: string; href: string; exact?: boolean }

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', exact: true },
  { icon: CalendarDays, label: 'Bookings', href: '/admin/bookings' },
  { icon: Wrench, label: 'Services', href: '/admin/services' },
  { icon: MessageSquare, label: 'Contacts', href: '/admin/contacts' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25 }}
        className="flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-gray-900 text-lg whitespace-nowrap">SPARKLYN</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-hidden">
          {navItems.map(({ icon: Icon, label, href, exact }) => {
            const active = isActive({ icon: Icon, label, href, exact })
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap',
                    active
                      ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 space-y-1 flex-shrink-0">
          <Link href="/" target="_blank">
            <motion.div whileHover={{ x: 2 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 cursor-pointer transition-all whitespace-nowrap"
            >
              <ExternalLink size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">View Site</span>}
            </motion.div>
          </Link>
          <motion.button whileHover={{ x: 2 }}
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-all whitespace-nowrap"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-gray-900">Admin</div>
                <div className="text-xs text-gray-400">Sparklyn</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
