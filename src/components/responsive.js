import { useEffect, useState } from 'react';

/*
 * Responsive helpers. matchMedia-based so every component can swap inline
 * styles per breakpoint (mobile ≤640px, tablet 641–1024px, desktop >1024px).
 * SSR-safe (renders the desktop default) and listens for live changes
 * (rotation, window resize), with the old addListener API as fallback.
 */
export function useMedia(query, defaultValue = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return defaultValue;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    mq.addListener(onChange); // Safari < 14
    return () => mq.removeListener(onChange);
  }, [query]);
  return matches;
}

export function useResponsive() {
  const isMobile = useMedia('(max-width: 640px)');
  const isTablet = useMedia('(min-width: 640.02px) and (max-width: 1024px)');
  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
}
