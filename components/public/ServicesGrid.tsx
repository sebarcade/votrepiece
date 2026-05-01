'use client';
import Link from 'next/link';

/* Icônes SVG architecturales — remplacent les emojis */
const IconBath = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 Q9 4 11 4 L13 4 Q15 4 15 6 L15 9"/>
    <rect x="2" y="9" width="20" height="4" rx="1"/>
    <path d="M5 13v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3"/>
  </svg>
);

const IconKitchen = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="5" rx="1"/>
    <rect x="2" y="11" width="20" height="10" rx="1"/>
    <line x1="12" y1="4" x2="12" y2="21"/>
    <line x1="7" y1="15" x2="9" y2="15"/>
    <line x1="15" y1="15" x2="17" y2="15"/>
  </svg>
);

const IconLiving = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
    <path d="M2 10h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z"/>
    <line x1="6" y1="16" x2="6" y2="20"/>
    <line x1="18" y1="16" x2="18" y2="20"/>
  </svg>
);

const IconBedroom = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10"/>
    <path d="M2 16h20"/>
    <path d="M7 12h10"/>
    <path d="M2 8V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/>
  </svg>
);

const IconRV = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="18" height="11" rx="2"/>
    <path d="M19 10h3l1 5H19"/>
    <circle cx="6" cy="20" r="2"/>
    <circle cx="16" cy="20" r="2"/>
    <path d="M8 7V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  </svg>
);

const services = [
  {
    icon: <IconBath />,
    titre: 'Salle de bain',
    description: 'Carrelage, plomberie, vanité, douche sur mesure. Transformation complète de votre espace bain.',
    prix: '8 000$ – 35 000$',
    delai: '5–10 jours',
    href: '/salle-de-bain',
    color: '#E8EBF0',
  },
  {
    icon: <IconKitchen />,
    titre: 'Cuisine',
    description: 'Armoires sur mesure, comptoirs, dosseret, plancher. La cuisine de vos rêves, livrée dans les délais.',
    prix: '15 000$ – 75 000$',
    delai: '7–14 jours',
    href: '/cuisine',
    color: '#EEF0E8',
  },
  {
    icon: <IconLiving />,
    titre: 'Salon & Séjour',
    description: 'Planchers, peinture, boiseries, éclairage. Un espace de vie qui vous ressemble.',
    prix: '5 000$ – 25 000$',
    delai: '3–7 jours',
    href: '/salon',
    color: '#F0EBE8',
  },
  {
    icon: <IconBedroom />,
    titre: 'Chambre',
    description: 'Planchers, peinture, garde-robes, isolation phonique. Votre sanctuaire de repos.',
    prix: '3 000$ – 15 000$',
    delai: '2–5 jours',
    href: '/chambre',
    color: '#EBE8F0',
  },
  {
    icon: <IconRV />,
    titre: 'Véhicule Récréatif',
    description: 'Réparation, modernisation et personnalisation de votre VR. Redonnez-lui vie.',
    prix: '2 000$ – 20 000$',
    delai: '1–5 jours',
    href: '/vr',
    color: '#F0EEE8',
  },
  {
    icon: <IconBuilding />,
    titre: 'Entretien immeuble',
    description: 'Corridors, espaces communs, stationnements. Contrats mensuels ou annuels.',
    prix: 'Dès 35$/logement',
    delai: 'Contrat récurrent',
    href: '/entretien-immeuble',
    color: '#E8F0EE',
  },
];

export default function ServicesGrid() {
  return (
    <section className="section bg-soft" id="services">
      <div className="container">

        {/* En-tête de section */}
        <div style={{ marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Nos services</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.1,
            color: '#0A0A0A',
            marginBottom: '16px',
          }}>
            Chaque pièce mérite<br />
            <em style={{ fontStyle: 'italic', color: '#3D3D3A' }}>l&apos;excellence.</em>
          </h2>
          <p style={{ maxWidth: '480px', fontSize: '0.95rem', color: '#8A8A82', lineHeight: 1.8 }}>
            De la rénovation complète par pièce aux contrats d&apos;entretien d&apos;immeuble — nous gérons chaque projet avec rigueur et transparence.
          </p>
        </div>

        {/* Grille de services */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#EFEFED',
          border: '1px solid #EFEFED',
        }}>
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              style={{
                display: 'block',
                background: '#FFFFFF',
                padding: '40px',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = service.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
              }}
            >
              {/* Icône */}
              <div style={{
                color: '#8A8A82',
                marginBottom: '24px',
                transition: 'color 0.3s',
              }}>
                {service.icon}
              </div>

              {/* Titre */}
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                fontWeight: 400,
                color: '#0A0A0A',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}>
                {service.titre}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: '#8A8A82',
                lineHeight: 1.75,
                marginBottom: '28px',
              }}>
                {service.description}
              </p>

              {/* Méta : prix + délai */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderTop: '1px solid #EFEFED',
                paddingTop: '20px',
              }}>
                <div>
                  <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D0CFC9', marginBottom: '4px' }}>
                    Prix estimé
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 400, color: '#0A0A0A' }}>
                    {service.prix}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D0CFC9', marginBottom: '4px' }}>
                    Délai
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#3D3D3A', fontWeight: 400 }}>
                    {service.delai}
                  </div>
                </div>
              </div>

              {/* Flèche discrète */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                opacity: 0.25,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA centré */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/soumission" className="btn btn-primary">
            Demander une soumission gratuite
          </Link>
        </div>
      </div>
    </section>
  );
}
