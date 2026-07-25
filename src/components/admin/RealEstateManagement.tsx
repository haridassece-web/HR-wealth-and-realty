import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Property, PropertyType, PropertyStatus } from '../../types';
import { Plus, Edit3, Search, MapPin } from 'lucide-react';

export const RealEstateManagement: React.FC = () => {
  const { properties, addProperty, updateProperty } = useApp();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    ownerMobile: '',
    type: 'Villa' as PropertyType,
    location: '',
    city: 'Chennai',
    price: 25000000,
    areaSqFt: 3500,
    bedrooms: 4,
    bathrooms: 4,
    parkingSpots: 2,
    images: [] as string[],
    documents: ['Title_Deed_Approved.pdf', 'GHMC_Sanction.pdf'],
    status: 'Available' as PropertyStatus,
    featured: true,
    description: '',
  });

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setFormData({
      propertyName: 'Royal Crown Triplex Villa',
      ownerName: 'Vanguard Infrastructure',
      ownerMobile: '+91 99887 11223',
      type: 'Villa',
      location: 'Jubilee Hills, Road 12',
      city: 'Chennai',
      price: 42000000,
      areaSqFt: 4800,
      bedrooms: 5,
      bathrooms: 5,
      parkingSpots: 3,
      images: [] as string[],
      documents: ['RERA_Approved_2025.pdf'],
      status: 'Available',
      featured: true,
      description: 'Luxury 5 BHK independent villa with private swimming pool and home theater.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      propertyName: prop.propertyName,
      ownerName: prop.ownerName,
      ownerMobile: prop.ownerMobile,
      type: prop.type,
      location: prop.location,
      city: prop.city,
      price: prop.price,
      areaSqFt: prop.areaSqFt,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      parkingSpots: prop.parkingSpots,
      images: prop.images,
      documents: prop.documents,
      status: prop.status,
      featured: prop.featured || false,
      description: prop.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.propertyName) return;

    if (editingProperty) {
      updateProperty(editingProperty.id, formData);
    } else {
      addProperty(formData);
    }
    setIsModalOpen(false);
  };

  const filtered = properties.filter(p => {
    const matchesSearch = p.propertyName.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakhs`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Real Estate Inventory Module (CRUD)</h2>
          <p className="text-xs text-slate-400">List, update & track luxury villas, penthouses, commercial office spaces & deeds.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="gradient-gold-bg text-[#0B132B] font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Add Property Listing
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by property title, owner or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
          >
            <option value="All">All Asset Types</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial Office">Commercial Office</option>
          </select>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prop) => (
          <div key={prop.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4">

            <div className="relative h-48 bg-gradient-to-br from-[#0B1E3D] via-[#07152F] to-[#0F1E3C] p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  {prop.type}
                </span>
                <div className="text-xl font-extrabold text-white font-heading mt-2">
                  ₹{(prop.price / 10000000).toFixed(2)} Cr
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-emerald-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                {prop.status}
              </div>
            </div>

            <div className="px-6 space-y-3">
              <div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {prop.location}
                </div>
                <h3 className="text-lg font-bold font-heading text-white line-clamp-1">{prop.propertyName}</h3>
                <div className="text-xl font-extrabold text-amber-400 font-heading mt-1">{formatPrice(prop.price)}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-center text-xs text-slate-300">
                <div>{prop.bedrooms} BHK</div>
                <div>{prop.bathrooms} Baths</div>
                <div>{prop.areaSqFt} Sq.Ft</div>
              </div>

              <div className="text-xs text-slate-400">
                <span className="font-semibold text-white">Owner:</span> {prop.ownerName} ({prop.ownerMobile})
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(prop)}
                className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" /> Edit Specs
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white animate-fade-in relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">✕</button>

            <h3 className="text-xl font-bold font-heading">
              {editingProperty ? 'Edit Property Listing' : 'Add New Real Estate Listing'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Property Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial Office">Commercial Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Owner Contact Mobile</label>
                  <input
                    type="tel"
                    value={formData.ownerMobile}
                    onChange={(e) => setFormData({ ...formData, ownerMobile: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Area (Sq.Ft)</label>
                  <input
                    type="number"
                    value={formData.areaSqFt}
                    onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location Address</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-2 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    <option value="Available">Available</option>
                    <option value="Under Offer">Under Offer</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all"
              >
                {editingProperty ? 'Update Listing Specs' : 'Save Property Listing'}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
