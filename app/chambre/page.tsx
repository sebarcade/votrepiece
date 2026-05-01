import { Metadata } from 'next';
import ChambrePage from '@/components/public/ChambrePage';

export const metadata: Metadata = {
  title: 'Rénovation Chambre en Mauricie | Votre Pièce',
  description:
    'Rénovation complète de chambre à Shawinigan, Trois-Rivières et Grand-Mère. Planchers, peinture, garde-robes sur mesure, éclairage — soumission gratuite en 24h. Garantie 24 mois.',
  keywords: [
    'rénovation chambre Mauricie',
    'rénovation chambre Shawinigan',
    'garde-robes sur mesure Mauricie',
    'plancher chambre Trois-Rivières',
    'entrepreneur chambre Mauricie',
    'soumission chambre gratuite',
  ],
  openGraph: {
    title: 'Rénovation Chambre — Votre Pièce | Mauricie',
    description: 'Transformez votre chambre en havre de paix. Planchers, garde-robes, éclairage ambiance — prix transparent, garantie 24 mois. Shawinigan, Trois-Rivières, Grand-Mère.',
    url: 'https://votrepiece.ca/chambre',
    siteName: 'Votre Pièce',
    images: [{ url: '/chambre-hero.png', width: 1600, height: 800, alt: 'Rénovation chambre luxe en Mauricie — Votre Pièce' }],
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: { canonical: 'https://votrepiece.ca/chambre' },
};

export default function Page() {
  return <ChambrePage />;
}
