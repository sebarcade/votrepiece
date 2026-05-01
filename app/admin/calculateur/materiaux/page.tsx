'use client';
import { useState, useEffect, useCallback } from 'react';

interface Material {
  id: string;
  nom: string;
  prixUnitaire: number;
  unite: string;
  actif: boolean;
}

interface Category {
  id: string;
  nom: string;
  materiaux: Material[];
}

interface MaterialsData {
  categories: Category[];
}

export default function AdminMateriauxPage() {
  const [data, setData] = useState<MaterialsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Material>>({});
  const [newMat, setNewMat] = useState({ categorieId: '', nom: '', prixUnitaire: '', unite: 'pi²' });
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    const res = await fetch('/api/calculator/materials');
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (cat: Category, mat: Material) => {
    setEditingId(`${cat.id}-${mat.id}`);
    setEditValues({ nom: mat.nom, prixUnitaire: mat.prixUnitaire, unite: mat.unite, actif: mat.actif });
  };

  const handleSaveEdit = async (categorieId: string, materiauId: string) => {
    setSaving(true);
    await fetch('/api/calculator/materials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categorieId, materiauId, updates: editValues }),
    });
    setEditingId(null);
    await loadData();
    setSaving(false);
    showMessage('✅ Matériau mis à jour !');
  };

  const handleDelete = async (categorieId: string, materiauId: string) => {
    if (!confirm('Supprimer ce matériau ?')) return;
    setSaving(true);
    await fetch('/api/calculator/materials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categorieId, materiauId }),
    });
    await loadData();
    setSaving(false);
    showMessage('🗑️ Matériau supprimé');
  };

  const handleAddMat = async () => {
    if (!newMat.categorieId || !newMat.nom || !newMat.prixUnitaire) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    setSaving(true);
    await fetch('/api/calculator/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categorieId: newMat.categorieId,
        materiau: {
          nom: newMat.nom,
          prixUnitaire: parseFloat(newMat.prixUnitaire),
          unite: newMat.unite,
        },
      }),
    });
    setNewMat({ categorieId: '', nom: '', prixUnitaire: '', unite: 'pi²' });
    await loadData();
    setSaving(false);
    showMessage('✅ Matériau ajouté !');
  };

  if (loading) return (
    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
      Chargement...
    </div>
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>🪨 Gestion des matériaux</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Gérez les matériaux et leurs prix utilisés dans le calculateur
          </p>
        </div>
        {message && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}>
            {message}
          </div>
        )}
      </div>

      <div className="admin-content">
        {/* Ajouter un matériau */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>➕ Ajouter un matériau</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
                Catégorie
              </label>
              <select
                className="admin-input"
                value={newMat.categorieId}
                onChange={(e) => setNewMat((p) => ({ ...p, categorieId: e.target.value }))}
              >
                <option value="">-- Choisir --</option>
                {data?.categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nom}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
                Nom du matériau
              </label>
              <input
                className="admin-input"
                value={newMat.nom}
                onChange={(e) => setNewMat((p) => ({ ...p, nom: e.target.value }))}
                placeholder="ex: Céramique premium"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
                Prix unitaire ($)
              </label>
              <input
                className="admin-input"
                type="number"
                step="0.01"
                value={newMat.prixUnitaire}
                onChange={(e) => setNewMat((p) => ({ ...p, prixUnitaire: e.target.value }))}
                placeholder="4.50"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
                Unité
              </label>
              <select
                className="admin-input"
                value={newMat.unite}
                onChange={(e) => setNewMat((p) => ({ ...p, unite: e.target.value }))}
              >
                <option>pi²</option>
                <option>pied</option>
                <option>gallon</option>
                <option>unité</option>
                <option>pi linéaire</option>
                <option>sac</option>
              </select>
            </div>
            <button
              className="admin-btn admin-btn-success"
              onClick={handleAddMat}
              disabled={saving}
              style={{ whiteSpace: 'nowrap' }}
            >
              ➕ Ajouter
            </button>
          </div>
        </div>

        {/* Liste par catégorie */}
        {data?.categories.map((cat) => (
          <div key={cat.id} className="admin-card" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-primary)' }}>
              {cat.nom}
              <span style={{
                marginLeft: '10px',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                background: 'var(--color-bg-soft)',
                padding: '2px 8px',
                borderRadius: '10px',
              }}>
                {cat.materiaux.length} matériaux
              </span>
            </h3>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Matériau</th>
                  <th>Prix unitaire</th>
                  <th>Unité</th>
                  <th>Actif</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cat.materiaux.map((mat) => {
                  const isEditing = editingId === `${cat.id}-${mat.id}`;
                  return (
                    <tr key={mat.id}>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-input"
                            value={editValues.nom || ''}
                            onChange={(e) => setEditValues((p) => ({ ...p, nom: e.target.value }))}
                          />
                        ) : (
                          <span style={{ fontWeight: 500 }}>{mat.nom}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-input"
                            type="number"
                            step="0.01"
                            value={editValues.prixUnitaire || ''}
                            onChange={(e) => setEditValues((p) => ({ ...p, prixUnitaire: parseFloat(e.target.value) }))}
                            style={{ width: '100px' }}
                          />
                        ) : (
                          <strong style={{ color: 'var(--color-primary)' }}>
                            {mat.prixUnitaire.toFixed(2)} $
                          </strong>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            className="admin-input"
                            value={editValues.unite || ''}
                            onChange={(e) => setEditValues((p) => ({ ...p, unite: e.target.value }))}
                            style={{ width: '120px' }}
                          >
                            <option>pi²</option>
                            <option>pied</option>
                            <option>gallon</option>
                            <option>unité</option>
                            <option>pi linéaire</option>
                            <option>sac</option>
                          </select>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)' }}>/ {mat.unite}</span>
                        )}
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: mat.actif ? '#d1fae5' : '#fee2e2',
                          color: mat.actif ? '#065f46' : '#991b1b',
                        }}>
                          {mat.actif ? '✅ Actif' : '❌ Inactif'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {isEditing ? (
                            <>
                              <button
                                className="admin-btn admin-btn-success"
                                onClick={() => handleSaveEdit(cat.id, mat.id)}
                                disabled={saving}
                                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                              >
                                💾 Sauvegarder
                              </button>
                              <button
                                className="admin-btn admin-btn-ghost"
                                onClick={() => setEditingId(null)}
                                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                              >
                                Annuler
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="admin-btn admin-btn-primary"
                                onClick={() => handleEdit(cat, mat)}
                                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                              >
                                ✏️ Modifier
                              </button>
                              <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(cat.id, mat.id)}
                                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
