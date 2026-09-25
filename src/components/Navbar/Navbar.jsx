import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';
import useScrolled from '../../hooks/useScrolled';
// Import Vite : le fichier est copie et hashe au build.
import logo from '../../assets/logo/logo.png';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/modules', key: 'nav.modules' },
  { to: '/demos', key: 'nav.demos' },
  { to: '/temoignages', key: 'nav.testimonials' },
  { to: '/a-propos', key: 'nav.about' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // On referme le menu mobile quand on change de page.
  useEffect(() => setOpen(false), [pathname]);

  // Menu ouvert : on bloque le scroll de la page derriere, sinon on
  // fait defiler le contenu au lieu du menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Echap ferme le menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label={t('common.brand')}>
          <img src={logo} alt={t('common.brand')} className={styles.logo} />
        </Link>

        {/* --- Navigation bureau --- */}
        <nav className={styles.desktopNav} aria-label={t('nav.primary')}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
          {/* "Accompagnement" n'a pas encore de page : affiche desactive
              plutot que de donner un lien mort. */}
          <span className={`${styles.link} ${styles.disabled}`} aria-disabled="true">
            {t('nav.support')}
          </span>
          <NavLink to="/contact" className={linkClass}>{t('nav.contact')}</NavLink>
        </nav>

        <div className={styles.actions}>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className={styles.langSelect}
            aria-label={t('nav.langLabel')}
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>

          <Link to="/contact" className={styles.cta}>{t('nav.cta')}</Link>

          {/* --- Bouton hamburger (mobile) --- */}
          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(open ? 'nav.closeMenu' : 'nav.openMenu')}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* --- Panneau mobile --- */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}
        aria-label={t('nav.primary')}
        aria-hidden={!open}
      >
        {NAV_ITEMS.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            style={{ transitionDelay: open ? `${0.05 + i * 0.04}s` : '0s' }}
            tabIndex={open ? 0 : -1}
          >
            {t(item.key)}
          </NavLink>
        ))}
        <span className={`${styles.link} ${styles.disabled}`} aria-disabled="true">
          {t('nav.support')}
        </span>
        <NavLink to="/contact" className={linkClass} tabIndex={open ? 0 : -1}>
          {t('nav.contact')}
        </NavLink>
        <Link to="/contact" className={styles.mobileCta} tabIndex={open ? 0 : -1}>
          {t('nav.cta')}
        </Link>
      </nav>
    </header>
  );
}
