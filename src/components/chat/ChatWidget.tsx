import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Minimize2, ChevronDown } from 'lucide-react';
import { config } from '../../data/resume';
import { useIsMobile } from '../../hooks';
import { openWhatsApp, openEmail, fmtTime } from '../../utils/whatsapp';

// ─── Types ──────────────────────────────────────────────────────────────────

type MsgRole = 'bot' | 'user';
type MsgType = 'text' | 'options';

interface Option {
  id: string;
  icon: string;
  label: string;
  sub?: string;
}

interface Msg {
  id: string;
  role: MsgRole;
  type: MsgType;
  text?: string;
  options?: Option[];
  ts: Date;
}

interface ChatProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// ─── Option sets ─────────────────────────────────────────────────────────────

const MAIN_OPTIONS: Option[] = [
  { id: 'hire',     icon: '💼', label: 'I want to hire you',  sub: 'Discuss an opportunity' },
  { id: 'contact',  icon: '👋', label: 'Just say hello',       sub: 'Quick intro' },
  { id: 'projects', icon: '📂', label: 'View your projects',   sub: "See what I've built" },
  { id: 'skills',   icon: '⚡', label: 'Your tech stack',      sub: 'What you specialise in' },
];

const REACH_OPTIONS: Option[] = [
  { id: 'whatsapp', icon: '💬', label: 'Chat on WhatsApp', sub: 'Fastest response' },
  { id: 'email',    icon: '✉️', label: 'Send an Email',    sub: config.email },
];

const SKILLS_TEXT = `Here's my stack:\n\n🔷 Languages: C#, JavaScript, TypeScript\n🎨 Frontend: React.js, HTML5, CSS3, Tailwind\n⚙️ Backend: ASP.NET Core, Node.js, Express\n🗄️ Databases: SQL Server, MongoDB\n🧩 CMS: Directus (Headless)\n🛠️ DevOps: Git, GitHub, GitHub Copilot\n☁️ Platform: Power Apps, Power Automate`;

const PROJECTS_TEXT = `Here are my notable projects:\n\n✈️ FRVT Tour & Booking — React + Directus + Salesforce sync\n🚢 ABS Maritime Compliance — React + ASP.NET Core\n🛫 Flight Booking System — React + .NET\n⚡ Power Platform Automation Suite\n\nYou can click any card in the Projects section for full details!`;

// ─── Sentinel returned by AI when contact options should be shown ────────────
const CONTACT_SENTINEL = 'SHOW_CONTACT_OPTIONS';

