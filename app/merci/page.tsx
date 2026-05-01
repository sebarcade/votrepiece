import Link from 'next/link';

export default function MerciPage() {
  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F1A13, #1a3524)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '56px 48px',
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-primary)' }}>
          Demande envoyée !
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: '1.7' }}>
          Votre demande de soumission a bien été reçue. Notre équipe vous contactera dans les prochaines{' '}
          <strong style={{ color: 'var(--color-text)' }}>24 heures</strong> pour planifier une visite gratuite.
        </p>

        <div style={{
          background: 'var(--color-bg-green)',
          border: '1px solid var(--color-border-green)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '28px',
        }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--color-primary)' }}>
            📞 Question urgente ?
          </div>
          <a href="tel:8192470449" style={{
            display: 'block',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--color-primary)',
          }}>
            (819) 247-0449
          </a>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Lun–Ven: 8h–17h | Sam: 9h–14h
          </div>
        </div>

        <Link href="/" className="btn btn-primary">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
