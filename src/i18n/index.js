import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

// Les langues du site. "fr" est la langue de reference :
// c'est le contenu valide par le directeur.
export const LANGUAGES = ['fr', 'en', 'ar'];

// Langues qui s'ecrivent de droite a gauche.
const RTL_LANGUAGES = ['ar'];

export const getDir = (lang) => (RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr');

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'fr',
  fallbackLng: 'fr', // une cle absente en en/ar retombe sur le francais
  supportedLngs: LANGUAGES,
  interpolation: {
    escapeValue: false, // React echappe deja les valeurs
  },
  returnEmptyString: false,
  // En dev, une cle manquante s'affiche dans la console au lieu de passer
  // inapercue (avant, on avait des "undefined" silencieux dans la page).
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: import.meta.env.DEV
    ? (lngs, ns, key) => console.warn(`[i18n] cle manquante : "${key}" (${lngs.join(', ')})`)
    : undefined,
});

export default i18n;
