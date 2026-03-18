'use client'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronLeft, Save, Loader2, Building2, Clock, MapPin, Bell } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function SettingsPage() {
  const { data: config, mutate } = useSWR('/api/admin/config', fetcher)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    companyName: 'Sparklyn',
    phone: '+44 20 7946 0123',
    email: 'hello@sparklyn.com',
    address: 'London, UK',
    hoursWeekdays: '08:00 - 18:00',
    hoursSaturday: '09:00 - 16:00',
    notifyEmail: 'admin@sparklyn.com',
    serviceAreas: 'London, Manchester, Birmingham',
  })

  useEffect(() => {
    if (config) setForm(f => ({ ...f, ...config }))
  }, [config])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    mutate()
    setSaving(false)
    toast.success('Settings saved!')
  }

  const Field = ({ label, name, type = 'text' }: { label: string; name: keyof typeof form; type?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={form[name]} onChange={e => setForm({...form, [name]: e.target.value})}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-white" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-500 text-sm">Manage company info and preferences</p>
            </div>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                <Building2 size={18} className="text-primary-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Company Info</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Company Name" name="companyName" />
              <Field label="Phone" name="phone" />
              <Field label="Email" name="email" type="email" />
              <Field label="Address" name="address" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-blue-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Business Hours</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Weekdays (Mon-Fri)" name="hoursWeekdays" />
              <Field label="Saturday" name="hoursSaturday" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin size={18} className="text-purple-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Service Areas</h2>
            </div>
            <Field label="Cities (comma separated)" name="serviceAreas" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                <Bell size={18} className="text-orange-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Notifications</h2>
            </div>
            <Field label="Notification Email" name="notifyEmail" type="email" />
          </div>
        </div>
      </div>
    </div>
  )
}
