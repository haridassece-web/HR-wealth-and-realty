import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Customer } from '../../types';
import { Search, Plus, Trash2, Edit3, RotateCcw, ShieldCheck } from 'lucide-react';

export const CustomerManagement: React.FC = () => {
  const { customers, addCustomer, updateCustomer, softDeleteCustomer, restoreCustomer } = useApp();

  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [showBin, setShowBin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '1990-01-01',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    occupation: 'IT Specialist',
    monthlyIncome: 150000,
    address: '',
    pan: '',
    aadhaar: '',
    nomineeName: '',
    nomineeRelation: 'Spouse',
  });

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      dob: '1990-01-01',
      gender: 'Male',
      occupation: 'Software Director',
      monthlyIncome: 180000,
      address: 'Anna Nagar, Chennai, Tamil Nadu',
      pan: 'ABCPS1234F',
      aadhaar: '4532 9812 7789',
      nomineeName: '',
      nomineeRelation: 'Spouse',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cust: Customer) => {
    setEditingCustomer(cust);
    setFormData({
      name: cust.name,
      mobile: cust.mobile,
      email: cust.email,
      dob: cust.dob,
      gender: cust.gender,
      occupation: cust.occupation,
      monthlyIncome: cust.monthlyIncome,
      address: cust.address,
      pan: cust.pan,
      aadhaar: cust.aadhaar,
      nomineeName: cust.nomineeName,
      nomineeRelation: cust.nomineeRelation,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setIsModalOpen(false);
  };

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.mobile.includes(search) ||
                          c.email.toLowerCase().includes(search.toLowerCase()) ||
                          c.pan.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === 'All' || c.gender === genderFilter;
    const matchesBin = showBin ? c.isDeleted === true : !c.isDeleted;
    return matchesSearch && matchesGender && matchesBin;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Customer Database (CRUD)</h2>
          <p className="text-xs text-slate-400">Manage client profiles, KYC documentation, PAN/Aadhaar & Nominee details.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBin(!showBin)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
              showBin
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" /> {showBin ? 'Exit Recycle Bin' : 'Recycle Bin'}
          </button>

          <button
            onClick={handleOpenAdd}
            className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Customer
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, mobile, email or PAN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

      </div>

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Info</th>
                <th>KYC Details</th>
                <th>Occupation / Income</th>
                <th>Nominee</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                    No customer records found matching search filters.
                  </td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-800/50 transition-colors">
                    <td>
                      <div className="font-bold text-white text-sm">{cust.name}</div>
                      <div className="text-[11px] text-slate-400">{cust.gender} • DOB: {cust.dob}</div>
                    </td>

                    <td>
                      <div className="text-xs text-slate-200 font-medium">{cust.mobile}</div>
                      <div className="text-[11px] text-slate-400">{cust.email}</div>
                    </td>

                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5" /> PAN: {cust.pan}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">Aadhaar: {cust.aadhaar}</div>
                    </td>

                    <td>
                      <div className="text-xs text-slate-200">{cust.occupation}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">
                        ₹{(cust.monthlyIncome / 1000).toFixed(0)}k / month
                      </div>
                    </td>

                    <td>
                      <div className="text-xs text-slate-200 font-medium">{cust.nomineeName || 'N/A'}</div>
                      <div className="text-[11px] text-slate-400">{cust.nomineeRelation}</div>
                    </td>

                    <td className="text-right">
                      {showBin ? (
                        <button
                          onClick={() => restoreCustomer(cust.id)}
                          className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1 ml-auto"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restore
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(cust)}
                            className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => softDeleteCustomer(cust.id)}
                            className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-slate-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
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
              {editingCustomer ? 'Edit Customer Details' : 'Create New Customer Profile'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PAN Card Number</label>
                  <input
                    type="text"
                    placeholder="ABCPS1234F"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Aadhaar Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 9812 7789"
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Income (₹)</label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nominee Name</label>
                  <input
                    type="text"
                    value={formData.nomineeName}
                    onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nominee Relation</label>
                  <input
                    type="text"
                    placeholder="Spouse / Son / Mother"
                    value={formData.nomineeRelation}
                    onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all"
              >
                {editingCustomer ? 'Update Customer Profile' : 'Save New Customer'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
