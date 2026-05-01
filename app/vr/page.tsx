import { Metadata } from 'next';
import VRPage from '@/components/public/VRPage';

export const metadata: Metadata = {
  title: 'Réparation & Rénovation VR à Lac-à-la-Tortue, Shawinigan | Votre Pièce',
  description:
    'Réparation, entretien et rénovation complète de véhicules récréatifs à Lac-à-la-Tortue, Shawinigan (8955 rang St-Mathieu). Vous apportez votre VR ou on le récupère. Soumission gratuite.',
  keywords: [
    'réparation VR Shawinigan',
    'rénovation véhicule récréatif Mauricie',
    'entretien VR Lac-à-la-Tortue',
    'reconstruction VR Shawinigan',
    'réparation motorisé Mauricie',
    'VR rénovation intérieur Québec',
  ],
  openGraph: {
    title: 'Réparation & Rénovation VR — Votre Pièce | Lac-à-la-Tortue, Shawinigan',
    description: 'Experts en réparation, entretien et rénovation de véhicules récréatifs. Situés à Lac-à-la-Tortue, Shawinigan. On récupère votre VR ou vous nous l\'apportez.',
    url: 'https://votrepiece.ca/vr',
    siteName: 'Votre Pièce',
    images: [{ url: '/vr-hero.png', width: 1600, height: 750, alt: 'Réparation et rénovation VR — Votre Pièce Shawinigan' }],
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: { canonical: 'https://votrepiece.ca/vr' },
};

export default function Page() {
  return <VRPage />;
}
