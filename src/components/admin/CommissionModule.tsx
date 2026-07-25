import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search } from 'lucide-react';

export const CommissionModule: React.FC = () => {
  const { commissions } = useApp();
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');

  const totalGrossSales = commissions.reduce((acc, c) => acc + c.grossAmount, 0);
  const totalAdvisorCommission = commissions.reduce((acc, c) => acc + c.advisorCommissionAmount, 0);
  const totalCompanyRevenue = commissions.reduce((acc, c) => acc + c.companyNetRevenue, 0);

  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const filtered = commissions.filter(c => {
    const matchesSearch = c.dealTitle.toLowerCase().includes(search.toLowerCase()) ||
                          c.customerName.toLowerCase().includes(search.toLowerCase()) ||
                          c.advisorName.toLowerCase().includes(search.toLowerCase());
    const matchesMonth = selectedMonth === 'All' || c.month === selectedMonth;
    return matchesSearch && matchesMonth;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Commission & Revenue Ledger</h2>
          <p className="text-xs text-slate-400">Live breakdown: Deal Gross Premium → Company % → Net Advisor Share.</p>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Deal Premium Volume</div>
          <div className="text-3xl font-extrabold text-white font-heading">
            ₹{totalGrossSales.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Gross Premium & Realty Sales</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Advisor Commission Disbursed</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-heading">
            ₹{totalAdvisorCommission.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">70-75% Advisor Payout Rate</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Net Retained Company Revenue</div>
          <div className="text-3xl font-extrabold text-amber-400 font-heading">
            ₹{totalCompanyRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-300">Company Operating Profit</div>
        </div>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search deal title, customer or advisor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            {months.map(m => <option key={m} value={m}>{m === 'All' ? 'All Months' : m}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Deal Title & Client</th>
                <th>Gross Deal Volume</th>
                <th>Company Comm %</th>
                <th>Advisor Share (Net)</th>
                <th>Company Net Revenue</th>
                <th>Advisor Name</th>
                <th>Date & Month</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((comm) => (
                <tr key={comm.id} className="hover:bg-slate-800/50 transition-colors">
                  <td>
                    <div className="font-bold text-white text-xs">{comm.dealTitle}</div>
                    <div className="text-[11px] text-slate-400">Client: {comm.customerName}</div>
                  </td>

                  <td>
                    <div className="font-bold text-white text-xs">₹{comm.grossAmount.toLocaleString()}</div>
                  </td>

                  <td>
                    <span className="text-xs bg-amber-400/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-400/20">
                      {comm.companyCommissionPct}%
                    </span>
                  </td>

                  <td>
                    <div className="font-extrabold text-emerald-400 font-heading text-xs">
                      ₹{comm.advisorCommissionAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">({comm.advisorCommissionPct}% of company comm)</div>
                  </td>

                  <td>
                    <div className="font-bold text-purple-400 text-xs">
                      ₹{comm.companyNetRevenue.toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <div className="text-xs font-semibold text-slate-200">{comm.advisorName}</div>
                  </td>

                  <td>
                    <div className="text-xs text-slate-400 font-mono">{comm.date} ({comm.month})</div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