// ─── Typing indicator ────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
        style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}
      >
        SK
      </div>
      <div className="b-bot flex items-center gap-1.5 py-3">
        {[0, 1, 2].map(i => (
          <span key={i} className="typing-dot" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Single message bubble ───────────────────────────────────────────────────

function Bubble({ msg, onOption }: { msg: Msg; onOption: (o: Option) => void }) {
  const isBot = msg.role === 'bot';

  if (msg.type === 'options') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        {msg.text && (
          <div className="flex items-end gap-2">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}
            >
              SK
            </div>
            <div className="b-bot">{msg.text}</div>
          </div>
        )}
        <div className="pl-9 space-y-2">
          {msg.options!.map(opt => (
            <motion.button
              key={opt.id}
              onClick={() => onOption(opt)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group"
              style={{
                background: 'var(--c-bg2)',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text)',
              }}
              whileHover={{
                scale: 1.02,
                x: 3,
                borderColor: 'var(--c-border2)',
                background: 'var(--c-surface)' as any,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl leading-none">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-semibold leading-snug"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {opt.label}
                </div>
                {opt.sub && (
                  <div
                    className="text-[11px] mt-0.5 truncate"
                    style={{ color: 'var(--c-text3)' }}
                  >
                    {opt.sub}
                  </div>
                )}
              </div>
              <ChevronDown
                size={13}
                className="shrink-0 opacity-0 group-hover:opacity-100 rotate-[-90deg] transition-opacity"
                style={{ color: 'var(--c-accent)' }}
              />
            </motion.button>
          ))}
        </div>
        <div className="text-[10px] font-mono pl-9" style={{ color: 'var(--c-text3)' }}>
          {fmtTime(msg.ts)}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-0.5 ${isBot ? 'items-start' : 'items-end'}`}
    >
      <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
        {isBot && (
          <div
            className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}
          >
            SK
          </div>
        )}
        <div className={isBot ? 'b-bot' : 'b-user'} style={{ whiteSpace: 'pre-line' }}>
          {msg.text}
        </div>
      </div>
      <div
        className={`text-[10px] font-mono px-1 ${isBot ? 'pl-9' : ''}`}
        style={{ color: 'var(--c-text3)' }}
      >
        {fmtTime(msg.ts)}
      </div>
    </motion.div>
  );
}

// ─── Main ChatWidget ──────────────────────────────────────────────────────────

export function ChatWidget({ isOpen, onOpen, onClose }: ChatProps) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // ── Push a message instantly ──
  const push = useCallback((m: Omit<Msg, 'id' | 'ts'>) => {
    setMsgs(prev => [...prev, { ...m, id: crypto.randomUUID(), ts: new Date() }]);
  }, []);

  // ── Send user text to Gemini API ──
  const askAI = useCallback(
    async (userText: string): Promise<string> => {
      const history = msgs
        .filter(m => m.type === 'text')
        .map(m => ({
          role: m.role === 'bot' ? ('model' as const) : ('user' as const),
          text: m.text!,
        }));

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...history, { role: 'user', text: userText }] }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.reply as string;
      } catch (err) {
        console.error('AI chat error:', err);
        return `Hmm, having a bit of trouble right now 😅 — feel free to reach out directly!`;
      }
    },
    [msgs]
  );

  // ── Bot message with typing delay ──
  const botSay = useCallback(
    (m: Omit<Msg, 'id' | 'ts'>, delay = 900) =>
      new Promise<void>(res => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          push(m);
          res();
        }, delay);
      }),
    [push]
  );

  // ── Show contact options (WhatsApp / Email) ──
  const showContactOptions = useCallback(
    async (intro?: string) => {
      await botSay(
        {
          role: 'bot',
          type: 'text',
          text: intro ?? `Happy to connect! 😊 Here are the best ways to reach me:`,
        },
        600
      );
      await botSay(
        { role: 'bot', type: 'options', text: 'Pick your preferred channel:', options: REACH_OPTIONS },
        500
      );
    },
    [botSay]
  );

  // ── Boot sequence ──
  const boot = useCallback(async () => {
    if (started) return;
    setStarted(true);
    await botSay({ role: 'bot', type: 'text', text: `Hey 👋 Welcome to my portfolio!` }, 650);
    await botSay(
      {
        role: 'bot',
        type: 'text',
        text: `I'm Saikiran — Full Stack Developer. How can I help you today?`,
      },
      900
    );
    await botSay(
      { role: 'bot', type: 'options', text: 'Choose an option below:', options: MAIN_OPTIONS },
      700
    );
  }, [started, botSay]);

  const handleOpen = () => {
    onOpen();
    setMinimized(false);
    setTimeout(boot, 300);
  };

  // ── Option button handler ──
  const handleOption = async (opt: Option) => {
    push({ role: 'user', type: 'text', text: `${opt.icon} ${opt.label}` });

    if (opt.id === 'hire') {
      await botSay({
        role: 'bot',
        type: 'text',
        text: `Awesome! 🎉 I'd love to hear about the opportunity. How would you like to connect?`,
      });
      await botSay(
        { role: 'bot', type: 'options', text: 'Pick your preferred channel:', options: REACH_OPTIONS },
        600
      );
    } else if (opt.id === 'contact') {
      await botSay({
        role: 'bot',
        type: 'text',
        text: `Happy to connect! 😊 What's the best way to reach you?`,
      });
      await botSay(
        { role: 'bot', type: 'options', text: 'Reach me via:', options: REACH_OPTIONS },
        600
      );
    } else if (opt.id === 'projects') {
      await botSay({ role: 'bot', type: 'text', text: PROJECTS_TEXT }, 1100);
      await botSay(
        {
          role: 'bot',
          type: 'options',
          text: 'Anything else?',
          options: [
            { id: 'hire',    icon: '💼', label: 'Discuss hiring', sub: "Let's work together" },
            { id: 'contact', icon: '👋', label: 'Just say hi',    sub: 'Quick hello' },
          ],
        },
        700
      );
    } else if (opt.id === 'skills') {
      await botSay({ role: 'bot', type: 'text', text: SKILLS_TEXT }, 1100);
      await botSay(
        { role: 'bot', type: 'text', text: '2 years at Prudent Global Technologies building enterprise apps 💪' },
        800
      );
      await botSay(
        { role: 'bot', type: 'options', text: 'Want to connect?', options: REACH_OPTIONS },
        600
      );
    } else if (opt.id === 'whatsapp') {
      await botSay(
        {
          role: 'bot',
          type: 'text',
          text: `Opening WhatsApp${isMobile ? ' app' : ' Web'} now… See you there! 🚀`,
        },
        600
      );
      setTimeout(
        () =>
          openWhatsApp(
            isMobile,
            `Hi ${config.shortName}, I visited your portfolio and would like to connect`
          ),
        1100
      );
    } else if (opt.id === 'email') {
      await botSay(
        { role: 'bot', type: 'text', text: `Opening your email client now 📧` },
        600
      );
      setTimeout(
        () =>
          openEmail(
            'Hiring Opportunity',
            `Hi ${config.shortName}, I visited your portfolio and I'm interested in working together.`
          ),
        1100
      );
    }
  };

  // ── Free-text handler ──
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput('');
    push({ role: 'user', type: 'text', text });

    const low = text.toLowerCase();

    // ── Fast local shortcuts (no API call needed) ──

    if (low.match(/whatsapp|phone|call|\bwa\b/)) {
      await botSay({ role: 'bot', type: 'text', text: `Sure! Opening WhatsApp now 📱` }, 600);
      setTimeout(
        () =>
          openWhatsApp(
            isMobile,
            `Hi ${config.shortName}, I visited your portfolio and would like to connect`
          ),
        900
      );
      return;
    }

    if (low.match(/\bemail\b|\bmail\b/)) {
      await botSay({ role: 'bot', type: 'text', text: `Opening email client ✉️` }, 600);
      setTimeout(
        () =>
          openEmail(
            'Hello from your portfolio',
            `Hi ${config.shortName}, I visited your portfolio and would like to get in touch.`
          ),
        800
      );
      return;
    }

    // Contact / hire intent — show options immediately without API call
    if (
      low.match(
        /connect|contact|reach|get in touch|talk to you|speak to you|hire you|work with you|opportunity|collaborate/
      )
    ) {
      await showContactOptions();
      return;
    }

    // ── AI call for everything else ──
    setTyping(true);
    const reply = await askAI(text);
    setTyping(false);

    // Check if AI returned the contact sentinel
    if (reply.trim() === CONTACT_SENTINEL || reply.includes(CONTACT_SENTINEL)) {
      await showContactOptions();
      return;
    }

    push({ role: 'bot', type: 'text', text: reply });
  };

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3 }}
              className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shadow-xl glass-hi"
              style={{
                border: '1px solid var(--c-border2)',
                color: 'var(--c-text)',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              💬 Chat with me
              <div
                className="absolute top-full right-4 w-2.5 h-2.5 rotate-45 -mt-1.5"
                style={{
                  background: 'var(--c-bg2)',
                  borderRight: '1px solid var(--c-border2)',
                  borderBottom: '1px solid var(--c-border2)',
                }}
              />
            </motion.div>

            {/* Button with pulse rings */}
            <div className="relative">
              <span
                className="absolute inset-[-4px] rounded-full animate-pulse"
                style={{ background: 'var(--c-glow)', animationDuration: '2s' }}
              />
              <span
                className="absolute inset-[-10px] rounded-full animate-pulse"
                style={{
                  background: 'var(--c-glow)',
                  opacity: 0.4,
                  animationDuration: '2s',
                  animationDelay: '0.5s',
                }}
              />
              <motion.button
                onClick={handleOpen}
                className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))',
                  boxShadow: '0 8px 32px var(--c-glow)',
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
              >
                <MessageCircle size={24} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 24, transformOrigin: 'bottom right' }}
            animate={
              minimized
                ? { scale: 1, opacity: 1, y: 0, height: 56 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            exit={{ scale: 0.85, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 'min(380px, calc(100vw - 2rem))',
              height: minimized ? 56 : 'min(600px, calc(100vh - 5rem))',
              background: 'var(--c-bg1)',
              border: '1px solid var(--c-border2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--c-border)',
              transition: 'height 0.38s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(99,179,237,0.12), rgba(159,122,234,0.08))',
                borderBottom: '1px solid var(--c-border)',
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}
                >
                  SK
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2"
                  style={{ borderColor: 'var(--c-bg1)' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--c-text)', fontFamily: 'Outfit, sans-serif' }}
                >
                  Saikiran Rayudu
                </div>
                <div
                  className="text-xs flex items-center gap-1.5"
                  style={{ color: 'var(--c-success)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Typically replies instantly
                </div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={() => setMinimized(v => !v)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--c-text3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={minimized ? 'Expand' : 'Minimize'}
                >
                  <Minimize2 size={13} />
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  style={{ color: 'var(--c-text3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close chat"
                >
                  <X size={13} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            {!minimized && (
              <>
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
                  style={{ background: 'var(--c-bg)' }}
                >
                  {/* Date pill */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: 'var(--c-border)' }} />
                    <span
                      className="text-[10px] font-mono px-2"
                      style={{ color: 'var(--c-text3)' }}
                    >
                      Today
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'var(--c-border)' }} />
                  </div>

                  {msgs.length === 0 && !typing && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">💬</div>
                      <div
                        className="text-sm"
                        style={{ color: 'var(--c-text3)', fontFamily: 'Outfit, sans-serif' }}
                      >
                        Starting conversation…
                      </div>
                    </div>
                  )}

                  {msgs.map(m => (
                    <Bubble key={m.id} msg={m} onOption={handleOption} />
                  ))}

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <TypingDots />
                    </motion.div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input area */}
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 px-3 py-3 shrink-0"
                  style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg1)' }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 text-sm px-3 py-2 rounded-xl outline-none transition-all duration-150"
                    style={{
                      background: 'var(--c-bg2)',
                      border: '1px solid var(--c-border)',
                      color: 'var(--c-text)',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--c-border2)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--c-border)'; }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-35"
                    style={{
                      background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))',
                    }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.93 }}
                    aria-label="Send"
                  >
                    <Send size={14} className="text-white" />
                  </motion.button>
                </form>

                {/* Footer branding */}
                <div
                  className="px-4 py-2 text-center shrink-0"
                  style={{ background: 'var(--c-bg1)', borderTop: '1px solid var(--c-border)' }}
                >
                  <span className="text-[10px] font-mono" style={{ color: 'var(--c-text3)' }}>
                    🔒 Private · Saikiran Portfolio v2026
                  </span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}