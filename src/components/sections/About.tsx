import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { resumeData, config } from '../../data/resume';
import { Mail, Github, Linkedin, GraduationCap, MapPin } from 'lucide-react';

const STATS = [
  { val: '2+', label: 'Years Experience', icon: '🏆' },
  { val: '4+', label: 'Projects Shipped', icon: '🚀' },
  { val: '10+', label: 'Technologies', icon: '⚡' },
  { val: '100%', label: 'Dedication', icon: '💯' },
];

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export function About() {
  const { setRef, inView } = useInView();

  return (
    <section id="about" className="py-28" style={{ background: 'var(--c-bg1)' }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div ref={setRef} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {/* Header */}
          <motion.div variants={variants} custom={0} className="mb-14">
            <div className="sec-label mb-4">About Me</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight" style={{ color: 'var(--c-text)' }}>
              Crafting experiences,<br />
              <span className="grad">not just code.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="space-y-6">
              <motion.p variants={variants} custom={1} className="text-base leading-relaxed" style={{ color: 'var(--c-text2)' }}>
                {resumeData.personal.summary}
              </motion.p>

              {/* Quick links */}
              <motion.div variants={variants} custom={2} className="flex flex-wrap gap-2.5">
                {[
                  { icon: MapPin, text: config.location, href: undefined },
                  { icon: Mail, text: 'Email me', href: `mailto:${config.email}` },
                  { icon: Linkedin, text: 'LinkedIn', href: config.linkedin },
                  { icon: Github, text: 'GitHub', href: config.github },
                ].map(({ icon: Icon, text, href }) => (
                  <motion.a key={text} href={href} target={href?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg glass text-xs font-medium transition-all duration-200"
                    style={{ border: '1px solid var(--c-border)', color: 'var(--c-text2)' }}
                    whileHover={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)', y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon size={13} />
                    {text}
                  </motion.a>
                ))}
              </motion.div>

              {/* Education */}
              <motion.div variants={variants} custom={3}>
                <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--c-text)' }}>
                  <GraduationCap size={16} style={{ color: 'var(--c-accent)' }} />
                  Education
                </div>
                <div className="space-y-3">
                  {resumeData.education.map((e, i) => (
                    <motion.div key={i} variants={variants} custom={4 + i}
                      className="flex gap-4 p-4 rounded-xl transition-all duration-200 group"
                      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
                      whileHover={{ borderColor: 'var(--c-border2)', x: 4 }}
                    >
                      <span className="text-2xl mt-0.5">{e.icon}</span>
                      <div>
                        <div className="text-sm font-semibold leading-snug" style={{ color: 'var(--c-text)' }}>{e.degree}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--c-text2)' }}>{e.institution}</div>
                        <div className="text-xs mt-1 font-mono font-semibold" style={{ color: 'var(--c-accent)' }}>{e.grade}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <motion.div key={s.label} variants={variants} custom={2 + i}
                    className="group relative overflow-hidden rounded-2xl p-5 text-center"
                    style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)' }}
                    whileHover={{ borderColor: 'var(--c-border2)', y: -4 }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: 'radial-gradient(circle at 50% 100%, var(--c-glow) 0%, transparent 70%)' }} />
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-3xl font-display font-bold grad mb-1">{s.val}</div>
                    <div className="text-xs font-mono" style={{ color: 'var(--c-text3)' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Currently working with */}
              <motion.div variants={variants} custom={6}
                className="rounded-2xl p-5"
                style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)' }}
              >
                <div className="text-sm font-semibold mb-3" style={{ color: 'var(--c-text)' }}>
                  🔧 Currently Working With
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'ASP.NET Core', 'Node.js', 'SQL Server', 'MongoDB', 'Directus CMS', 'Power Platform', 'GitHub Copilot'].map(t => (
                    <motion.span key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'var(--c-glow)', color: 'var(--c-accent)', border: '1px solid var(--c-border2)' }}
                      whileHover={{ scale: 1.06 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
