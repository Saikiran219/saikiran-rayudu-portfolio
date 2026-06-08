import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { resumeData } from '../../data/resume';
import { Calendar, CheckCircle2, Briefcase } from 'lucide-react';

export function Experience() {
  const { setRef, inView } = useInView(0.08);

  return (
    <section id="experience" className="py-28" style={{ background: 'var(--c-bg1)' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8" ref={setRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16"
        >
          <div className="sec-label mb-4">Experience</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--c-text)' }}>
            Where I've <span className="grad">made impact</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[17px] top-7 bottom-0 w-px origin-top"
            style={{ background: 'linear-gradient(180deg, var(--c-accent) 0%, var(--c-accent2) 50%, transparent 100%)' }}
          />

          <div className="space-y-12">
            {resumeData.experience.map((exp, ei) => (
              <motion.div key={ei}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: ei * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14"
              >
                {/* Node dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: ei * 0.2 + 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute left-0 top-5 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${exp.color}, ${exp.color}aa)`,
                    boxShadow: `0 0 20px ${exp.color}50`,
                  }}
                >
                  <Briefcase size={14} className="text-white" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl p-6"
                  style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)' }}
                  whileHover={{ borderColor: `${exp.color}35`, boxShadow: `0 0 30px ${exp.color}18, 0 8px 20px rgba(0,0,0,0.2)`, y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                    style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)` }} />

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 0% 50%, ${exp.color}10 0%, transparent 60%)` }} />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4 relative z-10">
                    <div>
                      <motion.div
                        className="inline-block px-3 py-0.5 rounded-full text-xs font-mono font-semibold mb-2"
                        style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }}
                      >
                        {exp.company}
                      </motion.div>
                      <h3 className="text-lg font-display font-bold" style={{ color: 'var(--c-text)' }}>{exp.role}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: exp.color }}>
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: 'var(--c-surface)', color: 'var(--c-text3)', border: '1px solid var(--c-border)' }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5 relative z-10">
                    {exp.highlights.map((h, hi) => (
                      <motion.li key={hi}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: ei * 0.2 + hi * 0.07 + 0.35 }}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                        style={{ color: 'var(--c-text2)' }}
                      >
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: exp.color }} />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
