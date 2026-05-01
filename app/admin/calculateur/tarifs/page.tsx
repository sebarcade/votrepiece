'use client';
import { useState, useEffect, useCallback } from 'react';

interface CalculatorConfig {
  tauxHoraire: { mainOeuvre: number; marcheMauricieReference: number; description: string };
  nombreEmployes: Record<string, number>;
  durees: Record<string, { min: number; max: number; unite: string }>;
  niveauxFinition: Record<string, { multiplicateur: number; label: string }>;
  avantagesConcurrentiels: Record<string, number | string>;
}

const PIECE_LABELS: Record<string, string> = {
  salleDeBain: '🛁 Salle de bain',
  cuisine: '🍳 Cuisine',
  salon: '🛋️ Salon',
  chambre: '🛏️ Chambre',
  vr: '🚐 VR',
  entretienImmeuble: '🏢 Entretien immeuble',
};

export default function AdminTarifsPage() {
  const [config, setConfig] = useState<CalculatorConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    const res = await fetch('/api/calculator/config');
    const json = await res.json();
    setConfig(json);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    await fetch('/api/calculator/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setMessage('✅ Configuration sauvegardée !');
    setTimeout(() => setMessage(''), 3000);
  };

  const update = (path: string[], value: number | string) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updated = JSON.parse(JSON.stringify(prev));
      let obj = updated;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return updated;
    });
  };

  if (loading || !config) return (
    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Chargement...</div>
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>💰 Tarifs & Salaires</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Configurez les taux horaires, nombre d&apos;employés et niveaux de finition
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {message && (
            <span style={{ color: '#065f46', fontWeight: 600, fontSize: '0.9rem', background: '#d1fae5', padding: '8px 14px', borderRadius: '8px' }}>
              {message}
            </span>
          )}
          <button className="admin-btn admin-btn-success" onClick={save} disabled={saving}>
            {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder tout'}
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Taux horaire */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>💰 Taux horaire ($/h)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>
                🏠 Votre Pièce — taux main d&apos;œuvre
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  className="admin-input"
                  type="number"
                  value={config.tauxHoraire.mainOeuvre}
                  onChange={(e) => update(['tauxHoraire', 'mainOeuvre'], parseFloat(e.target.value))}
                  style={{ width: '120px' }}
                />
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>$ / heure</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>
                🏢 Référence marché Mauricie
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  className="admin-input"
                  type="number"
                  value={config.tauxHoraire.marcheMauricieReference}
                  onChange={(e) => update(['tauxHoraire', 'marcheMauricieReference'], parseFloat(e.target.value))}
                  style={{ width: '120px' }}
                />
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>$ / heure</span>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: 'var(--color-bg-green)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: 'var(--color-primary-dark)',
          }}>
            💡 Économie affichée sur le site :{' '}
            <strong>
              {Math.round((1 - config.tauxHoraire.mainOeuvre / config.tauxHoraire.marcheMauricieReference) * 100)}%
            </strong>{' '}
            de moins que le marché
          </div>
        </div>

        {/* Nombre d'employés */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>👷 Nombre d&apos;employés par type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {Object.entries(config.nombreEmployes).map(([key, val]) => (
              <div key={key}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '6px', fontSize: '0.85rem' }}>
                  {PIECE_LABELS[key] || key}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    className="admin-input"
                    type="number"
                    min="1"
                    max="10"
                    value={val}
                    onChange={(e) => update(['nombreEmployes', key], parseInt(e.target.value))}
                    style={{ width: '80px' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>employés</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Durées */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>📅 Durées de rénovation</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type de pièce</th>
                <th>Durée minimum</th>
                <th>Durée maximum</th>
                <th>Unité</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(config.durees).map(([key, val]) => (
                <tr key={key}>
                  <td style={{ fontWeight: 500 }}>{PIECE_LABELS[key] || key}</td>
                  <td>
                    <input
                      className="admin-input"
                      type="number"
                      min="1"
                      value={val.min}
                      onChange={(e) => update(['durees', key, 'min'], parseInt(e.target.value))}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>
                    <input
                      className="admin-input"
                      type="number"
                      min="1"
                      value={val.max}
                      onChange={(e) => update(['durees', key, 'max'], parseInt(e.target.value))}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{val.unite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Niveaux de finition */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>🎨 Multiplicateurs de finition</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {Object.entries(config.niveauxFinition).map(([key, val]) => (
              <div key={key} style={{
                background: 'var(--color-bg-soft)',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
              }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem' }}>
                  {val.label}
                </label>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Multiplicateur</div>
                  <input
                    className="admin-input"
                    type="number"
                    step="0.05"
                    min="0.5"
                    max="3"
                    value={val.multiplicateur}
                    onChange={(e) => update(['niveauxFinition', key, 'multiplicateur'], parseFloat(e.target.value))}
                  />
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                }}>
                  = {Math.round(val.multiplicateur * 100)}% du prix standard
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button className="admin-btn admin-btn-success" onClick={save} disabled={saving} style={{ fontSize: '1rem', padding: '12px 24px' }}>
            {saving ? '⏳ Sauvegarde en cours...' : '💾 Sauvegarder la configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
