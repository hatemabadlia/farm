import { useEffect, useRef, useState } from 'react';

/**
 * Detecte quand un element entre dans l'ecran, pour declencher une
 * animation d'apparition.
 *
 *   const [ref, visible] = useInView();
 *   <div ref={ref} className="fcs-reveal" data-visible={visible} />
 *
 * L'observer se debranche des que l'element est vu : l'animation ne
 * rejoue pas a chaque scroll.
 */
export default function useInView({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si le navigateur ne connait pas IntersectionObserver,
    // on affiche le contenu directement.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
