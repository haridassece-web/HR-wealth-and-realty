import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { SystemDocument } from '../../types';
import { Upload, Search, FileText, Download } from 'lucide-react';

export const DocumentManagement: React.FC = () => {
  const { documents, addDocument } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [docForm, setDocForm] = useState({
    title: '',
    category: 'Aadhaar' as SystemDocument['category'],
    associatedEntityName: '',
    fileSize: '2.4 MB',
  });

  const categories = ['All', 'Aadhaar', 'PAN', 'Policy Copy', 'Property Document', 'Sale Agreement'];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title || !docForm.associatedEntityName) return;
    addDocument({
      ...docForm,
      fileUrl: '#',
    });
    setIsUploadOpen(false);
  };

  const filtered = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
                          d.associatedEntityName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Digital Document Vault</h2>
          <p className="text-xs text-slate-400">Store and manage Aadhaar cards, PAN cards, policy documents & property sale deeds.</p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Upload className="w-4 h-4" /> Upload New Document
        </button>
      </div>

      {/* Filter Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search document title or client name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-800 rounded-2xl text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm font-heading line-clamp-1">{doc.title}</h3>
                <div className="text-xs text-slate-400 mt-1">Associated with: <span className="text-slate-200 font-semibold">{doc.associatedEntityName}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>{doc.fileSize} • Uploaded {doc.uploadedAt}</div>
              <button
                onClick={() => alert(`Simulated document preview for ${doc.title}`)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl"
              >
                <Download className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white animate-fade-in relative space-y-4">
            <button onClick={() => setIsUploadOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">✕</button>

            <h3 className="text-xl font-bold font-heading">Upload to Document Vault</h3>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Policy_Copy_AgeasFederal_9921.pdf"
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Category</label>
                <select
                  value={docForm.category}
                  onChange={(e) => setDocForm({ ...docForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="Aadhaar">Aadhaar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Policy Copy">Policy Copy</option>
                  <option value="Property Document">Property Document</option>
                  <option value="Sale Agreement">Sale Agreement</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Associated Client / Property Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singh"
                  value={docForm.associatedEntityName}
                  onChange={(e) => setDocForm({ ...docForm, associatedEntityName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl text-center space-y-1">
                <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="text-slate-300 font-semibold">Drop PDF / JPG File Here</div>
                <div className="text-[10px] text-slate-500">Supports PDF, PNG, JPG up to 25MB</div>
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-bold py-3 rounded-xl uppercase tracking-wider text-xs"
              >
                Upload File
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
