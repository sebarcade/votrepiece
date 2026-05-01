'use client';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { href: '/salle-de-bain', label: 'Salle de bain' },
  { href: '/cuisine', label: 'Cuisine' },
  { href: '/salon', label: 'Salon & Séjour' },
  { href: '/chambre', label: 'Chambre à coucher' },
  { href: '/vr', label: 'Véhicule Récréatif' },
  { href: '/entretien-immeuble', label: "Entretien d'immeuble" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0A0A0A',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle architectural line accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent)',
      }} />

      {/* ── Corps principal ── */}
      <div className="container" style={{ padding: '80px 0 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.4fr',
          gap: '64px',
          paddingBottom: '64px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>

          {/* ── Logo + Description ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link href="/">
              <Image
                src="/logo-transparent.png"
                alt="Votre Pièce"
                width={480}
                height={144}
                style={{ width: 'auto', height: '114px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
              />
            </Link>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.9,
              maxWidth: '280px',
            }}>
              Rénovation par pièce et entretien d&apos;immeuble en Mauricie. Prix juste, délais respectés, résultat garanti.
            </p>

            {/* Badge garantie — glassmorphism */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              padding: '9px 18px',
              width: 'fit-content',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                Garantie 24 mois
              </span>
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '24px',
            }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.38)',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '24px',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  href: 'tel:8192470449',
                  text: '(819) 247-0449',
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/></svg>,
                },
                {
                  href: 'mailto:VotrePiece@gmail.com',
                  text: 'VotrePiece@gmail.com',
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                },
                {
                  href: '#',
                  text: 'Shawinigan, Mauricie',
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                },
                {
                  href: '#',
                  text: 'Lun–Ven 8h–17h · Sam 9h–14h',
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.38)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                >
                  <span style={{ flexShrink: 0, opacity: 0.6 }}>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(12px)',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '12px',
                fontStyle: 'italic',
              }}>
                Prêt à démarrer votre projet ?
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.7,
              }}>
                Soumission gratuite en quelques minutes.
              </p>
            </div>
            <Link href="/soumission" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              background: '#FFFFFF',
              padding: '13px 24px',
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Soumission gratuite
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>

        {/* ── Barre de bas ── */}
        <div style={{
          paddingTop: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.06em',
          }}>
            © {year} Votre Pièce. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
              Fier membre de la Mauricie
            </span>
            <Link href="/admin" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.12)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}>
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
