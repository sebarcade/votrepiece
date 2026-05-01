'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/salle-de-bain', label: 'Salle de bain' },
  { href: '/cuisine', label: 'Cuisine' },
  { href: '/salon', label: 'Salon' },
  { href: '/chambre', label: 'Chambre' },
  { href: '/entretien-immeuble', label: 'Entretien' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-transparent.png"
            alt="Votre Pièce"
            width={540}
            height={162}
            style={{ width: 'auto', height: '120px', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA droit */}
        <div className={styles.actions}>
          <Link href="/soumission" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            Soumission gratuite
          </Link>

          {/* Burger mobile */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open1 : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open2 : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open3 : ''}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/soumission"
          className={`btn btn-primary ${styles.mobileCta}`}
          onClick={() => setMenuOpen(false)}
        >
          Soumission gratuite
        </Link>
      </div>
    </header>
  );
}
