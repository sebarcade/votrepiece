'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/public/Hero.module.css';

/* ── Types ── */
type Mode = '' | 'entretien' | 'renovation';

/* ── Hero ── */
function VRHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgPhoto}>
        <Image src="/vr-hero.png" alt="Réparation VR Shawinigan — Votre Pièce" fill priority style={{ objectFit: 'cover', objectPosition: 'center 40%' }} quality={95} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to left, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.1) 65%, transparent 100%)' }} />
      <div className={styles.badgeGuarantee}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        Garantie 24 mois
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.eyebrow}><span className={styles.eyebrowLine} />Lac-à-la-Tortue, Shawinigan</div>
          <h1 className={styles.title}>Réparations de<br /><em className={styles.titleItalic}>votre VR. Chez-moi.</em></h1>
          <p className={styles.subtitle}>Entretien, rénovation ou reconstruction complète. Nous sommes situés au <strong style={{ color: '#fff' }}>8955 rang St-Mathieu, Shawinigan, QC G0X 1L0.</strong> Vous nous apportez votre VR — ou on le récupère.</p>
          <div className={styles.ctas}>
            <a href="#vr-formulaire" className={`btn ${styles.ctaPrimary}`}>Demander une soumission</a>
            <a href="#vr-options" className={`btn ${styles.ctaSecondary}`}>Nos services</a>
          </div>
          <div className={styles.quickStats}>
            {[{ val: '10 ans', label: "D'expérience" }, { val: '2', label: 'Options logistiques' }, { val: '24 mois', label: 'Garantie' }, { val: '24h', label: 'Réponse' }].map((s, i) => (
              <div key={i} className={styles.quickStat}>
                {i > 0 && <div className={styles.statDivider} />}
                <div className={styles.statInner}><strong className={styles.statVal}>{s.val}</strong><span className={styles.statLabel}>{s.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}><span className={styles.scrollLine} /><span className={styles.scrollText}>Défiler</span></div>
    </section>
  );
}

/* ── Options logistiques ── */
function VROptions() {
  return (
    <section id="vr-options" style={{ background: '#0A0A0A', padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container">
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>Localisation</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#FFFFFF', marginBottom: '48px', lineHeight: 1.1 }}>
          Deux façons de<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>nous confier votre VR.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.07)', marginBottom: '48px' }}>
          {[
            { num: '01', titre: 'Vous nous l\'apportez', desc: 'Amenez votre véhicule récréatif directement à notre atelier au 8955 rang St-Mathieu, Lac-à-la-Tortue, Shawinigan, QC G0X 1L0. Aucuns frais de transport.', tag: 'Aucuns frais de déplacement' },
            { num: '02', titre: 'On va le chercher', desc: 'Incapable de vous déplacer ? Nous récupérons votre VR à votre domicile et le ramenons une fois les travaux terminés. Des frais de transport s\'appliquent selon la distance.', tag: 'Frais de transport applicables' },
          ].map((o) => (
            <div key={o.num} style={{ background: '#0A0A0A', padding: '40px 36px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.1)', display: 'block', marginBottom: '16px' }}>{o.num}</span>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>{o.titre}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '16px' }}>{o.desc}</p>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', display: 'block' }}>{o.tag}</span>
            </div>
          ))}
        </div>
        {/* Adresse */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Atelier</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 500 }}>8955 rang St-Mathieu, Lac-à-la-Tortue, Shawinigan, QC  G0X 1L0</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Formulaire VR intelligent ── */
function VRFormulaire() {
  const [mode, setMode] = useState<Mode>('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  /* Entretien */
  const [entretienData, setEntretienData] = useState({ nom: '', telephone: '', email: '', typeVR: '', description: '', logistique: '', disponibilite: '' });
  const updateE = (k: string, v: string) => setEntretienData((p) => ({ ...p, [k]: v }));

  /* Rénovation */
  const [renoData, setRenoData] = useState({ nom: '', telephone: '', email: '', typeVR: '', ampleur: '', budget: '', delai: '', travaux: [] as string[], description: '', logistique: '', adresse: '' });
  const updateR = (k: string, v: unknown) => setRenoData((p) => ({ ...p, [k]: v }));
  const toggleTravail = (t: string) => setRenoData((p) => ({ ...p, travaux: p.travaux.includes(t) ? p.travaux.filter((x) => x !== t) : [...p.travaux, t] }));

  const travauxOptions = ['Structure / toiture', 'Plancher intérieur', 'Plomberie', 'Électricité 12V / 120V', 'Isolation', 'Fenêtres / portes', 'Revêtements muraux', 'Mobilier / rangements', 'Salle de bain VR', 'Cuisine VR', 'Finition extérieure', 'Système de chauffage'];

  const submit = async (payload: Record<string, unknown>) => {
    setSending(true);
    await fetch('/api/soumission', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSending(false);
    setSubmitted(true);
  };

  const fieldStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '100%', outline: 'none' } as React.CSSProperties;
  const labelStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' } as React.CSSProperties;
  const chipActive = { padding: '8px 16px', border: '1px solid #fff', background: '#fff', color: '#0A0A0A', fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' } as React.CSSProperties;
  const chipInactive = { padding: '8px 16px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', cursor: 'pointer' } as React.CSSProperties;

  if (submitted) return (
    <section id="vr-formulaire" style={{ background: '#111', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>✓</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: '2rem', color: '#fff', marginBottom: '16px' }}>Demande reçue.</h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.8 }}>Notre équipe vous contactera sous 24h pour discuter de votre projet VR.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '32px', padding: '13px 28px', background: '#fff', color: '#0A0A0A', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Retour à l&apos;accueil</Link>
      </div>
    </section>
  );

  return (
    <section id="vr-formulaire" style={{ background: '#111111', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>Soumission gratuite</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#FFFFFF', marginBottom: '40px', lineHeight: 1.1 }}>Quel type de service<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>vous intéresse ?</em></h2>

        {/* Choix du mode */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '48px', background: 'rgba(255,255,255,0.07)' }}>
          {[
            { key: 'entretien', titre: 'Entretien', desc: 'Vidange, inspection, nettoyage profond, réparations mineures. Votre VR propre, sécuritaire, prêt à partir.' },
            { key: 'renovation', titre: 'Rénovation / Reconstruction', desc: 'Transformation complète de l\'intérieur, structure, plomberie, électricité, finitions — redonnez vie à votre VR.' },
          ].map((m) => (
            <button key={m.key} onClick={() => setMode(m.key as Mode)} style={{ background: mode === m.key ? '#FFFFFF' : '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', padding: '32px 28px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 400, color: mode === m.key ? '#0A0A0A' : '#FFFFFF', marginBottom: '10px' }}>{m.titre}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', color: mode === m.key ? '#444' : 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* ── ENTRETIEN ── */}
        {mode === 'entretien' && (
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '36px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: '1.6rem', color: '#fff', marginBottom: '28px' }}>Prise de rendez-vous — Entretien</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Nom complet *</label><input style={fieldStyle} value={entretienData.nom} onChange={(e) => updateE('nom', e.target.value)} placeholder="Jean Tremblay" /></div>
              <div><label style={labelStyle}>Téléphone *</label><input style={fieldStyle} value={entretienData.telephone} onChange={(e) => updateE('telephone', e.target.value)} placeholder="(819) 000-0000" /></div>
            </div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Courriel</label><input style={fieldStyle} type="email" value={entretienData.email} onChange={(e) => updateE('email', e.target.value)} placeholder="jean@exemple.com" /></div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Type de VR</label>
              <select style={fieldStyle} value={entretienData.typeVR} onChange={(e) => updateE('typeVR', e.target.value)}>
                <option value="">-- Sélectionner --</option>
                {['Motorisé classe A', 'Motorisé classe B / B+', 'Motorisé classe C', 'Cinquième roue', 'Roulotte tractée', 'Roulotte portative', 'Roulotte hybride', 'Autre'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Logistique *</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {["Je l'apporte à votre atelier", "Vous venez le chercher (frais de transport)"].map((l) => (
                  <button key={l} onClick={() => updateE('logistique', l)} style={entretienData.logistique === l ? chipActive : chipInactive}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Disponibilité pour le rendez-vous</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Semaine matin', 'Semaine après-midi', 'Fin de semaine', 'Flexible'].map((d) => (
                  <button key={d} onClick={() => updateE('disponibilite', d)} style={entretienData.disponibilite === d ? chipActive : chipInactive}>{d}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '28px' }}><label style={labelStyle}>Description / Travaux souhaités</label><textarea style={{ ...fieldStyle, resize: 'vertical' }} rows={4} value={entretienData.description} onChange={(e) => updateE('description', e.target.value)} placeholder="Décrivez l'état de votre VR et ce que vous souhaitez faire faire..." /></div>
            <button
              disabled={!entretienData.nom || !entretienData.telephone || !entretienData.logistique || sending}
              onClick={() => submit({ ...entretienData, type: 'Entretien VR', service: 'vr' })}
              style={{ background: !entretienData.nom || !entretienData.telephone || !entretienData.logistique ? 'rgba(255,255,255,0.15)' : '#FFFFFF', border: 'none', color: '#0A0A0A', padding: '14px 32px', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', opacity: sending ? 0.5 : 1 }}
            >
              {sending ? 'Envoi...' : 'Confirmer le rendez-vous'}
            </button>
          </div>
        )}

        {/* ── RÉNOVATION ── */}
        {mode === 'renovation' && (
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '36px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: '1.6rem', color: '#fff', marginBottom: '28px' }}>Soumission — Rénovation / Reconstruction VR</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Nom complet *</label><input style={fieldStyle} value={renoData.nom} onChange={(e) => updateR('nom', e.target.value)} placeholder="Jean Tremblay" /></div>
              <div><label style={labelStyle}>Téléphone *</label><input style={fieldStyle} value={renoData.telephone} onChange={(e) => updateR('telephone', e.target.value)} placeholder="(819) 000-0000" /></div>
            </div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Courriel</label><input style={fieldStyle} type="email" value={renoData.email} onChange={(e) => updateR('email', e.target.value)} placeholder="jean@exemple.com" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Type de VR</label>
                <select style={fieldStyle} value={renoData.typeVR} onChange={(e) => updateR('typeVR', e.target.value)}>
                  <option value="">-- Sélectionner --</option>
                  {['Motorisé classe A', 'Motorisé classe B / B+', 'Motorisé classe C', 'Cinquième roue', 'Roulotte tractée', 'Roulotte portative', 'Roulotte hybride', 'Autre'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Ampleur des travaux</label>
                <select style={fieldStyle} value={renoData.ampleur} onChange={(e) => updateR('ampleur', e.target.value)}>
                  <option value="">-- Sélectionner --</option>
                  {['Réparations ciblées', 'Rénovation partielle', 'Rénovation complète', 'Reconstruction totale'].map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Budget approximatif</label>
                <select style={fieldStyle} value={renoData.budget} onChange={(e) => updateR('budget', e.target.value)}>
                  <option value="">-- Sélectionner --</option>
                  {['Moins de 5 000$', '5 000$ – 15 000$', '15 000$ – 30 000$', '30 000$ – 60 000$', '60 000$ et plus', 'À déterminer'].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Délai souhaité</label>
                <select style={fieldStyle} value={renoData.delai} onChange={(e) => updateR('delai', e.target.value)}>
                  <option value="">-- Sélectionner --</option>
                  {['Le plus tôt possible', '1 à 3 mois', '3 à 6 mois', '6 mois et plus', 'Pas de contrainte'].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Travaux souhaités</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {travauxOptions.map((t) => (
                  <button key={t} onClick={() => toggleTravail(t)} style={renoData.travaux.includes(t) ? chipActive : chipInactive}>{renoData.travaux.includes(t) ? '✓ ' : ''}{t}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Logistique *</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {["Je l'apporte à votre atelier", "Vous venez le chercher (frais de transport)"].map((l) => (
                  <button key={l} onClick={() => updateR('logistique', l)} style={renoData.logistique === l ? chipActive : chipInactive}>{l}</button>
                ))}
              </div>
            </div>
            {renoData.logistique === "Vous venez le chercher (frais de transport)" && (
              <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Adresse de récupération</label><input style={fieldStyle} value={renoData.adresse} onChange={(e) => updateR('adresse', e.target.value)} placeholder="123 rue Principale, Shawinigan, QC" /></div>
            )}
            <div style={{ marginBottom: '28px' }}><label style={labelStyle}>Description du projet</label><textarea style={{ ...fieldStyle, resize: 'vertical' }} rows={4} value={renoData.description} onChange={(e) => updateR('description', e.target.value)} placeholder="Décrivez l'état actuel de votre VR et vos attentes..." /></div>
            {/* Garantie */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 22px', marginBottom: '24px', display: 'flex', gap: '14px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Soumission 100% gratuite et sans engagement</strong>
                Notre équipe vous contactera dans les 24h pour planifier une visite ou une prise en charge de votre véhicule.
              </div>
            </div>
            <button
              disabled={!renoData.nom || !renoData.telephone || !renoData.logistique || sending}
              onClick={() => submit({ ...renoData, type: 'Rénovation VR', service: 'vr' })}
              style={{ background: !renoData.nom || !renoData.telephone || !renoData.logistique ? 'rgba(255,255,255,0.15)' : '#FFFFFF', border: 'none', color: '#0A0A0A', padding: '14px 32px', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', opacity: sending ? 0.5 : 1 }}
            >
              {sending ? 'Envoi...' : 'Envoyer ma demande de soumission'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VRPage() {
  return (
    <>
      <VRHero />
      <VROptions />
      <VRFormulaire />
    </>
  );
}
