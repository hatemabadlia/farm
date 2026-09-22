import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import dict from './Navbar.dict';
import styles from './Navbar.module.css';

export default function Navbar() {
  // 1) on recupere la langue actuelle depuis le context
  const { lang, setLang } = useLanguage();

  // 2) on prend le dictionnaire correspondant a cette langue
  const t = dict[lang];

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        {/* logo reel : src/assets/logo/fcs-primary.svg */}
        <img
          src="/src/assets/logo/logo.png"
          alt="Farm Control System"
          className={styles.logo}
        />
      </div>

      <nav className={styles.links}>
        <Link to="/">{t.home}</Link>
        <Link to="/modules">{t.modules}</Link>
        <Link to="/demos">{t.demos}</Link>
        <Link to="/temoignages">{t.testimonials}</Link>
        <Link to="/a-propos">{t.about} ▾</Link>
        {/* TODO: "Accompagnement" est un sous-menu (dropdown) sur le vrai site,
            on le gardera simple pour l'instant et on l'ameliorera plus tard */}
        <a href="#">{t.support} ▾</a>
        <Link to="/contact">{t.contact}</Link>
      </nav>

      <div className={styles.right}>
        {/* selecteur de langue : change juste "lang" dans le context,
            tous les composants qui utilisent useLanguage() se mettent
            a jour automatiquement, sans recharger la page */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className={styles.langSelect}
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>

        <button className={styles.cta}>{t.cta}</button>
      </div>
    </header>
  );
}
