import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import { X, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, setActiveView } = useApp();
  const [email, setEmail] = useState('admin@hrwealthy.com');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState<Role>('Admin');
  const [resetModal, setResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid email');
      return;
    }
    const success = login(email, role);
    if (success) {
      setActiveView('admin');
      onClose();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleQuickFill = (roleType: Role, emailAddr: string) => {
    setRole(roleType);
    setEmail(emailAddr);
    setPassword('demo123');
    setError('');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setResetModal(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-amber-400/40 rounded-3xl max-w-md w-full p-8 text-white relative shadow-2xl animate-fade-in space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-gold-bg flex items-center justify-center text-[#0B132B] font-bold text-xl mb-3 shadow-lg shadow-amber-500/20">
            HR
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-white">Business Portal Login</h3>
          <p className="text-xs text-slate-400">Select your authorization role to enter the enterprise CRM management workspace.</p>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/40 p-3 rounded-xl flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          {(['Admin', 'Advisor', 'Employee'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                role === r
                  ? 'gradient-gold-bg text-[#0B132B] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Quick Credentials Fill Buttons */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Quick Testing Demo Accounts:</div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill('Admin', 'admin@hrwealthy.com')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              👑 Admin (Haridass R)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Advisor', 'Haridass@hrwealthy.com')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-cyan-400 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              💼 Advisor (Haridass)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('Employee', 'priya@hrwealthy.com')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              👩‍💻 Employee (Priya)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setResetModal(true)}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:shadow-xl transition-all"
          >
            Authenticate as {role} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Password Reset Modal Overlay */}
        {resetModal && (
          <div className="absolute inset-0 bg-[#0F172A] p-6 rounded-3xl flex flex-col justify-center space-y-4 z-10 animate-fade-in">
            <h4 className="text-lg font-bold text-white">Reset Password</h4>
            <p className="text-xs text-slate-400">Enter your registered email address to receive password reset instructions.</p>
            {resetSent ? (
              <div className="bg-emerald-500/20 text-emerald-400 text-xs p-4 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Reset link dispatched to {resetEmail}
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="name@hrwealthy.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResetModal(false)}
                    className="flex-1 bg-slate-800 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 gradient-gold-bg text-[#0B132B] py-2.5 rounded-xl text-xs font-bold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
