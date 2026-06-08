import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from '../../hooks';
import { resumeData } from '../../data/resume';

const CATEGORY_META: Record<string, { gradient: string; glow: string; icon: string }> = {
  'Languages':      { gradient: '#6366f1, #8b5cf6', glow: 'rgba(99,102,241,0.25)',  icon: '💻' },
  'Frontend':       { gradient: '#3b82f6, #06b6d4', glow: 'rgba(59,130,246,0.25)',  icon: '🎨' },
  'Backend':        { gradient: '#10b981, #059669', glow: 'rgba(16,185,129,0.25)',  icon: '⚙️' },
  'Databases':      { gradient: '#f59e0b, #d97706', glow: 'rgba(245,158,11,0.25)',  icon: '🗄️' },
  'CMS / Platforms':{ gradient: '#8b5cf6, #a78bfa', glow: 'rgba(139,92,246,0.25)', icon: '🧩' },
  'Tools & DevOps': { gradient: '#06b6d4, #0284c7', glow: 'rgba(6,182,212,0.25)',  icon: '🛠️' },
};

// Individual tiltable skill card
function SkillCard({ label, color }: { label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 280, damping: 24 });
  const ry = useSpring(useMotionValue(0), { stiffness: 280, damping: 24 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-cy * 16);
    ry.set(cx * 16);
  };
  const handleLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      className="relative px-3.5 py-2 rounded-lg cursor-default select-none transition-shadow duration-300 group"
      style={{
        rotateX: rx as any, rotateY: ry as any,
        transformStyle: 'preserve-3d', perspective: 600,
        background: `${color}12`,
        border: `1px solid ${color}28`,
        color: color,
        fontSize: 12,
        fontWeight: 500,
        boxShadow: 'none',
      } as React.CSSProperties}
    >
      {/* Shimmer beam */}
      <span className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute top-0 bottom-0 w-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
            animation: 'beam-sweep 1.2s linear forwards',
          }}
        />
      </span>
      <span className="relative z-10">{label}</span>
    </motion.div>
  );
}

// Floating category card
function CategoryCard({ group, index, inView }: { group: typeof resumeData.skills[0]; index: number; inView: boolean }) {
  const meta = CATEGORY_META[group.category] || { gradient: '#63b3ed, #9f7aea', glow: 'rgba(99,179,237,0.2)', icon: '✨' };
  const [c1, c2] = meta.gradient.split(', ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl p-6"
      style={{
        background: 'var(--c-bg2)',
        border: '1px solid var(--c-border)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      whileHover={{
        borderColor: `${c1}40`,
        boxShadow: `0 0 40px ${meta.glow}, 0 8px 24px rgba(0,0,0,0.3)`,
        y: -6,
      }}
    >
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }} />

      {/* Floating glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.glow} 0%, transparent 65%)` }} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `linear-gradient(135deg, ${c1}22, ${c2}22)`, border: `1px solid ${c1}30` }}
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          {meta.icon}
        </motion.div>
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>{group.category}</div>
          <div className="text-xs font-mono" style={{ color: 'var(--c-text3)' }}>{group.items.length} tools</div>
        </div>
      </div>

      {/* Animated underline */}
      <motion.div className="h-px mb-5 relative z-10"
        style={{ background: `linear-gradient(90deg, ${c1}, transparent)` }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
      />

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {group.items.map((item, i) => (
          <motion.div key={item}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.06 + 0.35 }}
          >
            <SkillCard label={item} color={c1} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Particles background
function ParticleField({ count = 18 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'var(--c-accent)' : 'var(--c-accent2)',
            opacity: 0.3,
          }}
          animate={{ y: [0, -(30 + Math.random() * 40), 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const { setRef, inView } = useInView(0.08);

  return (
    <section id="skills" className="relative py-28 overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      <ParticleField />

      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--c-glow) 0%, transparent 65%)', filter: 'blur(80px)', opacity: 0.4 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8" ref={setRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16"
        >
          <div className="sec-label mb-4">Tech Stack</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--c-text)' }}>
            Tools I <span className="grad">master</span>
          </h2>
          <p className="text-sm mt-3 max-w-md" style={{ color: 'var(--c-text2)' }}>
            Technologies I use to build scalable, production-grade applications.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.skills.map((group, i) => (
            <CategoryCard key={group.category} group={group} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
