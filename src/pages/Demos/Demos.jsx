import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Demos.dict';

export default function Demos() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <section style={{ padding: '60px 48px' }}>
      <h1>{t.title}</h1>
      <p>Cette page sera construite a l'etape suivante.</p>
    </section>
  );
}
