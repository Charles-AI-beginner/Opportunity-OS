import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import {
  LayoutDashboard,
  Layers,
  Megaphone,
  Calendar,
  Plus,
  Mail,
  Trash2,
  Edit2,
  X,
  LogOut,
  Clock,
  Briefcase,
  CheckCircle2,
  Building2,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Check,
  Loader2,
  Search
} from 'lucide-react';

// ==========================================
// 1. NAV MENU COMPONENT
// ==========================================
const navOptions = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'apps', label: 'Applications', icon: Layers },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'gmail', label: 'Connect Gmail', icon: Mail }
];

const connectGmail = async () => {
  try {
    const response = await api.get('/api/auth/google/url');
    window.location.href = response.data.authUrl;
  } catch (error) {
    console.error('Gmail connection failed:', error);
    alert('Could not start Gmail connection. Please log in again and retry.');
  }
};

function NavMenu({ activeTab, setActiveTab, onOpenLogout }) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 p-4 shrink-0 z-10">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            O
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight leading-none">Opportunity OS</h1>
            <span className="text-xs text-indigo-400 font-medium tracking-wide">CAREER TRACKER</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navOptions.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'gmail') {
                    connectGmail();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <IconComponent size={18} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800/80">
        <button
          onClick={onOpenLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ==========================================
// 2. LOGOUT MODAL
// ==========================================
function LogoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <LogOut size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Log out of your account?</h2>
          <p className="text-sm text-slate-400 mt-1">
            You will need to sign back in to access your opportunity tracking dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-rose-600/20 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ADD OPPORTUNITY MODAL
// ==========================================
function AddOpportunityModal({ isOpen, onClose, onOpportunityAdded }) {
  const [formData, setFormData] = useState({ title: '', company: '', status: 'Applied' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/opportunities', {...formData, opportunityStatus: formData.status});
      onOpportunityAdded(response.data);
      onClose();
      setFormData({ title: '', company: '', status: 'Applied' });
    } catch (err) {
      console.error('Failed to add opportunity', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Plus size={18} />
            </div>
            <h2 className="text-lg font-semibold">Add New Opportunity</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
            <input
              type="text"
              required
              placeholder="e.g. Stripe"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
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
              className="px-4 py-2.5 text-slate-400 hover:text-white rounded-xl text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25"
            >
              Save Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 4. GMAIL IMPORT MODAL
// ==========================================
function GmailImportModal({ isOpen, onClose, gmailItems = [], onOpportunitiesAdded }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const itemsList = Array.isArray(gmailItems) ? gmailItems : [];

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === itemsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(itemsList.map((item, index) => item.id || `item-${index}`));
    }
  };

  
const handleImport = async () => {
  if (selectedIds.length === 0) return;

  setIsSubmitting(true);

  const itemsToImport = itemsList.filter((item, index) => {
    const itemId = item.id || `item-${index}`;
    return selectedIds.includes(itemId);
  });

  const addedOpportunities = [];
  let duplicates = 0;
  let failures = 0;

  try {
    for (const item of itemsToImport) {
      let parsedDate = new Date().toISOString();

      if (item.date) {
        const tryDate = new Date(item.date);
        if (!isNaN(tryDate.getTime())) {
          parsedDate = tryDate.toISOString();
        }
      }

      const payload = {
        title: item.title || 'Untitled Position',
        company: item.company || 'Unknown Sender',
        opportunityStatus: 'Applied',
        dateApplied: parsedDate,
        gmailMessageId: item.id || null
      };

      try {
        const response = await api.post(
          '/api/opportunities',
          payload
        );

        addedOpportunities.push(response.data);
      } catch (error) {
        if (error.response?.status === 409) {
          duplicates++;
        } else {
          failures++;
          console.error(
            'Error importing Gmail opportunity:',
            item.id,
            error
          );
        }
      }
    }

    if (addedOpportunities.length > 0) {
      onOpportunitiesAdded?.(addedOpportunities);
    }

    alert(
      `Import complete!\n` +
      `${addedOpportunities.length} added\n` +
      `${duplicates} already saved\n` +
      `${failures} failed`
    );

    // Close only if every item was imported or was a duplicate.
    if (failures === 0) {
      onClose();
    }
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Mail size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-tight">Import Opportunities</h2>
              <p className="text-xs text-slate-400 mt-0.5">Select emails to add to your tracker</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1 flex-shrink-0">
          <span>{selectedIds.length} of {itemsList.length} selected</span>
          <button
            type="button"
            onClick={toggleSelectAll}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            {selectedIds.length === itemsList.length && itemsList.length > 0
              ? 'Deselect All'
              : 'Select All'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-[200px] border border-slate-800/80 rounded-xl p-2 bg-slate-950/40">
          {itemsList.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              No new email opportunities found.
            </div>
          ) : (
            itemsList.map((item, index) => {
              const itemId = item.id || `item-${index}`;
              const isChecked = selectedIds.includes(itemId);

              return (
                <div
                  key={itemId}
                  onClick={() => toggleSelect(itemId)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-indigo-600/10 border-indigo-500/40 text-white'
                      : 'bg-slate-950/60 border-slate-800/60 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1 pr-3 min-w-0">
                    <p className="text-sm font-semibold text-slate-100 truncate flex items-center gap-1.5">
                      <Building2 size={13} className="text-slate-400 shrink-0" />
                      {item.company || 'Unknown Company'}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                      {item.title || 'Untitled Opportunity'}
                    </p>
                  </div>

                  <div className="flex items-center shrink-0">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isChecked && <Check size={13} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 text-slate-400 hover:text-white rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={selectedIds.length === 0 || isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <span>Import Selected ({selectedIds.length})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. VIEW ALL MODAL COMPONENT
// ==========================================
function ViewAllModal({ isOpen, onClose, title, opportunities = [], onSelectOpportunity, onDeleteOpportunity, getStatusBadge, formatDate }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredItems = opportunities.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const companyMatch = item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || companyMatch;
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-2xl text-white shadow-2xl space-y-5 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Briefcase size={18} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-shrink-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
          />
        </div>

        {/* Scrollable Opportunities List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-[250px]">
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <AlertCircle size={32} className="mb-2 opacity-40" />
              <p className="text-sm font-medium">No opportunities match your filter.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const itemID = item._id || item.id;
              return (
                <div
                  key={itemID}
                  onClick={() => {
                    onSelectOpportunity(item);
                  }}
                  className="flex items-center justify-between group p-3.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/50 hover:border-slate-700/80 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-slate-800 text-slate-200 border border-slate-700 shrink-0">
                      {item.title ? item.title[0].toUpperCase() : 'O'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm text-slate-200 group-hover:text-indigo-400 transition-colors leading-tight truncate">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400 mt-1 flex items-center gap-1 truncate">
                        <Building2 size={12} className="shrink-0" />
                        {item.company || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {item.deadlineDate && (
                      <span className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                        {formatDate(item.deadlineDate)}
                      </span>
                    )}

                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status || 'Applied'}
                    </span>

                    <button
                      onClick={(e) => onDeleteOpportunity(e, itemID)}
                      title="Delete Opportunity"
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 6. OPPORTUNITY STATS GRID
// ==========================================
function OpportunityGrid({ opportunities = [] }) {
  const totalTracked = opportunities.length;
  const interviewingCount = opportunities.filter((o) => o.status === 'Interviewing').length;
  const upcomingDeadlinesCount = opportunities.filter((o) => o.deadlineDate).length;
  const offersCount = opportunities.filter((o) => o.status === 'Offer').length;

  const features = [
    {
      id: 1,
      title: 'Applications Tracked',
      value: totalTracked,
      subtext: `${opportunities.filter((o) => o.status === 'Applied').length} active applications`,
      icon: Briefcase,
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 2,
      title: 'Active Interviews',
      value: interviewingCount,
      subtext: interviewingCount > 0 ? `${interviewingCount} in pipeline` : 'No active interviews',
      icon: TrendingUp,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 3,
      title: 'Upcoming Deadlines',
      value: upcomingDeadlinesCount,
      subtext: upcomingDeadlinesCount > 0 ? 'Requires action soon' : 'No pending dates',
      icon: Clock,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30'
    },
    {
      id: 4,
      title: 'Offers Received',
      value: offersCount,
      subtext: offersCount > 0 ? 'Great job!' : 'Awaiting responses',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.id}
            className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {feature.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-br border ${feature.color}`}>
                <Icon size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-bold text-white tracking-tight">{feature.value}</div>
              <p className="text-xs text-slate-400 font-medium">{feature.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 7. MAIN APP CONTAINER & DASHBOARD
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Gmail Import States
  const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);
  const [gmailFetchedItems, setGmailFetchedItems] = useState([]);
  const [isFetchingGmail, setIsFetchingGmail] = useState(false);

  // View All Modal States
  const [viewAllConfig, setViewAllConfig] = useState({ isOpen: false, title: '', items: [] });

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    company: '',
    status: 'Applied',
    deadlineDate: '',
    dateApplied: ''
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get('/api/opportunities');
      const normalizedData = response.data.map((item) => ({
        ...item,
        id: item._id || item.id,
        status: item.opportunityStatus || item.status || 'Applied'
      }));
      setOpportunities(normalizedData);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const handleOpportunityAdded = (newOpp) => {
    const normalized = {
      ...newOpp,
      id: newOpp._id || newOpp.id,
      status: newOpp.opportunityStatus || newOpp.status || 'Applied'
    };
    setOpportunities((prev) => [normalized, ...prev]);
  };

  const handleMultipleOpportunitiesAdded = (newOpps) => {
    const normalizedList = newOpps.map((item) => ({
      ...item,
      id: item._id || item.id,
      status: item.opportunityStatus || item.status || 'Applied'
    }));
    setOpportunities((prev) => [...normalizedList, ...prev]);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;

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

  const handleStartEdit = () => {
    setEditFormData({
      title: selectedOpportunity.title || '',
      company: selectedOpportunity.company || '',
      status: selectedOpportunity.opportunityStatus || selectedOpportunity.status || 'Applied',
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
      const response = await api.put(`/api/opportunities/${id}`, {
        ...editFormData,
        opportunityStatus: editFormData.status
      });

      const updatedNormalized = {
        ...response.data,
        id: response.data._id || response.data.id,
        status: response.data.opportunityStatus || response.data.status || 'Applied'
      };

      setOpportunities((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? updatedNormalized : item))
      );
      setSelectedOpportunity(updatedNormalized);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interviewing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Offer':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  const testGmailFetch = async () => {
    try {
      setIsFetchingGmail(true);
      const response = await api.get('/api/gmail/opportunities');
      setGmailFetchedItems(response.data || []);
      setIsGmailModalOpen(true);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Gmail fetch failed');
    } finally {
      setIsFetchingGmail(false);
    }
  };

  const upcomingItems = opportunities.filter((item) => item.deadlineDate);

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden fixed inset-0">
      <NavMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogout={() => setIsLogoutOpen(true)}
      />

      <main className="flex-1 w-full h-full p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-950">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
          <div>
            <h1 className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Welcome back, User
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Here's an overview of your active career applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={testGmailFetch}
              disabled={isFetchingGmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <Mail size={18} className="text-indigo-400" />
              <span>{isFetchingGmail ? 'Fetching Emails...' : 'Sync Gmail'}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Plus size={18} />
              <span>Add Opportunity</span>
            </button>
          </div>
        </div>

        <OpportunityGrid opportunities={opportunities} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Upcoming Deadlines (Recent 4) */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col h-[380px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-rose-400" />
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Upcoming Deadlines
                </h3>
              </div>
              <button
                onClick={() =>
                  setViewAllConfig({
                    isOpen: true,
                    title: 'All Upcoming Deadlines',
                    items: upcomingItems
                  })
                }
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
              {upcomingItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <AlertCircle size={28} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">No upcoming deadlines found.</p>
                </div>
              ) : (
                upcomingItems.slice(0, 4).map((item) => {
                  const itemID = item._id || item.id;
                  return (
                    <div
                      key={itemID}
                      onClick={() => {
                        setSelectedOpportunity(item);
                        setIsEditing(false);
                      }}
                      className="flex items-center justify-between group p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/50 hover:border-slate-700/80 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.title ? item.title[0].toUpperCase() : 'O'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-slate-200 group-hover:text-indigo-400 transition-colors leading-tight">
                            {item.title}
                          </span>
                          {item.company && (
                            <span className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                              <Building2 size={12} />
                              {item.company}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.deadlineDate && (
                          <span className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                            {formatDate(item.deadlineDate)}
                          </span>
                        )}
                        <button
                          onClick={(e) => handleDelete(e, itemID)}
                          title="Delete Opportunity"
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Opportunities (Recent 4) */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col h-[380px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-400" />
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Recent Opportunities
                </h3>
              </div>
              <button
                onClick={() =>
                  setViewAllConfig({
                    isOpen: true,
                    title: 'All Opportunities',
                    items: opportunities
                  })
                }
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
              {opportunities.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <AlertCircle size={28} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">No opportunities created yet.</p>
                </div>
              ) : (
                opportunities.slice(0, 4).map((item) => {
                  const itemID = item._id || item.id;
                  return (
                    <div
                      key={itemID}
                      onClick={() => {
                        setSelectedOpportunity(item);
                        setIsEditing(false);
                      }}
                      className="flex items-center justify-between group p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/50 hover:border-slate-700/80 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-slate-800 text-slate-200 border border-slate-700">
                          {item.title ? item.title[0].toUpperCase() : 'O'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-slate-200 group-hover:text-indigo-400 transition-colors leading-tight">
                            {item.title}
                          </span>
                          <span className="text-xs text-slate-400 mt-0.5">
                            {item.company || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status || 'Applied'}
                        </span>
                        <button
                          onClick={(e) => handleDelete(e, itemID)}
                          title="Delete Opportunity"
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddOpportunityModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onOpportunityAdded={handleOpportunityAdded}
        />

        <GmailImportModal
          isOpen={isGmailModalOpen}
          onClose={() => setIsGmailModalOpen(false)}
          gmailItems={gmailFetchedItems}
          onOpportunitiesAdded={handleMultipleOpportunitiesAdded}
        />

        <ViewAllModal
          isOpen={viewAllConfig.isOpen}
          onClose={() => setViewAllConfig({ ...viewAllConfig, isOpen: false })}
          title={viewAllConfig.title}
          opportunities={viewAllConfig.items}
          onSelectOpportunity={(item) => {
            setSelectedOpportunity(item);
            setIsEditing(false);
          }}
          onDeleteOpportunity={handleDelete}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
        />

        <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />

        {/* Opportunity Detail & Edit Modal */}
        {selectedOpportunity && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
              {!isEditing ? (
                <>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedOpportunity.title}</h2>
                      <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                        <Building2 size={14} />
                        {selectedOpportunity.company || 'No company specified'}
                      </p>
                    </div>
                    <button
                      onClick={handleStartEdit}
                      className="px-3 py-1.5 text-xs bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 font-medium rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Status</span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${getStatusBadge(
                          selectedOpportunity.status
                        )}`}
                      >
                        {selectedOpportunity.status || 'Applied'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Date Applied</span>
                      <span className="font-medium text-slate-200">
                        {formatDate(selectedOpportunity.dateApplied)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Deadline</span>
                      <span className="font-medium text-slate-200">
                        {formatDate(selectedOpportunity.deadlineDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedOpportunity(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h2 className="text-lg font-bold text-white">Edit Opportunity</h2>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editFormData.title}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={editFormData.company}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Date Applied
                      </label>
                      <input
                        type="date"
                        value={editFormData.dateApplied}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, dateApplied: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Deadline Date
                      </label>
                      <input
                        type="date"
                        value={editFormData.deadlineDate}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, deadlineDate: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}