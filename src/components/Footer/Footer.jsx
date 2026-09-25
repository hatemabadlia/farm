import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/logo.png';
import styles from './Footer.module.css';

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/modules', key: 'nav.modules' },
  { to: '/demos', key: 'nav.demos' },
  { to: '/temoignages', key: 'nav.testimonials' },
  { to: '/a-propos', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link to="/" aria-label={t('common.brand')}>
            <img src={logo} alt={t('common.brand')} className={styles.logo} />
          </Link>
          <p className={styles.tagline}>{t('contact.brandTagline')}</p>
        </div>

        <nav className={styles.linksCol} aria-label={t('footer.navTitle')}>
          <h2 className={styles.colTitle}>{t('footer.navTitle')}</h2>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={styles.link}>
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className={styles.contactCol}>
          <h2 className={styles.colTitle}>{t('contact.sidebarTitle')}</h2>
          {/* mailto / tel : joignables en un clic depuis un mobile. */}
          <a className={styles.link} href={`mailto:${t('contact.contactEmail')}`}>
            {t('contact.contactEmail')}
          </a>
          <a
            className={styles.link}
            href={`tel:${t('contact.contactPhone').replace(/\s/g, '')}`}
          >
            {t('contact.contactPhone')}
          </a>
          <Link to="/contact" className={styles.footerCta}>{t('nav.cta')}</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {year} {t('common.brand')} — {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
