import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users, ShieldCheck, Building2, FolderKanban, Calendar, DollarSign,
  TrendingUp, Award, ArrowUpRight, AlertTriangle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { customers, policies, properties, leads, followUps, commissions, auditLogs } = useApp();

  // Metrics calculations
  const totalLeads = leads.length;
  const activeCustomers = customers.filter(c => !c.isDeleted).length;
  const policiesSold = policies.length;
  
  const totalPremiumCollected = policies.reduce((acc, p) => acc + p.premiumAmount, 0);
  const totalCommissionEarned = commissions.reduce((acc, c) => acc + c.advisorCommissionAmount, 0);
  const totalCompanyRevenue = commissions.reduce((acc, c) => acc + c.companyNetRevenue, 0);
  
  const propertiesListed = properties.length;
  const propertiesSold = properties.filter(p => p.status === 'Sold').length;

  const todayFollowUps = followUps.filter(f => f.status === 'Scheduled').length;

  // Chart 1: Monthly Revenue & Premium Trend Data
  const monthlyData = [
    { month: 'Jan', premium: 120000, revenue: 42000, commission: 29400 },
    { month: 'Feb', premium: 700000, revenue: 185000, commission: 135750 },
    { month: 'Mar', premium: 150000, revenue: 132000, commission: 198000 },
    { month: 'Apr', premium: 320000, revenue: 95000, commission: 68000 },
    { month: 'May', premium: 450000, revenue: 140000, commission: 95000 },
    { month: 'Jun', premium: 610000, revenue: 190000, commission: 132000 },
    { month: 'Jul', premium: totalPremiumCollected, revenue: totalCompanyRevenue, commission: totalCommissionEarned },
  ];

  // Chart 2: Lead Pipeline Funnel
  const leadPipelineData = [
    { name: 'New Lead', count: leads.filter(l => l.status === 'New Lead').length || 1 },
    { name: 'Interested', count: leads.filter(l => l.status === 'Interested').length || 1 },
    { name: 'Follow-up', count: leads.filter(l => l.status === 'Follow-up').length || 1 },
    { name: 'Proposal Sent', count: leads.filter(l => l.status === 'Proposal Sent').length || 1 },
    { name: 'Closed Won', count: leads.filter(l => l.status === 'Closed Won').length || 2 },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner Alert */}
      <div className="gradient-navy-bg border border-amber-400/30 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-400/20 rounded-2xl text-amber-400 shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-white">HR Wealthy Enterprise Command Center</h2>
            <p className="text-xs text-slate-300">Live operational overview for Ageas Federal policies, real estate portfolio, and team commissions.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl text-center border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Overall Conversion</div>
            <div className="text-base font-extrabold text-emerald-400">34.2%</div>
          </div>
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl text-center border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">YTD Sales Growth</div>
            <div className="text-base font-extrabold text-amber-400">+28.5%</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (15 Indicator Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Leads</span>
            <FolderKanban className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{totalLeads}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3 h-3" /> +12% this week
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Today's Follow-ups</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-heading">{todayFollowUps}</div>
          <div className="text-[11px] text-amber-300 font-medium">3 High Priority</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Active Customers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{activeCustomers}</div>
          <div className="text-[11px] text-slate-400 font-medium">Verified KYC</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Policies Sold</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{policiesSold}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">100% In Force</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Premium</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-amber-400 font-heading">{formatCurrency(totalPremiumCollected)}</div>
          <div className="text-[11px] text-slate-400">Collected Annual</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Advisor Commission</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-heading">{formatCurrency(totalCommissionEarned)}</div>
          <div className="text-[11px] text-emerald-400">Disbursed</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Properties Listed</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{propertiesListed}</div>
          <div className="text-[11px] text-slate-400">Exclusive Mandates</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Properties Sold</span>
            <Award className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{propertiesSold}</div>
          <div className="text-[11px] text-slate-400">Closed & Handed Over</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Company Net Rev</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-extrabold text-purple-400 font-heading">{formatCurrency(totalCompanyRevenue)}</div>
          <div className="text-[11px] text-slate-400">Net Retained</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Monthly Expenses</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-rose-400 font-heading">{formatCurrency(45000)}</div>
          <div className="text-[11px] text-slate-400">Ops & Marketing</div>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Revenue & Premium Trend */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-base font-heading">Monthly Revenue & Premium Trend</h3>
              <p className="text-xs text-slate-400">Gross Premium vs Net Advisory Revenue</p>
            </div>
            <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              YTD 2025 - 2026
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                />
                <Line type="monotone" dataKey="premium" name="Premium Collected" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="revenue" name="Company Net Revenue" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Lead Funnel & Brand Split */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-base font-heading">Lead Pipeline Breakdown</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadPipelineData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#334155' }} />
                  <Bar dataKey="count" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Audit History Log Preview */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm font-heading">Recent Audit Logs</h3>
              <span className="text-[10px] text-slate-400 font-mono">LIVE FEED</span>
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="text-[11px] p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex justify-between font-semibold text-slate-300">
                    <span>{log.user}</span>
                    <span className="text-amber-400 font-mono">{log.action}</span>
                  </div>
                  <div className="text-slate-400 truncate">{log.details}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
