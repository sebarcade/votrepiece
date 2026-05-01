'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './QuoteForm.module.css';

const TYPES = [
  { id: 'Salle de bain', icon: '🛁' },
  { id: 'Cuisine', icon: '🍳' },
  { id: 'Salon / Séjour', icon: '🛋️' },
  { id: 'Chambre', icon: '🛏️' },
  { id: 'Véhicule Récréatif', icon: '🚐' },
  { id: 'Entretien immeuble', icon: '🏢' },
];

const BUDGETS = [
  'Moins de 5 000$',
  '5 000$ – 15 000$',
  '15 000$ – 30 000$',
  '30 000$ – 60 000$',
  '60 000$ et plus',
  'À déterminer',
];

const DELAIS = [
  'Le plus tôt possible',
  '1 à 3 mois',
  '3 à 6 mois',
  '6 mois et plus',
  'Pas de contrainte',
];

const DISPOS = [
  'Matin (8h–12h)',
  'Après-midi (12h–17h)',
  'Fin de journée (17h–19h)',
  'Weekend',
  'Flexible',
];

const TRAVAUX_PAR_TYPE: Record<string, string[]> = {
  'Salle de bain': ['Démolition', 'Plomberie', 'Carrelage', 'Vanité', 'Douche / bain', 'Peinture', 'Luminaires', 'Ventilation'],
  'Cuisine': ['Démolition', 'Armoires', 'Comptoirs', 'Plomberie', 'Dosseret', 'Plancher', 'Luminaires', 'Électroménagers'],
  'Salon / Séjour': ['Plancher', 'Peinture', 'Boiseries', 'Éclairage', 'Foyer', 'Fenêtres', 'Cloisons'],
  'Chambre': ['Plancher', 'Peinture', 'Éclairage', 'Garde-robes', 'Portes', 'Isolation'],
  'Véhicule Récréatif': ['Structure / toiture', 'Intérieur', 'Plomberie', 'Électricité', 'Finition extérieure', 'Isolation'],
  'Entretien immeuble': ['Corridors', 'Espaces communs', 'Stationnement', 'Réparations mineures', 'Peinture', 'Entretien saisonnier'],
};

