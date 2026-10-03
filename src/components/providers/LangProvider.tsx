'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COPY, LANG_STORAGE_KEY, tr, type Lang } from '@/lib/i18n';

type LangContextValue = {
  lang: Lang;
  /** translate one English string */
  t: (s: string) => string;
  /** per-language interface words that are not lookups (placeholders etc.) */
  c: (typeof COPY)['en'];
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Server renders EN; a saved VI choice is applied on mount (the layout
  // also pre-paints html.lang-vi from a tiny inline script).
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    try {
      if (window.localStorage.getItem(LANG_STORAGE_KEY) === 'vi') setLang('vi');
    } catch {
      /* storage blocked, stay EN */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('lang-vi', lang === 'vi');
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* storage blocked */
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'vi' : 'en')), []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, t: (s: string) => tr(lang, s), c: COPY[lang], toggle }),
    [lang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const v = useContext(LangContext);
  if (!v) throw new Error('useLang must be used inside <LangProvider>');
  return v;
}
