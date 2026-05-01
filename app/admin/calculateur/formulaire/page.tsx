'use client';
import { useState, useEffect, useCallback } from 'react';

interface Piece {
  id: string;
  label: string;
  basePrice: number;
  prixM2: number;
  actif: boolean;
}

interface CalcData {
  pieces: Piece[];
  travaux: Record<string, string[]>;
  niveauxFinition: Record<string, { multiplicateur: number; label: string; description: string }>;
}

export default function AdminFormulaireePage() {
  const [data, setData] = useState<CalcData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'pieces' | 'travaux' | 'finitions'>('pieces');
  const [activePiece, setActivePiece] = useState<string>('salleDeBain');

  /* ── nouveaux éléments ── */
  const [newTravail, setNewTravail] = useState('');
  const [newPiece, setNewPiece] = useState({ id: '', label: '', basePrice: 0, prixM2: 0 });

  const load = useCallback(async () => {
    const res = await fetch('/api/calculator/config');
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const notify = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000); };

  const save = async (payload: CalcData) => {
    setSaving(true);
    await fetch('/api/calculator/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    notify('Sauvegardé !');
  };

  /* ── Travaux ── */
  const addTravail = () => {
    if (!newTravail.trim() || !data) return;
    const updated = { ...data };
    updated.travaux[activePiece] = [...(updated.travaux[activePiece] || []), newTravail.trim()];
    setData(updated);
    setNewTravail('');
    save(updated);
  };

  const removeTravail = (piece: string, index: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.travaux[piece] = updated.travaux[piece].filter((_, i) => i !== index);
    setData(updated);
    save(updated);
  };

  const editTravail = (piece: string, index: number, value: string) => {
    if (!data) return;
    const updated = { ...data };
    updated.travaux[piece][index] = value;
    setData(updated);
  };

  /* ── Pièces ── */
  const updatePiece = (id: string, field: keyof Piece, value: string | number | boolean) => {
    if (!data) return;
    const updated = { ...data };
    const piece = updated.pieces.find((p) => p.id === id);
    if (piece) (piece as Record<string, unknown>)[field] = value;
    setData(updated);
  };

  const addPiece = () => {
    if (!newPiece.id || !newPiece.label || !data) return;
    const updated = { ...data };
    updated.pieces.push({ ...newPiece, actif: true });
    updated.travaux[newPiece.id] = [];
    setData(updated);
    setNewPiece({ id: '', label: '', basePrice: 0, prixM2: 0 });
    save(updated);
  };

  const togglePiece = (id: string, actif: boolean) => {
    updatePiece(id, 'actif', actif);
    if (data) save({ ...data, pieces: data.pieces.map((p) => p.id === id ? { ...p, actif } : p) });
  };

  /* ── Finitions ── */
  const updateFinition = (key: string, field: string, value: string | number) => {
    if (!data) return;
    const updated = { ...data };
    (updated.niveauxFinition[key] as Record<string, unknown>)[field] = value;
    setData(updated);
  };

  if (loading || !data) return <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Chargement...</div>;

  const tabStyle = (tab: string): React.CSSProperties => ({
    padding: '10px 20px',
    border: 'none',
    background: activeTab === tab ? '#0A0A0A' : 'transparent',
    color: activeTab === tab ? '#fff' : '#555',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    borderBottom: activeTab === tab ? '2px solid #0A0A0A' : '2px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Formulaire du calculateur</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Gérez les pièces, travaux et niveaux de finition affichés dans le calculateur public
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {message && (
            <span style={{ background: '#d1fae5', color: '#065f46', padding: '8px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>
              {message}
            </span>
          )}
          <button className="admin-btn admin-btn-success" onClick={() => save(data)} disabled={saving}>
            {saving ? 'Sauvegarde...' : 'Sauvegarder tout'}
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Onglets */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '24px', gap: '4px' }}>
          {(['pieces', 'travaux', 'finitions'] as const).map((tab) => (
            <button key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
              {tab === 'pieces' ? 'Types de pièces' : tab === 'travaux' ? 'Travaux disponibles' : 'Niveaux de finition'}
            </button>
          ))}
        </div>

        {/* ───── ONGLET PIÈCES ───── */}
        {activeTab === 'pieces' && (
          <>
            <div className="admin-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Ajouter une pièce</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#888' }}>ID (unique, sans espace)</label>
                  <input className="admin-input" value={newPiece.id} onChange={(e) => setNewPiece((p) => ({ ...p, id: e.target.value.replace(/\s/g, '') }))} placeholder="ex: bureau" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#888' }}>Nom affiché</label>
                  <input className="admin-input" value={newPiece.label} onChange={(e) => setNewPiece((p) => ({ ...p, label: e.target.value }))} placeholder="ex: Bureau" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#888' }}>Prix de base ($)</label>
                  <input className="admin-input" type="number" value={newPiece.basePrice} onChange={(e) => setNewPiece((p) => ({ ...p, basePrice: +e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#888' }}>Prix/pi² ($)</label>
                  <input className="admin-input" type="number" value={newPiece.prixM2} onChange={(e) => setNewPiece((p) => ({ ...p, prixM2: +e.target.value }))} />
                </div>
                <button className="admin-btn admin-btn-success" onClick={addPiece}>Ajouter</button>
              </div>
            </div>

            <div className="admin-card">
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Pièces du calculateur</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>ID</th>
                    <th>Prix de base ($)</th>
                    <th>Prix/pi² ($)</th>
                    <th>Visible</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pieces.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <input className="admin-input" value={p.label} onChange={(e) => updatePiece(p.id, 'label', e.target.value)} style={{ width: '140px' }} />
                      </td>
                      <td><code style={{ fontSize: '0.8rem', color: '#888' }}>{p.id}</code></td>
                      <td>
                        <input className="admin-input" type="number" value={p.basePrice} onChange={(e) => updatePiece(p.id, 'basePrice', +e.target.value)} style={{ width: '110px' }} />
                      </td>
                      <td>
                        <input className="admin-input" type="number" value={p.prixM2} onChange={(e) => updatePiece(p.id, 'prixM2', +e.target.value)} style={{ width: '100px' }} />
                      </td>
                      <td>
                        <button
                          style={{ padding: '4px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', background: p.actif ? '#d1fae5' : '#fee2e2', color: p.actif ? '#065f46' : '#991b1b' }}
                          onClick={() => togglePiece(p.id, !p.actif)}
                        >
                          {p.actif ? 'Visible' : 'Masqué'}
                        </button>
                      </td>
                      <td>
                        <button className="admin-btn admin-btn-success" style={{ fontSize: '0.78rem', padding: '6px 12px' }} onClick={() => save(data)}>
                          Enregistrer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ───── ONGLET TRAVAUX ───── */}
        {activeTab === 'travaux' && (
          <>
            {/* Sélecteur de pièce */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {data.pieces.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePiece(p.id)}
                  style={{
                    padding: '8px 18px', border: '1px solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', borderRadius: '4px',
                    background: activePiece === p.id ? '#0A0A0A' : '#fff',
                    color: activePiece === p.id ? '#fff' : '#0A0A0A',
                    borderColor: activePiece === p.id ? '#0A0A0A' : '#e5e7eb',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="admin-card">
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
                Travaux — {data.pieces.find((p) => p.id === activePiece)?.label}
              </h2>

              {/* Ajouter un travail */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  className="admin-input"
                  value={newTravail}
                  onChange={(e) => setNewTravail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTravail()}
                  placeholder="ex: Isolation phonique"
                  style={{ flex: 1 }}
                />
                <button className="admin-btn admin-btn-success" onClick={addTravail}>Ajouter</button>
              </div>

              {/* Liste des travaux */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(data.travaux[activePiece] || []).map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                    <span style={{ color: '#ccc', fontWeight: 700, minWidth: '24px', fontSize: '0.85rem' }}>{String(i + 1).padStart(2, '0')}</span>
                    <input
                      className="admin-input"
                      value={t}
                      onChange={(e) => editTravail(activePiece, i, e.target.value)}
                      onBlur={() => save(data)}
                      style={{ flex: 1, border: 'none', background: 'transparent', padding: '4px 0' }}
                    />
                    <button
                      onClick={() => removeTravail(activePiece, i)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', padding: '4px 8px' }}
                      title="Supprimer"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {(data.travaux[activePiece] || []).length === 0 && (
                  <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                    Aucun travail. Ajoutez-en un ci-dessus.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* ───── ONGLET FINITIONS ───── */}
        {activeTab === 'finitions' && (
          <div className="admin-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Niveaux de finition</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '16px' }}>
              {Object.entries(data.niveauxFinition).map(([key, val]) => (
                <div key={key} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '14px', fontSize: '0.95rem' }}>{val.label}</div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.78rem', color: '#888', display: 'block', marginBottom: '4px' }}>Nom affiché</label>
                    <input className="admin-input" value={val.label} onChange={(e) => updateFinition(key, 'label', e.target.value)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.78rem', color: '#888', display: 'block', marginBottom: '4px' }}>Description</label>
                    <input className="admin-input" value={val.description} onChange={(e) => updateFinition(key, 'description', e.target.value)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.78rem', color: '#888', display: 'block', marginBottom: '4px' }}>Multiplicateur de prix</label>
                    <input className="admin-input" type="number" step="0.05" min="0.5" max="3" value={val.multiplicateur}
                      onChange={(e) => updateFinition(key, 'multiplicateur', parseFloat(e.target.value))} style={{ width: '120px' }} />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600 }}>
                    = {Math.round(val.multiplicateur * 100)}% du prix de base
                  </div>
                  <button className="admin-btn admin-btn-success" style={{ marginTop: '12px', width: '100%', fontSize: '0.82rem' }} onClick={() => save(data)}>
                    Enregistrer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
