import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useInView from '../../hooks/useInView';
import styles from './Modules.module.css';

export default function Modules() {
  const { t } = useTranslation();
  // returnObjects : "modules.items" est un tableau dans les fichiers JSON.
  // Si la cle manquait dans une langue, fallbackLng ramene le francais.
  const items = t('modules.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  // L'observer d'apparition vit maintenant dans un hook partage
  // (useInView) au lieu d'etre recopie dans chaque page.
  const [gridRef, visible] = useInView();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t('modules.eyebrow')}</span>
        <h1 className={styles.title}>{t('modules.title')}</h1>
        <p className={styles.subtitle}>{t('modules.subtitle')}</p>
      </div>

      <div
        className={`${styles.grid} ${visible ? styles.visible : ''}`}
        ref={gridRef}
      >
        {/* C'etait un <Link to={`/modules/${item.slug}`}> : ni "slug" ni la
            route /modules/:slug n'existent, donc chaque carte menait vers
            /modules/undefined. Tant que les pages de detail ne sont pas
            faites, la carte reste une carte. */}
        {list.map((item, i) => (
          <article
            key={item.n}
            className={styles.card}
            style={{ transitionDelay: visible ? `${i * 0.07}s` : '0s' }}
          >
            <span className={styles.number}>{item.n}</span>

            {/* Les icones SVG (src/assets/icons/modules/) ne sont pas encore
                fournies : on affiche l'initiale plutot que de demander une
                image inexistante a chaque rendu. */}
            <div className={styles.iconBox} aria-hidden="true">
              <span className={styles.iconFallback}>{item.title.charAt(0)}</span>
            </div>

            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardText}>{item.text}</p>
          </article>
        ))}
      </div>

      <div className={styles.footerCta}>
        <p>{t('home.ctaBandText')}</p>
        <Link to="/contact" className={styles.cta}>{t('nav.cta')}</Link>
      </div>
    </section>
  );
}
