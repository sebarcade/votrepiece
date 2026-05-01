'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/public/Hero.module.css';
import Calculator from '@/components/public/Calculator';
import QuoteFormSection from '@/components/public/QuoteFormSection';

/* ── Points forts chambre ── */
function ChAmbreAtouts() {
  const atouts = [
    { num: '01', titre: 'Planchers & revêtements', desc: 'Bois franc, vinyle de luxe, moquette premium — installation soignée, coupe précise, résultat impeccable.' },
    { num: '02', titre: 'Garde-robes sur mesure', desc: 'Portes coulissantes, rangements intégrés, systèmes modulaires — chaque espace optimisé selon vos besoins.' },
    { num: '03', titre: 'Éclairage d\'ambiance', desc: 'Spots encastrés, lumières indirectes, gradateurs — une atmosphère sur mesure, jour et nuit.' },
    { num: '04', titre: 'Peinture & finitions', desc: 'Préparation parfaite des surfaces, peinture premium, boiseries et moulures — chaque détail compte.' },
  ];
  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>
            Notre expertise
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', lineHeight: 1.1, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Un havre de paix<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>conçu pour vous.</em>
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

/* ── Hero chambre ── */
function ChAmbreHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgPhoto}>
        <Image
          src="/chambre-hero.png"
          alt="Rénovation chambre luxe en Mauricie — Votre Pièce"
          fill priority
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          quality={95}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to left, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 42%, rgba(5,5,5,0.08) 65%, transparent 100%)',
      }} />

      <div className={styles.badgeGuarantee}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Garantie 24 mois
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Rénovation chambre — Mauricie
          </div>
          <h1 className={styles.title}>
            Votre chambre.<br />
            <em className={styles.titleItalic}>Apaisante.</em>
          </h1>
          <p className={styles.subtitle}>
            Planchers, garde-robes sur mesure, éclairage d&apos;ambiance, peinture. Un espace de repos repensé pour vous — élégant, calme, personnel.
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
              { val: '120+', label: 'Chambres rénovées' },
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
export default function ChambrePage() {
  return (
    <>
      <ChAmbreHero />
      <Calculator lockedRoom="chambre" />
      <ChAmbreAtouts />
      <QuoteFormSection />
    </>
  );
}
