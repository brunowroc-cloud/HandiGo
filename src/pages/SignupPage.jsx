import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Wrench, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await signUp({ email: form.email, password: form.password, name: form.name, phone: form.phone, role: 'client' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message?.includes('already') ? 'This email is already registered.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'John Smith', icon: User, type: 'text' },
    { key: 'email', label: 'Email', placeholder: 'you@example.com', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '021 123 4567', icon: Phone, type: 'tel' },
  ];

  return (
    <div className="min-h-screen bg-surface-1 flex items-center justify-center px-4 py-16">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.8) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10">

        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-cyan-400 flex items-center justify-center">
            <Wrench size={18} className="text-surface-1" />
          </div>
          <span className="font-black text-xl text-white">HandiGo</span>
        </Link>

        <div className="glass-md rounded-2xl p-8">
          <h1 className="text-2xl font-black text-white mb-1">Create account</h1>
          <p className="text-white/40 text-sm mb-8">Get free quotes from verified tradespeople</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, placeholder, icon: Icon, type }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                  <input type={type} required={key !== 'phone'} value={form[key]} onChange={set(key)}
                    placeholder={placeholder}
                    className="input-dark w-full h-12 pl-10 pr-4 text-sm rounded-xl" />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {['password', 'confirm'].map((key, i) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    {i === 0 ? 'Password' : 'Confirm'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={15} />
                    <input type={showPass ? 'text' : 'password'} required value={form[key]} onChange={set(key)}
                      placeholder="••••••••" minLength={8}
                      className="input-dark w-full h-12 pl-10 pr-4 text-sm rounded-xl" />
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => setShowPass(s => !s)}
              className="text-xs text-white/30 hover:text-white/50 flex items-center gap-1 transition-colors">
              {showPass ? <EyeOff size={12} /> : <Eye size={12} />}
              {showPass ? 'Hide' : 'Show'} password
            </button>

            <button type="submit" disabled={loading}
              className="btn-cyan w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
              {loading ? 'Creating account...' : <> Create Account <ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="text-center text-white/30 text-sm mt-6 pt-6 border-t border-subtle">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
