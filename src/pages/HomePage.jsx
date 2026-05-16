import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Star, Shield, Zap, CheckCircle,
  Wrench, Droplets, Plug, Paintbrush, TreePine, Wind,
  Hammer, Scissors, Layers, Home, Search, MapPin
} from 'lucide-react';

const CATEGORIES = [
  { icon: Home,       label: 'Roofing',       color: '#00E5E5' },
  { icon: Droplets,   label: 'Waterproofing', color: '#00B8D4' },
  { icon: Wrench,     label: 'Plumbing',      color: '#0091EA' },
  { icon: Plug,       label: 'Electrical',    color: '#FFD600' },
  { icon: Hammer,     label: 'Carpentry',     color: '#FF6D00' },
  { icon: Paintbrush, label: 'Painting',      color: '#AA00FF' },
  { icon: TreePine,   label: 'Landscaping',   color: '#00C853' },
  { icon: Wind,       label: 'HVAC',          color: '#0091EA' },
  { icon: Layers,     label: 'Renovation',    color: '#FF6D00' },
  { icon: Scissors,   label: 'Cleaning',      color: '#00E5E5' },
  { icon: Wrench,     label: 'Handyman',      color: '#8D6E63' },
  { icon: Layers,     label: 'Flooring',      color: '#795548' },
];

const STATS = [
  { value: '500+', label: 'Verified Pros' },
  { value: '2,400+', label: 'Jobs Completed' },
  { value: 'NZ Wide', label: 'Coverage' },
  { value: '4.9★', label: 'Average Rating' },
];

const URGENCY = ['Emergency', 'Within a week', 'Within a month', 'Planning ahead'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ category: '', region: '', urgency: '' });
  const [step, setStep] = useState(0); // 0=search bar, 1=quick form

  const regions = [
    'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga',
    'Dunedin', 'Napier-Hastings', 'Palmerston North', 'Nelson', 'Rotorua',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/get-quotes', { state: form });
  };

  return (
    <div className="min-h-screen bg-surface-1 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative hero-gradient min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.6) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 badge-cyan mb-8">
            <Zap size={11} />
            New Zealand's #1 Trades Marketplace
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6">
            <span className="text-white">Find Trusted</span>
            <br />
            <span className="gradient-text glow-text">Trade Professionals</span>
            <br />
            <span className="text-white">Across New Zealand</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Connect with verified tradespeople for roofing, plumbing, electrical, and 10+ more services.
            Free quotes. No subscription. Pay only for what you need.
          </motion.p>

          {/* Search Card */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="glass-md rounded-2xl p-2 max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full h-12 bg-surface-3 border border-subtle rounded-xl pl-9 pr-4 text-sm text-white/80 appearance-none focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select a service...</option>
                  {CATEGORIES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                </select>
              </div>
              <div className="relative sm:w-44">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <select
                  value={form.region}
                  onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                  className="w-full h-12 bg-surface-3 border border-subtle rounded-xl pl-9 pr-4 text-sm text-white/80 appearance-none focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Any region</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit"
                className="btn-cyan h-12 px-6 rounded-xl text-sm font-bold flex items-center gap-2 justify-center whitespace-nowrap">
                Get Free Quotes <ArrowRight size={15} />
              </button>
            </form>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/40">
            {['Free to use', 'Verified pros only', 'No lock-in contracts', 'NZ owned & operated'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-cyan-400" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-xs">Explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-12 border-y border-subtle">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show" custom={i}
              viewport={{ once: true }} className="text-center">
              <div className="text-3xl font-black text-cyan gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <p className="badge-cyan inline-block mb-4">All Trades</p>
            <h2 className="text-4xl font-black text-white mb-3">Every trade, one platform</h2>
            <p className="text-white/40 max-w-md mx-auto">From emergency plumbing to full renovations — find the right pro for any job.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.label} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.05}
                viewport={{ once: true }}>
                <Link to={`/get-quotes?category=${cat.label}`}
                  className="surface-card group flex items-center gap-3 p-4 rounded-2xl cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}>
                    <cat.icon size={18} style={{ color: cat.color }} />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                  <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <p className="badge-cyan inline-block mb-4">Simple Process</p>
            <h2 className="text-4xl font-black text-white">Get quotes in 3 steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Describe your job', body: 'Tell us what you need. Takes less than 2 minutes — no account required.' },
              { n: '02', title: 'Pros compete for you', body: 'Up to 3 verified tradespeople see your request and unlock your details to quote.' },
              { n: '03', title: 'Choose the best', body: 'Compare pros, read profiles, and hire the one that fits your budget and timeline.' },
            ].map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" custom={i}
                viewport={{ once: true }}
                className="surface-card rounded-2xl p-6 relative overflow-hidden">
                <div className="text-6xl font-black leading-none mb-4 select-none"
                  style={{ color: 'rgba(0,229,229,0.08)', fontFamily: 'Space Grotesk' }}>
                  {s.n}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRO CTA ──────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,229,0.08) 0%, rgba(0,150,200,0.05) 100%)', border: '1px solid rgba(0,229,229,0.15)' }}>

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-30"
              style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.8) 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="badge-cyan inline-block mb-6">For Trade Professionals</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Get qualified leads.<br />
                <span className="gradient-text">Pay less than competitors.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
                Join HandiGo and unlock job leads from homeowners across New Zealand.
                Our credits are up to 30% cheaper than Bark, Builderscrack and Thumbtack.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {[
                  { icon: Shield, text: 'No subscriptions' },
                  { icon: Zap, text: 'Pay per lead' },
                  { icon: Star, text: 'Credits never expire' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon size={15} className="text-cyan-400" /> {text}
                  </div>
                ))}
              </div>

              <Link to="/join-pro">
                <button className="btn-cyan px-10 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2">
                  Start Getting Leads <ArrowRight size={18} />
                </button>
              </Link>
              <p className="text-white/30 text-xs mt-4">Free to join. No credit card required.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-subtle py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-cyan-400 flex items-center justify-center">
              <Wrench size={14} className="text-surface-1" />
            </div>
            HandiGo
          </div>
          <div className="flex gap-6 text-sm text-white/30">
            <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link to="/login" className="hover:text-white/60 transition-colors">Login</Link>
            <Link to="/join-pro" className="hover:text-white/60 transition-colors">For Pros</Link>
          </div>
          <p className="text-xs text-white/20">© 2025 HandiGo NZ Ltd</p>
        </div>
      </footer>
    </div>
  );
}
