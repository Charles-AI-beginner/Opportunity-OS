import React, { useState, useEffect } from 'react';
import OpportunityGrid from './opportunity-track';
import api from '../../../services/api'; 
import AddOpportunityModal from './AddOpportunityModal'; 

export default function DashboardLists() {
  const [opportunities, setOpportunities] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Details & Edit Modal States
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ 
    title: '', 
    company: '', 
    status: 'Applied',
    deadlineDate: '',
    dateApplied: ''
  });

  // 1. Fetch opportunities on mount
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get('/api/opportunities');
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const handleOpportunityAdded = (newOpp) => {
    setOpportunities((prev) => [newOpp, ...prev]);
  };

  // 2. DELETE Handler
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;

    try {
      await api.delete(`/api/opportunities/${id}`);
      setOpportunities((prev) => prev.filter((item) => (item._id || item.id) !== id));
      if (selectedOpportunity && (selectedOpportunity._id || selectedOpportunity.id) === id) {
        setSelectedOpportunity(null);
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  // 3. EDIT Handlers
  const handleStartEdit = () => {
    setEditFormData({
      title: selectedOpportunity.title || '',
      company: selectedOpportunity.company || '',
      status: selectedOpportunity.status || 'Applied',
      deadlineDate: selectedOpportunity.deadlineDate 
        ? new Date(selectedOpportunity.deadlineDate).toISOString().split('T')[0] 
        : '',
      dateApplied: selectedOpportunity.dateApplied 
        ? new Date(selectedOpportunity.dateApplied).toISOString().split('T')[0] 
        : ''
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const id = selectedOpportunity._id || selectedOpportunity.id;
    try {
      const response = await api.put(`/api/opportunities/${id}`, editFormData);
      
      setOpportunities((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? response.data : item))
      );
      
      setSelectedOpportunity(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Header section with Add Button */}
      <div className="w-full flex items-center justify-between text-left mb-6"> 
        <div>
          <h1 className="text-3xl lg:text-4xl text-black font-bold tracking-tight">
            Welcome back, Priyanshu
          </h1> 
          <p className="text-lg text-slate-500 font-medium">
            Here's what's new today
          </p> 
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          + Add Opportunity
        </button>
      </div> 

      {/* Metrics Card Grid */}
      <div className="w-full">
        <OpportunityGrid /> 
      </div> 

      {/* Deadlines & Opportunities Lists */}
      <div className="w-full mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-1">
          
          {/* ================= UPCOMING DEADLINES ================= */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Upcoming Deadlines</h3>
              <button className="text-[14px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View all</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {opportunities.length === 0 ? (
                <p className="text-slate-400 text-sm">No opportunities added yet.</p>
              ) : (
                opportunities.map((item) => {
                  const itemID = item._id || item.id;
                  return (
                    <div 
                      key={itemID} 
                      onClick={() => { setSelectedOpportunity(item); setIsEditing(false); }}
                      className="flex items-center justify-between group py-2 px-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border bg-indigo-50 text-indigo-600 border-indigo-100">
                          {item.title ? item.title[0].toUpperCase() : 'O'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[17px] text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                            {item.title}
                          </span>
                          {item.company && (
                            <span className="text-[13px] text-slate-400 mt-0.5">{item.company}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.deadlineDate && (
                          <span className="text-[13px] font-semibold text-rose-500 bg-rose-50/60 px-2.5 py-1 rounded-lg">
                            {formatDate(item.deadlineDate)}
                          </span>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={(e) => handleDelete(e, itemID)}
                          title="Delete Opportunity"
                          className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ================= RECENT OPPORTUNITIES ================= */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Recent Opportunities</h3>
              <button className="text-[14px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View all</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {opportunities.map((item) => (
                <div key={item._id || item.id} className="flex items-center justify-between group py-1 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border bg-slate-900 text-white border-slate-800">
                      {item.title ? item.title[0].toUpperCase() : 'O'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[16px] text-slate-800 leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[13px] text-slate-400 mt-0.5">{item.status || 'Applied'}</span>
                    </div>
                  </div>
                  {item.dateApplied && (
                    <span className="text-[12px] font-medium text-slate-400">
                      Applied {formatDate(item.dateApplied)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div> 

      {/* Modal for ADDING an Opportunity */}
      <AddOpportunityModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onOpportunityAdded={handleOpportunityAdded}
      />

      {/* Modal for VIEWING / EDITING Full Details */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl text-left space-y-4">
            
            {!isEditing ? (
              /* VIEW MODE */
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedOpportunity.title}</h2>
                  <button 
                    onClick={handleStartEdit}
                    className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="space-y-2 text-slate-600">
                  <p><strong>Company:</strong> {selectedOpportunity.company || 'N/A'}</p>
                  <p><strong>Status:</strong> {selectedOpportunity.status || 'Applied'}</p>
                  <p><strong>Date Applied:</strong> {formatDate(selectedOpportunity.dateApplied)}</p>
                  <p><strong>Deadline Date:</strong> {formatDate(selectedOpportunity.deadlineDate)}</p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setSelectedOpportunity(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              /* EDIT MODE */
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Edit Opportunity</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={editFormData.company}
                    onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date Applied</label>
                  <input
                    type="date"
                    value={editFormData.dateApplied}
                    onChange={(e) => setEditFormData({ ...editFormData, dateApplied: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={editFormData.deadlineDate}
                    onChange={(e) => setEditFormData({ ...editFormData, deadlineDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}