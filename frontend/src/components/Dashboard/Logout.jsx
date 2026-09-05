import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({isOpen,onClose}){


    if(!isOpen) return null;

    const navigate = useNavigate();

    const [isLogout,setIsLogout] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        onClose(); 
        } catch (err) {
        console.error('Failed to add opportunity', err);
        }
    };
    if(isLogout){
        setIsLogout(false);
        localStorage.removeItem('token');
        navigate('/login')
    }
    return(
        <>  
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-md text-white">
                    <h2 className="text-xl font-semibold mb-4">Do you really want to logout?</h2>
                    <div className="flex items-center gap-3">
                        <button
                        onClick={() => setIsLogout(true)}
                        className="red"
                        >
                            Logout
                        </button>
                        <button onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )


}