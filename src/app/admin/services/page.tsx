'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { Wrench, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X, GripVertical } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminShell from '../AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Service {
  id: string; title: string; description: string; icon: string; features: string[]; priceFrom?: number; duration?: string; popular: boolean; published: boolean; order: number
}

const emptyForm = { title: '', description: '', icon: '✨', features: '', priceFrom: '', duration: '', popular: false, published: true }

export default function ServicesPage() {
  const { data: services = [], mutate, isLoading } = useSWR<Service[]>('/api/admin/services', fetcher)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModal(true)
  }

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({
      title: s.title, description: s.description, icon: s.icon || '✨',
      features: s.features.join('\n'), priceFrom: s.priceFrom ? String(s.priceFrom) : '',
      duration: s.duration || '', popular: s.popular, published: s.published,
    })
    setModal(true)
  }

  const save = async () => {
    if (!form.title || !form.description) { toast.error('Title and description are required'); return }
    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      priceFrom: form.priceFrom ? parseFloat(form.priceFrom) : null,
      duration: form.duration || null,
      popular: form.popular,
      published: form.published,
    }
    try {
      if (editing) {
        const res = await fetch(`/api/admin/services/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error()
        toast.success('Service updated')
      } else {
        const res = await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error()
        toast.success('Service created')
      }
      mutate(); setModal(false)
    } catch {
      toast.error('Failed to save service')
    }
  }

  const togglePublish = async (s: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${s.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !s.published }) })
      if (!res.ok) throw new Error()
      mutate(); toast.success(s.published ? 'Hidden' : 'Published')
    } catch {
      toast.error('Failed to update service')
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      mutate(); toast.success('Deleted')
    } catch {
      toast.error('Failed to delete service')
    }
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400 bg-white'

  return (
    <AdminShell>
      <Toaster />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Wrench size={18} className="text-teal-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Services</h1>
              </div>
              <p className="text-gray-500 text-sm ml-12">{(services as Service[]).filter(s => s.published).length} published</p>
            </div>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors text-sm font-medium">
              <Plus size={16} /> Add Service
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-teal-500 animate-spin" /></div>
          ) : (
            <div className="grid gap-4">
              {(services as Service[]).map(s => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl p-5 border transition-colors ${s.published ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{s.title}</h3>
                        {s.popular && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Popular</span>}
                        {!s.published && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Hidden</span>}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{s.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {s.priceFrom && <span>From €{s.priceFrom}</span>}
                        {s.duration && <span>{s.duration}</span>}
                        <span>{s.features.length} features</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => togglePublish(s)} className={`p-2 rounded-xl transition-colors ${s.published ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        {s.published ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button onClick={() => openEdit(s)} className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => deleteService(s.id)} className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {(services as Service[]).length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Wrench size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No services yet. Add your first service.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{editing ? 'Edit Service' : 'Add Service'}</h2>
                <button onClick={() => setModal(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={inputCls} placeholder="✨" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className={`${inputCls} resize-none`} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                  <textarea value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={4} placeholder="Deep clean all surfaces&#10;Eco-friendly products&#10;..." className={`${inputCls} resize-none`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price From (€)</label>
                    <input type="number" value={form.priceFrom} onChange={e => setForm({...form, priceFrom: e.target.value})} className={inputCls} placeholder="49" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className={inputCls} placeholder="2-3 hours" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.popular} onChange={e => setForm({...form, popular: e.target.checked})} className="w-4 h-4 accent-amber-500" />
                    <span className="text-sm text-gray-700">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 accent-teal-500" />
                    <span className="text-sm text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm">Cancel</button>
                <button onClick={save} className="px-6 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors text-sm font-medium">Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
