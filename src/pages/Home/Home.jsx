import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Home.dict';
import styles from './Home.module.css';

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <section className={styles.hero}>
      <span className={styles.badge}>{t.badge}</span>
      <h1>{t.title}</h1>
      <h2>{t.subtitle}</h2>
      <p>{t.paragraph}</p>
      <div className={styles.actions}>
        <button className={styles.primary}>{t.ctaPrimary}</button>
        <button className={styles.secondary}>{t.ctaSecondary}</button>
      </div>
    </section>
  );
}
