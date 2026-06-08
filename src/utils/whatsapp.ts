import { config } from '../data/resume';

export function openWhatsApp(isMobile: boolean, text?: string) {
  const msg = text || `Hi ${config.shortName}, I visited your portfolio and would like to connect`;
  const enc = encodeURIComponent(msg);
  const url = isMobile
    ? `https://wa.me/${config.phone}?text=${enc}`
    : `https://web.whatsapp.com/send?phone=${config.phone}&text=${enc}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openEmail(subject = 'Hiring Opportunity', body?: string) {
  const b = body || `Hi ${config.shortName}, I saw your portfolio and would like to connect.`;
  window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(b)}`;
}

export function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
