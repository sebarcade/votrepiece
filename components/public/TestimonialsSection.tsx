export default function TestimonialsSection() {
  const temoignages = [
    {
      nom: 'Marie-Claude B.',
      ville: 'Shawinigan',
      service: 'Salle de bain',
      etoiles: 5,
      texte: "Travail impeccable. Ma salle de bain a été transformée en 8 jours exactement comme promis. Le prix était transparent depuis le début, aucune surprise. Je recommande Votre Pièce à tous mes proches.",
      initiales: 'MC',
    },
    {
      nom: 'Jean-François L.',
      ville: 'Grand-Mère',
      service: 'Cuisine complète',
      etoiles: 5,
      texte: "Notre cuisine était désuète depuis 20 ans. L'équipe a fait un travail extraordinaire en 12 jours. Le résultat dépasse nos attentes. Excellent rapport qualité-prix comparé aux autres soumissions reçues.",
      initiales: 'JF',
    },
    {
      nom: 'Syndicat Les Pins',
      ville: 'Trois-Rivières',
      service: "Entretien d'immeuble",
      etoiles: 5,
      texte: "Nous avons signé un contrat annuel pour l'entretien de nos 24 logements. Service professionnel, ponctuel et soigné. Les résidents sont très satisfaits. Contrat renouvelé pour une deuxième année.",
      initiales: 'LP',
    },
  ];

  return (
    <section style={{ background: '#F8F7F5', padding: '96px 0' }} id="temoignages">
      <div className="container">

        {/* ── En-tête ── */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.35)',
            marginBottom: '16px',
          }}>
            Témoignages clients
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.1,
            color: '#0A0A0A',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Ce que disent<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(10,10,10,0.35)' }}>nos clients.</em>
          </h2>
          <p style={{ maxWidth: '440px', fontSize: '0.92rem', color: 'rgba(10,10,10,0.45)', lineHeight: 1.8 }}>
            La confiance se construit projet après projet. Voici quelques témoignages de clients satisfaits.
          </p>
        </div>

        {/* ── Grille ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          background: 'rgba(10,10,10,0.08)',
          border: '1px solid rgba(10,10,10,0.08)',
        }}>
          {temoignages.map((t, i) => (
            <div key={i} style={{
              background: '#FFFFFF',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {/* Étoiles */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: t.etoiles }).map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Texte */}
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#0A0A0A',
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                &ldquo;{t.texte}&rdquo;
              </blockquote>

              {/* Séparateur */}
              <div style={{ width: '28px', height: '1px', background: 'rgba(10,10,10,0.15)' }} />

              {/* Auteur */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.9rem',
                    color: '#FFFFFF',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                  }}>
                    {t.initiales}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#0A0A0A', letterSpacing: '0.02em' }}>
                    {t.nom}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'rgba(10,10,10,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                    {t.ville} · {t.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
