'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Calculator.module.css';

/* ── Icônes SVG architecturales — même style que ServicesGrid ── */
const IconBath = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 Q9 4 11 4 L13 4 Q15 4 15 6 L15 9"/>
    <rect x="2" y="9" width="20" height="4" rx="1"/>
    <path d="M5 13v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3"/>
  </svg>
);

const IconKitchen = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="5" rx="1"/>
    <rect x="2" y="11" width="20" height="10" rx="1"/>
    <line x1="12" y1="4" x2="12" y2="21"/>
    <line x1="7" y1="15" x2="9" y2="15"/>
    <line x1="15" y1="15" x2="17" y2="15"/>
  </svg>
);

const IconLiving = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
    <path d="M2 10h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z"/>
    <line x1="6" y1="16" x2="6" y2="20"/>
    <line x1="18" y1="16" x2="18" y2="20"/>
  </svg>
);

const IconBedroom = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10"/>
    <path d="M2 16h20"/>
    <path d="M7 12h10"/>
    <path d="M2 8V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/>
  </svg>
);

const IconRV = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="18" height="11" rx="2"/>
    <path d="M19 10h3l1 5H19"/>
    <circle cx="6" cy="20" r="2"/>
    <circle cx="16" cy="20" r="2"/>
    <path d="M8 7V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2"/>
  </svg>
);

/* ── Icônes pour le panneau résultat ── */
const IconRuler = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7L8.7 21.3c-.39.39-1.02.39-1.41 0l-6.3-6.3a1 1 0 0 1 0-1.41L13.6 1.01c.39-.39 1.02-.39 1.41 0l6.3 6.3c.39.38.39 1.01 0 1.4z"/>
    <line x1="7.49" y1="7.49" x2="9.51" y2="9.51"/>
    <line x1="10.5" y1="10.5" x2="12.5" y2="12.5"/>
    <line x1="13.5" y1="13.5" x2="15.5" y2="15.5"/>
  </svg>
);

const IconFinish = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const IconWrench = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconTrend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/>
  </svg>
);

const ROOM_TYPES = [
  { id: 'salleDeBain', label: 'Salle de bain', Icon: IconBath, basePrice: 12000, prixM2: 450 },
  { id: 'cuisine',     label: 'Cuisine',        Icon: IconKitchen, basePrice: 20000, prixM2: 600 },
  { id: 'salon',       label: 'Salon',           Icon: IconLiving, basePrice: 7000, prixM2: 200 },
  { id: 'chambre',     label: 'Chambre',         Icon: IconBedroom, basePrice: 5000, prixM2: 150 },
  { id: 'vr',          label: 'Véh. Récréatif',  Icon: IconRV, basePrice: 5000, prixM2: 300 },
];

const FINITIONS = [
  { id: 'economique',  label: 'Économique',    multiplicateur: 0.75, description: 'Matériaux standards' },
  { id: 'standard',    label: 'Standard',      multiplicateur: 1.0,  description: 'Rapport qualité/prix optimal' },
  { id: 'hauteGamme',  label: 'Haut de gamme', multiplicateur: 1.65, description: 'Matériaux premium' },
];

const TRAVAUX_PAR_PIECE: Record<string, string[]> = {
  salleDeBain: ['Démolition', 'Plomberie', 'Carrelage', 'Vanité', 'Douche/bain', 'Peinture', 'Luminaires'],
  cuisine:     ['Démolition', 'Armoires', 'Comptoirs', 'Plomberie', 'Dosseret', 'Plancher', 'Luminaires'],
  salon:       ['Plancher', 'Peinture', 'Boiseries', 'Éclairage', 'Fenêtres'],
  chambre:     ['Plancher', 'Peinture', 'Éclairage', 'Garde-robes'],
  vr:          ['Structure', 'Intérieur', 'Plomberie', 'Électricité', 'Finition'],
};

