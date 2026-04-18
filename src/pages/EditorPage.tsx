import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Toolbar } from '../components/Toolbar';
import { EditorPanel } from '../components/EditorPanel';
import { PDFViewer } from '../components/PDFViewer';
import { ErrorBanner } from '../components/ErrorBanner';
import { WasmLoadingNotice } from '../components/WasmLoadingNotice';
import { MobileView } from '../components/MobileView';
import { CvSelector } from '../components/CvSelector';
import { useRenderEngine } from '../hooks/useRenderEngine';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../i18n';
import { defaultShowcase, defaultShowcaseEs, skeleton, skeletonEs } from '../templates';
import { switchYamlLanguage } from '../engine/yamlKeyTranslator';
import { getThemeDefaults, availableFonts } from '../engine/themeRegistry';
import type { ThemeDefaults as SizesThemeDefaults } from '../components/SizesDropdown';
import { useAuth } from '../contexts/AuthContext';
import { cvService, type Cv } from '../services/api';
import yaml from 'js-yaml';

const DEFAULT_FONT_SIZES: Record<string, string> = {
  body: '8pt', name: '30pt', headline: '14pt', connections: '9pt',
  section_titles: '12pt',
};

const DEFAULT_SPACING: Record<string, string> = {
  line_spacing: '0.2cm',
  space_between_entries: '0.3cm',
  section_space_above: '0.3cm',
  section_space_below: '0.2cm',
};

function getFileName(yamlContent: string, ext: 'pdf' | 'yaml'): string {
  try {
    const doc = yaml.load(yamlContent) as any;
    const name = doc?.cv?.name || doc?.cv?.nombre;
    if (!name) return `CV_Document.${ext}`;
    const clean = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
    return `${clean}_CV.${ext}`;
  } catch { return `CV_Document.${ext}`; }
}

