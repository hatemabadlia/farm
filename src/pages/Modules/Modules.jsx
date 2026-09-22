import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Modules.dict';
import styles from './Modules.module.css';

export default function Modules() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const items = t.items.length ? t.items : dict.fr.items;

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Modules</span>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
        {items.map((item) => (
          <Link key={item.slug} to={`/modules/${item.slug}`} className={styles.card}>
            <span className={styles.number}>{item.n}</span>

            <div className={styles.iconBox}>
              {/* Icone reelle attendue : src/assets/icons/modules/{item.icon}.svg
                  Tant qu'elle n'existe pas, on affiche un rond avec l'initiale
                  au lieu d'une image cassee. */}
              <img
                src={`/src/assets/icons/modules/${item.icon}.svg`}
                alt=""
                className={styles.icon}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <span className={styles.iconFallback}>{item.title.charAt(0)}</span>
            </div>

            <h3>{item.title}</h3>
            <p>{item.text}</p>

            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
