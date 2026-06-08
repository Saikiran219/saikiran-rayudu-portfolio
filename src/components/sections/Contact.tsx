import { motion } from 'framer-motion';
import { useInView, useIsMobile } from '../../hooks';
import { config } from '../../data/resume';
import { openWhatsApp, openEmail } from '../../utils/whatsapp';
import { Mail, Phone, Github, Linkedin, MessageCircle, MapPin } from 'lucide-react';

interface ContactProps { onOpenChat: () => void; }

export function Contact({ onOpenChat }: ContactProps) {
  const { setRef, inView } = useInView();
  const isMobile = useIsMobile();

  const contactItems = [
    { icon: Mail, label: 'Email', value: config.email, color: '#63b3ed', onClick: () => openEmail() },
    { icon: Phone, label: 'WhatsApp', value: config.phoneDisplay, color: '#25d366', onClick: () => openWhatsApp(isMobile) },
    { icon: Linkedin, label: 'LinkedIn', value: 'saikiran-rayudu', color: '#0ea5e9', href: config.linkedin },
    { icon: MapPin, label: 'Location', value: config.location, color: '#a78bfa', href: undefined },
  ];

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--c-bg1)' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8" ref={setRef}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="sec-label mb-4 justify-center">Contact</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: 'var(--c-text)' }}>
            Let's build something <span className="grad">great</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--c-text2)' }}>
            Open to full-time roles, freelance projects, and collaborations. I reply fast!
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {contactItems.map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <motion.a href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl text-center cursor-pointer block transition-all duration-250"
                style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)' }}
                whileHover={{ borderColor: `${item.color}35`, boxShadow: `0 0 20px ${item.color}15`, y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                  <item.icon size={19} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-medium mb-0.5" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-xs font-medium truncate max-w-[120px]" style={{ color: 'var(--c-text)' }}>{item.value}</div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,179,237,0.08) 0%, rgba(159,122,234,0.08) 100%)',
            border: '1px solid var(--c-border2)',
          }}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, var(--c-glow), var(--c-glow2), transparent)', opacity: 0.3 }} />

          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--c-glow), var(--c-glow2))', border: '1px solid var(--c-border2)' }}
            >
              <MessageCircle size={36} style={{ color: 'var(--c-accent)' }} />
            </motion.div>

            <h3 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--c-text)' }}>
              Prefer a quick conversation?
            </h3>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--c-text2)' }}>
              Open the chat assistant — reach me on WhatsApp or email in one tap. Typically replies within hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button onClick={onOpenChat}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'var(--c-accent)', boxShadow: '0 0 30px var(--c-glow)', fontFamily: 'Outfit, sans-serif' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 44px var(--c-glow)' }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={16} /> Open Chat
              </motion.button>
              <motion.button onClick={() => openWhatsApp(isMobile)}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold glass"
                style={{ border: '1px solid var(--c-border2)', color: 'var(--c-text2)', fontFamily: 'Outfit, sans-serif' }}
                whileHover={{ scale: 1.03, borderColor: '#25d366', color: '#25d366' }}
                whileTap={{ scale: 0.97 }}
              >
                📱 WhatsApp Direct
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
