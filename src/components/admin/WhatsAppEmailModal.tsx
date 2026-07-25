import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';

interface WhatsAppEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppEmailModal: React.FC<WhatsAppEmailModalProps> = ({ isOpen, onClose }) => {
  const { customers } = useApp();

  const [channel, setChannel] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [templateType, setTemplateType] = useState<'Quote' | 'Policy Copy' | 'Receipt' | 'Property Brochure'>('Quote');
  const [sentMessage, setSentMessage] = useState('');

  if (!isOpen) return null;

  const client = customers.find(c => c.id === selectedCustomerId);

  const getTemplateText = () => {
    if (!client) return '';
    switch (templateType) {
      case 'Quote':
        return `Dear ${client.name},\nThank you for choosing HR Wealthy & Realty.\nHere is your customized Ageas Federal Smart Protection Life Cover Quote:\n- Sum Assured: ₹25,000,000\n- Annual Premium: ₹1,20,000/yr (Tax Free u/s 80C)\n\nLet us know if you would like to proceed with instant issuance!`;
      case 'Policy Copy':
        return `Dear ${client.name},\nYour Ageas Federal Life Insurance Policy Document is ready for download.\nPolicy No: AF-LIF-99210\nCoverage: ₹2.5 Cr\nNext Renewal: Aug 15, 2026.`;
      case 'Receipt':
        return `Dear ${client.name},\nPayment Received! Premium of ₹1,20,000 has been credited toward Policy #AF-LIF-99210. Tax Exemption Certificate attached.`;
      case 'Property Brochure':
        return `Dear ${client.name},\nExplore our featured luxury listing: Sovereign Sky Villas, Jubilee Hills.\n5 BHK Triplex Villa | 5200 Sq.Ft | Private Infinity Pool.\nPrice: ₹4.80 Cr. Reply to schedule a private tour.`;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;

    if (channel === 'WhatsApp') {
      const cleanMobile = client.mobile.replace(/[^0-9]/g, '');
      const msg = encodeURIComponent(getTemplateText());
      window.open(`https://wa.me/${cleanMobile}?text=${msg}`, '_blank');
      setSentMessage(`Launched WhatsApp Web message for ${client.name}`);
    } else {
      setSentMessage(`Email successfully dispatched to ${client.email}`);
    }
    setTimeout(() => {
      setSentMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-white animate-fade-in relative space-y-6">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">✕</button>

        <div className="space-y-1">
          <h3 className="text-xl font-bold font-heading">Dispatch Quotes & Documents</h3>
          <p className="text-xs text-slate-400">One-click sharing via WhatsApp Web & Automated Email Engine.</p>
        </div>

        {sentMessage && (
          <div className="bg-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> {sentMessage}
          </div>
        )}

        {/* Channel Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setChannel('WhatsApp')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              channel === 'WhatsApp' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Share
          </button>
          <button
            type="button"
            onClick={() => setChannel('Email')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              channel === 'Email' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" /> Email Dispatch
          </button>
        </div>

        <form onSubmit={handleSend} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Select Client</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
            >
              {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.mobile})</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Select Document Template</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Quote', 'Policy Copy', 'Receipt', 'Property Brochure'] as any[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemplateType(t)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    templateType === t ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-slate-700 text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Message Body Preview</label>
            <textarea
              rows={5}
              readOnly
              value={getTemplateText()}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Dispatch via {channel}
          </button>
        </form>

      </div>
    </div>
  );
};
