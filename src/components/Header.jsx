import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, LogOut, LayoutDashboard, ChevronDown, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header() {
  const { user, profile, isAuthenticated, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileOpen(false);
    setDropOpen(false);
  };

  const dashPath = userRole === 'admin' ? '/admin' : userRole === 'pro' ? '/pro/dashboard' : '/dashboard';

  const initials = (profile?.name || user?.email || 'U')
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-subtle"
      style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-white">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--cyan)' }}>
            <Wrench size={16} className="text-surface-1" />
          </div>
          HandiGo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/join-pro"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                For Pros
              </Link>
              <Link to="/login"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Login
              </Link>
              <Link to="/signup"
                className="btn-cyan px-5 py-2 rounded-xl text-sm font-bold">
                Get Free Quotes
              </Link>
            </>
          ) : (
            <>
              {userRole === 'pro' && (
                <Link to="/pro/buy-credits"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors"
                  style={{ background: 'rgba(0,229,229,0.1)', color: 'var(--cyan)' }}>
                  <Wallet size={14} /> Buy Credits
                </Link>
              )}

              {/* User dropdown */}
              <div className="relative">
                <button onClick={() => setDropOpen(o => !o)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-surface-1"
                    style={{ background: 'var(--cyan)' }}>
                    {initials}
                  </div>
                  <span className="text-sm text-white/80 hidden lg:block max-w-[120px] truncate">
                    {profile?.name || user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className="text-white/40" />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-subtle py-2 shadow-2xl"
                    style={{ background: 'var(--surface-2)' }}>
                    <div className="px-4 py-2 border-b border-subtle mb-1">
                      <p className="text-sm font-semibold text-white truncate">{profile?.name || 'User'}</p>
                      <p className="text-xs text-white/40 truncate">{user?.email}</p>
                      <span className="badge-cyan mt-1 inline-block capitalize">{userRole}</span>
                    </div>
                    <button onClick={() => { navigate(dashPath); setDropOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                      <LayoutDashboard size={15} /> Dashboard
                    </button>
                    <button onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors">
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-white/60 hover:text-white" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-subtle py-4 px-4 space-y-1"
          style={{ background: 'var(--surface-1)' }}>
          {!isAuthenticated ? (
            <>
              <Link to="/join-pro" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5">For Pros</Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5">Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-center font-bold rounded-xl text-surface-1"
                style={{ background: 'var(--cyan)' }}>Get Free Quotes</Link>
            </>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-subtle mb-2">
                <p className="font-semibold text-white">{profile?.name}</p>
                <p className="text-xs text-white/40">{user?.email}</p>
              </div>
              <button onClick={() => { navigate(dashPath); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5">
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-400 rounded-xl hover:bg-white/5">
                <LogOut size={16} /> Sign out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
