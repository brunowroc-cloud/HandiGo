import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Wrench, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, session } = await signIn(form);
      // Wait for profile to load then redirect
      setTimeout(() => {
        const role = user?.user_metadata?.role;
        if (from) navigate(from, { replace: true });
        else if (role === 'pro') navigate('/pro/dashboard');
        else if (role === 'admin') navigate('/admin');
        else navigate('/dashboard');
      }, 300);
    } catch (err) {
      setError(err.message?.includes('Invalid') ? 'Invalid email or password.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-1 flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.8) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-cyan-400 flex items-center justify-center">
            <Wrench size={18} className="text-surface-1" />
          </div>
          <span className="font-black text-xl text-white">HandiGo</span>
        </Link>

        {/* Card */}
        <div className="glass-md rounded-2xl p-8">
          <h1 className="text-2xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to your HandiGo account</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="input-dark w-full h-12 pl-10 pr-4 text-sm rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                <input
                  type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-dark w-full h-12 pl-10 pr-11 text-sm rounded-xl"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-cyan w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-subtle space-y-3 text-center text-sm">
            <p className="text-white/30">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                Sign up free
              </Link>
            </p>
            <p className="text-white/30">
              Are you a tradesperson?{' '}
              <Link to="/join-pro" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                Join as a Pro
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
