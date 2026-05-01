'use client';
import { useState, useEffect, useCallback } from 'react';

const PAGES = [
  { id: 'homepage.hero', label: '🏠 Page d\'accueil — Hero', path: ['homepage', 'hero'] },
  { id: 'homepage.apropos', label: '🏠 Page d\'accueil — À propos', path: ['homepage', 'apropos'] },
  { id: 'salleDeBain', label: '🛁 Salle de bain', path: ['salleDeBain'] },
  { id: 'cuisine', label: '🍳 Cuisine', path: ['cuisine'] },
  { id: 'salon', label: '🛋️ Salon', path: ['salon'] },
  { id: 'chambre', label: '🛏️ Chambre', path: ['chambre'] },
  { id: 'vr', label: '🚐 Véhicule Récréatif', path: ['vr'] },
  { id: 'entretienImmeuble', label: '🏢 Entretien immeuble', path: ['entretienImmeuble'] },
  { id: 'contact', label: '📞 Contact', path: ['contact'] },
];

export default function AdminTextesPage() {
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [selectedPage, setSelectedPage] = useState<typeof PAGES[0] | null>(null);
  const [sectionData, setSectionData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    const res = await fetch('/api/content');
    const json = await res.json();
    setContent(json);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectPage = (page: typeof PAGES[0]) => {
    setSelectedPage(page);
    let data: unknown = content;
    for (const key of page.path) {
      data = (data as Record<string, unknown>)?.[key];
    }
    setSectionData((data as Record<string, unknown>) || {});
  };

  const save = async () => {
    setSaving(true);
    // Update nested path in content
    const updated = JSON.parse(JSON.stringify(content));
    let obj = updated;
    for (let i = 0; i < (selectedPage?.path.length || 0) - 1; i++) {
      obj = obj[selectedPage!.path[i]];
    }
    obj[selectedPage!.path[selectedPage!.path.length - 1]] = sectionData;

    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setContent(updated);
    setSaving(false);
    setMessage('✅ Textes sauvegardés !');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>Chargement...</div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>📝 Gestion des textes</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Modifiez le contenu de chaque page du site
          </p>
        </div>
        {message && (
          <span style={{ color: '#065f46', fontWeight: 600, fontSize: '0.9rem', background: '#d1fae5', padding: '8px 14px', borderRadius: '8px' }}>
            {message}
          </span>
        )}
      </div>

      <div className="admin-content" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px' }}>
        {/* Page list */}
        <div className="admin-card" style={{ padding: '12px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 8px 12px' }}>
            Pages du site
          </h3>
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => selectPage(page)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: selectedPage?.id === page.id ? 'var(--color-bg-green)' : 'transparent',
                color: selectedPage?.id === page.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: selectedPage?.id === page.id ? 600 : 400,
                fontSize: '0.875rem',
                cursor: 'pointer',
                marginBottom: '2px',
                transition: 'all 0.15s',
              }}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        {selectedPage ? (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{selectedPage.label}</h2>
              <button className="admin-btn admin-btn-success" onClick={save} disabled={saving}>
                {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(sectionData).map(([key, val]) => (
                <div key={key}>
                  <label style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                    textTransform: 'capitalize',
                    marginBottom: '6px',
                  }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {typeof val === 'string' && val.length > 80 ? (
                    <textarea
                      className="admin-input"
                      value={val}
                      onChange={(e) => setSectionData((p) => ({ ...p, [key]: e.target.value }))}
                      rows={3}
                      style={{ width: '100%' }}
                    />
                  ) : typeof val === 'string' ? (
                    <input
                      className="admin-input"
                      value={val}
                      onChange={(e) => setSectionData((p) => ({ ...p, [key]: e.target.value }))}
                      style={{ width: '100%' }}
                    />
                  ) : typeof val === 'number' ? (
                    <input
                      className="admin-input"
                      type="number"
                      value={val}
                      onChange={(e) => setSectionData((p) => ({ ...p, [key]: Number(e.target.value) }))}
                      style={{ width: '150px' }}
                    />
                  ) : Array.isArray(val) ? (
                    <textarea
                      className="admin-input"
                      value={(val as string[]).join('\n')}
                      onChange={(e) => setSectionData((p) => ({ ...p, [key]: e.target.value.split('\n').filter(Boolean) }))}
                      rows={val.length + 1}
                      style={{ width: '100%' }}
                      placeholder="Un élément par ligne"
                    />
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      (objet complexe — non modifiable ici)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
              <p>Sélectionnez une page dans la liste pour modifier ses textes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
