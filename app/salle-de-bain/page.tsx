import { Metadata } from 'next';
import SalleDeBainPage from '@/components/public/SalleDeBainPage';

/* ── SEO ── */
export const metadata: Metadata = {
  title: 'Rénovation Salle de Bain en Mauricie | Votre Pièce',
  description:
    'Rénovation complète de salle de bain à Shawinigan, Trois-Rivières et Grand-Mère. Carreaux, bain, douche, vanité, plomberie — soumission gratuite en 24h. Garantie 24 mois.',
  keywords: [
    'rénovation salle de bain Mauricie',
    'rénovation salle de bain Shawinigan',
    'salle de bain Trois-Rivières',
    'entrepreneur salle de bain Mauricie',
    'pose carrelage salle de bain',
    'réfection salle de bain',
    'soumission salle de bain gratuite',
  ],
  openGraph: {
    title: 'Rénovation Salle de Bain — Votre Pièce | Mauricie',
    description: 'Transformez votre salle de bain en espace luxe. Équipe expérimentée, prix transparent, garantie 24 mois. Servons Shawinigan, Trois-Rivières, Grand-Mère.',
    url: 'https://votrepiece.ca/salle-de-bain',
    siteName: 'Votre Pièce',
    images: [
      {
        url: '/salle-de-bain-hero.png',
        width: 1600,
        height: 1067,
        alt: 'Rénovation salle de bain luxe en Mauricie — Votre Pièce',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://votrepiece.ca/salle-de-bain',
  },
};

export default function Page() {
  return <SalleDeBainPage />;
}
