import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Policy, InsuranceCompany, PaymentFrequency, PolicyStatus } from '../../types';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';

export const InsuranceManagement: React.FC = () => {
  const { policies, customers, users, addPolicy, updatePolicy, deletePolicy } = useApp();

  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const [formData, setFormData] = useState({
    policyNumber: 'AF-LIF-' + Math.floor(10000 + Math.random() * 90000),
    customerId: customers[0]?.id || '',
    company: 'Ageas Federal Life' as InsuranceCompany,
    productName: 'Ageas Federal Smart Protection Plan',
    premiumAmount: 100000,
    frequency: 'Yearly' as PaymentFrequency,
    policyTermYears: 25,
    pptYears: 12,
    startDate: new Date().toISOString().split('T')[0],
    maturityDate: '2050-01-01',
    nextRenewalDate: '2026-08-15',
    commissionPercentage: 35,
    status: 'Active' as PolicyStatus,
    advisorId: users[1]?.id || 'usr-2',
  });

  const handleOpenAdd = () => {
    setEditingPolicy(null);
    setFormData({
      policyNumber: 'AF-LIF-' + Math.floor(10000 + Math.random() * 90000),
      customerId: customers[0]?.id || '',
      company: 'Ageas Federal Life',
      productName: 'Ageas Federal Smart Protection Plan',
      premiumAmount: 150000,
      frequency: 'Yearly',
      policyTermYears: 25,
      pptYears: 12,
      startDate: new Date().toISOString().split('T')[0],
      maturityDate: '2050-08-15',
      nextRenewalDate: '2026-08-15',
      commissionPercentage: 35,
      status: 'Active',
      advisorId: users[1]?.id || 'usr-2',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pol: Policy) => {
    setEditingPolicy(pol);
    setFormData({
      policyNumber: pol.policyNumber,
      customerId: pol.customerId,
      company: pol.company,
      productName: pol.productName,
      premiumAmount: pol.premiumAmount,
      frequency: pol.frequency,
      policyTermYears: pol.policyTermYears,
      pptYears: pol.pptYears,
      startDate: pol.startDate,
      maturityDate: pol.maturityDate,
      nextRenewalDate: pol.nextRenewalDate,
      commissionPercentage: pol.commissionPercentage,
      status: pol.status,
      advisorId: pol.advisorId,
    });
    setIsModalOpen(true);
  };

  // Automatic financial calculations
  const calculateAutomaticFields = (prem: number, term: number, ppt: number, commPct: number) => {
    const sumAssured = prem * Math.min(term, 20); // Estimated 20x life cover sum assured
    const grossComm = (prem * commPct) / 100;
    const advisorCommAmount = Math.round(grossComm * 0.7); // 70% to advisor
    const maturityEstimate = Math.round(prem * ppt * 2.1); // Projected 2.1x compounding
    return { sumAssured, advisorCommAmount, maturityEstimate };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerObj = customers.find(c => c.id === formData.customerId);
    const advisorObj = users.find(u => u.id === formData.advisorId);
    const customerName = customerObj ? customerObj.name : 'Unknown Client';
    const advisorName = advisorObj ? advisorObj.name : 'Ananya Sharma';

    const { sumAssured, advisorCommAmount, maturityEstimate } = calculateAutomaticFields(
      formData.premiumAmount,
      formData.policyTermYears,
      formData.pptYears,
      formData.commissionPercentage
    );

    const payload = {
      ...formData,
      customerName,
      advisorName,
      sumAssured,
      advisorCommissionAmount: advisorCommAmount,
      maturityValueEstimate: maturityEstimate,
      nominee: customerObj ? customerObj.nomineeName : 'Spouse',
    };

    if (editingPolicy) {
      updatePolicy(editingPolicy.id, payload);
    } else {
      addPolicy(payload);
    }
    setIsModalOpen(false);
  };

  const filtered = policies.filter(p => {
    const matchesSearch = p.policyNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.productName.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = companyFilter === 'All' || p.company === companyFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCompany && matchesStatus;
  });

  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Insurance Policy Portfolio (CRUD)</h2>
          <p className="text-xs text-slate-400">Ageas Federal Life, HDFC Life & ICICI Pru policies with live commission calculations.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Issue / Add Policy
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by policy number, client or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            <option value="All">All Companies</option>
            <option value="Ageas Federal Life">Ageas Federal Life</option>
            <option value="HDFC Life">HDFC Life</option>
            <option value="ICICI Prudential">ICICI Prudential</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Renewal">Pending Renewal</option>
            <option value="Lapsed">Lapsed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Policy Number & Brand</th>
                <th>Client Name</th>
                <th>Premium & Frequency</th>
                <th>Calculated Life Cover</th>
                <th>Advisor Comm. (Auto)</th>
                <th>Renewal Due</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pol) => {
                const autoCalc = calculateAutomaticFields(pol.premiumAmount, pol.policyTermYears, pol.pptYears, pol.commissionPercentage);
                return (
                  <tr key={pol.id} className="hover:bg-slate-800/50 transition-colors">
                    <td>
                      <div className="font-mono text-amber-400 font-bold text-xs">{pol.policyNumber}</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{pol.productName}</div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                        {pol.company}
                      </span>
                    </td>

                    <td>
                      <div className="font-bold text-white text-xs">{pol.customerName}</div>
                      <div className="text-[11px] text-slate-400">Advisor: {pol.advisorName}</div>
                    </td>

                    <td>
                      <div className="text-xs font-bold text-white">₹{pol.premiumAmount.toLocaleString()}/yr</div>
                      <div className="text-[11px] text-slate-400">Term: {pol.policyTermYears}Y | PPT: {pol.pptYears}Y</div>
                    </td>

                    <td>
                      <div className="text-xs font-extrabold text-cyan-400 font-heading">
                        {formatPrice(pol.sumAssured || autoCalc.sumAssured)}
                      </div>
                      <div className="text-[10px] text-slate-400">Maturity: {formatPrice(pol.maturityValueEstimate || autoCalc.maturityEstimate)}</div>
                    </td>

                    <td>
                      <div className="text-xs font-bold text-emerald-400 font-heading">
                        ₹{(pol.advisorCommissionAmount || autoCalc.advisorCommAmount).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Comp Comm: {pol.commissionPercentage}%</div>
                    </td>

                    <td>
                      <div className="text-xs text-slate-300 font-mono">{pol.nextRenewalDate}</div>
                    </td>

                    <td>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${pol.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : pol.status === 'Pending Renewal'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}>
                        {pol.status}
                      </span>
                    </td>

                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(pol)}
                          className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePolicy(pol.id)}
                          className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-slate-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white animate-fade-in relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-heading">
              {editingPolicy ? 'Edit Insurance Policy' : 'Issue New Insurance Policy'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Policy Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Select Client *</label>
                  <select
                    value={formData.customerId}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.mobile})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Insurance Provider</label>
                  <select
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-bold text-amber-400"
                  >
                    <option value="Ageas Federal Life">Ageas Federal Life</option>
                    <option value="HDFC Life">HDFC Life</option>
                    <option value="ICICI Prudential">ICICI Prudential</option>
                    <option value="Tata AIA">Tata AIA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Product Plan Name</label>
                  <input
                    type="text"
                    required
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Premium (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.premiumAmount}
                    onChange={(e) => setFormData({ ...formData, premiumAmount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Policy Term (Years)</label>
                  <input
                    type="number"
                    value={formData.policyTermYears}
                    onChange={(e) => setFormData({ ...formData, policyTermYears: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PPT Years</label>
                  <input
                    type="number"
                    value={formData.pptYears}
                    onChange={(e) => setFormData({ ...formData, pptYears: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Comm %</label>
                  <input
                    type="number"
                    value={formData.commissionPercentage}
                    onChange={(e) => setFormData({ ...formData, commissionPercentage: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Next Renewal Date</label>
                  <input
                    type="date"
                    value={formData.nextRenewalDate}
                    onChange={(e) => setFormData({ ...formData, nextRenewalDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Renewal">Pending Renewal</option>
                    <option value="Lapsed">Lapsed</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all"
              >
                {editingPolicy ? 'Save Policy Changes' : 'Issue & Calculate Policy'}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
