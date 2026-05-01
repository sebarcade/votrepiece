import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Votre Pièce | Rénovation par pièce en Mauricie',
    template: '%s | Votre Pièce',
  },
  description:
    'Rénovation par pièce (salle de bain, cuisine, salon, chambre) et entretien d\'immeuble en Mauricie. Soumission gratuite. Prix juste et transparent.',
  keywords: [
    'rénovation mauricie', 'rénovation salle de bain', 'rénovation cuisine',
    'entretien immeuble', 'rénovation shawinigan', 'entrepreneur rénovation',
  ],
  openGraph: {
    siteName: 'Votre Pièce',
    locale: 'fr_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
