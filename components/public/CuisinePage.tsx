'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/public/Hero.module.css';
import Calculator from '@/components/public/Calculator';
import QuoteFormSection from '@/components/public/QuoteFormSection';

/* ── Points forts cuisine ── */
function CuisineAtouts() {
  const atouts = [
    { num: '01', titre: 'Armoires sur mesure', desc: 'Conception et installation d\'armoires adaptées à votre espace — bois massif, melamine, thermofoil, tout style.' },
    { num: '02', titre: 'Comptoirs & surfaces', desc: 'Quartz, granit, marbre, stratifié — coupe, pose et jointure parfaite. Résultat durable et sans faille.' },
    { num: '03', titre: 'Plomberie & électricité', desc: 'Déplacement d\'évier, ajout de prises, hotte intégrée, luminaires encastrés — tout inclus.' },
    { num: '04', titre: 'Dosseret & îlot', desc: 'Carrelage, verre, béton ciré — dosserets signature et îlots centraux sur mesure pour une cuisine fonctionnelle.' },
  ];
  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>
            Notre expertise
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', lineHeight: 1.1, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Une cuisine signée<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>Votre Pièce.</em>
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

/* ── Hero cuisine ── */
function CuisineHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgPhoto}>
        <Image
          src="/cuisine-hero.png"
          alt="Rénovation cuisine luxe en Mauricie — Votre Pièce"
          fill priority
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          quality={95}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to left, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.55) 38%, rgba(5,5,5,0.10) 65%, transparent 100%)',
      }} />

      <div className={styles.badgeGuarantee}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Garantie 24 mois
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Rénovation cuisine — Mauricie
          </div>
          <h1 className={styles.title}>
            Votre cuisine.<br />
            <em className={styles.titleItalic}>Réinventée.</em>
          </h1>
          <p className={styles.subtitle}>
            Armoires sur mesure, comptoirs, îlot, plomberie, luminaires. De la conception à la livraison — clé en main, prix transparent.
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
              { val: '180+', label: 'Cuisines rénovées' },
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
export default function CuisinePage() {
  return (
    <>
      <CuisineHero />
      {/* Calculateur interactif verrouillé sur Cuisine */}
      <Calculator lockedRoom="cuisine" />
      <CuisineAtouts />
      <QuoteFormSection />
    </>
  );
}
