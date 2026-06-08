import { motion } from 'framer-motion';
import { Github, Linkedin, Heart } from 'lucide-react';
import { config } from '../../data/resume';

export function Footer() {
  return (
    <footer className="py-8 relative" style={{ background: 'var(--c-bg)', borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white"
            style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}>
            SR
          </div>
          <span className="font-display font-semibold text-sm" style={{ color: 'var(--c-text)' }}>
            Saikiran Rayudu
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--c-text3)' }}>
          Built with <Heart size={12} className="text-red-400 mx-0.5" /> · React + Framer Motion · © {new Date().getFullYear()}
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: config.github, label: 'GitHub' },
            { icon: Linkedin, href: config.linkedin, label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-colors"
              style={{ color: 'var(--c-text3)', border: '1px solid var(--c-border)' }}
              whileHover={{ scale: 1.1, borderColor: 'var(--c-border2)', color: 'var(--c-accent)' }}
              whileTap={{ scale: 0.93 }}
              aria-label={label}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
