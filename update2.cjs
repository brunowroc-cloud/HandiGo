const fs = require('fs');

const homepage = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, CheckCircle, Wrench, Droplets, Plug, Paintbrush, TreePine, Wind, Hammer, Scissors, Layers, Home, MapPin, Clock, Shield, Star, TrendingUp, Lock, ChevronRight } from 'lucide-react';

const TRADES = [
  { icon: Home, label: 'Roofing' },
  { icon: Droplets, label: 'Waterproofing' },
  { icon: Wrench, label: 'Plumbing' },
  { icon: Plug, label: 'Electrical' },
  { icon: Hammer, label: 'Carpentry' },
  { icon: Paintbrush, label: 'Painting' },
  { icon: TreePine, label: 'Landscaping' },
  { icon: Wind, label: 'HVAC' },
  { icon: Layers, label: 'Renovation' },
  { icon: Scissors, label: 'Cleaning' },
  { icon: Wrench, label: 'Handyman' },
  { icon: Layers, label: 'Flooring' },
];

const SAMPLE_JOBS = [
  { trade: 'Roofing', title: 'Roof leak repair — water coming through ceiling', location: 'Auckland', urgency: 'Emergency', time: '2h ago', budget: 'NZ\$800–1,500' },
  { trade: 'Plumbing', title: 'Hot water cylinder replacement needed', location: 'Wellington', urgency: 'Within a week', time: '4h ago', budget: 'NZ\$1,200–2,000' },
  { trade: 'Electrical', title: 'Switchboard upgrade — 3 bedroom house', location: 'Christchurch', urgency: 'Within a month', time: '6h ago', budget: 'NZ\$2,500+' },
  { trade: 'Painting', title: 'Full interior repaint — 4 bedroom home', location: 'Hamilton', urgency: 'Planning ahead', time: '8h ago', budget: 'NZ\$3,000–5,000' },
  { trade: 'Landscaping', title: 'Garden redesign and new lawn installation', location: 'Tauranga', urgency: 'Within a month', time: '10h ago', budget: 'NZ\$4,000–8,000' },
  { trade: 'Renovation', title: 'Kitchen reno — open plan, new cabinets', location: 'Dunedin', urgency: 'Planning ahead', time: '12h ago', budget: 'NZ\$15,000+' },
];

const URGENCY_STYLE = {
  'Emergency': 'text-red-400 bg-red-400/10 border-red-400/20',
  'Within a week': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Within a month': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Planning ahead': 'text-green-400 bg-green-400/10 border-green-400/20',
};

const HOW_CLIENT = [
  { n: '1', title: 'Post your job free', body: 'Describe what you need in under 2 minutes. Free, no account required to start.' },
  { n: '2', title: 'Pros reach out to you', body: 'Verified tradespeople in your area see your job and unlock your contact details to quote.' },
  { n: '3', title: 'Choose the best fit', body: 'Review profiles, compare quotes, and hire with confidence. No obligation.' },
];

