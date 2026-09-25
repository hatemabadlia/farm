import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router garde la position de scroll quand on change de page :
 * on arrivait au milieu de la nouvelle page. Ce composant remet en haut
 * a chaque navigation. Il n'affiche rien.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "instant" : un defilement anime entre deux pages donne le tournis,
    // et html{scroll-behavior:smooth} s'appliquerait sinon.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
