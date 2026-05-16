import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Star, Shield, Zap, CheckCircle,
  Wrench, Droplets, Plug, Paintbrush, TreePine, Wind,
  Hammer, Scissors, Layers, Home, MapPin, Clock, DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const CATEGORIES = [
  { icon: Home,       label: 'Roofing',       color: '#00E5E5', desc: 'Repairs, replacement & restoration' },
  { icon: Droplets,   label: 'Waterproofing', color: '#00B8D4', desc: 'Decks, roofs & foundations' },
  { icon: Wrench,     label: 'Plumbing',      color: '#0091EA', desc: 'Leaks, pipes & installations' },
  { icon: Plug,       label: 'Electrical',    color: '#FFD600', desc: 'Wiring, panels & lighting' },
  { icon: Hammer,     label: 'Carpentry',     color: '#FF6D00', desc: 'Decks, framing & joinery' },
  { icon: Paintbrush, label: 'Painting',      color: '#AA00FF', desc: 'Interior & exterior' },
  { icon: TreePine,   label: 'Landscaping',   color: '#00C853', desc: 'Gardens, lawns & design' },
  { icon: Wind,       label: 'HVAC',          color: '#29B6F6', desc: 'Heating, cooling & ventilation' },
  { icon: Layers,     label: 'Renovation',    color: '#FF6D00', desc: 'Full home transformations' },
  { icon: Scissors,   label: 'Cleaning',      color: '#00E5E5', desc: 'Residential & commercial' },
  { icon: Wrench,     label: 'Handyman',      color: '#8D6E63', desc: 'General repairs & maintenance' },
  { icon: Layers,     label: 'Flooring',      color: '#795548', desc: 'Timber, tiles & carpet' },
];

const NZ_REGIONS = [
  'Auckland', 'Wellington', 'Christchurch', 'Hamilton',
  'Tauranga', 'Dunedin', 'Napier-Hastings', 'Palmerston North',
  'Nelson', 'Rotorua', 'Queenstown', 'Whangarei',
];

