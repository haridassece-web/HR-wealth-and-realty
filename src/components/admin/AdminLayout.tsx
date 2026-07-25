import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Role } from '../../types';
import {
  LayoutDashboard, Users, Shield, Building2, TrendingUp, Calendar,
  FileBarChart, DollarSign, UserCog, Settings, Bell, Globe, LogOut,
  Award, FolderKanban
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    currentUser, logout, switchRole, activeTab, setActiveTab, setActiveView,
    notifications, markNotificationRead
  } = useApp();
  const { language, setLanguage, t } = useLanguage();

  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'customers', label: 'Customer CRUD', icon: <Users className="w-4 h-4" /> },
    { id: 'insurance', label: 'Insurance Management', icon: <Shield className="w-4 h-4" /> },
    { id: 'properties', label: 'Real Estate Module', icon: <Building2 className="w-4 h-4" /> },
    { id: 'investment', label: 'Investment Planning', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'leads', label: 'Lead Pipeline', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'followups', label: 'Follow-ups & Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'commission', label: 'Commission Engine', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileBarChart className="w-4 h-4" /> },
    { id: 'documents', label: 'Document Vault', icon: <Award className="w-4 h-4" /> },
    { id: 'users', label: 'User & Role Access', icon: <UserCog className="w-4 h-4" /> },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col md:flex-row">
      
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B132B] border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Branding */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('public')}>
              <div className="w-10 h-10 rounded-xl gradient-gold-bg flex items-center justify-center text-[#0B132B] font-bold text-lg">
                HR
              </div>
              <div>
                <div className="font-extrabold font-heading text-white text-base tracking-tight">
                  HR Wealthy <span className="text-amber-400">&</span> Realty
                </div>
                <div className="text-[10px] text-amber-400/90 uppercase font-semibold">{t('adminPortal')}</div>
              </div>
            </div>
          </div>

          {/* User Role Badge Strip */}
          {currentUser && (
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">{currentUser.name}</span>
              </div>
              <select
                value={currentUser.role}
                onChange={(e) => switchRole(e.target.value as Role)}
                className="bg-slate-800 border border-slate-700 text-amber-400 font-bold px-2 py-0.5 rounded text-[11px] outline-none"
              >
                <option value="Admin">👑 Admin</option>
                <option value="Advisor">💼 Advisor</option>
                <option value="Employee">👩‍💻 Employee</option>
              </select>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {sidebarLinks.map((link) => {
              const active = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'gradient-gold-bg text-[#0B132B] shadow-lg shadow-amber-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setActiveView('public')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-cyan-400" /> View Public Website
          </button>
          <button
            onClick={logout}
            className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Sticky Header */}
        <header className="bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold font-heading text-white capitalize">
              {sidebarLinks.find(l => l.id === activeTab)?.label || 'Management Portal'}
            </h1>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-4">
            
            {/* Language Selector Pill */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <button 
                onClick={() => setLanguage('EN')} 
                className={`transition-colors ${language === 'EN' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setLanguage('TA')} 
                className={`transition-colors ${language === 'TA' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                தமிழ்
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifPopoverOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 font-bold text-white">
                    <span>System Alerts & Reminders</span>
                    <span className="text-[10px] text-amber-400">{unreadNotifs.length} Unread</span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          n.read
                            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                            : 'bg-slate-800 border-amber-400/30 text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-white flex justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.date}</span>
                        </div>
                        <p className="text-[11px] mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Badge */}
            {currentUser && (
              <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                <div className="w-9 h-9 rounded-full gradient-gold-bg text-[#07152F] font-black text-sm flex items-center justify-center border border-amber-400/40 shrink-0">
                  {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'HR'}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-bold text-white leading-none">{currentUser.name}</div>
                  <div className="text-[10px] text-amber-400 mt-0.5 leading-none">{currentUser.role} Privileges</div>
                </div>
              </div>
            )}

          </div>
        </header>

        {/* View Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
