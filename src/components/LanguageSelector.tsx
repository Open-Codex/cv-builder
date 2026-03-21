import React from 'react';
import { useTranslation } from '../i18n';

/**
 * LanguageSelector — shows the CURRENT language + flag.
 * Click to toggle to the other language.
 * EN mode → shows "🇬🇧 EN", click to switch to Spanish.
 * ES mode → shows "🇪🇸 ES", click to switch to English.
 */
export const LanguageSelector: React.FC<{ onChange?: (newLang: string) => void }> = ({ onChange }) => {
  const { language, setLanguage } = useTranslation();

  const handleToggle = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    if (onChange) {
      onChange(newLang === 'en' ? 'english' : 'spanish');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-[5px] px-[8px] py-[5px] text-[12.5px] rounded bg-[#1e1e1e] hover:bg-[#404040] border border-[#404040] transition-colors whitespace-nowrap"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
      data-testid="language-toggle"
    >
      <span className="text-[15px] leading-none">{language === 'en' ? '🇬🇧' : '🇪🇸'}</span>
      <span className="font-medium text-gray-300" data-testid="language-label">{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};
