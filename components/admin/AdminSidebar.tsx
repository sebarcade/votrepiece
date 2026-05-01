'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin/dashboard', icon: '📊', label: 'Tableau de bord' },
  { href: '/admin/soumissions', icon: '📬', label: 'Soumissions' },
  { href: '/admin/textes', icon: '📝', label: 'Textes du site' },
  {
    label: 'Calculateur',
    icon: '🧮',
    children: [
      { href: '/admin/calculateur/tarifs', icon: '💰', label: 'Tarifs & Salaires' },
      { href: '/admin/calculateur/materiaux', icon: '🪨', label: 'Matériaux' },
      { href: '/admin/calculateur/durees', icon: '📅', label: 'Durées' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1.2rem',
          fontWeight: 800,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          🏠 Votre<span style={{ color: 'var(--color-primary-light)' }}>Pièce</span>
        </Link>
        <div style={{
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '4px',
          fontWeight: 500,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Administration
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {navItems.map((item) => (
          <div key={item.label}>
            {'children' in item ? (
              <div>
                <div style={{
                  padding: '10px 12px 6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '8px',
                }}>
                  {item.icon} {item.label}
                </div>
                {item.children?.map((child) => (
                  <SidebarLink key={child.href} {...child} active={pathname === child.href} indent />
                ))}
              </div>
            ) : (
              <SidebarLink {...item} href={item.href!} active={pathname === item.href} />
            )}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: '16px 12px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <a
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            marginBottom: '4px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          🌐 Voir le site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin-login' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            background: 'transparent',
            border: 'none',
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          🚪 Se déconnecter
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({
  href, icon, label, active, indent = false
}: {
  href: string; icon: string; label: string; active: boolean; indent?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: `10px ${indent ? '24px' : '12px'}`,
        borderRadius: '8px',
        fontSize: '0.88rem',
        fontWeight: active ? 600 : 400,
        color: active ? 'white' : 'rgba(255,255,255,0.55)',
        background: active ? 'rgba(45, 139, 85, 0.2)' : 'transparent',
        borderLeft: active ? '3px solid var(--color-primary-light)' : '3px solid transparent',
        marginBottom: '2px',
        transition: 'all 0.2s',
        textDecoration: 'none',
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
