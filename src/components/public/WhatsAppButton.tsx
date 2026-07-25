import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello HR Wealthy & Realty, I would like to inquire about your Insurance, Investment, and Luxury Real Estate services.");
    window.open(`https://wa.me/919884933079?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-5 py-3.5 rounded-full shadow-2xl pulse-whatsapp flex items-center gap-2.5 transition-all transform hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500 group-hover:rotate-12 transition-transform" />
      <span className="text-sm tracking-wide hidden sm:inline">Chat on WhatsApp</span>
    </button>
  );
};
