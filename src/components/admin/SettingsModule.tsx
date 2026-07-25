import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Download, Upload, RotateCcw, CheckCircle2 } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { exportSystemData, importSystemData, resetToDefaults } = useApp();

  const [companyProfile, setCompanyProfile] = useState({
    companyName: 'HR Wealthy & Realty Solutions',
    partnerId: 'AGEAS-FED-PARTNER-991',
    gstNumber: '36ABCDE1234F1Z5',
    address: 'Plot 11, Greenwood Appartment, Noombal Road, , Navasakthi nagar,Chennai',
    hotline: '+91 9884933079',
    email: 'admin@hrwealthy.com',
  });

  const [jsonInput, setJsonInput] = useState('');
  const [msg, setMsg] = useState('');

  const handleExport = () => {
    const jsonStr = exportSystemData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HR_Wealthy_System_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setMsg('Downloaded database JSON backup successfully');
    setTimeout(() => setMsg(''), 4000);
  };

  const handleImport = () => {
    if (!jsonInput) return;
    const success = importSystemData(jsonInput);
    if (success) {
      setMsg('Database successfully restored from JSON!');
      setJsonInput('');
    } else {
      setMsg('Failed to parse JSON backup file.');
    }
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">System Settings & Data Management</h2>
          <p className="text-xs text-slate-400">Configure company profile, GST identifiers, audit history & JSON backup/restore.</p>
        </div>
      </div>

      {msg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Company Profile Settings */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="font-bold text-white text-base font-heading">Company & Partner Identifiers</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company Registered Name</label>
              <input
                type="text"
                value={companyProfile.companyName}
                onChange={(e) => setCompanyProfile({ ...companyProfile, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Ageas Federal Advisor Code</label>
                <input
                  type="text"
                  value={companyProfile.partnerId}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, partnerId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-bold font-mono text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">GST Registration Number</label>
                <input
                  type="text"
                  value={companyProfile.gstNumber}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, gstNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Corporate Address</label>
              <input
                type="text"
                value={companyProfile.address}
                onChange={(e) => setCompanyProfile({ ...companyProfile, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
              />
            </div>

            <button
              onClick={() => { setMsg('Company profile settings saved!'); setTimeout(() => setMsg(''), 4000); }}
              className="gradient-gold-bg text-[#0B132B] font-extrabold px-6 py-3 rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </div>
        </div>

        {/* Database Backup & Restore */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base font-heading">Database Backup & Restore</h3>

            <button
              onClick={handleExport}
              className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Complete JSON Backup
            </button>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Paste JSON Backup string to restore:</label>
              <textarea
                rows={3}
                placeholder="Paste backup JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono resize-none"
              />
              <button
                onClick={handleImport}
                className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Restore Database
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={resetToDefaults}
              className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset Database to Factory Defaults
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