export function EditorPage() {
  const { t } = useTranslation();
  const { token, user, logout } = useAuth();

  const resolvedUiLang = (() => {
    try {
      const saved = localStorage.getItem('rendercv-ui-lang');
      if (saved === 'en' || saved === 'es') return saved;
    } catch {}
    return typeof navigator !== 'undefined' && navigator.language.startsWith('es') ? 'es' : 'en';
  })();
  const initialTemplate = resolvedUiLang === 'es' ? defaultShowcaseEs : defaultShowcase;
  const initialLang = resolvedUiLang === 'es' ? 'spanish' : 'english';

  const [currentCvId, setCurrentCvId] = useLocalStorage<string | null>('current-cv-id', null);
  const [yamlContent, setYamlContent] = useLocalStorage<string>('rendercv-yaml', initialTemplate, 1000);
  const [theme, setTheme] = useLocalStorage<string>('rendercv-theme', 'mart');
  const [accentColor, setAccentColor] = useLocalStorage<string>('rendercv-accent', '#004F90');
  const [themeLang, setThemeLang] = useLocalStorage<string>('rendercv-theme-lang', initialLang);
  const [fontSizes, setFontSizes] = useLocalStorage<Record<string, string>>('rendercv-font-sizes', DEFAULT_FONT_SIZES);
  const [spacing, setSpacing] = useLocalStorage<Record<string, string>>('rendercv-spacing', DEFAULT_SPACING);
  const [fontFamily, setFontFamily] = useLocalStorage<string>('rendercv-font-family', 'Lato');

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [splitPercent, setSplitPercent] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = React.useState(false);

  const handleSelectCv = useCallback(async (cv: Cv | null) => {
    if (cv) {
      setCurrentCvId(cv.id);
      setYamlContent(cv.content || skeleton);
    } else {
      setCurrentCvId(null);
      setYamlContent(resolvedUiLang === 'es' ? skeletonEs : skeleton);
    }
  }, [setCurrentCvId, setYamlContent, resolvedUiLang]);

  const handleSaveCv = useCallback(async () => {
    if (!token || !currentCvId) return;
    try {
      await cvService.update(currentCvId, token, { content: yamlContent });
    } catch (err) {
      console.error('Failed to save CV:', err);
    }
  }, [token, currentCvId, yamlContent]);

  useEffect(() => {
    const loadCv = async () => {
      if (!token || !user || !currentCvId) return;
      try {
        const cv = await cvService.findOne(currentCvId, token);
        setYamlContent(cv.content || skeleton);
      } catch {
        setCurrentCvId(null);
      }
    };
    loadCv();
  }, [currentCvId, token, user]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hintState = React.useMemo(() => {
    if (yamlContent === skeleton || yamlContent === skeletonEs) return 'reset';
    
    try {
      const parsedCurrent = yaml.load(yamlContent) as any;
      const parsedEn = yaml.load(defaultShowcase) as any;
      const parsedEs = yaml.load(defaultShowcaseEs) as any;
      
      const currentCvStr = JSON.stringify(parsedCurrent?.cv || {});
      const enCvStr = JSON.stringify(parsedEn?.cv || {});
      const esCvStr = JSON.stringify(parsedEs?.cv || {});
      
      const isEnglishBase = Math.abs(currentCvStr.length - enCvStr.length) < Math.abs(currentCvStr.length - esCvStr.length);
      const baseCvStr = isEnglishBase ? enCvStr : esCvStr;
      
      const diff = Math.abs(currentCvStr.length - baseCvStr.length);
      
      if (diff === 0) return 'none';
      if (diff <= 20) return 'minor';
      return 'major';
    } catch {
      const isEnglishBase = Math.abs(yamlContent.length - defaultShowcase.length) < Math.abs(yamlContent.length - defaultShowcaseEs.length);
      const baseTemplate = isEnglishBase ? defaultShowcase : defaultShowcaseEs;
      const diff = Math.abs(yamlContent.length - baseTemplate.length);
      if (diff <= 30) return 'minor';
      return 'major';
    }
  }, [yamlContent]);

  const computedThemeDefaults: SizesThemeDefaults = React.useMemo(() => {
    const td = getThemeDefaults(theme);
    return {
      font_size: { ...DEFAULT_FONT_SIZES, ...td.typography.font_size },
      spacing: DEFAULT_SPACING,
      font_family: td.typography.font_family,
    };
  }, [theme]);

  const isToolbarUpdateRef = useRef(false);

  useEffect(() => {
    if (isToolbarUpdateRef.current) {
      isToolbarUpdateRef.current = false;
      return;
    }
    
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      
      const yamlColor = doc?.design?.colors?.name || doc?.design?.colors?.headline;
      if (yamlColor && yamlColor !== accentColor) {
        setAccentColor(yamlColor);
      }

      const yamlFont = doc?.design?.typography?.font_family;
      if (yamlFont && yamlFont !== fontFamily) {
        setFontFamily(yamlFont);
      }

      const yamlSizes = doc?.design?.typography?.font_size;
      if (yamlSizes && typeof yamlSizes === 'object') {
        const merged = { ...fontSizes, ...yamlSizes };
        if (JSON.stringify(merged) !== JSON.stringify(fontSizes)) {
          setFontSizes(merged);
        }
      }

      const newSpacing = { ...spacing };
      let spacingChanged = false;
      if (doc?.design?.typography?.line_spacing && doc.design.typography.line_spacing !== spacing.line_spacing) {
        newSpacing.line_spacing = doc.design.typography.line_spacing;
        spacingChanged = true;
      }
      if (doc?.design?.sections?.space_between_regular_entries && doc.design.sections.space_between_regular_entries !== spacing.space_between_entries) {
        newSpacing.space_between_entries = doc.design.sections.space_between_regular_entries;
        spacingChanged = true;
      }
      if (doc?.design?.section_titles?.space_above && doc.design.section_titles.space_above !== spacing.section_space_above) {
        newSpacing.section_space_above = doc.design.section_titles.space_above;
        spacingChanged = true;
      }
      if (doc?.design?.section_titles?.space_below && doc.design.section_titles.space_below !== spacing.section_space_below) {
        newSpacing.section_space_below = doc.design.section_titles.space_below;
        spacingChanged = true;
      }
      if (spacingChanged) setSpacing(newSpacing);
    } catch {}
  }, [yamlContent]);

  useEffect(() => {
    const SUPPORTED_THEMES = ['mart', 'moderncv'];
    if (!SUPPORTED_THEMES.includes(theme)) {
      setTheme('mart');
    }
  }, [theme, setTheme]);

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
    const td = getThemeDefaults(newTheme);
    setFontSizes({ ...DEFAULT_FONT_SIZES, ...td.typography.font_size });
    setSpacing(DEFAULT_SPACING);
    setFontFamily(td.typography.font_family || 'Source Sans 3');
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      if (!doc.design) doc.design = {};
      doc.design.theme = newTheme;
      if (!doc.design.colors) doc.design.colors = {};
      doc.design.colors.name = accentColor;
      doc.design.colors.section_titles = accentColor;
      doc.design.colors.links = accentColor;
      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
    } catch {}
  }, [yamlContent, setYamlContent, setTheme, setFontSizes, setSpacing, setFontFamily]);

  const handleAccentChange = useCallback((newColor: string) => {
    setAccentColor(newColor);
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      if (!doc.design) doc.design = {};
      if (!doc.design.colors) doc.design.colors = {};
      doc.design.colors.name = newColor;
      doc.design.colors.section_titles = newColor;
      doc.design.colors.links = newColor;
      doc.design.colors.headline = newColor;
      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
    } catch {}
  }, [yamlContent, setYamlContent, setAccentColor]);

  const hintStateRef = useRef(hintState);
  hintStateRef.current = hintState;

  const yamlContentRef = useRef(yamlContent);
  yamlContentRef.current = yamlContent;

  const handleThemeLangChange = useCallback((newLang: string) => {
    setThemeLang(newLang);
    try {
      const currentHintState = hintStateRef.current;
      if (currentHintState === 'none' || currentHintState === 'minor') {
        const fullTemplate = newLang === 'spanish' ? defaultShowcaseEs : defaultShowcase;
        isToolbarUpdateRef.current = true;
        setYamlContent(fullTemplate);
        return;
      }
      if (currentHintState === 'reset') {
        const skel = newLang === 'spanish' ? skeletonEs : skeleton;
        isToolbarUpdateRef.current = true;
        setYamlContent(skel);
        return;
      }
      const currentYaml = yamlContentRef.current;
      const doc = yaml.load(currentYaml) as any;
      if (!doc) return;
      const translated = switchYamlLanguage(doc, newLang as 'english' | 'spanish');
      if (!translated.locale) translated.locale = {};
      translated.locale.language = newLang;
      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(translated, { lineWidth: -1 }));
    } catch {}
  }, [setYamlContent, setThemeLang]);

  const handleFontSizesChange = useCallback((newSizes: Record<string, string>) => {
    setFontSizes(newSizes);
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      if (!doc.design) doc.design = {};
      if (!doc.design.typography) doc.design.typography = {};
      doc.design.typography.font_size = { ...newSizes };
      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
    } catch {}
  }, [yamlContent, setYamlContent, setFontSizes]);

  const handleFontFamilyChange = useCallback((newFamily: string) => {
    setFontFamily(newFamily);
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      if (!doc.design) doc.design = {};
      if (!doc.design.typography) doc.design.typography = {};
      doc.design.typography.font_family = newFamily;
      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
    } catch {}
  }, [yamlContent, setYamlContent, setFontFamily]);

  const handleSpacingChange = useCallback((newSpacing: Record<string, string>) => {
    setSpacing(newSpacing);
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc) return;
      if (!doc.design) doc.design = {};

      if (newSpacing.line_spacing) {
        if (!doc.design.typography) doc.design.typography = {};
        doc.design.typography.line_spacing = newSpacing.line_spacing;
      }
      if (newSpacing.space_between_entries) {
        if (!doc.design.sections) doc.design.sections = {};
        doc.design.sections.space_between_regular_entries = newSpacing.space_between_entries;
      }
      if (newSpacing.section_space_above) {
        if (!doc.design.section_titles) doc.design.section_titles = {};
        doc.design.section_titles.space_above = newSpacing.section_space_above;
      }
      if (newSpacing.section_space_below) {
        if (!doc.design.section_titles) doc.design.section_titles = {};
        doc.design.section_titles.space_below = newSpacing.section_space_below;
      }

      isToolbarUpdateRef.current = true;
      setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
    } catch {}
  }, [yamlContent, setYamlContent, setSpacing]);

  const handleResetSizes = useCallback(() => {
    const td = getThemeDefaults(theme);
    setFontSizes({ ...DEFAULT_FONT_SIZES, ...td.typography.font_size });
    setSpacing(DEFAULT_SPACING);
    setFontFamily(td.typography.font_family || 'Source Sans 3');
    try {
      const doc = yaml.load(yamlContent) as any;
      if (doc?.design) {
        if (doc.design.typography?.font_size) delete doc.design.typography.font_size;
        if (doc.design.typography?.line_spacing) delete doc.design.typography.line_spacing;
        if (doc.design.typography?.font_family) delete doc.design.typography.font_family;
        if (doc.design.sections?.space_between_regular_entries) delete doc.design.sections.space_between_regular_entries;
        if (doc.design.section_titles?.space_above) delete doc.design.section_titles.space_above;
        if (doc.design.section_titles?.space_below) delete doc.design.section_titles.space_below;
        isToolbarUpdateRef.current = true;
        setYamlContent(yaml.dump(doc, { lineWidth: -1 }));
      }
    } catch {}
  }, [theme, yamlContent, setYamlContent, setFontSizes, setSpacing, setFontFamily]);

  const { status, pdfUrl, error, wasmReady } = useRenderEngine(yamlContent, 200);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setYamlContent(value || '');
  }, [setYamlContent]);

  const handleReset = useCallback(() => {
    isToolbarUpdateRef.current = true;
    setYamlContent(themeLang === 'spanish' ? skeletonEs : skeleton);
  }, [setYamlContent, themeLang]);

  const handleLoadShowcase = useCallback(() => {
    isToolbarUpdateRef.current = true;
    setYamlContent(themeLang === 'spanish' ? defaultShowcaseEs : defaultShowcase);
    setTheme('mart');
  }, [setYamlContent, setTheme, themeLang]);

  const handleDownloadYaml = useCallback(() => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFileName(yamlContent, 'yaml');
    a.click();
    URL.revokeObjectURL(url);
  }, [yamlContent]);

  const handleDownloadPdf = useCallback(() => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = getFileName(yamlContent, 'pdf');
      a.click();
    }
  }, [pdfUrl, yamlContent]);

  const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const percent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      setSplitPercent(Math.min(80, Math.max(20, percent)));
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    document.title = t('branding.title');
  }, [t]);

  const editorSection = (
    <div className="h-full w-full flex flex-col relative">
      <EditorPanel value={yamlContent} onChange={handleEditorChange} />
      <div 
        className={`absolute inset-0 bg-black/75 z-40 transition-opacity duration-100 pointer-events-none ${isStyleMenuOpen ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );

  const previewSection = (
    <div className="h-full w-full relative overflow-hidden bg-[#2d2d2d]">
      <WasmLoadingNotice wasmReady={wasmReady} />
      {status === 'error' && error && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-amber-500/90 text-amber-950 px-4 py-2 text-sm font-medium flex justify-center items-center backdrop-blur-sm border-b border-amber-600/50 shadow-md">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {t('pdf.error')}
        </div>
      )}
      <div className="h-full w-full overflow-y-auto flex justify-center">
        <PDFViewer url={pdfUrl} loading={status === 'compiling'} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1e1e1e] text-gray-200 font-sans">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <CvSelector currentCvId={currentCvId} onSelectCv={handleSelectCv} />
          {currentCvId && (
            <button
              onClick={handleSaveCv}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-lg"
            >
              Save CV
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <Toolbar
        theme={theme}
        setTheme={handleThemeChange}
        accentColor={accentColor}
        setAccentColor={handleAccentChange}
        themeLang={themeLang}
        setThemeLang={handleThemeLangChange}
        fontSizes={fontSizes}
        spacing={spacing}
        themeDefaults={computedThemeDefaults}
        onFontSizesChange={handleFontSizesChange}
        onSpacingChange={handleSpacingChange}
        onResetSizes={handleResetSizes}
        onReset={handleReset}
        onLoadShowcase={handleLoadShowcase}
        error={status === 'error' ? error : null}
        onLoadYaml={setYamlContent}
        onDownloadYaml={handleDownloadYaml}
        onDownloadPdf={handleDownloadPdf}
        isMobile={isMobile}
        isShowcase={hintState === 'none'}
        hintState={hintState}
        onStyleMenuOpenChange={setIsStyleMenuOpen}
        fontFamily={fontFamily}
        onFontFamilyChange={handleFontFamilyChange}
        availableFonts={availableFonts}
      />

      <div className="flex-1 overflow-hidden relative" ref={containerRef}>
        {isMobile ? (
          <MobileView editor={editorSection} preview={previewSection} />
        ) : (
          <div className="flex h-full w-full">
            <div className="overflow-hidden" style={{ width: `${splitPercent}%` }}>
              {editorSection}
            </div>
            <div
              className="w-1.5 bg-[#404040] hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0 active:bg-blue-400 relative"
              onMouseDown={handleDividerMouseDown}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-10 bg-gray-500 rounded-full pointer-events-none" />
            </div>
            <div className="overflow-hidden" style={{ width: `${100 - splitPercent}%` }}>
              {previewSection}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
