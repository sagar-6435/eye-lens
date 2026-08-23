import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error, please try again later.');
    }
  };

  return (
    <div className="pt-12 pb-24 px-4 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-2">Welcome Back</h1>
        <p className="text-text-secondary">Sign in to access your saved items and history.</p>
      </div>

      <div className="bg-background-secondary rounded-3xl p-6 md:p-8 border border-border-primary shadow-sm">
        {error && <div className="mb-4 text-red-500 text-sm font-medium text-center">{error}</div>}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              className="w-full bg-background border border-border-primary rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-text-primary" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-background border border-border-primary rounded-xl px-4 py-3 pr-12 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary hover:text-text-primary focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-hover active:scale-[0.98] text-background font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-primary hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