const HOW_IT_WORKS = [
  { n: '01', icon: Wrench, title: 'Describe your job', body: 'Tell us what you need in under 2 minutes. No account required to get quotes.' },
  { n: '02', icon: Star, title: 'Get matched with pros', body: 'Up to 3 verified tradespeople in your area see your request and reach out.' },
  { n: '03', icon: CheckCircle, title: 'Hire with confidence', body: 'Compare quotes and profiles. Only pay the pro you choose, nothing upfront.' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', location: 'Auckland', text: 'Got 3 quotes for my roof repair within hours. Saved over $800 compared to the first quote I received!', stars: 5 },
  { name: 'James K.', location: 'Wellington', text: 'The plumber arrived same day. Professional, fast and fair price. Will use HandiGo again for sure.', stars: 5 },
  { name: 'Lisa T.', location: 'Christchurch', text: 'Amazing platform. Found a great electrician who explained everything clearly. Highly recommend.', stars: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
};

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [formError, setFormError] = useState('');

  const handleGetQuotes = (e) => {
    e.preventDefault();
    if (!selectedCategory) { setFormError('Please select a service'); return; }
    setFormError('');
    navigate(`/get-quotes?category=${selectedCategory}&region=${selectedRegion}`);
  };

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    setFormError('');
    // Scroll to form
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface-1">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 hero-gradient overflow-hidden">

        {/* Glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,150,200,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 badge-cyan mb-8">
            <Zap size={11} /> New Zealand's #1 Trades Marketplace
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            <span className="text-white">Find Trusted Trades</span>
            <br />
            <span className="gradient-text">Across New Zealand</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with verified tradespeople for roofing, plumbing, electrical and 10+ more services.
            Free quotes. No subscription. Pay only for what you need.
          </motion.p>

          {/* Search form */}
          <motion.div id="quote-form" variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="max-w-3xl mx-auto mb-6">
            <form onSubmit={handleGetQuotes}
              className="glass-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCategory}
                onChange={e => { setSelectedCategory(e.target.value); setFormError(''); }}
                className="flex-1 h-12 bg-surface-3 border border-subtle rounded-xl px-4 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500 cursor-pointer"
                style={{ borderColor: formError ? 'rgba(239,68,68,0.5)' : undefined }}>
                <option value="">🔧 Select a service...</option>
                {CATEGORIES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>

              <select
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
                className="sm:w-44 h-12 bg-surface-3 border border-subtle rounded-xl px-4 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500 cursor-pointer">
                <option value="">📍 Any region</option>
                {NZ_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>

              <button type="submit"
                className="btn-cyan h-12 px-8 rounded-xl text-sm font-bold flex items-center gap-2 justify-center whitespace-nowrap">
                Get Free Quotes <ArrowRight size={15} />
              </button>
            </form>
            {formError && <p className="text-red-400 text-sm mt-2">{formError}</p>}
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/35">
            {['Free to use', 'Verified pros only', 'No lock-in contracts', 'NZ owned & operated'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-cyan-400 shrink-0" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-xs">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-14 border-y border-subtle bg-surface-2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Verified Pros', icon: Star },
            { value: '2,400+', label: 'Jobs Completed', icon: CheckCircle },
            { value: 'NZ Wide', label: 'Coverage', icon: MapPin },
            { value: '4.9★', label: 'Average Rating', icon: Zap },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show" custom={i}
              viewport={{ once: true }} className="text-center">
              <div className="text-3xl md:text-4xl font-black mb-1 gradient-text">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge-cyan inline-block mb-4">All Trades</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Every trade, one platform</h2>
            <p className="text-white/40 max-w-md mx-auto">From emergency repairs to full renovations — find the right pro for any job.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.button key={cat.label}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.04}
                viewport={{ once: true }}
                onClick={() => handleCategoryClick(cat.label)}
                className={`surface-card group flex flex-col items-start p-4 rounded-2xl cursor-pointer text-left transition-all ${selectedCategory === cat.label ? 'border-cyan-400' : ''}`}
                style={{ borderColor: selectedCategory === cat.label ? 'rgba(0,229,229,0.5)' : undefined,
                         background: selectedCategory === cat.label ? 'rgba(0,229,229,0.05)' : undefined }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}>
                  <cat.icon size={18} style={{ color: cat.color }} />
                </div>
                <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-tight">
                  {cat.label}
                </span>
                <span className="text-xs text-white/35 mt-0.5 leading-tight">{cat.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-surface-2">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge-cyan inline-block mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Get quotes in 3 steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" custom={i}
                viewport={{ once: true }}
                className="relative p-6 rounded-2xl border border-subtle overflow-hidden"
                style={{ background: 'var(--surface-3)' }}>
                <div className="absolute top-4 right-4 text-7xl font-black select-none leading-none"
                  style={{ color: 'rgba(0,229,229,0.05)', fontFamily: 'Space Grotesk' }}>{s.n}</div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(0,229,229,0.1)', border: '1px solid rgba(0,229,229,0.2)' }}>
                  <s.icon size={22} style={{ color: 'var(--cyan)' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge-cyan inline-block mb-4">Reviews</span>
            <h2 className="text-4xl font-black text-white">Homeowners love HandiGo</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} initial="hidden" whileInView="show" custom={i}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-subtle"
                style={{ background: 'var(--surface-2)' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRO CTA ──────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative p-10 md:p-16 rounded-3xl text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,229,0.08) 0%, rgba(0,150,200,0.04) 100%)',
                     border: '1px solid rgba(0,229,229,0.15)' }}>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }} />

            <div className="relative z-10">
              <span className="badge-cyan inline-block mb-6">For Trade Professionals</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Get qualified leads.<br />
                <span className="gradient-text">30% cheaper than Bark.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
                Join HandiGo and unlock job leads from homeowners across New Zealand.
                No subscriptions. Only pay for leads you want.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-white/50">
                {[
                  { icon: Shield, text: 'No subscriptions' },
                  { icon: DollarSign, text: 'Pay per lead' },
                  { icon: Clock, text: 'Credits never expire' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={15} className="text-cyan-400" /> {text}
                  </div>
                ))}
              </div>
              <Link to="/join-pro">
                <button className="btn-cyan px-10 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2">
                  Start Getting Leads <ArrowRight size={18} />
                </button>
              </Link>
              <p className="text-white/25 text-xs mt-4">Free to join · No credit card required</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-subtle py-12 px-4 bg-surface-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 font-black text-xl text-white mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--cyan)' }}>
                  <Wrench size={16} className="text-surface-1" />
                </div>
                HandiGo
              </Link>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                New Zealand's trades marketplace. Connecting homeowners with verified professionals nationwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link to="/" className="hover:text-white transition-colors">Get Quotes</Link></li>
                <li><Link to="/join-pro" className="hover:text-white transition-colors">For Pros</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:hello@handigo.co.nz" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">© 2025 HandiGo NZ Ltd. All rights reserved.</p>
            <p className="text-white/25 text-xs">Made with ❤️ in New Zealand</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
