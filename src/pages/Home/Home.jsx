import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Home.dict';
import styles from './Home.module.css';
import farmeVideo from '../../assets/videos/farme.mp4';

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <section className={styles.hero}>
     
      <div>
        <span className={styles.badge}>{t.badge}</span>
        <h1>{t.title}</h1>
        <h2>{t.subtitle}</h2>
        <p>{t.paragraph}</p>
        <div className={styles.actions}>
          <button className={styles.primary}>{t.ctaPrimary}</button>
          <button className={styles.secondary}>{t.ctaSecondary}</button>
        </div>
      </div>

         <div className={styles.videoSide}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        >
          <source src="/src/assets/videos/farme.mp4" type="video/mp4" />
        </video>
        <h1>telfetli a hatem habit ndirou hna video ===)> </h1>
      </div>
    
    </section>
  );
}

