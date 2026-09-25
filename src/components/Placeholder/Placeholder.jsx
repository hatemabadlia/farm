import React from 'react';
import styles from './Placeholder.module.css';

/**
 * Bloc centre utilise par les pages dont le contenu n'est pas encore
 * valide (About, Demos, Temoignages) et par la page 404.
 * Les quatre pages recopiaient le meme pave de styles inline.
 */
export default function Placeholder({ eyebrow, title, text, children }) {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {text && <p className={styles.text}>{text}</p>}
        {children}
      </div>
    </section>
  );
}
