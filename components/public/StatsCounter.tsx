'use client';
import { useEffect, useRef, useState } from 'react';

interface StatsCounterProps {
  data: Record<string, number>;
}

// Icônes SVG minimalistes — aucun emoji
const IconHammer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/>
    <path d="M17.64 15L22 10.64"/>
    <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>
  </svg>
);

const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconAward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString('fr-CA')}{suffix}</span>;
}

export default function StatsCounter({ data }: StatsCounterProps) {
  const stats = [
    { value: data?.projetsCompletes || 150, suffix: '+', label: 'Projets livrés', Icon: IconHammer },
    { value: data?.clientsSatisfaits || 98, suffix: '%', label: 'Clients satisfaits', Icon: IconStar },
    { value: data?.anneesExperience || 10, suffix: ' ans', label: "D'expérience", Icon: IconAward },
    { value: data?.garantieMois || 24, suffix: ' mois', label: 'De garantie', Icon: IconShield },
  ];

  return (
    <section style={{
      background: '#0A0A0A',
      borderTop: '1px solid #1A1A1A',
      borderBottom: '1px solid #1A1A1A',
      padding: '64px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '32px 24px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}>
              {/* Icône SVG — couleur grise discrète */}
              <div style={{ color: 'rgba(255,255,255,0.25)' }}>
                <stat.Icon />
              </div>

              {/* Valeur — Cormorant Garamond grand, blanc */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '3rem',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label discret */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
