import { useState, useEffect, useCallback, useRef } from 'react';

/* ── Theme (dark default) ── */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('sk-theme');
    return s ? s === 'dark' : true; // dark by default
  });
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('sk-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return { isDark, toggle: () => setIsDark(d => !d) };
}

/* ── IntersectionObserver ── */
export function useInView(threshold = 0.12) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, threshold]);
  return { setRef: setRef as (el: HTMLElement | null) => void, inView };
}

/* ── Mouse position ── */
export function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return mouse;
}

/* ── Magnetic tilt ── */
export function useMagneticRef(strength = 0.25) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const reset = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, [strength]);
  return ref;
}

/* ── Tilt card ── */
export function useTiltRef(maxTilt = 12) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(1.02)`;
    };
    const reset = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, [maxTilt]);
  return ref;
}

/* ── Is mobile ── */
export function useIsMobile() {
  const check = useCallback(() => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768, []);
  const [isMobile, setIsMobile] = useState(check);
  useEffect(() => {
    const h = () => setIsMobile(check());
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [check]);
  return isMobile;
}

/* ── Scroll progress ── */
export function useScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    if (!el) return;
    const h = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      el.style.transform = `scaleX(${Math.min(1, p)})`;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
}
