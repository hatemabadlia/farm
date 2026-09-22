import React, { createContext, useContext, useState } from 'react';

// Les langues disponibles sur le site.
// "fr" est la langue par defaut (contenu deja valide par le directeur).
export const LANGUAGES = ['fr', 'en', 'ar'];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Chaque composant appelle ce hook pour savoir quelle langue afficher.
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
