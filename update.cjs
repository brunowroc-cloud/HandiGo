const fs = require('fs');

const homepage = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, CheckCircle, Wrench, Droplets, Plug, Paintbrush, TreePine, Wind, Hammer, Scissors, Layers, Home, MapPin, Clock, Shield, Star, TrendingUp, Lock } from 'lucide-react';

const TRADES = [
  { icon: Home, label: 'Roofing', count: '124 jobs' },
  { icon: Droplets, label: 'Waterproofing', count: '87 jobs' },
  { icon: Wrench, label: 'Plumbing', count: '203 jobs' },
  { icon: Plug, label: 'Electrical', count: '178 jobs' },
  { icon: Hammer, label: 'Carpentry', count: '95 jobs' },
  { icon: Paintbrush, label: 'Painting', count: '142 jobs' },
  { icon: TreePine, label: 'Landscaping', count: '76 jobs' },
  { icon: Wind, label: 'HVAC', count: '54 jobs' },
  { icon: Layers, label: 'Renovation', count: '167 jobs' },
  { icon: Scissors, label: 'Cleaning', count: '231 jobs' },
  { icon: Wrench, label: 'Handyman', count: '189 jobs' },
  { icon: Layers, label: 'Flooring', count: '63 jobs' },
];

const RECENT_JOBS = [
  { trade: 'Roofing', title: 'Roof leak repair — water coming through ceiling', location: 'Auckland', urgency: 'Emergency', time: '2h ago', budget: 'NZ$800–1,500' },
  { trade: 'Plumbing', title: 'Hot water cylinder replacement needed urgently', location: 'Wellington', urgency: 'Within a week', time: '4h ago', budget: 'NZ$1,200–2,000' },
  { trade: 'Electrical', title: 'Switchboard upgrade — 3 bedroom house', location: 'Christchurch', urgency: 'Within a month', time: '6h ago', budget: 'NZ$2,500+' },
  { trade: 'Painting', title: 'Full interior repaint — 4 bedroom home', location: 'Hamilton', urgency: 'Planning ahead', time: '8h ago', budget: 'NZ$3,000–5,000' },
  { trade: 'Landscaping', title: 'Garden redesign and new lawn installation', location: 'Tauranga', urgency: 'Within a month', time: '10h ago', budget: 'NZ$4,000–8,000' },
  { trade: 'Renovation', title: 'Kitchen reno — remove wall, new cabinets', location: 'Dunedin', urgency: 'Planning ahead', time: '12h ago', budget: 'NZ$15,000+' },
];

const URGENCY = {
  'Emergency': 'text-red-400 bg-red-400/10 border-red-400/20',
  'Within a week': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Within a month': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Planning ahead': 'text-green-400 bg-green-400/10 border-green-400/20',
};

const HOW_CLIENT = [
  { n: '1', title: 'Post your job free', body: 'Describe what you need. Takes 2 minutes. No account required to get started.' },
  { n: '2', title: 'Pros contact you', body: 'Verified tradespeople see your job and unlock your details to quote.' },
  { n: '3', title: 'Hire the best', body: 'Compare profiles and quotes. Choose who you hire. No obligation.' },
];

