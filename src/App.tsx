import { useState } from 'react';
import { useTheme } from './hooks';
import { GlobalEffects } from './components/layout/GlobalEffects';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { ChatWidget } from './components/chat/ChatWidget';

export default function App() {
  const { isDark, toggle } = useTheme();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={isDark ? '' : 'light'}>
      {/* Ambient cursor glow — hidden on touch devices via CSS */}
      <div
        id="cursor-glow"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 480,
          height: 480,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, var(--c-glow) 0%, transparent 65%)',
          opacity: 0.6,
          transition: 'opacity 0.3s',
        }}
      />

      <GlobalEffects />

      <Navbar
        isDark={isDark}
        onToggle={toggle}
        onOpenChat={() => setChatOpen(true)}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact onOpenChat={() => setChatOpen(true)} />
      </main>

      <Footer />

      <ChatWidget
        isOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
