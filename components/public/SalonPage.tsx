'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/public/Hero.module.css';
import Calculator from '@/components/public/Calculator';
import QuoteFormSection from '@/components/public/QuoteFormSection';

/* ── Points forts salon ── */
function SalonAtouts() {
  const atouts = [
    { num: '01', titre: 'Planchers & revêtements', desc: 'Bois franc, vinyle de luxe, béton ciré, carrelage grand format — installation parfaite, sans joint apparent.' },
    { num: '02', titre: 'Boiseries & moulures', desc: 'Caissons muraux, lambris, corniches, colonnes — menuiserie fine qui transforme l\'atmosphère d\'une pièce.' },
    { num: '03', titre: 'Éclairage design', desc: 'Spots encastrés, éclairage indirect, gradateurs — conception lumineuse pensée pièce par pièce.' },
    { num: '04', titre: 'Peinture & finition', desc: 'Préparation soignée, peinture premium, effets décoratifs — résultat impeccable, sans éclaboussure.' },
  ];
  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 0' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>
            Notre expertise
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', lineHeight: 1.1, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Un salon à votre<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>image exacte.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2px', background: 'rgba(255,255,255,0.08)' }}>
          {atouts.map((a) => (
            <div key={a.num} style={{ background: '#0A0A0A', padding: '36px 32px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: 'rgba(255,255,255,0.12)', display: 'block', marginBottom: '16px' }}>{a.num}</span>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#FFFFFF', marginBottom: '10px', letterSpacing: '0.02em' }}>{a.titre}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.8 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hero salon ── */
function SalonHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgPhoto}>
        <Image
          src="/salon-hero.png"
          alt="Rénovation salon luxe en Mauricie — Votre Pièce"
          fill priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          quality={95}
        />
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.badgeGuarantee}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Garantie 24 mois
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Rénovation salon — Mauricie
          </div>
          <h1 className={styles.title}>
            Votre salon.<br />
            <em className={styles.titleItalic}>Sublimé.</em>
          </h1>
          <p className={styles.subtitle}>
            Planchers, boiseries, éclairage, peinture, fenêtres. Un espace de vie repensé de A à Z — élégant, fonctionnel, durable.
          </p>
          <div className={styles.ctas}>
            <Link href="/soumission" className={`btn ${styles.ctaPrimary}`}>
              Soumission gratuite
            </Link>
            <a href="#calculateur" className={`btn ${styles.ctaSecondary}`}>
              Estimer mon projet
            </a>
          </div>
          <div className={styles.quickStats}>
            {[
              { val: '150+', label: 'Salons rénovés' },
              { val: '10 ans', label: "D'expérience" },
              { val: '24 mois', label: 'Garantie' },
              { val: '24h', label: 'Réponse' },
            ].map((stat, i) => (
              <div key={i} className={styles.quickStat}>
                {i > 0 && <div className={styles.statDivider} />}
                <div className={styles.statInner}>
                  <strong className={styles.statVal}>{stat.val}</strong>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Défiler</span>
      </div>
    </section>
  );
}

/* ── Page complète ── */
export default function SalonPage() {
  return (
    <>
      <SalonHero />
      <Calculator lockedRoom="salon" />
      <SalonAtouts />
      <QuoteFormSection />
    </>
  );
}
