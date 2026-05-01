import { Metadata } from 'next';
import SalonPage from '@/components/public/SalonPage';

export const metadata: Metadata = {
  title: 'Rénovation Salon & Séjour en Mauricie | Votre Pièce',
  description:
    'Rénovation complète de salon à Shawinigan, Trois-Rivières et Grand-Mère. Planchers, boiseries, peinture, éclairage, fenêtres — soumission gratuite en 24h. Garantie 24 mois.',
  keywords: [
    'rénovation salon Mauricie',
    'rénovation séjour Shawinigan',
    'plancher salon Trois-Rivières',
    'boiseries salon Mauricie',
    'entrepreneur salon Mauricie',
    'soumission salon gratuite',
  ],
  openGraph: {
    title: 'Rénovation Salon & Séjour — Votre Pièce | Mauricie',
    description: 'Transformez votre salon en espace de vie luxueux. Planchers, boiseries, éclairage design — prix transparent, garantie 24 mois. Shawinigan, Trois-Rivières, Grand-Mère.',
    url: 'https://votrepiece.ca/salon',
    siteName: 'Votre Pièce',
    images: [{ url: '/salon-hero.png', width: 1920, height: 1080, alt: 'Rénovation salon luxe en Mauricie — Votre Pièce' }],
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: { canonical: 'https://votrepiece.ca/salon' },
};

export default function Page() {
  return <SalonPage />;
}
