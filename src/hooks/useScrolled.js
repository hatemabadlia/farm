import { useEffect, useState } from 'react';

/**
 * Vrai des que la page a defile de plus de `offset` pixels.
 * Sert a densifier la navbar (ombre + hauteur reduite) au scroll.
 */
export default function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll(); // etat correct si la page est rechargee deja defilee
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}
