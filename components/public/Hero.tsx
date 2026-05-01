import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
  data: Record<string, unknown>;
}

export default function Hero({ data }: HeroProps) {
  const hero = data.hero as Record<string, string>;

  return (
    <section className={styles.hero}>
      {/* Photo de fond — Desktop */}
      <div className={`${styles.bgPhoto} ${styles.bgPhotoDesktop}`}>
        <Image
          src="/hero-wall.png"
          alt="Votre Pièce — Rénovation de prestige en Mauricie"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          quality={95}
        />
      </div>

      {/* Photo de fond — Mobile (portrait optimisé) */}
      <div className={`${styles.bgPhoto} ${styles.bgPhotoMobile}`}>
        <Image
          src="/hero-home-mobile.png"
          alt="Votre Pièce — Rénovation de prestige en Mauricie"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          quality={90}
        />
      </div>

      {/* Voile très léger sur le côté droit uniquement — lisibilité du texte */}
      <div className={styles.bgOverlay} />

      {/* Badge discret coin haut droit */}
      <div className={styles.badgeGuarantee}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Garantie 2 ans
      </div>

      {/* Contenu positionné à droite — sur la zone fenêtres/chaise */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>

          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Rénovation de prestige en Mauricie
          </div>

          {/* Titre */}
          <h1 className={styles.title}>
            {hero?.titre || 'L\'excellence'}<br />
            <em className={styles.titleItalic}>dans chaque pièce.</em>
          </h1>

          <p className={styles.subtitle}>
            {hero?.sousTitre || 'Rénovation clé en main, prix transparent. Nous gérons chaque détail — de la conception à la livraison.'}
          </p>

          {/* CTA */}
          <div className={styles.ctas}>
            <Link href="/soumission" className={`btn ${styles.ctaPrimary}`}>
              {hero?.ctaPrimaire || 'Obtenir une soumission'}
            </Link>
            <a href="#calculateur" className={`btn ${styles.ctaSecondary}`}>
              {hero?.ctaSecondaire || 'Estimer mon projet'}
            </a>
          </div>

          {/* Stats */}
          <div className={styles.quickStats}>
            {[
              { val: '150+', label: 'Projets livrés' },
              { val: '98%', label: 'Satisfaction' },
              { val: '10 ans', label: "D'expérience" },
              { val: '24 mois', label: 'Garantie' },
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

      {/* Indicateur scroll */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Défiler</span>
      </div>
    </section>
  );
}
