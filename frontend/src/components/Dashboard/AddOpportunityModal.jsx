import {useState} from 'react';
import api from '../../../services/api';

export default function AddOpportunityModal({ isOpen, onClose, onOpportunityAdded }){
    const [formData, setFormData] = useState({ title: '', company: '', status: 'Applied' });
    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await api.post('/api/opportunities', formData);
        onOpportunityAdded(response.data); // Update dashboard UI instantly
        onClose(); // Close popup
        } catch (err) {
        console.error('Failed to add opportunity', err);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-md text-white">
            <h2 className="text-xl font-semibold mb-4">Add New Opportunity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="title"
                placeholder="Job Title"
                required
                className="w-full p-3 bg-zinc-800 rounded-xl border border-white/10"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                required
                className="w-full p-3 bg-zinc-800 rounded-xl border border-white/10"
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white">
                Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-xl font-medium hover:bg-indigo-500">
                Save
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}