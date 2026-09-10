import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import authService from '../../../services/authservice'; 
import api from '../../../services/api';

export default function OriginalHoverForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormState = () => {
    setErrorMessage('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleModeSwitch = (signUpMode) => {
    setIsSignUp(signUpMode);
    resetFormState();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      let response;

      if (isSignUp) {
        response = await authService.register(firstName, lastName, email, password);
        
        // Auto-login after successful registration
        if (response?.success) {
          response = await authService.login(email, password);
        }
      } else {
        response = await authService.login(email, password);
      }

      if (response?.success) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        navigate('/dashboard');
      } else {
        setErrorMessage(
          typeof response === 'string' 
            ? response 
            : response?.message || 'Authentication failed'
        );
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Server error. Please try again later.';
      setErrorMessage(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      // Send the Google credential token to your Express backend
      const res = await api.post('/api/auth/google', {
        token: credentialResponse.credential,
      });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google Auth Error:', error);
      setErrorMessage('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 bg-[length:400%_400%] animate-gradient bg-gradient-to-r from-indigo-950 via-purple-900 to-pink-950 font-sans text-white overflow-y-auto overscroll-none">
      <div className="relative w-full max-w-md my-auto p-8 bg-black rounded-3xl border border-white/10 shadow-xl shadow-black/40">
        
        {/* Toggle Sign Up / Sign In & Close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-[#1a1a1e] p-1 rounded-full border border-white/5">
            <button
              type="button"
              onClick={() => handleModeSwitch(true)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isSignUp ? 'bg-[#27272a] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch(false)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                !isSignUp ? 'bg-[#27272a] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign in
            </button>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/')}
            aria-label="Close form"
            className="p-2 text-zinc-400 hover:text-white bg-[#1a1a1e] hover:bg-[#27272a] rounded-full border border-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight mb-5">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>

        {/* Display Error Banner if any */}
        {errorMessage && (
          <div role="alert" className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Form Inputs */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                name="given-name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={isSignUp}
                className="w-full px-4 py-3 bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                name="family-name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={isSignUp}
                className="w-full px-4 py-3 bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Create an account' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-3 text-zinc-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage('Google login failed')}
            theme="filled_black"
            shape="pill"
            width="100%"
          />
        </div>

      </div>
    </div>
  );
}