import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import api from '../../../services/api';

export default function AddOpportunityModal({ isOpen, onClose, onOpportunityAdded }) {
  const [formData, setFormData] = useState({ title: '', company: '', status: 'Applied' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/opportunities', formData);
      onOpportunityAdded(response.data); // Update dashboard UI instantly
      onClose(); // Close popup
      setFormData({ title: '', company: '', status: 'Applied' });
    } catch (err) {
      console.error('Failed to add opportunity', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Plus size={18} />
            </div>
            <h2 className="text-lg font-semibold">Add New Opportunity</h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Senior Frontend Engineer"
              required
              value={formData.title}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Stripe, Vercel"
              required
              value={formData.company}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              Save Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}