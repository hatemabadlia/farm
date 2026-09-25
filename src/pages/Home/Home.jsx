import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useInView from '../../hooks/useInView';
import styles from './Home.module.css';
// La video est importee (et non referencee en dur) pour que Vite la
// copie et la hashe au build.
import farmeVideo from '../../assets/videos/farme.mp4';

export default function Home() {
  const { t } = useTranslation();

  // Les modules sont deja traduits : on en montre un apercu ici plutot
  // que de laisser la page d'accueil se terminer apres le hero.
  const items = t('modules.items', { returnObjects: true });
  const preview = Array.isArray(items) ? items.slice(0, 3) : [];

  const [previewRef, previewVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('home.badge')}</span>
          <h1 className={styles.title}>{t('home.title')}</h1>
          <p className={styles.subtitle}>{t('home.subtitle')}</p>
          <p className={styles.paragraph}>{t('home.paragraph')}</p>

          <div className={styles.actions}>
            <Link to="/contact" className={styles.primary}>{t('home.ctaPrimary')}</Link>
            <Link to="/modules" className={styles.secondary}>{t('home.ctaSecondary')}</Link>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.videoFrame}>
            <video autoPlay loop muted playsInline preload="metadata" className={styles.video}>
              <source src={farmeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ---------- Apercu des modules ---------- */}
      <section
        className={`${styles.preview} fcs-reveal`}
        ref={previewRef}
        data-visible={previewVisible}
      >
        <div className={styles.previewHeader}>
          <span className={styles.eyebrow}>{t('modules.eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('modules.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('modules.subtitle')}</p>
        </div>

        <div className={styles.previewGrid}>
          {preview.map((item, i) => (
            <article
              key={item.n}
              className={styles.previewCard}
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <span className={styles.cardNumber}>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <Link to="/modules" className={styles.previewLink}>
          {t('home.seeAllModules')} <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ---------- Bandeau d'appel a l'action ---------- */}
      <section className={`${styles.ctaBand} fcs-reveal`} ref={ctaRef} data-visible={ctaVisible}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>{t('home.ctaBandTitle')}</h2>
          <p className={styles.ctaText}>{t('home.ctaBandText')}</p>
          <Link to="/contact" className={styles.ctaButton}>{t('home.ctaPrimary')}</Link>
        </div>
      </section>
    </>
  );
}
