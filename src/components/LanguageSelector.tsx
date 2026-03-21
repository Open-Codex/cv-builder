import React from 'react';
import { useTranslation } from '../i18n';

/**
 * LanguageSelector — shows THE OTHER language + flag (the one you'll switch TO).
 * Per user requirement: if UI is in EN, show "🇪🇸 ES" (click to switch to Spanish).
 */
export const LanguageSelector: React.FC<{ onChange?: (newLang: string) => void }> = ({ onChange }) => {
  const { language, setLanguage } = useTranslation();

  const handleToggle = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    if (onChange) {
      // themeLang expects 'english' or 'spanish'
      onChange(newLang === 'en' ? 'english' : 'spanish');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-[5px] px-[8px] py-[5px] text-[12.5px] rounded bg-[#1e1e1e] hover:bg-[#404040] border border-[#404040] transition-colors whitespace-nowrap"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <span className="text-[15px] leading-none">{language === 'en' ? '🇪🇸' : '🇬🇧'}</span>
      <span className="font-medium text-gray-300">{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};