const HOW_PRO = [
  { n: '1', title: 'Create your free profile', body: 'Set up your business page with services, regions and past work. Free forever.' },
  { n: '2', title: 'Browse jobs in your area', body: 'See new jobs posted every day. Read the job description before spending anything.' },
  { n: '3', title: 'Unlock and win the job', body: 'Use credits to unlock the homeowner contact details. Up to 30% cheaper than Bark.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HomePage() {
  const [tab, setTab] = useState('client');

  return (
    <div className="min-h-screen bg-surface-1">

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,229,229,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 badge-cyan mb-8">
            <Zap size={11} /> New Zealand Trades Marketplace
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Connect with</span><br />
            <span className="gradient-text">Verified Tradespeople</span><br />
            <span className="text-white">Across New Zealand</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
            Post your job free and get contacted by verified tradies.
            Or join as a pro and unlock quality leads in your area.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
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
            {['Free to post a job', 'No subscription needed', 'Verified pros only', 'NZ owned and operated'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-cyan-400" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIVE JOBS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="badge-cyan inline-block mb-3">Jobs Posted Today</span>
              <h2 className="text-4xl font-black text-white">Homeowners need tradies now</h2>
              <p className="text-white/40 mt-2 text-sm">Join as a pro to unlock contact details and quote on these jobs</p>
            </div>
            <Link to="/join-pro"
              className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 flex items-center gap-1 shrink-0 transition-colors">
              Join to see all jobs <ChevronRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_JOBS.map((job, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.05}
                viewport={{ once: true }}
                className="group relative surface-card rounded-2xl p-5 cursor-pointer overflow-hidden"
                onClick={() => window.location.href = '/join-pro'}>

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-2xl z-10"
                  style={{ background: 'rgba(13,17,23,0.92)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ background: 'rgba(0,229,229,0.15)' }}>
                    <Lock size={18} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <p className="text-white font-bold text-sm mb-1">Join to unlock this job</p>
                  <p className="text-white/40 text-xs text-center px-4">Create a free pro account and buy credits to see homeowner contact details</p>
                  <span className="mt-4 text-xs font-semibold px-4 py-1.5 rounded-full"
                    style={{ background: 'var(--cyan)', color: 'var(--surface-1)' }}>Join Free</span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border"
                    style={{ background: 'rgba(0,229,229,0.08)', color: 'var(--cyan)', borderColor: 'rgba(0,229,229,0.2)' }}>
                    {job.trade}
                  </span>
                  <span className={\`text-xs font-medium px-2.5 py-1 rounded-lg border \${URGENCY_STYLE[job.urgency]}\`}>
                    {job.urgency}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-sm leading-snug mb-4">{job.title}</h3>

                <div className="flex items-center justify-between text-xs text-white/35">
                  <span className="flex items-center gap-1.5"><MapPin size={11} /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} /> {job.time}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-subtle flex items-center justify-between">
                  <span className="text-xs text-white/25">Est. budget</span>
                  <span className="text-sm font-bold text-green-400">{job.budget}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mt-10">
            <Link to="/join-pro">
              <button className="btn-outline-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                Join as a Pro to See All Jobs <ArrowRight size={15} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <span className="badge-cyan inline-block mb-4">How It Works</span>
            <h2 className="text-4xl font-black text-white mb-8">Simple for everyone</h2>
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {(tab === 'client' ? HOW_CLIENT : HOW_PRO).map((s, i) => (
              <motion.div key={s.n + tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-subtle overflow-hidden"
                style={{ background: 'var(--surface-3)' }}>
                <div className="absolute top-4 right-4 text-6xl font-black select-none leading-none"
                  style={{ color: 'rgba(0,229,229,0.04)', fontFamily: 'Space Grotesk' }}>{s.n}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-lg font-black"
                  style={{ background: 'rgba(0,229,229,0.1)', color: 'var(--cyan)' }}>{s.n}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            {tab === 'client'
              ? <Link to="/post-job"><button className="btn-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">Post Your Job Free <ArrowRight size={15} /></button></Link>
              : <Link to="/join-pro"><button className="btn-cyan px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">Create Pro Account <ArrowRight size={15} /></button></Link>
            }
          </div>
        </div>
      </section>

      {/* TRADES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <span className="badge-cyan inline-block mb-4">All Trades</span>
            <h2 className="text-4xl font-black text-white">What trade do you need?</h2>
            <p className="text-white/40 mt-3">Post a job for free in any trade category</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TRADES.map((t, i) => (
              <motion.div key={t.label} variants={fadeUp} initial="hidden" whileInView="show"
                custom={i * 0.03} viewport={{ once: true }}>
                <Link to="/post-job" state={{ trade: t.label }}
                  className="surface-card group flex flex-col items-center text-center p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                    style={{ background: 'rgba(0,229,229,0.08)', border: '1px solid rgba(0,229,229,0.12)' }}>
                    <t.icon size={20} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">
                    {t.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR PROS */}
      <section className="py-20 px-4" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,229,0.07) 0%, rgba(0,100,180,0.04) 100%)', border: '1px solid rgba(0,229,229,0.12)' }}>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-cyan inline-block mb-6">For Trade Professionals</span>
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                  Get quality leads.<br />
                  <span className="gradient-text">No subscription.</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Browse jobs from homeowners across NZ every day.
                  Only pay for the leads you want — with credits that never expire.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/join-pro">
                    <button className="btn-cyan px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                      Join Free Today <ArrowRight size={18} />
                    </button>
                  </Link>
                  <Link to="/pro/buy-credits">
                    <button className="btn-outline-cyan px-6 py-4 rounded-xl font-semibold flex items-center gap-2">
                      See Credit Prices
                    </button>
                  </Link>
                </div>
                <p className="text-white/25 text-xs mt-4">Free to join. No credit card required.</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: TrendingUp, title: 'New jobs every day', desc: 'Real homeowners posting jobs across every region of NZ' },
                  { icon: Lock, title: 'Pay per lead only', desc: 'Browse free. Buy credits and unlock only the jobs you want' },
                  { icon: Shield, title: 'No subscription lock-in', desc: 'Credits never expire. Stop and start whenever you want' },
                  { icon: Star, title: 'Build your reputation', desc: 'Collect reviews from happy clients and win more work' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(0,229,229,0.1)' }}>
                      <Icon size={15} style={{ color: 'var(--cyan)' }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{title}</p>
                      <p className="text-white/40 text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-subtle py-14 px-4 bg-surface-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 font-black text-xl text-white mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--cyan)' }}>
                  <Wrench size={18} className="text-surface-1" />
                </div>
                HandiGo
              </Link>
              <p className="text-white/30 text-sm leading-relaxed">
                NZ trades marketplace. Connecting homeowners with verified professionals nationwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Homeowners</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Tradespeople</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li><Link to="/join-pro" className="hover:text-white transition-colors">Join as a Pro</Link></li>
                <li><Link to="/pro/dashboard" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/pro/buy-credits" className="hover:text-white transition-colors">Buy Credits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-white/40">
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
