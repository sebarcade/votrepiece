// Composant logo SVG inline — fond 100% transparent, texte couleur via CSS
// Reproduit exactement le logo Votrepiece.ca avec cadre angulaire

interface LogoSVGProps {
  color?: string;
  height?: number;
}

export default function LogoSVG({ color = 'currentColor', height = 40 }: LogoSVGProps) {
  // Ratio de l'original : ~1536×948 → ratio ≈ 1.62
  const width = height * 1.62;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Votrepiece.ca"
      role="img"
    >
      {/* ── Texte principal ── */}
      <text
        x="18"
        y="128"
        fontFamily="'Funnel Display', 'DM Sans', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="72"
        fill={color}
        letterSpacing="-1"
      >
        Votre
      </text>
      <text
        x="18"
        y="128"
        fontFamily="'Funnel Display', 'DM Sans', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="72"
        fill={color}
        letterSpacing="-1"
      >
        {/* Ligne unique sur deux mots */}
      </text>

      {/* Cadre angulaire architectural */}
      {/* Ligne bas gauche - droite */}
      <line x1="8" y1="160" x2="292" y2="160" stroke={color} strokeWidth="2.5" />
      {/* Ligne bas gauche verticale montante */}
      <line x1="8" y1="160" x2="8" y2="45" stroke={color} strokeWidth="2.5" />
      {/* Ligne bas droite verticale montante */}
      <line x1="292" y1="160" x2="292" y2="25" stroke={color} strokeWidth="2.5" />
      {/* Ligne horizontale haut droite */}
      <line x1="180" y1="25" x2="292" y2="25" stroke={color} strokeWidth="2" />
      {/* Ligne diagonale angulaire gauche (brisure signature) */}
      <line x1="8" y1="45" x2="118" y2="20" stroke={color} strokeWidth="2" />
      {/* Second trait parallèle (signature du logo) */}
      <line x1="8" y1="53" x2="118" y2="28" stroke={color} strokeWidth="1.5" />
      {/* Second trait haut droite parallèle */}
      <line x1="180" y1="33" x2="292" y2="33" stroke={color} strokeWidth="1.5" />
      {/* Ligne basse secondaire */}
      <line x1="8" y1="168" x2="292" y2="168" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
