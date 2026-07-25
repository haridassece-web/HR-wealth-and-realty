import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { LeadStatus, LeadCategory } from '../../types';
import { Plus, Phone } from 'lucide-react';

export const LeadManagement: React.FC = () => {
  const { leads, users, addLead, updateLeadStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newLeadData, setNewLeadData] = useState({
    name: '',
    mobile: '',
    email: '',
    category: 'Insurance' as LeadCategory,
    budget: 150000,
    status: 'New Lead' as LeadStatus,
    assignedAdvisorId: users[1]?.id || 'usr-2',
    notes: '',
  });

  const columns: LeadStatus[] = ['New Lead', 'Interested', 'Follow-up', 'Proposal Sent', 'Closed Won', 'Closed Lost'];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.mobile) return;
    const advisor = users.find(u => u.id === newLeadData.assignedAdvisorId);
    addLead({
      ...newLeadData,
      assignedAdvisorName: advisor ? advisor.name : 'Ananya Sharma',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Lead Pipeline & Kanban Board</h2>
          <p className="text-xs text-slate-400">Track incoming client prospects across Insurance, Real Estate & Investment deals.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Add Lead Prospect
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = leads.filter(l => l.status === col);
          return (
            <div key={col} className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-4 min-w-[200px]">
              
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="font-bold text-xs text-white">{col}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                  {colLeads.length}
                </span>
              </div>

              {/* Lead Cards in Column */}
              <div className="space-y-3 flex-1 min-h-[300px]">
                {colLeads.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-[11px] text-slate-600 italic">
                    No leads in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-800/90 border border-slate-700 hover:border-amber-400/40 p-3.5 rounded-xl space-y-2 text-xs shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs">{lead.name}</span>
                        <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-1.5 py-0.5 rounded">
                          {lead.category}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-emerald-400" /> {lead.mobile}
                      </div>

                      <div className="text-[11px] text-emerald-400 font-bold">
                        Budget: ₹{lead.budget.toLocaleString()}
                      </div>

                      <div className="text-[10px] text-slate-400 line-clamp-2">
                        {lead.notes}
                      </div>

                      <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{lead.assignedAdvisorName}</span>
                        
                        {/* Status Change Selector */}
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="bg-slate-900 text-[10px] font-bold text-amber-400 border border-slate-700 rounded px-1 py-0.5 outline-none"
                        >
                          {columns.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white animate-fade-in relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-heading">Add New Lead Prospect</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Lead Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={newLeadData.mobile}
                  onChange={(e) => setNewLeadData({ ...newLeadData, mobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category & Budget (₹)</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newLeadData.category}
                    onChange={(e) => setNewLeadData({ ...newLeadData, category: e.target.value as any })}
                    className="px-2 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Insurance">Insurance</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Investment">Investment</option>
                    <option value="Wealth Bundle">Wealth Bundle</option>
                  </select>
                  <input
                    type="number"
                    value={newLeadData.budget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budget: Number(e.target.value) })}
                    className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assign to Advisor</label>
                <select
                  value={newLeadData.assignedAdvisorId}
                  onChange={(e) => setNewLeadData({ ...newLeadData, assignedAdvisorId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  value={newLeadData.notes}
                  onChange={(e) => setNewLeadData({ ...newLeadData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-bold py-3 rounded-xl uppercase tracking-wider text-xs"
              >
                Save Prospect
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
