'use client';
import { useState, useEffect, useCallback } from 'react';

interface Soumission {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  type: string;
  budget: string;
  delai: string;
  adresse: string;
  description: string;
  travaux: string[];
  disponibilite: string;
  superficie?: number;
  statut: string;
  dateCreation: string;
}

export default function AdminSoumissionsPage() {
  const [soumissions, setSoumissions] = useState<Soumission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Soumission | null>(null);
  const [filter, setFilter] = useState('tous');

  const load = useCallback(async () => {
    const res = await fetch('/api/soumission');
    const data = await res.json();
    setSoumissions(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === 'tous' ? soumissions : soumissions.filter((s) => s.statut === filter);

  const statusLabel: Record<string, string> = {
    nouveau: '🔔 Nouveau',
    en_cours: '⏳ En cours',
    complete: '✅ Complété',
  };

  const statusClass: Record<string, string> = {
    nouveau: 'status-new',
    en_cours: 'status-progress',
    complete: 'status-done',
  };

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>Chargement...</div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>📬 Soumissions reçues</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            {soumissions.length} demande{soumissions.length !== 1 ? 's' : ''} au total
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['tous', 'nouveau', 'en_cours', 'complete'].map((f) => (
            <button
              key={f}
              className={`admin-btn ${filter === f ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
              onClick={() => setFilter(f)}
              style={{ fontSize: '0.8rem' }}
            >
              {f === 'tous' ? 'Toutes' : statusLabel[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-content" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              Aucune soumission dans cette catégorie
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dossier</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Budget</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    style={{ cursor: 'pointer', background: selected?.id === s.id ? 'var(--color-bg-green)' : undefined }}
                    onClick={() => setSelected(s)}
                  >
                    <td>
                      <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                        #{s.id}
                      </code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{s.nom}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.telephone}</div>
                    </td>
                    <td>{s.type}</td>
                    <td style={{ fontSize: '0.85rem' }}>{s.budget}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{s.dateCreation}</td>
                    <td>
                      <span className={`status-badge ${statusClass[s.statut] || 'status-new'}`}>
                        {statusLabel[s.statut] || s.statut}
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn admin-btn-ghost"
                        onClick={(e) => { e.stopPropagation(); setSelected(s); }}
                        style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                      >
                        Voir →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="admin-card" style={{ position: 'sticky', top: '80px', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Dossier #{selected.id}</h3>
              <button className="admin-btn admin-btn-ghost" onClick={() => setSelected(null)} style={{ padding: '4px 10px', fontSize: '0.8rem' }}>✕</button>
            </div>
            <span className={`status-badge ${statusClass[selected.statut] || 'status-new'}`} style={{ marginBottom: '16px', display: 'inline-block' }}>
              {statusLabel[selected.statut]}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ background: 'var(--color-bg-soft)', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--color-primary)' }}>👤 Client</strong>
                <div>{selected.nom}</div>
                <div><a href={`tel:${selected.telephone}`} style={{ color: 'var(--color-primary)' }}>{selected.telephone}</a></div>
                {selected.email && <div><a href={`mailto:${selected.email}`} style={{ color: 'var(--color-primary)' }}>{selected.email}</a></div>}
                <div style={{ color: 'var(--color-text-muted)' }}>{selected.adresse}</div>
              </div>

              <div style={{ background: 'var(--color-bg-soft)', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--color-primary)' }}>🔨 Projet</strong>
                <div><strong>Type :</strong> {selected.type}</div>
                {selected.superficie && <div><strong>Surface :</strong> {selected.superficie} pi²</div>}
                <div><strong>Budget :</strong> {selected.budget}</div>
                <div><strong>Délai :</strong> {selected.delai}</div>
                {selected.travaux?.length > 0 && (
                  <div><strong>Travaux :</strong> {selected.travaux.join(', ')}</div>
                )}
                {selected.description && (
                  <div style={{ marginTop: '8px', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                    &ldquo;{selected.description}&rdquo;
                  </div>
                )}
              </div>

              {selected.disponibilite && (
                <div><strong>Disponibilité :</strong> {selected.disponibilite}</div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <a href={`tel:${selected.telephone}`} className="admin-btn admin-btn-success" style={{ flex: 1, textAlign: 'center', display: 'block' }}>
                  📞 Appeler
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-primary" style={{ flex: 1, textAlign: 'center', display: 'block' }}>
                    ✉️ Email
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
