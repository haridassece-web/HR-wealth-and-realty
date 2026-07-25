import React from 'react';
import { useApp } from '../../context/AppContext';

export const UserManagement: React.FC = () => {
  const { users } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">User Accounts & Role Permissions</h2>
          <p className="text-xs text-slate-400">Control access levels for Admin, Advisor & Employee roles across CRM modules.</p>
        </div>
      </div>

      {/* User Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((u) => (
          <div key={u.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-center relative">
            <div className="w-16 h-16 rounded-full gradient-gold-bg text-[#07152F] font-black text-xl flex items-center justify-center mx-auto border-2 border-amber-400/40 shadow-lg">
              {u.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading">{u.name}</h3>
              <div className="text-xs text-slate-400">{u.email}</div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border inline-block mt-2 ${
                u.role === 'Admin'
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                  : u.role === 'Advisor'
                  ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30'
                  : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30'
              }`}>
                {u.role}
              </span>
            </div>
            <div className="pt-2 text-xs text-slate-400 font-mono">{u.mobile}</div>
          </div>
        ))}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-white text-base font-heading">Role-Based Access Control (RBAC) Matrix</h3>
        <div className="overflow-x-auto">
          <table className="custom-table text-xs">
            <thead>
              <tr>
                <th>CRM Module / Feature</th>
                <th>👑 Admin</th>
                <th>💼 Advisor</th>
                <th>👩‍💻 Employee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KPI Dashboard & Financial Charts</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-slate-400">View Only</td>
              </tr>
              <tr>
                <td>Customer Database CRUD</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-amber-400 font-bold">Create / Edit</td>
              </tr>
              <tr>
                <td>Insurance Policy Issuance</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-rose-400">Restricted</td>
              </tr>
              <tr>
                <td>Commission Engine & Disbursal Ledger</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-cyan-400 font-bold">Own Payouts Only</td>
                <td className="text-rose-400">No Access</td>
              </tr>
              <tr>
                <td>System Backup & Audit History</td>
                <td className="text-emerald-400 font-bold">Full Access</td>
                <td className="text-rose-400">No Access</td>
                <td className="text-rose-400">No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
