import React, { createContext, useContext, useState } from 'react';
import { en } from './en';
import { es } from './es';

type Language = 'en' | 'es';
type Dictionary = typeof en;
export type TranslationKey = keyof Dictionary;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const dictionaries: Record<Language, Dictionary> = { en, es };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/** Resolve UI language synchronously: localStorage > browser language > 'en' */
function resolveInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('rendercv-ui-lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch {}
  return typeof navigator !== 'undefined' && navigator.language.startsWith('es') ? 'es' : 'en';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(resolveInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rendercv-ui-lang', lang);
  };

  const t = (key: TranslationKey): string => {
    return dictionaries[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
