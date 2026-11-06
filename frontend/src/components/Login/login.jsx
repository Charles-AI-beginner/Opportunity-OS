import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import authService from '../../../services/authService'; 
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
        
        //auto login after successful registration
        if (response?.success) {
          response = await authService.login(email, password);
        }
      } 
      else {
        response = await authService.login(email, password);
      }

      if (response?.success) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        navigate('/dashboard');
      } 
      else {
        setErrorMessage(
          typeof response === 'string' 
            ? response 
            : response?.message || 'Authentication failed'
        );
      }
    } catch (error) {
      console.log('Status:', error.response?.status);
      console.log('Backend response:', error.response?.data);
      console.log('Full error:', error);

      setErrorMessage(
        error.response?.data?.message ||
        'Google authentication failed. Please try again.'
      );
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
      console.log('Backend status:', error.response?.status);
      console.log('Backend response:', error.response?.data);

      setErrorMessage(
        error.response?.data?.message ||
        'Google authentication failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  console.log('Current origin:', window.location.origin);
  console.log(
    'Frontend Google Client ID:',
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  );

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-6 bg-slate-950 font-sans text-slate-100 overflow-y-auto overscroll-none">
      
      {/* Seamless Background Lighting Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12),rgba(15,23,42,0)_75%)]" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md my-auto p-8 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl shadow-indigo-950/40">
        
        {/* Mode Toggle & Close Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-slate-950/80 p-1 rounded-full border border-slate-800/80">
            <button
              type="button"
              onClick={() => handleModeSwitch(true)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isSignUp 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch(false)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                !isSignUp 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign in
            </button>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/')}
            aria-label="Close form"
            className="p-2 text-slate-400 hover:text-white bg-slate-950/80 hover:bg-slate-800 rounded-full border border-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-5 text-white">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>

        {/* Error Message */}
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
                className="w-full px-4 py-3 bg-slate-950/70 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                name="family-name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={isSignUp}
                className="w-full px-4 py-3 bg-slate-950/70 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
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
              className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
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
              className="w-full px-4 py-3 bg-slate-950/70 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Create an account' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Section */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage('Google login failed')}
            theme="filled_black"
            shape="pill"
            width="320"
          />
        </div>

      </div>
    </div>
  );
}