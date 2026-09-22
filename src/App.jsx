import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Navbar est ici, EN DEHORS de <AppRoutes /> :
            il reste affiche tout le temps. Seul le contenu
            de la page change quand on navigue. */}
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
