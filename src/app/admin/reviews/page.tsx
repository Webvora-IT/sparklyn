'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminShell from '../AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Review {
  id: string; name: string; location: string; service: string; content: string; rating: number; avatar?: string; published: boolean; createdAt: string
}

export default function ReviewsPage() {
  const { data: reviews = [], mutate, isLoading } = useSWR<Review[]>('/api/admin/reviews', fetcher)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Review | null>(null)
  const [form, setForm] = useState({ name: '', location: '', service: '', content: '', rating: 5, published: true })

  const openAdd = () => { setEditing(null); setForm({ name: '', location: '', service: '', content: '', rating: 5, published: true }); setModal(true) }
  const openEdit = (r: Review) => { setEditing(r); setForm({ name: r.name, location: r.location, service: r.service, content: r.content, rating: r.rating, published: r.published }); setModal(true) }

  const save = async () => {
    if (!form.name || !form.content) { toast.error('Name and content are required'); return }
    try {
      if (editing) {
        const res = await fetch(`/api/admin/reviews/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error()
        toast.success('Review updated')
      } else {
        const res = await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error()
        toast.success('Review added')
      }
      mutate(); setModal(false)
    } catch {
      toast.error('Failed to save review')
    }
  }

  const togglePublish = async (r: Review) => {
    try {
      const res = await fetch(`/api/admin/reviews/${r.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !r.published }) })
      if (!res.ok) throw new Error()
      mutate(); toast.success(r.published ? 'Unpublished' : 'Published')
    } catch {
      toast.error('Failed to update review')
    }
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      mutate(); toast.success('Deleted')
    } catch {
      toast.error('Failed to delete review')
    }
  }

  return (
    <AdminShell>
      <Toaster />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star size={18} className="text-yellow-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
              </div>
              <p className="text-gray-500 text-sm ml-12">{(reviews as Review[]).filter(r => r.published).length} published</p>
            </div>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors text-sm font-medium">
              <Plus size={16} /> Add Review
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-teal-500 animate-spin" /></div>
          ) : (
            <div className="grid gap-4">
              {(reviews as Review[]).map(r => (
                <div key={r.id} className={`bg-white rounded-2xl p-5 border transition-colors ${r.published ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{r.name}</div>
                          <div className="text-xs text-gray-500">{r.location} · {r.service}</div>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{r.content}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => togglePublish(r)} className={`p-2 rounded-xl transition-colors ${r.published ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        {r.published ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button onClick={() => openEdit(r)} className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => deleteReview(r.id)} className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(reviews as Review[]).length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Star size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{editing ? 'Edit Review' : 'Add Review'}</h2>
                <button onClick={() => setModal(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <input value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Content *</label>
                  <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm({...form, rating: n})} className="transition-transform hover:scale-110">
                        <Star size={24} className={n <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 accent-teal-500" />
                  <span className="text-sm text-gray-700">Published (visible on site)</span>
                </label>
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
