import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Trash2, Save, Loader2, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { supabase } from '../lib/supabaseClient.js';

export default function SettingsPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  const [form, setForm] = useState({ name: '', phone: '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }

  useEffect(() => {
    if (profile) {
      setForm({ name: profile.name || '', phone: profile.phone || '' });
    }
  }, [profile]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { showMessage('error', 'Name is required.'); return; }
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name: form.name.trim(), phone: form.phone.trim(), updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
      showMessage('success', 'Profile updated successfully!');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new.length < 8) { showMessage('error', 'Password must be at least 8 characters.'); return; }
    if (passwords.new !== passwords.confirm) { showMessage('error', 'Passwords do not match.'); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.new });
      if (error) throw error;
      setPasswords({ current: '', new: '', confirm: '' });
      showMessage('success', 'Password changed successfully!');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      showMessage('error', 'Type DELETE to confirm account deletion.');
      return;
    }
    setLoading(true);
    try {
      // Delete profile (cascades to wallet, transactions, etc.)
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      showMessage('error', err.message);
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'danger', label: 'Delete Account', icon: Trash2 },
  ];

  const inputClass = "w-full h-11 px-4 text-sm rounded-xl input-dark";

  return (
    <div className="min-h-screen bg-surface-1 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-3xl font-black text-white mb-2">Account Settings</h1>
        <p className="text-white/40 text-sm mb-8">Manage your profile, password and account preferences.</p>

        {/* Message */}
        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 p-4 rounded-xl mb-6 text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
            {message.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {message.text}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ background: 'var(--surface-2)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? t.id === 'danger' ? 'bg-red-500/20 text-red-400' : 'text-surface-1'
                  : 'text-white/40 hover:text-white'
              }`}
              style={{ background: activeTab === t.id && t.id !== 'danger' ? 'var(--cyan)' : undefined }}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl border border-subtle p-6" style={{ background: 'var(--surface-2)' }}>
              <h2 className="text-lg font-bold text-white mb-6">Personal Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name" className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" value={user?.email || ''} disabled
                    className={`${inputClass} opacity-40 cursor-not-allowed`} />
                  <p className="text-xs text-white/25 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="021 123 4567" className={inputClass} />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-cyan w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* PASSWORD TAB */}
        {activeTab === 'password' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl border border-subtle p-6" style={{ background: 'var(--surface-2)' }}>
              <h2 className="text-lg font-bold text-white mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">New Password</label>
                  <input type="password" value={passwords.new}
                    onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                    placeholder="Min. 8 characters" className={inputClass} required minLength={8} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Confirm New Password</label>
                  <input type="password" value={passwords.confirm}
                    onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                    placeholder="Repeat new password" className={inputClass} required />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-cyan w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Changing...</> : <><Lock size={16} /> Change Password</>}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* DANGER TAB */}
        {activeTab === 'danger' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl border p-6" style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.15)' }}>
                  <AlertTriangle size={18} className="text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Delete Account</h2>
                  <p className="text-xs text-red-400/70">This action is permanent and cannot be undone</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-white/50 mb-6 p-4 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.06)' }}>
                <p>Deleting your account will permanently remove:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Your profile and personal information</li>
                  <li>All jobs you have posted</li>
                  {userRole === 'pro' && <li>Your credits wallet and transaction history</li>}
                  <li>All account data from our servers</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                    Type <span className="text-red-400 font-bold">DELETE</span> to confirm
                  </label>
                  <input type="text" value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder="Type DELETE here"
                    className="w-full h-11 px-4 text-sm rounded-xl border text-white"
                    style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)' }} />
                </div>
                <button onClick={handleDeleteAccount}
                  disabled={loading || deleteConfirm !== 'DELETE'}
                  className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: deleteConfirm === 'DELETE' ? 'rgba(239,68,68,0.9)' : 'rgba(239,68,68,0.2)', color: '#fff' }}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Deleting...</> : <><Trash2 size={16} /> Permanently Delete My Account</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
