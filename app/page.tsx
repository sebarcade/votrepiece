import { Metadata } from 'next';
import { getContent } from '@/lib/data';
import Hero from '@/components/public/Hero';
import StatsCounter from '@/components/public/StatsCounter';
import ServicesGrid from '@/components/public/ServicesGrid';
import CalculatorSection from '@/components/public/CalculatorSection';
import MarketComparison from '@/components/public/MarketComparison';
import QuoteFormSection from '@/components/public/QuoteFormSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Rénovation par pièce en Mauricie | Votre Pièce',
  description:
    'Rénovation salle de bain, cuisine, salon, chambre et entretien d\'immeuble en Mauricie. Soumission gratuite, prix transparent, garantie 2 ans.',
};

export default function HomePage() {
  const content = getContent() as Record<string, Record<string, unknown>>;
  const homepage = content.homepage as Record<string, unknown>;

  return (
    <>
      <Hero data={homepage} />
      <StatsCounter data={homepage.stats as Record<string, number>} />
      <ServicesGrid />
      <CalculatorSection />
      <MarketComparison />
      <TestimonialsSection />
      <QuoteFormSection />
    </>
  );
}
