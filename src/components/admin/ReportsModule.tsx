import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Printer, CheckCircle2 } from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const { customers, policies, leads, properties, commissions } = useApp();
  const [reportType, setReportType] = useState<'Customer' | 'Policy' | 'Premium' | 'Commission' | 'Lead' | 'Property'>('Policy');
  const [exportedMsg, setExportedMsg] = useState('');

  const exportToCSV = () => {
    let rows: string[][] = [];
    let filename = `HR_Wealthy_${reportType}_Report.csv`;

    if (reportType === 'Customer') {
      rows.push(['ID', 'Name', 'Mobile', 'Email', 'Occupation', 'Monthly Income', 'PAN', 'Aadhaar']);
      customers.forEach(c => rows.push([c.id, c.name, c.mobile, c.email, c.occupation, c.monthlyIncome.toString(), c.pan, c.aadhaar]));
    } else if (reportType === 'Policy') {
      rows.push(['Policy Number', 'Client Name', 'Company', 'Product', 'Premium', 'Sum Assured', 'Renewal Date', 'Status']);
      policies.forEach(p => rows.push([p.policyNumber, p.customerName, p.company, p.productName, p.premiumAmount.toString(), p.sumAssured.toString(), p.nextRenewalDate, p.status]));
    } else if (reportType === 'Lead') {
      rows.push(['ID', 'Lead Name', 'Mobile', 'Category', 'Budget', 'Status', 'Assigned Advisor']);
      leads.forEach(l => rows.push([l.id, l.name, l.mobile, l.category, l.budget.toString(), l.status, l.assignedAdvisorName]));
    } else if (reportType === 'Property') {
      rows.push(['ID', 'Property Name', 'Type', 'Location', 'Price', 'Owner Name', 'Status']);
      properties.forEach(pr => rows.push([pr.id, pr.propertyName, pr.type, pr.location, pr.price.toString(), pr.ownerName, pr.status]));
    } else if (reportType === 'Commission') {
      rows.push(['ID', 'Deal Title', 'Client Name', 'Gross Amount', 'Advisor Comm Amount', 'Company Net', 'Advisor Name']);
      commissions.forEach(cm => rows.push([cm.id, cm.dealTitle, cm.customerName, cm.grossAmount.toString(), cm.advisorCommissionAmount.toString(), cm.companyNetRevenue.toString(), cm.advisorName]));
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportedMsg(`Successfully downloaded ${filename}`);
    setTimeout(() => setExportedMsg(''), 4000);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Executive Reports & Data Exporter</h2>
          <p className="text-xs text-slate-400">Generate formatted audit reports and export to CSV, Excel spreadsheet or PDF layout.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV / Excel
          </button>
          <button
            onClick={printReport}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-cyan-400" /> Print PDF Report
          </button>
        </div>
      </div>

      {exportedMsg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {exportedMsg}
        </div>
      )}

      {/* Report Type Selector */}
      <div className="flex flex-wrap gap-2">
        {(['Policy', 'Customer', 'Commission', 'Lead', 'Property'] as any[]).map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              reportType === type
                ? 'gradient-gold-bg text-[#0B132B] shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            {type} Master Report
          </button>
        ))}
      </div>

      {/* Live Preview Sheet */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base font-heading">HR Wealthy & Realty — {reportType} Executive Audit Sheet</h3>
            <div className="text-xs text-slate-400">Generated on {new Date().toISOString().split('T')[0]} | Authorized Report</div>
          </div>
          <span className="text-xs bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-400/30">
            Official Copy
          </span>
        </div>

        {/* Dynamic Table Preview */}
        <div className="overflow-x-auto">
          {reportType === 'Policy' && (
            <table className="custom-table">
              <thead>
                <tr><th>Policy #</th><th>Client</th><th>Company</th><th>Product</th><th>Premium</th><th>Sum Assured</th><th>Status</th></tr>
              </thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.id}>
                    <td className="font-mono text-amber-400 text-xs">{p.policyNumber}</td>
                    <td>{p.customerName}</td>
                    <td>{p.company}</td>
                    <td>{p.productName}</td>
                    <td>₹{p.premiumAmount.toLocaleString()}</td>
                    <td className="text-cyan-400 font-bold">₹{p.sumAssured.toLocaleString()}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'Customer' && (
            <table className="custom-table">
              <thead>
                <tr><th>Client Name</th><th>Mobile</th><th>Email</th><th>Occupation</th><th>PAN</th><th>Aadhaar</th></tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.mobile}</td>
                    <td>{c.email}</td>
                    <td>{c.occupation}</td>
                    <td className="font-mono text-amber-400">{c.pan}</td>
                    <td className="font-mono text-slate-400">{c.aadhaar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'Commission' && (
            <table className="custom-table">
              <thead>
                <tr><th>Deal Title</th><th>Customer</th><th>Gross Amount</th><th>Advisor Comm</th><th>Company Net</th><th>Advisor</th></tr>
              </thead>
              <tbody>
                {commissions.map(cm => (
                  <tr key={cm.id}>
                    <td>{cm.dealTitle}</td>
                    <td>{cm.customerName}</td>
                    <td>₹{cm.grossAmount.toLocaleString()}</td>
                    <td className="text-emerald-400 font-bold">₹{cm.advisorCommissionAmount.toLocaleString()}</td>
                    <td className="text-purple-400 font-bold">₹{cm.companyNetRevenue.toLocaleString()}</td>
                    <td>{cm.advisorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
};