export default function QuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    type: '',
    description: '',
    superficie: 100,
    travaux: [] as string[],
    budget: '',
    delai: '',
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    disponibilite: '',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const update = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTravail = (t: string) => {
    setData((prev) => ({
      ...prev,
      travaux: prev.travaux.includes(t)
        ? prev.travaux.filter((x) => x !== t)
        : [...prev.travaux, t],
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/soumission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/merci');
      } else {
        alert('Une erreur est survenue. Veuillez réessayer ou nous appeler au (819) 247-0449.');
      }
    } catch {
      alert('Erreur de connexion. Veuillez nous appeler au (819) 247-0449.');
    }
    setSubmitting(false);
  };

  const travauxList = TRAVAUX_PAR_TYPE[data.type] || [];

  return (
    <div className={styles.wrapper}>
      {/* Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.stepIndicator}>
        Étape {step} sur {totalSteps}
      </div>

      {/* Step 1 — Type de projet */}
      {step === 1 && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Quel type de projet ?</h2>
          <p className={styles.stepDesc}>Sélectionnez le service qui vous intéresse</p>
          <div className={styles.typeGrid}>
            {TYPES.map((t) => (
              <button
                key={t.id}
                className={`${styles.typeBtn} ${data.type === t.id ? styles.typeBtnActive : ''}`}
                onClick={() => update('type', t.id)}
              >
                <span className={styles.typeIcon}>{t.icon}</span>
                <span>{t.id}</span>
              </button>
            ))}
          </div>
          {data.type && (
            <div className={styles.stepTextarea}>
              <label className="form-label">Description rapide du projet (facultatif)</label>
              <textarea
                className="form-textarea"
                value={data.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Décrivez brièvement ce que vous souhaitez faire..."
                rows={3}
              />
            </div>
          )}
          <div className={styles.navBtns}>
            <div />
            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={!data.type}
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Détails */}
      {step === 2 && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Détails du projet</h2>
          <p className={styles.stepDesc}>Plus vous nous donnez d&apos;information, plus notre estimation sera précise</p>

          {data.type !== 'Entretien immeuble' && (
            <div className={styles.field}>
              <label className="form-label">Superficie approximative : <strong>{data.superficie} pi²</strong></label>
              <input
                type="range"
                min={30}
                max={600}
                step={10}
                value={data.superficie}
                onChange={(e) => update('superficie', Number(e.target.value))}
                style={{ width: '100%', marginTop: '8px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>30 pi²</span><span>200 pi²</span><span>400 pi²</span><span>600 pi²</span>
              </div>
            </div>
          )}

          {travauxList.length > 0 && (
            <div className={styles.field}>
              <label className="form-label">Travaux souhaités</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {travauxList.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTravail(t)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: `1.5px solid ${data.travaux.includes(t) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      background: data.travaux.includes(t) ? 'var(--color-bg-green)' : 'white',
                      color: data.travaux.includes(t) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: data.travaux.includes(t) ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {data.travaux.includes(t) ? '✓ ' : ''}{t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className={styles.field}>
              <label className="form-label">Budget approximatif</label>
              <select className="form-select" value={data.budget} onChange={(e) => update('budget', e.target.value)}>
                <option value="">-- Sélectionner --</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className="form-label">Délai souhaité</label>
              <select className="form-select" value={data.delai} onChange={(e) => update('delai', e.target.value)}>
                <option value="">-- Sélectionner --</option>
                {DELAIS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.navBtns}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>← Retour</button>
            <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!data.budget || !data.delai}>
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Coordonnées */}
      {step === 3 && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>Vos coordonnées</h2>
          <p className={styles.stepDesc}>Pour que nous puissions vous contacter et planifier la visite</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className={`${styles.field} form-group`}>
              <label className="form-label">Nom complet *</label>
              <input className="form-input" value={data.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Jean Tremblay" required />
            </div>
            <div className={`${styles.field} form-group`}>
              <label className="form-label">Téléphone *</label>
              <input className="form-input" type="tel" value={data.telephone} onChange={(e) => update('telephone', e.target.value)} placeholder="(819) 000-0000" required />
            </div>
          </div>

          <div className={`${styles.field} form-group`}>
            <label className="form-label">Adresse email</label>
            <input className="form-input" type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="jean@exemple.com" />
          </div>

          <div className={`${styles.field} form-group`}>
            <label className="form-label">Adresse des travaux *</label>
            <input className="form-input" value={data.adresse} onChange={(e) => update('adresse', e.target.value)} placeholder="123 rue Principale, Shawinigan, QC" required />
          </div>

          <div className={styles.field}>
            <label className="form-label">Disponibilité pour une visite</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {DISPOS.map((d) => (
                <button
                  key={d}
                  onClick={() => update('disponibilite', d)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: `1.5px solid ${data.disponibilite === d ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: data.disponibilite === d ? 'var(--color-bg-green)' : 'white',
                    color: data.disponibilite === d ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: data.disponibilite === d ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {data.disponibilite === d ? '✓ ' : ''}{d}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navBtns}>
            <button className="btn btn-outline" onClick={() => setStep(2)}>← Retour</button>
            <button className="btn btn-primary" onClick={() => setStep(4)} disabled={!data.nom || !data.telephone || !data.adresse}>
              Voir le récapitulatif →
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Récapitulatif */}
      {step === 4 && (
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>📋 Récapitulatif</h2>
          <p className={styles.stepDesc}>Vérifiez les informations avant d&apos;envoyer votre demande</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className={styles.summaryCard}>
              <h4>🔨 Projet</h4>
              <div><strong>Type :</strong> {data.type}</div>
              {data.superficie && data.type !== 'Entretien immeuble' && <div><strong>Superficie :</strong> {data.superficie} pi²</div>}
              <div><strong>Budget :</strong> {data.budget}</div>
              <div><strong>Délai :</strong> {data.delai}</div>
              {data.travaux.length > 0 && <div><strong>Travaux :</strong> {data.travaux.join(', ')}</div>}
            </div>
            <div className={styles.summaryCard}>
              <h4>👤 Coordonnées</h4>
              <div><strong>Nom :</strong> {data.nom}</div>
              <div><strong>Tél :</strong> {data.telephone}</div>
              {data.email && <div><strong>Email :</strong> {data.email}</div>}
              <div><strong>Adresse :</strong> {data.adresse}</div>
              {data.disponibilite && <div><strong>Disponibilité :</strong> {data.disponibilite}</div>}
            </div>
          </div>

          <div className={styles.guarantee}>
            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
            <div>
              <strong>Soumission 100% gratuite et sans engagement</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                Notre équipe vous contactera dans les 24h pour planifier une visite.
              </p>
            </div>
          </div>

          <div className={styles.navBtns}>
            <button className="btn btn-outline" onClick={() => setStep(3)}>← Modifier</button>
            <button
              className="btn btn-accent btn-lg"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? '⏳ Envoi...' : '🚀 Envoyer ma demande'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
