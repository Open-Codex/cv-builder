import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { SizesDropdown } from './SizesDropdown';
import { AboutPanel } from './AboutPanel';
import { useTranslation } from '../i18n';
import { themeDisplayNames } from '../engine/themeRegistry';
import type { ThemeDefaults } from './SizesDropdown';

interface ToolbarProps {
  theme: string;
  setTheme: (theme: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  themeLang: string;
  setThemeLang: (lang: string) => void;
  fontSizes: Record<string, string>;
  spacing: Record<string, string>;
  themeDefaults: ThemeDefaults | null;
  onFontSizesChange: (sizes: Record<string, string>) => void;
  onSpacingChange: (spacing: Record<string, string>) => void;
  onResetSizes: () => void;
  onReset: () => void;
  onLoadShowcase: () => void;
  onLoadYaml: (content: string) => void;
  onDownloadYaml: () => void;
  onDownloadPdf: () => void;
  isMobile?: boolean;
  isShowcase?: boolean;
  hintState?: 'none' | 'minor' | 'major' | 'reset';
  error?: string | null;
  onStyleMenuOpenChange?: (isOpen: boolean) => void;
  fontFamily: string;
  onFontFamilyChange: (family: string) => void;
  availableFonts: string[];
}

// Reset dropdown with "Plantilla vacía" and "Demo CV" options
const ResetDropdown: React.FC<{ onReset: () => void; onLoadShowcase: () => void }> = ({ onReset, onLoadShowcase }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[5px] text-[12.5px] px-[8px] py-[5px] bg-[#1e1e1e] border border-[#404040] hover:bg-[#404040] rounded transition-colors whitespace-nowrap text-amber-500 hover:text-amber-400"
      >
        <svg className={`w-[13px] h-[13px] transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Reset
      </button>
      <div className={`absolute top-full right-0 mt-[4px] w-[160px] bg-[#2d2d2d] border border-[#404040] rounded-lg shadow-xl z-50 py-[4px] transition-all duration-100 origin-top ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <button
          onClick={() => { onReset(); setOpen(false); }}
          className="w-full text-left px-[12px] py-[6px] text-[12.5px] text-gray-300 hover:bg-[#404040] transition-colors"
        >
          {t('toolbar.reset_empty')}
        </button>
        <button
          onClick={() => { onLoadShowcase(); setOpen(false); }}
          className="w-full text-left px-[12px] py-[6px] text-[12.5px] text-gray-300 hover:bg-[#404040] transition-colors"
        >
          {t('toolbar.reset_demo')}
        </button>
      </div>
    </div>
  );
};

const THEMES = ['mart', 'moderncv'];

export const Toolbar: React.FC<ToolbarProps> = ({
  theme, setTheme,
  accentColor, setAccentColor,
  themeLang, setThemeLang,
  fontSizes, spacing, themeDefaults,
  onFontSizesChange, onSpacingChange, onResetSizes,
  onReset, onLoadShowcase, onLoadYaml, onDownloadYaml, onDownloadPdf,
  isMobile = false,
  isShowcase = false,
  hintState = 'none',
  error = null,
  onStyleMenuOpenChange,
  fontFamily, onFontFamilyChange, availableFonts,
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showFullError, setShowFullError] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);
  const aboutCloseRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showFullError) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (errorRef.current && !errorRef.current.contains(e.target as Node)) {
        setShowFullError(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFullError]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onLoadYaml(content);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Branding text: red when error, green when major/reset, orange otherwise
  let brandingText = t('branding.tagline');
  let brandingColor = '#CE9178';
  if (error) {
    brandingText = error;
    brandingColor = '#ef4444'; // red-500
  } else if (hintState === 'minor') {
    brandingText = t('hint.dislike');
    brandingColor = '#CE9178';
  } else if (hintState === 'major' || hintState === 'reset') {
    brandingText = t('hint.reset');
    brandingColor = '#6A9955'; // green string
  }

  const primaryControls = (
    <>
      {/* Theme selector */}
      <div className="flex items-center gap-[5px] bg-[#1e1e1e] px-[8px] py-[5px] rounded border border-[#404040] w-full lg:w-auto">
        <label htmlFor="theme-select" className="text-[12.5px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{t('toolbar.theme')}:</label>
        <select
          id="theme-select"
          name="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-transparent text-[12.5px] text-gray-200 outline-none cursor-pointer flex-1 min-w-0"
        >
          {THEMES.map(t => (
            <option key={t} value={t} className="bg-[#1e1e1e] text-[12.5px]">{themeDisplayNames[t] || t}</option>
          ))}
        </select>
      </div>

      {/* Estilo — contains Color + full style panel */}
      <SizesDropdown
        fontSizes={fontSizes}
        spacing={spacing}
        themeDefaults={themeDefaults}
        onFontSizesChange={onFontSizesChange}
        onSpacingChange={onSpacingChange}
        onReset={onResetSizes}
        accentColor={accentColor}
        onAccentColorChange={setAccentColor}
        onOpenChange={onStyleMenuOpenChange}
        fontFamily={fontFamily}
        onFontFamilyChange={onFontFamilyChange}
        availableFonts={availableFonts}
      />

    </>
  );

  const actionControls = (
    <>
      <input type="file" accept=".yaml,.yml" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-[5px] text-[12.5px] px-[8px] py-[5px] bg-[#1e1e1e] border border-[#404040] hover:bg-[#404040] rounded transition-colors whitespace-nowrap"
      >
        <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        YAML
      </button>

      <button onClick={onDownloadYaml} className="flex items-center gap-[5px] text-[12.5px] px-[8px] py-[5px] bg-[#1e1e1e] border border-[#404040] hover:bg-[#404040] rounded transition-colors whitespace-nowrap">
        <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {t('toolbar.download_yaml')}
      </button>

      <ResetDropdown onReset={onReset} onLoadShowcase={onLoadShowcase} />

      <button
        onClick={onDownloadPdf}
        className="flex items-center gap-[5px] text-[12.5px] px-[10px] py-[5px] rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap font-medium shadow-sm"
      >
        <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {t('toolbar.download_pdf')}
      </button>
    </>
  );

  return (
    <div className="relative z-50 min-h-[45px] bg-[#2d2d2d] flex flex-wrap items-center px-[10px] py-[3px] border-b border-[#404040] text-gray-300 shrink-0 gap-[8px]">
      {/* Branding box — orange tagline when default, green reset hint when modified */}
      <div className="bg-[#1a1a2e] rounded px-[10px] py-[3px] max-w-[275px] min-w-[200px] shrink-0 hidden sm:block relative" data-testid="branding-box" ref={errorRef}>
        {error ? (
          <div className="flex items-center justify-between gap-1 overflow-hidden">
             <p className="text-[11.25px] leading-tight truncate" style={{ color: brandingColor }}>{brandingText}</p>
             <button onClick={() => setShowFullError(!showFullError)} className="text-[11.25px] text-[#ef4444] hover:text-red-400 underline whitespace-nowrap shrink-0">
               {t('error.see_more')}
             </button>
             <div className={`absolute top-full left-0 mt-[5px] w-[300px] bg-[#1a1a2e] border border-[#ef4444] p-[10px] rounded shadow-lg z-50 transition-all duration-100 origin-top ${showFullError ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                   <p className="text-[12.5px] text-[#ef4444] font-mono whitespace-pre-wrap break-all">{error}</p>
                   <div className="flex justify-end mt-[5px]">
                     <button onClick={() => setShowFullError(false)} className="text-[11.25px] text-gray-400 hover:text-white underline">
                       {t('error.hide')}
                     </button>
                   </div>
                </div>
          </div>
        ) : (
           <p className="text-[11.25px] leading-tight" style={{ color: brandingColor }}>
             {brandingText.includes('—') ? (
               <><strong>{brandingText.split('—')[0].trim()}</strong> — {brandingText.split('—').slice(1).join('—').trim().split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</>
             ) : brandingText}
           </p>
        )}
      </div>

      {/* UI Language toggle (also toggles CV lang) */}
      <LanguageSelector onChange={setThemeLang} />

      {/* Primary controls */}
      <div className="hidden lg:contents">
        {primaryControls}
      </div>

      {/* "What is YaCV?" — hover tooltip, screen-centered, wide screens only */}
      <div className="hidden xl:block absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 5 }}>
        <div
          className="relative pointer-events-auto"
          onMouseEnter={() => { if (aboutCloseRef.current) clearTimeout(aboutCloseRef.current); setShowAbout(true); }}
          onMouseLeave={() => { aboutCloseRef.current = setTimeout(() => setShowAbout(false), 200); }}
        >
          <button className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors duration-150 cursor-default">
            {t('about.button')}
          </button>
          <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-[6px] w-[360px] max-h-[80vh] overflow-y-auto bg-[#1a1a2e] border border-[#404040] p-[14px] rounded shadow-lg z-50 transition-all duration-150 origin-top ${showAbout ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <AboutPanel />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-w-0" />

      {/* Action controls */}
      <div className="hidden lg:flex items-center gap-2.5 shrink-0">
        {actionControls}
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden flex items-center gap-[8px] ml-auto shrink-0">
        <button
          onClick={onDownloadPdf}
          className="flex items-center justify-center w-[35px] h-[35px] rounded bg-blue-600 text-white"
          title={t('toolbar.download_pdf')}
        >
          <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-[35px] h-[35px] flex flex-col justify-center items-center bg-[#1e1e1e] rounded border border-[#404040] text-white"
        >
          <span className="w-[17.5px] h-[2.5px] bg-current mb-[2.5px]"></span>
          <span className="w-[17.5px] h-[2.5px] bg-current mb-[2.5px]"></span>
          <span className="w-[17.5px] h-[2.5px] bg-current"></span>
        </button>

        <>
          <div className={`fixed inset-0 z-40 transition-opacity duration-100 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />
          <div className={`absolute top-full right-2 mt-1 w-72 bg-[#2d2d2d] border border-[#404040] rounded-lg shadow-xl p-3 flex flex-col gap-2 z-50 transition-all duration-100 origin-top-right ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              {primaryControls}
              <hr className="border-[#404040]" />
              <div className="flex flex-col gap-2">{actionControls}</div>
          </div>
        </>
      </div>
    </div>
  );
};
