import { Metadata } from 'next';
import QuoteForm from '@/components/public/QuoteForm';

export const metadata: Metadata = {
  title: 'Soumission gratuite — Rénovation en Mauricie | Votre Pièce',
  description:
    'Obtenez votre soumission gratuite en 5 minutes. Rénovation salle de bain, cuisine, salon, chambre en Mauricie. Notre équipe vous rappelle sous 24h.',
  alternates: { canonical: 'https://votrepiece.ca/soumission' },
};

export default function SoumissionPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '130px', paddingBottom: '80px' }}>

      {/* En-tête luxe */}
      <div className="container" style={{ maxWidth: '760px', marginBottom: '56px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.68rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: '16px',
        }}>
          Gratuit &amp; sans engagement
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          lineHeight: 1.1,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          marginBottom: '20px',
        }}>
          Votre soumission.<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>En 5 minutes.</em>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.92rem',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.8,
          maxWidth: '520px',
          margin: '0 auto',
        }}>
          Remplissez ce formulaire. Notre équipe vous rappelle sous 24h pour planifier une visite gratuite et vous remettre un prix détaillé.
        </p>

        {/* Badges garanties */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
          {[
            { icon: '○', text: 'Réponse sous 24h' },
            { icon: '◇', text: 'Visite gratuite' },
            { icon: '□', text: 'Garantie 24 mois' },
          ].map((b) => (
            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>{b.icon}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div className="container" style={{ maxWidth: '760px' }}>
        <QuoteForm />
      </div>
    </div>
  );
}