export default function Calculator({ lockedRoom }: { lockedRoom?: string }) {
  const [room, setRoom]               = useState(lockedRoom ?? 'salleDeBain');
  const [superficie, setSuperficie]   = useState(80);
  const [finition, setFinition]       = useState('standard');
  const [travauxSelected, setTravauxSelected] = useState<string[]>([]);
  const [estimation, setEstimation]   = useState({ min: 0, max: 0 });

  const selectedRoom    = ROOM_TYPES.find((r) => r.id === room)!;
  const selectedFinition = FINITIONS.find((f) => f.id === finition)!;
  const travauxList     = TRAVAUX_PAR_PIECE[room] || [];

  useEffect(() => {
    setTravauxSelected(travauxList.slice(0, 3));
  }, [room]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tauxHoraire = 75;
    const nbEmployes  = room === 'salleDeBain' || room === 'cuisine' ? 2 : 1;
    const heures      = superficie * 1.5 * nbEmployes;
    const mainOeuvre  = heures * tauxHoraire;
    const materiaux   = superficie * (selectedRoom?.prixM2 || 300) * selectedFinition.multiplicateur;
    const total       = (mainOeuvre + materiaux) * (0.8 + (travauxSelected.length / travauxList.length) * 0.4);
    setEstimation({
      min: Math.round(total * 0.85 / 100) * 100,
      max: Math.round(total * 1.15 / 100) * 100,
    });
  }, [room, superficie, finition, travauxSelected, selectedRoom, selectedFinition, travauxList.length]);

  const toggleTravail = (t: string) =>
    setTravauxSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const formatPrice = (n: number) =>
    n.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

  return (
    <section className={styles.section} id="calculateur">
      <div className="container">

        {/* ── En-tête de section ── */}
        <div className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>Calculateur de projet</p>
          <h2 className={styles.title}>
            Estimez votre projet<br />
            <em className={styles.titleItalic}>en 2 minutes.</em>
          </h2>
          <p className={styles.subtitle}>
            Obtenez une fourchette de prix indicative basée sur la pièce, la superficie et le niveau de finition souhaité.
          </p>
        </div>

        {/* ── Calculateur ── */}
        <div className={styles.calculator}>
          <div className={styles.form}>

            {/* Step 1: Pièce — masqué si la pièce est verrouillée */}
            {!lockedRoom && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNum}>01</span>
                  Quelle pièce souhaitez-vous rénover ?
                </h3>
                <div className={styles.roomGrid}>
                  {ROOM_TYPES.map((r) => (
                    <button
                      key={r.id}
                      className={`${styles.roomBtn} ${room === r.id ? styles.roomBtnActive : ''}`}
                      onClick={() => setRoom(r.id)}
                    >
                      <span className={styles.roomIcon}>
                        <r.Icon />
                      </span>
                      <span className={styles.roomLabel}>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Superficie */}
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum}>02</span>
                Superficie&nbsp;
                <strong className={styles.stepValue}>{superficie} pi²</strong>
              </h3>
              <div className={styles.sliderContainer}>
                <span className={styles.sliderMin}>30</span>
                <input
                  type="range" min={30} max={500} step={5}
                  value={superficie}
                  onChange={(e) => setSuperficie(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.sliderMax}>500 pi²</span>
              </div>
              <div className={styles.sliderHints}>
                <span>Petite pièce (~50 pi²)</span>
                <span>Moyenne (~150 pi²)</span>
                <span>Grande (~300 pi²)</span>
              </div>
            </div>

            {/* Step 3: Finition */}
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum}>03</span>
                Niveau de finition
              </h3>
              <div className={styles.finitionGrid}>
                {FINITIONS.map((f) => (
                  <button
                    key={f.id}
                    className={`${styles.finitionBtn} ${finition === f.id ? styles.finitionBtnActive : ''}`}
                    onClick={() => setFinition(f.id)}
                  >
                    <span className={styles.finitionLabel}>{f.label}</span>
                    <span className={styles.finitionDesc}>{f.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Travaux */}
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNum}>04</span>
                Travaux souhaités
              </h3>
              <div className={styles.travauxGrid}>
                {travauxList.map((t) => (
                  <button
                    key={t}
                    className={`${styles.travauxBtn} ${travauxSelected.includes(t) ? styles.travauxBtnActive : ''}`}
                    onClick={() => toggleTravail(t)}
                  >
                    <span className={styles.travauxCheck}>
                      {travauxSelected.includes(t) ? '✓' : '+'}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Panneau résultat ── */}
          <div className={styles.result}>
            <div className={styles.resultInner}>

              {/* Header résultat */}
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon}>
                  <selectedRoom.Icon />
                </div>
                <h3 className={styles.resultTitle}>{selectedRoom.label}</h3>
                <p className={styles.resultSubtitle}>
                  {superficie} pi² · {selectedFinition.label}
                </p>
              </div>

              {/* Prix */}
              <div className={styles.resultPrice}>
                <div className={styles.resultPriceLabel}>Estimation préliminaire</div>
                <div className={styles.resultPriceRange}>
                  {formatPrice(estimation.min)}
                  <span className={styles.resultPriceSep}> — </span>
                  {formatPrice(estimation.max)}
                </div>
                <p className={styles.resultNote}>
                  * Indicatif. Prix final établi lors de la visite gratuite.
                </p>
              </div>

              {/* Détails */}
              <div className={styles.resultDetails}>
                {[
                  { Icon: IconRuler, label: 'Superficie', value: `${superficie} pi²` },
                  { Icon: IconFinish, label: 'Finition',   value: selectedFinition.label },
                  { Icon: IconWrench, label: 'Travaux',    value: `${travauxSelected.length} sélectionnés` },
                  { Icon: IconShield, label: 'Garantie',   value: '24 mois' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className={styles.resultDetail}>
                    <span className={styles.resultDetailLabel}>
                      <Icon /> {label}
                    </span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              {/* Économies */}
              <div className={styles.resultSavings}>
                <div className={styles.savingsIcon}><IconTrend /></div>
                <div>
                  <div className={styles.savingsTitle}>~20% sous le prix du marché</div>
                  <div className={styles.savingsDesc}>vs la moyenne en Mauricie</div>
                </div>
              </div>

              <Link href="/soumission" className={`btn ${styles.resultCta}`}>
                Obtenir une soumission précise
              </Link>

              <a href="tel:8192470449" className={styles.phoneLink}>
                <IconPhone /> (819) 247-0449 — Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
