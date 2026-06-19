import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { config } from '../../data/resume';

const ROLES = [
  '.NET Full Stack Developer',
  'Power Apps Developer',
  'Frontend Engineer',
  'Software Developer',
];

const TECH_FLOATERS = [
  { label: 'React.js', icon: '⚛️', left: '4%', top: '28%', dur: 4.2 },
  { label: 'ASP.NET Core', icon: '🔷', left: '86%', top: '22%', dur: 5.1 },
  { label: 'Node.js', icon: '🟩', left: '2%', top: '68%', dur: 3.8 },
  { label: 'SQL Server', icon: '🗄️', left: '85%', top: '68%', dur: 4.7 },
  { label: 'TypeScript', icon: '📘', left: '46%', top: '5%', dur: 5.5 },
];

function DevIllustration() {
  return (
    <motion.div
      className="relative w-full max-w-[420px] mx-auto select-none"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow halo */}
      <div className="absolute inset-[-20%] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, var(--c-glow) 0%, var(--c-glow2) 30%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Main editor card */}
      <div className="relative glass-hi rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--c-border2)' }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--c-bg1)', borderBottom: '1px solid var(--c-border)' }}>
          <div className="flex gap-1.5">
            {['#ff5f57', '#ffbd2e', '#28ca41'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 mx-3">
            <div className="mx-auto w-28 h-4 rounded-md text-center text-[10px] font-mono flex items-center justify-center"
              style={{ background: 'var(--c-bg2)', color: 'var(--c-text3)' }}>
              saikiran.tsx
            </div>
          </div>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[12.5px] leading-6 space-y-0.5">
          {[
            [{ t: 'const ', c: '#9f7aea' }, { t: 'developer', c: '#63b3ed' }, { t: ' = {', c: 'var(--c-text)' }],
            [{ t: '  name', c: '#68d391' }, { t: ': ', c: 'var(--c-text2)' }, { t: '"Saikiran Rayudu"', c: '#fbd38d' }, { t: ',', c: 'var(--c-text2)' }],
            [{ t: '  role', c: '#68d391' }, { t: ': ', c: 'var(--c-text2)' }, { t: '"Full Stack Dev"', c: '#fbd38d' }, { t: ',', c: 'var(--c-text2)' }],
            [{ t: '  exp', c: '#68d391' }, { t: ': ', c: 'var(--c-text2)' }, { t: '"2 years"', c: '#fbd38d' }, { t: ',', c: 'var(--c-text2)' }],
            [{ t: '  stack', c: '#68d391' }, { t: ': [', c: 'var(--c-text2)' }, { t: '"React"', c: '#fbd38d' }, { t: ', ', c: 'var(--c-text2)' }, { t: '"C#"', c: '#fbd38d' }, { t: '],', c: 'var(--c-text2)' }],
            [{ t: '  status', c: '#68d391' }, { t: ': ', c: 'var(--c-text2)' }, { t: '"open_to_work"', c: '#68d391' }],
            [{ t: '};', c: 'var(--c-text)' }],
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
            >
              {line.map((seg, j) => (
                <span key={j} style={{ color: seg.c }}>{seg.t}</span>
              ))}
              {i === 6 && <span className="inline-block w-0.5 h-3.5 ml-0.5 blink align-middle" style={{ background: 'var(--c-accent)' }} />}
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="flex items-center justify-between px-4 py-2 font-mono text-[10px]"
          style={{ background: 'var(--c-accent)', color: '#fff' }}
        >
          <span>TypeScript React</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-300" /> ESLint</span>
          <span>Ln 7, Col 2</span>
        </motion.div>
      </div>

      {/* Floating stat pills */}
      {[
        { val: '2+', label: 'Yrs Exp', color: 'var(--c-accent)', pos: { left: '-28px', top: '60px' }, delay: 1.5 },
        { val: '4+', label: 'Projects', color: 'var(--c-accent2)', pos: { right: '-24px', top: '30px' }, delay: 1.8 },
        { val: '10+', label: 'Technologies', color: '#68d391', pos: { right: '-28px', bottom: '70px' }, delay: 2.1 },
      ].map(s => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ delay: s.delay, duration: 0.4, y: { duration: 4 + s.delay, repeat: Infinity, ease: 'easeInOut', delay: s.delay } }}
          className="absolute glass-hi rounded-xl px-3 py-2 text-center shadow-xl"
          style={{ ...s.pos, border: `1px solid ${s.color}35`, minWidth: 68 }}
        >
          <div className="text-base font-display font-bold" style={{ color: s.color }}>{s.val}</div>
          <div className="text-[10px] font-mono" style={{ color: 'var(--c-text3)' }}>{s.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex items-start md:items-center overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(var(--c-border2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }} />
        {/* Color orbs */}
        {[
          { l: '15%', t: '25%', w: 500, c: 'rgba(99,179,237,0.10)', d: 0 },
          { l: '70%', t: '55%', w: 450, c: 'rgba(159,122,234,0.09)', d: 4 },
          { l: '45%', t: '75%', w: 350, c: 'rgba(99,179,237,0.07)', d: 8 },
        ].map((o, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: o.l, top: o.t, width: o.w, height: o.w, background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`, filter: 'blur(60px)', transform: 'translate(-50%,-50%)' }}
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 25, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: 14 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.d }}
          />
        ))}
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--c-bg) 90%)' }} />
      </div>

      {/* Floating tech pills */}
      {/* <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {TECH_FLOATERS.map((t, i) => (
          <motion.div key={t.label}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full glass font-mono text-[11px]"
            style={{ left: t.left, top: t.top, border: '1px solid var(--c-border2)', color: 'var(--c-text3)' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0.7, 1], scale: 1, y: [0, -(6 + i * 2), 0] }}
            transition={{ delay: 0.8 + i * 0.25, opacity: { delay: 0.8 + i * 0.25, duration: 0.5 }, y: { duration: t.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 } }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </motion.div>
        ))}
      </div> */}

      {/* Main grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full pt-14 md:pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass font-mono text-xs font-medium mb-8"
              style={{ border: '1px solid var(--c-border2)', color: 'var(--c-text2)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-green-400" />
              </span>
              Available for Freelance &amp; Full-Time Opportunities
            </motion.div>

            {/* Name heading */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display font-bold leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', color: 'var(--c-text)' }}
            >
              Hi, I'm{' '}
              <br className="hidden sm:block" />
              <span className="grad">{config.name}</span>
            </motion.h1>

            {/* Role typer */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-6 min-h-[2rem]"
            >
              <span className="w-0.5 h-4 rounded-full" style={{ background: 'var(--c-accent)' }} />
              <span className="font-display font-semibold text-xl md:text-2xl" style={{ color: 'var(--c-text2)' }}>
                {displayed}
                <span className="inline-block w-0.5 h-5 ml-0.5 blink align-middle" style={{ background: 'var(--c-accent)' }} />
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} className="text-base leading-relaxed mb-4 max-w-lg"
              style={{ color: 'var(--c-text2)' }}
            >
              Full Stack Developer with <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>2+ years</span> building enterprise web apps with React, ASP.NET Core & Node.js. Clean code advocate with a passion for intuitive UX.
            </motion.p>

            {/* Location */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="flex items-center gap-1.5 text-sm mb-10 font-mono"
              style={{ color: 'var(--c-text3)' }}
            >
              <MapPin size={13} style={{ color: 'var(--c-accent)' }} />
              {config.location}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }} className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'var(--c-accent)', boxShadow: '0 0 32px var(--c-glow), 0 4px 14px rgba(0,0,0,0.25)', fontFamily: 'Outfit, sans-serif' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 44px var(--c-glow)' }}
                whileTap={{ scale: 0.97 }}
              >
                💬 Let's Chat <ArrowRight size={15} />
              </motion.button>

              <motion.a href={config.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold glass"
                style={{ border: '1px solid var(--c-border2)', color: 'var(--c-text2)', fontFamily: 'Outfit, sans-serif' }}
                whileHover={{ scale: 1.03, borderColor: 'var(--c-accent)', color: 'var(--c-text)' }}
                whileTap={{ scale: 0.97 }}
              >
                LinkedIn ↗
              </motion.a>
            </motion.div>
          </div>

          {/* Right: illustration */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block"
          >
            <DevIllustration />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--c-text3)' }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--c-border2)' }}
        >
          <motion.div animate={{ height: ['40%', '65%', '40%'] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 rounded-full" style={{ background: 'var(--c-accent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
