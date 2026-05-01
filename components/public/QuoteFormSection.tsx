'use client';
import Link from 'next/link';

export default function QuoteFormSection() {
  const steps = [
    {
      num: '01',
      label: 'Remplissez le formulaire',
      desc: '5 minutes',
      Icon: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      num: '02',
      label: 'On vous rappelle',
      desc: 'Sous 24h',
      Icon: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/>
        </svg>
      ),
    },
    {
      num: '03',
      label: 'Visite gratuite',
      desc: 'Estimation précise',
      Icon: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0' }} id="contact">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>

          {/* ── Colonne gauche : Texte ── */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '20px',
            }}>
              Commencer votre projet
            </p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
              lineHeight: 1.08,
              color: '#FFFFFF',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}>
              Prêt à démarrer<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>votre projet ?</em>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '380px',
            }}>
              Remplissez notre formulaire en 5 minutes. Nous vous contactons dans les 24h pour une visite gratuite, sans engagement.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <Link href="/soumission" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                background: '#FFFFFF',
                border: '1px solid #FFFFFF',
                padding: '16px 32px',
                transition: 'all 0.3s',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
                Obtenir ma soumission gratuite
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>

              <a href="tel:8192470449" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/></svg>
                (819) 247-0449
              </a>
            </div>
          </div>

          {/* ── Colonne droite : Étapes ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                padding: '28px 32px',
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'background 0.3s',
              }}>
                {/* Numéro */}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.15)',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: '32px',
                }}>
                  {step.num}
                </span>

                {/* Icône */}
                <span style={{ color: 'rgba(255,255,255,0.35)', marginTop: '2px', flexShrink: 0 }}>
                  <step.Icon />
                </span>

                {/* Texte */}
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: '4px',
                    letterSpacing: '0.02em',
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #contact .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
