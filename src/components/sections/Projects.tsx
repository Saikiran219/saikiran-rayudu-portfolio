import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from '../../hooks';
import { resumeData } from '../../data/resume';
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';

type Project = typeof resumeData.projects[0];

function TiltCard({ project, index, inView, onClick }: {
  project: Project; index: number; inView: boolean; onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 14);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
  };
  const onLeave = () => { rx.set(0); ry.set(0); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 700 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer h-full"
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', background: 'var(--c-bg2)', border: '1px solid var(--c-border)' } as any}
        whileHover={{ borderColor: `${project.color}40`, boxShadow: `0 0 40px ${project.color}18, 0 12px 30px rgba(0,0,0,0.35)` } as any}
      >
        {/* Animated gradient overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}12 0%, transparent 65%)` }}
            />
          )}
        </AnimatePresence>

        {/* Top accent line */}
        <motion.div className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          initial={{ scaleX: 0 }} animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}28` }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {project.icon}
          </motion.div>
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: `${project.color}20`, color: project.color }}
            animate={hovered ? { rotate: 0 } : { rotate: -45 }}
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </div>

        {/* Enterprise badge */}
        {project.highlight && (
          <div className="absolute top-5 right-14 px-2 py-0.5 rounded text-[10px] font-mono font-bold"
            style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}>
            Enterprise
          </div>
        )}

        {/* Content */}
        <h3 className="font-display font-bold text-base mb-2 relative z-10" style={{ color: 'var(--c-text)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 line-clamp-2 relative z-10" style={{ color: 'var(--c-text2)' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {project.tags.slice(0, 4).map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}>
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg text-[11px]" style={{ color: 'var(--c-text3)' }}>+{project.tags.length - 4}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--c-bg2)', border: `1px solid ${project.color}30` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />

        <div className="p-7">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 transition-colors"
            style={{ color: 'var(--c-text3)' }}>
            <X size={15} />
          </button>

          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}25` }}>
            {project.icon}
          </div>

          <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--c-text)' }}>{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-text2)' }}>{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}22` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass"
                style={{ border: '1px solid var(--c-border2)', color: 'var(--c-text2)' }}
                whileHover={{ color: 'var(--c-text)', scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <Github size={14} /> GitHub
              </motion.a>
            )}
            {!project.github && !project.live && (
              <div className="text-xs px-3 py-2 rounded-lg" style={{ background: 'var(--c-surface)', color: 'var(--c-text3)', border: '1px solid var(--c-border)' }}>
                🔒 Proprietary — internal enterprise project
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { setRef, inView } = useInView();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28" style={{ background: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8" ref={setRef}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="sec-label mb-4">Projects</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--c-text)' }}>
            Things I've <span className="grad">shipped</span>
          </h2>
          <p className="text-sm mt-3" style={{ color: 'var(--c-text2)' }}>Click any card to explore details.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {resumeData.projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} inView={inView} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
