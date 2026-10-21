import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Logout({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onClose(); 
    } catch (err) {
      console.error('Failed to add opportunity', err);
    }
  };

  if (isLogout) {
    setIsLogout(false);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <LogOut size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Log out of your account?</h2>
          <p className="text-sm text-slate-400 mt-1">You will need to sign back in to access your opportunity tracking dashboard.</p>
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
            onClick={() => setIsLogout(true)}
            className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-rose-600/20 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}