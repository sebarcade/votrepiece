import { Metadata } from 'next';
import CuisinePage from '@/components/public/CuisinePage';

export const metadata: Metadata = {
  title: 'Rénovation Cuisine en Mauricie | Votre Pièce',
  description:
    'Rénovation complète de cuisine à Shawinigan, Trois-Rivières et Grand-Mère. Armoires, comptoirs, dosseret, îlot, plomberie — soumission gratuite en 24h. Garantie 24 mois.',
  keywords: [
    'rénovation cuisine Mauricie',
    'rénovation cuisine Shawinigan',
    'cuisine Trois-Rivières',
    'armoires cuisine Mauricie',
    'comptoirs quartz granit Mauricie',
    'entrepreneur cuisine Mauricie',
    'soumission cuisine gratuite',
  ],
  openGraph: {
    title: 'Rénovation Cuisine — Votre Pièce | Mauricie',
    description: 'Transformez votre cuisine en espace design. Armoires sur mesure, comptoirs, îlot — prix transparent, garantie 24 mois. Shawinigan, Trois-Rivières, Grand-Mère.',
    url: 'https://votrepiece.ca/cuisine',
    siteName: 'Votre Pièce',
    images: [{ url: '/cuisine-hero.png', width: 1600, height: 1067, alt: 'Rénovation cuisine luxe en Mauricie — Votre Pièce' }],
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: { canonical: 'https://votrepiece.ca/cuisine' },
};

export default function Page() {
  return <CuisinePage />;
}
