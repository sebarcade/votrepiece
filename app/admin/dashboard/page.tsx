'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Soumission {
  id: string;
  nom: string;
  type: string;
  statut: string;
  dateCreation: string;
}

export default function AdminDashboard() {
  const [soumissions, setSoumissions] = useState<Soumission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/soumission').then((r) => r.json()).then((data) => {
      setSoumissions(data);
      setLoading(false);
    });
  }, []);

  const nouvelles = soumissions.filter((s) => s.statut === 'nouveau').length;
  const recentes = soumissions.slice(0, 5);

  const stats = [
    { icon: '📬', label: 'Total soumissions', value: soumissions.length, color: '#3b82f6' },
    { icon: '🔔', label: 'Nouvelles', value: nouvelles, color: '#ef4444' },
    { icon: '⏳', label: 'En cours', value: soumissions.filter((s) => s.statut === 'en_cours').length, color: '#f59e0b' },
    { icon: '✅', label: 'Complétées', value: soumissions.filter((s) => s.statut === 'complete').length, color: '#10b981' },
  ];

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Tableau de bord</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Bienvenue dans l&apos;administration de Votre Pièce
          </p>
        </div>
        <Link href="/" className="admin-btn admin-btn-success" target="_blank">
          🌐 Voir le site
        </Link>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{
              background: 'white', borderRadius: '12px', padding: '20px',
              border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{
                width: '48px', height: '48px', background: `${stat.color}15`,
                borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: stat.color }}>
                  {loading ? '—' : stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { href: '/admin/calculateur/tarifs', icon: '💰', label: 'Modifier les tarifs', desc: "Prix main d'œuvre, références marché" },
            { href: '/admin/calculateur/materiaux', icon: '🪨', label: 'Gérer les matériaux', desc: 'Ajouter, modifier, supprimer' },
            { href: '/admin/textes', icon: '📝', label: 'Modifier les textes', desc: 'Contenu de toutes les pages' },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="admin-card" style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer',
            }}>
              <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>{action.label}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{action.desc}</span>
            </Link>
          ))}
        </div>

        {/* Recent submissions */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Soumissions récentes</h2>
            <Link href="/admin/soumissions" className="admin-btn admin-btn-ghost" style={{ fontSize: '0.8rem' }}>
              Voir toutes →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)' }}>Chargement...</div>
          ) : recentes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
              Aucune soumission pour l&apos;instant
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dossier</th><th>Client</th><th>Type</th><th>Date</th><th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentes.map((s) => (
                  <tr key={s.id}>
                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>#{s.id}</code></td>
                    <td style={{ fontWeight: 500 }}>{s.nom}</td>
                    <td>{s.type}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{s.dateCreation}</td>
                    <td>
                      <span className={`status-badge ${s.statut === 'nouveau' ? 'status-new' : s.statut === 'en_cours' ? 'status-progress' : 'status-done'}`}>
                        {s.statut === 'nouveau' ? '🔔 Nouveau' : s.statut === 'en_cours' ? '⏳ En cours' : '✅ Complété'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
