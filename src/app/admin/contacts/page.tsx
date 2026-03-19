'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { MessageSquare, Search, Trash2, Loader2, Mail, Phone, CheckCircle, Clock, XCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import AdminShell from '../AdminShell'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Contact {
  id: string; name: string; email: string; phone?: string; message: string; status: string; createdAt: string
}

const statusConfig: Record<string, { label: string; class: string; icon: typeof CheckCircle }> = {
  NEW: { label: 'New', class: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  READ: { label: 'Read', class: 'bg-gray-100 text-gray-600 border-gray-200', icon: CheckCircle },
  REPLIED: { label: 'Replied', class: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
}

export default function ContactsPage() {
  const { data: contacts = [], mutate, isLoading } = useSWR<Contact[]>('/api/admin/contacts', fetcher)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [expanded, setExpanded] = useState<string | null>(null)

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/contacts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    mutate()
    toast.success(`Marked as ${status.toLowerCase()}`)
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    mutate()
    toast.success('Deleted')
  }

  const filtered = (contacts as Contact[]).filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const newCount = (contacts as Contact[]).filter(c => c.status === 'NEW').length

  return (
    <AdminShell>
      <Toaster />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <MessageSquare size={18} className="text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              {newCount > 0 && (
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{newCount} new</span>
              )}
            </div>
            <p className="text-gray-500 text-sm ml-12">{(contacts as Contact[]).length} total messages</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <div className="flex gap-2">
              {['ALL', 'NEW', 'READ', 'REPLIED'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${statusFilter === s ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-teal-500 animate-spin" /></div>
          ) : (
            <div className="space-y-3">
              {filtered.map(c => {
                const sc = statusConfig[c.status] || statusConfig.NEW
                const isNew = c.status === 'NEW'
                const isExpanded = expanded === c.id

                return (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-2xl border transition-all ${isNew ? 'border-blue-200 shadow-sm shadow-blue-50' : 'border-gray-200'}`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => {
                          setExpanded(isExpanded ? null : c.id)
                          if (c.status === 'NEW') updateStatus(c.id, 'READ')
                        }}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isNew ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <Mail size={16} className={isNew ? 'text-blue-600' : 'text-gray-500'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full border font-medium ${sc.class}`}>{sc.label}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-1.5">
                              <a href={`mailto:${c.email}`} onClick={e => e.stopPropagation()} className="hover:text-teal-600 transition-colors">{c.email}</a>
                              {c.phone && <span className="flex items-center gap-1"><Phone size={11} />{c.phone}</span>}
                            </div>
                            <p className={`text-sm text-gray-700 ${isExpanded ? '' : 'line-clamp-2'}`}>{c.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(c.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {c.status !== 'REPLIED' && (
                            <button onClick={() => updateStatus(c.id, 'REPLIED')}
                              className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors" title="Mark as replied">
                              <CheckCircle size={15} />
                            </button>
                          )}
                          {c.status === 'REPLIED' && (
                            <button onClick={() => updateStatus(c.id, 'NEW')}
                              className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors" title="Mark as new">
                              <Clock size={15} />
                            </button>
                          )}
                          <a href={`mailto:${c.email}?subject=Re: Contact Sparklyn`}
                            className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors" title="Reply by email">
                            <Mail size={15} />
                          </a>
                          <button onClick={() => deleteContact(c.id)} className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No messages found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