const HOW_PRO = [
  { n: '1', title: 'Create free profile', body: 'Set up your business profile with services and regions you cover.' },
  { n: '2', title: 'Browse live jobs', body: 'See new jobs in your area every day. Preview details before committing.' },
  { n: '3', title: 'Buy credits and win work', body: 'Unlock job contact details with credits. 30% cheaper than competitors.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HomePage() {
  const [tab, setTab] = useState('client');

  return (
    <div className="min-h-screen bg-surface-1">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.07) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 badge-cyan mb-8">
            <Zap size={11} /> New Zealand Trades Marketplace
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Connect with</span><br />
            <span className="gradient-text">Verified Tradespeople</span><br />
            <span className="text-white">Across New Zealand</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Post your job free and get contacted by verified trade professionals.
            Or join as a pro and unlock quality leads in your area.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/post-job">
              <button className="btn-cyan px-10 py-4 rounded-xl text-base font-bold flex items-center gap-2 justify-center w-full sm:w-auto">
                Post a Job Free <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/join-pro">
              <button className="btn-outline-cyan px-10 py-4 rounded-xl text-base font-bold flex items-center gap-2 justify-center w-full sm:w-auto">
                I am a Tradesperson <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap justify-center gap-6 text-sm text-white/35">
            {['Free to post a job', 'No subscription needed', 'Verified pros only', 'NZ owned'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-cyan-400" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-subtle" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ value: '948K+', label: 'Jobs Posted' }, { value: '16K+', label: 'Trade Pros' }, { value: '4.9 Stars', label: 'Avg Rating' }, { value: 'NZ Wide', label: 'Coverage' }].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIVE JOBS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="badge-cyan inline-block mb-3">Live Now</span>
              <h2 className="text-4xl font-black text-white">Jobs posted today</h2>
              <p className="text-white/40 mt-2">Homeowners waiting for quotes right now</p>
            </div>
            <Link to="/join-pro" className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 flex items-center gap-1 shrink-0">
              View all jobs <ArrowRight size={14} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_JOBS.map((job, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.05}
                viewport={{ once: true }}
                className="group relative surface-card rounded-2xl p-5 cursor-pointer overflow-hidden"
                onClick={() => window.location.href = '/join-pro'}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10"
                  style={{ background: 'rgba(13,17,23,0.88)' }}>
                  <div className="text-center">
                    <Lock size={20} className="text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">Join to unlock</p>
                    <p className="text-white/40 text-xs">Buy credits to see contact details</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border"
                    style={{ background: 'rgba(0,229,229,0.08)', color: 'var(--cyan)', borderColor: 'rgba(0,229,229,0.2)' }}>
                    {job.trade}
                  </span>
                  <span className={\`text-xs font-medium px-2.5 py-1 rounded-lg border \${URGENCY[job.urgency]}\`}>
                    {job.urgency}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-3">{job.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {job.time}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-subtle flex items-center justify-between">
                  <span className="text-xs text-white/30">Budget</span>
                  <span className="text-sm font-bold text-green-400">{job.budget}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/join-pro">
              <button className="btn-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                Join to See All Jobs <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge-cyan inline-block mb-4">How It Works</span>
            <h2 className="text-4xl font-black text-white mb-6">Simple for everyone</h2>
            <div className="inline-flex rounded-xl p-1 gap-1" style={{ background: 'var(--surface-3)' }}>
              <button onClick={() => setTab('client')}
                className={\`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all \${tab === 'client' ? 'text-surface-1' : 'text-white/50 hover:text-white'}\`}
                style={{ background: tab === 'client' ? 'var(--cyan)' : 'transparent' }}>
                I need a tradie
              </button>
              <button onClick={() => setTab('pro')}
                className={\`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all \${tab === 'pro' ? 'text-surface-1' : 'text-white/50 hover:text-white'}\`}
                style={{ background: tab === 'pro' ? 'var(--cyan)' : 'transparent' }}>
                I am a tradesperson
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(tab === 'client' ? HOW_CLIENT : HOW_PRO).map((s, i) => (
              <motion.div key={s.n + tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-subtle" style={{ background: 'var(--surface-3)' }}>
                <div className="absolute top-3 right-4 text-7xl font-black select-none leading-none"
                  style={{ color: 'rgba(0,229,229,0.05)' }}>{s.n}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 font-black text-lg"
                  style={{ background: 'rgba(0,229,229,0.1)', color: 'var(--cyan)' }}>{s.n}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            {tab === 'client'
              ? <Link to="/post-job"><button className="btn-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">Post Your Job Free <ArrowRight size={15} /></button></Link>
              : <Link to="/join-pro"><button className="btn-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">Create Pro Account Free <ArrowRight size={15} /></button></Link>
            }
          </div>
        </div>
      </section>

      {/* TRADES GRID */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-cyan inline-block mb-4">Browse by Trade</span>
            <h2 className="text-4xl font-black text-white">Find the right tradie</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TRADES.map((t, i) => (
              <motion.div key={t.label} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.03} viewport={{ once: true }}>
                <Link to="/post-job" state={{ trade: t.label }}
                  className="surface-card group flex flex-col items-center text-center p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                    style={{ background: 'rgba(0,229,229,0.08)', border: '1px solid rgba(0,229,229,0.15)' }}>
                    <t.icon size={20} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{t.label}</span>
                  <span className="text-xs text-white/30 mt-0.5">{t.count}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR PROS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,229,0.08) 0%, rgba(0,100,180,0.05) 100%)', border: '1px solid rgba(0,229,229,0.15)' }}>
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="badge-cyan inline-block mb-5">For Trade Professionals</span>
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                  Get quality leads.<br /><span className="gradient-text">Pay less than Bark.</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Browse live jobs from homeowners across NZ. Only pay for leads you want.
                  No subscriptions, no lock-in. Credits up to 30% cheaper than competitors.
                </p>
                <Link to="/join-pro">
                  <button className="btn-cyan px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                    Join Free Today <ArrowRight size={18} />
                  </button>
                </Link>
                <p className="text-white/25 text-xs mt-3">Free to join, no credit card needed</p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: TrendingUp, title: 'Quality leads daily', desc: 'New jobs every day from real homeowners in your region' },
                  { icon: Lock, title: 'Pay per lead', desc: 'Buy credits and unlock only the jobs that match your skills' },
                  { icon: Shield, title: 'No subscription', desc: 'Credits never expire. Use them whenever you need new work' },
                  { icon: Star, title: 'Build reputation', desc: 'Collect reviews and grow your profile to win more jobs' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,229,229,0.1)' }}>
                      <Icon size={15} style={{ color: 'var(--cyan)' }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{title}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-subtle py-12 px-4" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 font-black text-xl text-white mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--cyan)' }}>
                  <Wrench size={16} className="text-surface-1" />
                </div>
                HandiGo
              </Link>
              <p className="text-white/30 text-sm leading-relaxed">NZ trades marketplace connecting homeowners with verified professionals.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Homeowners</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Tradespeople</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link to="/join-pro" className="hover:text-white transition-colors">Join as a Pro</Link></li>
                <li><Link to="/pro/dashboard" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/pro/buy-credits" className="hover:text-white transition-colors">Buy Credits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:hello@handigo.co.nz" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">2025 HandiGo NZ Ltd. All rights reserved.</p>
            <p className="text-white/20 text-xs">Made with love in New Zealand</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/HomePage.jsx', homepage);
console.log('Written:', fs.statSync('src/pages/HomePage.jsx').size, 'bytes');
