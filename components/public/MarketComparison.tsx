'use client';
export default function MarketComparison() {
  /* ── Icônes SVG architecturales ── */
  const IconMoney = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
  const IconCalendar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
  const IconShield = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
  const IconDoc = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  );
  const IconPhone = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/>
    </svg>
  );
  const IconCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
  const IconX = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const comparisons = [
    { Icon: IconMoney,    critere: 'Taux horaire',        marche: '95–120 $/h',       nous: '75 $/h' },
    { Icon: IconCalendar, critere: 'Délai de début',      marche: '6–10 semaines',     nous: '2–4 semaines' },
    { Icon: IconShield,   critere: 'Garantie travaux',    marche: 'Variable 0–1 an',   nous: '24 mois' },
    { Icon: IconDoc,      critere: 'Soumission détaillée',marche: 'Souvent vague',     nous: 'Transparente' },
    { Icon: IconPhone,    critere: 'Suivi de projet',     marche: 'Limité',            nous: 'Régulier' },
    { Icon: IconCheck,    critere: 'Gestion complète',    marche: 'Parfois',           nous: 'Toujours' },
  ];

  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0' }} id="comparatif">
      <div className="container">

        {/* ── En-tête ── */}
        <div style={{ marginBottom: '64px' }}>
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>
            Comparatif marché
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Pourquoi choisir<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>Votre Pièce ?</em>
          </h2>
          <p style={{ maxWidth: '440px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Comparez notre offre avec le marché moyen en Mauricie. Chiffres réels, sans artifice.
          </p>
        </div>

        {/* ── Tableau ── */}
        <div style={{ maxWidth: '760px' }}>

          {/* Entête colonnes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '16px',
            marginBottom: '0',
          }}>
            <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)' }}>
              Critère
            </div>
            <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
              Marché Mauricie
            </div>
            <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', textAlign: 'center', fontWeight: 500 }}>
              Votre Pièce
            </div>
          </div>

          {/* Lignes */}
          {comparisons.map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '20px 0',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Critère */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}><row.Icon /></span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>
                  {row.critere}
                </span>
              </div>

              {/* Marché */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)', display: 'flex' }}><IconX /></span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)' }}>
                  {row.marche}
                </span>
              </div>

              {/* Nous */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 16px',
              }}>
                <span style={{ color: '#FFFFFF', display: 'flex' }}><IconCheck /></span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#FFFFFF' }}>
                  {row.nous}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px' }}>
          <a href="/soumission" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '15px 32px',
            transition: 'all 0.3s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#FFFFFF')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          >
            Obtenir ma soumission gratuite
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
