const fs = require('fs');

const header = `import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, LogOut, LayoutDashboard, ChevronDown, Wallet, Settings, UserX } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header() {
  const { user, profile, isAuthenticated, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileOpen(false);
    setDropOpen(false);
  };

  const dashPath = userRole === 'admin' ? '/admin' : userRole === 'pro' ? '/pro/dashboard' : '/dashboard';

  // Get display name — prefer profile name, fallback to email prefix
  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  
  // Get initials
  const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  // Role label and color
  const roleConfig = {
    admin: { label: 'Admin', bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
    pro: { label: 'Pro Account', bg: 'rgba(0,229,229,0.12)', color: '#00e5e5' },
    client: { label: 'Homeowner', bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc' },
  };
  const role = roleConfig[userRole] || roleConfig.client;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-subtle"
      style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-white">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--cyan)' }}>
            <Wrench size={16} className="text-surface-1" />
          </div>
          HandiGo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/post-job"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Post a Job
              </Link>
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
                Sign Up Free
              </Link>
            </>
          ) : (
            <>
              {userRole === 'pro' && (
                <Link to="/pro/buy-credits"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors font-medium"
                  style={{ background: 'rgba(0,229,229,0.1)', color: 'var(--cyan)' }}>
                  <Wallet size={14} /> Buy Credits
                </Link>
              )}
              {userRole === 'client' && (
                <Link to="/post-job"
                  className="btn-cyan px-4 py-2 rounded-xl text-sm font-bold">
                  Post a Job
                </Link>
              )}

              {/* User dropdown */}
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropOpen(o => !o)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-surface-1 shrink-0"
                    style={{ background: 'var(--cyan)' }}>
                    {initials}
                  </div>
                  <span className="text-sm text-white/80 hidden lg:block max-w-[120px] truncate font-medium">
                    {displayName}
                  </span>
                  <ChevronDown size={14} className={\`text-white/40 transition-transform \${dropOpen ? 'rotate-180' : ''}\`} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-subtle py-2 shadow-2xl"
                    style={{ background: 'var(--surface-2)' }}>

                    {/* User info */}
                    <div className="px-4 py-3 border-b border-subtle">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-surface-1 shrink-0"
                          style={{ background: 'var(--cyan)' }}>
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                          <p className="text-xs text-white/40 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: role.bg, color: role.color }}>
                        {role.label}
                      </span>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button onClick={() => { navigate(dashPath); setDropOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <LayoutDashboard size={15} className="text-white/40" />
                        {userRole === 'pro' ? 'Pro Dashboard' : userRole === 'admin' ? 'Admin Panel' : 'My Jobs'}
                      </button>

                      <button onClick={() => { navigate('/settings'); setDropOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <Settings size={15} className="text-white/40" />
                        Account Settings
                      </button>
                    </div>

                    <div className="border-t border-subtle py-1">
                      <button onClick={() => { navigate('/settings?tab=danger'); setDropOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                        <UserX size={15} />
                        Delete Account
                      </button>
                      <button onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors">
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-subtle py-3 px-4 space-y-1"
          style={{ background: 'var(--surface-1)' }}>
          {!isAuthenticated ? (
            <>
              <Link to="/post-job" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 text-sm">
                Post a Job
              </Link>
              <Link to="/join-pro" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 text-sm">
                For Pros
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 text-sm">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-center font-bold rounded-xl text-surface-1 text-sm"
                style={{ background: 'var(--cyan)' }}>
                Sign Up Free
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-surface-1 shrink-0"
                  style={{ background: 'var(--cyan)' }}>
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{displayName}</p>
                  <p className="text-xs text-white/40 truncate">{user?.email}</p>
                  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-md mt-1"
                    style={{ background: role.bg, color: role.color }}>
                    {role.label}
                  </span>
                </div>
              </div>
              <button onClick={() => { navigate(dashPath); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 text-sm">
                <LayoutDashboard size={16} />
                {userRole === 'pro' ? 'Pro Dashboard' : 'My Jobs'}
              </button>
              <button onClick={() => { navigate('/settings'); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 text-sm">
                <Settings size={16} />
                Account Settings
              </button>
              <button onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/5 text-sm">
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
`;

fs.writeFileSync('src/components/Header.jsx', header);
console.log('Header written:', fs.statSync('src/components/Header.jsx').size, 'bytes');
