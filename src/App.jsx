import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import { getDir } from './i18n';

export default function App() {
  const { i18n } = useTranslation();
  const dir = getDir(i18n.language);

  // On reporte la langue courante sur <html> : ca corrige le sens de
  // lecture en arabe, la coupure des mots et ce que lisent les
  // lecteurs d'ecran.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = dir;
  }, [i18n.language, dir]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Navbar et Footer sont EN DEHORS de <AppRoutes /> : ils restent
          affiches tout le temps, seul le contenu central change. */}
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
