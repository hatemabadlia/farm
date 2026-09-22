import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Modules.dict';
import styles from './Modules.module.css';

export default function Modules() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <section className={styles.page}>
      <h1>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <div className={styles.grid}>
        {t.items.map((item) => (
          <div key={item.n} className={styles.card}>
            <span className={styles.n}>{item.n}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
