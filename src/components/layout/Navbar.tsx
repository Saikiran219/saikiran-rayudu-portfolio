import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggle: () => void;
  onOpenChat: () => void;
}

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ isDark, onToggle, onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Spy sections for active state
  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive('#' + e.target.id);
      });
    }, { threshold: 0.4 });
    sections.forEach(s => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress */}
      <div id="scroll-progress" className="fixed top-0 left-0 right-0 z-[999] h-[2px] origin-left"
        style={{ background: 'linear-gradient(90deg, var(--c-accent), var(--c-accent2))', transform: 'scaleX(0)', transition: 'transform 0.1s linear' }} />

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass' : 'bg-transparent'}`}
        style={{ borderBottom: scrolled ? '1px solid var(--c-border)' : 'none', marginTop: 2 }}
      >
        <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center font-mono font-bold text-xs text-white"
              style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}>
              SR
              {/* Shimmer beam */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute top-0 bottom-0 w-4 -skew-x-12"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'beam-sweep 0.8s ease forwards' }} />
              </span>
            </div>
            <span className="font-display font-semibold text-sm hidden sm:block" style={{ color: 'var(--c-text)' }}>
              saikiran<span className="grad">.</span>dev
            </span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {LINKS.map(l => (
              <motion.button key={l.href} onClick={() => go(l.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                style={{
                  color: active === l.href ? 'var(--c-accent)' : 'var(--c-text2)',
                  fontFamily: 'Outfit, sans-serif',
                }}
                whileHover={{ color: 'var(--c-text)' as any }}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--c-accent)' }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Premium theme toggle */}
            <motion.button
              onClick={onToggle}
              aria-label="Toggle theme"
              className="relative flex items-center px-1.5 h-7 rounded-full transition-all duration-300"
              style={{
                background: isDark ? 'rgba(99,179,237,0.12)' : 'rgba(245,158,11,0.10)',
                border: '1px solid var(--c-border2)',
                width: 52,
              }}
              whileTap={{ scale: 0.93 }}
            >
              <motion.div
                animate={{ x: isDark ? 0 : 24 }}
                transition={{ type: 'spring', stiffness: 600, damping: 38 }}
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: isDark ? 'var(--c-accent)' : '#f59e0b',
                  boxShadow: isDark ? '0 0 10px var(--c-glow)' : '0 0 10px rgba(245,158,11,0.5)',
                }}
              >
                {isDark
                  ? <Moon size={10} className="text-white" />
                  : <Sun size={10} className="text-white" />}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={onOpenChat}
              className="hidden md:flex items-center gap-1.5 px-4 h-8 rounded-lg text-xs font-semibold text-white overflow-hidden relative"
              style={{ background: 'var(--c-accent)', boxShadow: '0 0 20px var(--c-glow)', fontFamily: 'Outfit, sans-serif' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px var(--c-glow)' }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              Chat
            </motion.button>

            <motion.button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center glass"
              style={{ color: 'var(--c-text2)' }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {mobileOpen ? <X size={15} /> : <Menu size={15} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[60px] inset-x-4 z-40 rounded-2xl p-3 shadow-2xl"
            style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border2)' }}
          >
            {LINKS.map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => go(l.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                style={{ color: active === l.href ? 'var(--c-accent)' : 'var(--c-text2)', fontFamily: 'Outfit, sans-serif' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--c-surface)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                {l.label}
              </motion.button>
            ))}
            <div className="h-px mx-2 my-2" style={{ background: 'var(--c-border)' }} />
            <motion.button
              onClick={() => { setMobileOpen(false); onOpenChat(); }}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white text-center"
              style={{ background: 'var(--c-accent)', fontFamily: 'Outfit, sans-serif' }}
              whileTap={{ scale: 0.97 }}
            >
              💬 Let's Chat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
