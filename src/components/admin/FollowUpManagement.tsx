import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { FollowUpType } from '../../types';
import { Phone, MessageSquare, Mail, Users, Plus, CheckCircle2, Clock } from 'lucide-react';

export const FollowUpManagement: React.FC = () => {
  const { followUps, addFollowUp, completeFollowUp } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fUpForm, setFupForm] = useState({
    contactName: '',
    contactMobile: '',
    type: 'Call' as FollowUpType,
    scheduledDate: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    notes: '',
    assignedTo: 'Haridass R',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fUpForm.contactName || !fUpForm.contactMobile) return;
    addFollowUp({
      ...fUpForm,
      status: 'Scheduled',
    });
    setIsModalOpen(false);
  };

  const openWhatsAppDirect = (mobile: string, notes: string) => {
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello! Greetings from HR Wealthy & Realty.\nRegarding: ${notes}`);
    window.open(`https://wa.me/${cleanMobile}?text=${message}`, '_blank');
  };

  const getTypeIcon = (type: FollowUpType) => {
    switch (type) {
      case 'Call': return <Phone className="w-4 h-4 text-emerald-400" />;
      case 'WhatsApp': return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'SMS': return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      case 'Meeting': return <Users className="w-4 h-4 text-amber-400" />;
      case 'Email': return <Mail className="w-4 h-4 text-purple-400" />;
    }
  };

  const filtered = filterStatus === 'All' ? followUps : followUps.filter(f => f.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Follow-up & Reminders Calendar</h2>
          <p className="text-xs text-slate-400">Scheduled client calls, WhatsApp updates & site visit meetings.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Schedule Follow-up
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Scheduled', 'Completed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterStatus === s
                ? 'gradient-gold-bg text-[#0B132B] font-bold shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Reminders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-slate-900 border p-6 rounded-3xl space-y-4 shadow-xl transition-all ${item.status === 'Completed' ? 'border-slate-800 opacity-60' : 'border-slate-700 hover:border-amber-400/40'
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-slate-800">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{item.contactName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{item.contactMobile}</div>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.status === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}>
                {item.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {item.notes}
            </p>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-mono">
                <Clock className="w-3.5 h-3.5" /> {item.scheduledDate} ({item.time})
              </div>
              <div>Assigned: {item.assignedTo}</div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => openWhatsAppDirect(item.contactMobile, item.notes)}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Launch WhatsApp
              </button>

              {item.status !== 'Completed' && (
                <button
                  onClick={() => completeFollowUp(item.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Done
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Follow-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white animate-fade-in relative space-y-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">✕</button>

            <h3 className="text-xl font-bold font-heading">Schedule Follow-up Task</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={fUpForm.contactName}
                  onChange={(e) => setFupForm({ ...fUpForm, contactName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={fUpForm.contactMobile}
                  onChange={(e) => setFupForm({ ...fUpForm, contactMobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Channel Type</label>
                  <select
                    value={fUpForm.type}
                    onChange={(e) => setFupForm({ ...fUpForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Call">Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={fUpForm.scheduledDate}
                    onChange={(e) => setFupForm({ ...fUpForm, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Notes / Reminders</label>
                <textarea
                  rows={2}
                  value={fUpForm.notes}
                  onChange={(e) => setFupForm({ ...fUpForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-bold py-3 rounded-xl uppercase tracking-wider text-xs"
              >
                Schedule Task
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
