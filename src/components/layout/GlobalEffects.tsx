import { useEffect } from 'react';

export function GlobalEffects() {
  // Cursor glow follow
  useEffect(() => {
    const el = document.getElementById('cursor-glow');
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    let raf: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, pct)})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
