import { Metadata } from 'next';
import QuoteForm from '@/components/public/QuoteForm';

export const metadata: Metadata = {
  title: 'Soumission gratuite',
  description: 'Obtenez votre soumission gratuite en quelques minutes. Rénovation par pièce et entretien d\'immeuble en Mauricie.',
};

export default function SoumissionPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg-soft)' }}>
      <div className="section-sm">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-green" style={{ marginBottom: '12px' }}>Gratuit et sans engagement</div>
            <h1 style={{ marginBottom: '12px' }}>Obtenez votre soumission gratuite</h1>
            <p style={{ maxWidth: '500px', margin: '0 auto' }}>
              Remplissez ce formulaire en 5 minutes. Notre équipe vous rappelle sous 24h pour planifier une visite.
            </p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
