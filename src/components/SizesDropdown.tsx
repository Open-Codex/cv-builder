import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, TranslationKey } from '../i18n';

export interface ThemeDefaults {
  font_family?: string;
  font_size: Record<string, string>;
  spacing?: Record<string, string>;
}

interface SizesDropdownProps {
  fontSizes: Record<string, string>;
  spacing: Record<string, string>;
  themeDefaults: ThemeDefaults | null;
  onFontSizesChange: (sizes: Record<string, string>) => void;
  onSpacingChange: (spacing: Record<string, string>) => void;
  onReset: () => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
  fontFamily: string;
  onFontFamilyChange: (family: string) => void;
  availableFonts: string[];
}

interface SliderConfig {
  key: string;
  label: string;
  i18nKey: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

export function parseValue(val: string): { num: number; unit: string } {
  const match = val.match(/^([\d.]+)\s*(pt|em|cm|mm|in)$/);
  if (match) return { num: parseFloat(match[1]), unit: match[2] };
  return { num: parseFloat(val) || 0, unit: 'pt' };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildSliderConfig(key: string, label: string, i18nKey: string, defaultValue: string): SliderConfig {
  let { num, unit } = parseValue(defaultValue);
  // Force pt for font sizes — convert em to approximate pt (1em ≈ 10pt)
  if (unit === 'em') {
    num = Math.round(num * 10 * 2) / 2; // round to nearest 0.5pt
    unit = 'pt';
  }
  const step = unit === 'pt' ? 0.5 : 0.01;
  const min = Math.max(step, Math.round((num * 0.5) / step) * step);
  const max = Math.round((num * 2) / step) * step;
  return { key, label, i18nKey, unit, min, max, step };
}

const SIZE_FIELDS: { key: string; label: string; i18nKey: string }[] = [
  { key: 'body', label: 'Cuerpo', i18nKey: 'style.body' },
  { key: 'name', label: 'Nombre', i18nKey: 'style.name' },
  { key: 'headline', label: 'Titular', i18nKey: 'style.headline' },
  { key: 'connections', label: 'Contacto', i18nKey: 'style.connections' },
  { key: 'section_titles', label: 'Secciones', i18nKey: 'style.section_titles' },
];

// Spacing fields that map to real Typst preamble parameters
const SPACING_FIELDS: { key: string; label: string; i18nKey: string; defaultValue: string }[] = [
  { key: 'line_spacing', label: 'Interlineado', i18nKey: 'style.line_spacing', defaultValue: '0.2cm' },
  { key: 'space_between_entries', label: 'Entre Entradas', i18nKey: 'style.space_between_entries', defaultValue: '0.4cm' },
  { key: 'section_space_above', label: 'Antes Sección', i18nKey: 'style.section_space_above', defaultValue: '0.5cm' },
  { key: 'section_space_below', label: 'Tras Sección', i18nKey: 'style.section_space_below', defaultValue: '0.3cm' },
];

// Editable value: click to edit inline
function EditableValue({ value, onChange, min, max }: {
  value: string; onChange: (v: string) => void; min?: number; max?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }, [editing]);

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (!trimmed || trimmed === value) { setDraft(value); return; }
    const parsed = parseValue(trimmed);
    let num = parsed.num;
    const unit = trimmed.match(/[a-z]+$/i) ? parsed.unit : parseValue(value).unit;
    if (min !== undefined && max !== undefined) num = clamp(num, min, max);
    const finalValue = `${num}${unit}`;
    if (finalValue !== value) onChange(finalValue);
    else setDraft(value);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') { setDraft(value); setEditing(false); }
        }}
        className="text-[12.5px] text-gray-200 font-mono bg-[#1e1e1e] border border-[#555] rounded px-[5px] w-[60px] outline-none focus:border-[#fc5c45]"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className="text-[12.5px] text-gray-300 font-mono cursor-text hover:text-white hover:underline"
      title="Click to edit"
    >
      {value}
    </span>
  );
}

const PRESET_COLORS = [
  '#8B5A2B', '#004F90', '#000000', '#3873b3', '#1a5c2a',
  '#7b2d8b', '#c0392b', '#2c3e50', '#e67e22', '#16a085',
];

export const SizesDropdown: React.FC<SizesDropdownProps> = ({
  fontSizes, spacing, themeDefaults,
  onFontSizesChange, onSpacingChange, onReset,
  accentColor, onAccentColorChange, onOpenChange,
  fontFamily, onFontFamilyChange, availableFonts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Notify parent when dropdown opens/closes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const sizeDefaults = themeDefaults?.font_size ?? fontSizes;
  const sizeSliders = SIZE_FIELDS.map(f => buildSliderConfig(f.key, f.label, f.i18nKey, sizeDefaults[f.key] || '9pt'));

  const handleSizeChange = (key: string, numValue: number, unit: string) => {
    const s = sizeSliders.find(sl => sl.key === key);
    const clamped = s ? clamp(numValue, s.min, s.max) : numValue;
    onFontSizesChange({ ...fontSizes, [key]: `${clamped}${unit}` });
  };

  const handleDirectEdit = (key: string, rawValue: string) => {
    const s = sizeSliders.find(sl => sl.key === key);
    const { unit: currentUnit } = parseValue(fontSizes[key] || sizeDefaults[key] || '9pt');
    const parsed = parseValue(rawValue);
    const unit = rawValue.match(/[a-z]+$/i) ? parsed.unit : currentUnit;
    const num = s ? clamp(parsed.num, s.min, s.max) : parsed.num;
    onFontSizesChange({ ...fontSizes, [key]: `${num}${unit}` });
  };

  const handleSpacingChange = (key: string, numValue: number, unit: string) => {
    const clamped = clamp(numValue, 0.05, 3.0);
    const rounded = Math.round(clamped * 100) / 100;
    onSpacingChange({ ...spacing, [key]: `${rounded}${unit}` });
  };

  const handleSpacingEdit = (key: string, rawValue: string) => {
    const parsed = parseValue(rawValue);
    const clamped = clamp(parsed.num, 0.05, 3.0);
    const rounded = Math.round(clamped * 100) / 100;
    const unit = rawValue.match(/[a-z]+$/i) ? parsed.unit : parseValue(spacing[key] || '0.6em').unit;
    onSpacingChange({ ...spacing, [key]: `${rounded}${unit}` });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[5px] text-[12.5px] px-[8px] py-[5px] bg-[#1e1e1e] border border-[#404040] hover:bg-[#404040] rounded transition-colors whitespace-nowrap"
      >
        <svg className={`w-[13px] h-[13px] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {t('toolbar.style')}
      </button>

      <div className={`absolute top-full right-0 mt-[5px] w-[360px] max-w-[90vw] bg-[#2d2d2d] border border-[#404040] rounded-lg shadow-xl z-50 py-[10px] px-[15px] max-h-[80vh] overflow-y-auto overflow-x-hidden transition-all duration-100 origin-top ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {/* Accent Color section */}
        <div className="mb-[15px] pb-[10px] border-b border-[#363636]">
          <div className="text-[12.5px] text-gray-300 uppercase tracking-wider font-bold mb-[8px]">{t('toolbar.accent')}</div>
          <div className="flex items-center gap-[10px] mb-[8px]">
            <input
              id="accent-color"
              name="accent-color"
              title="Accent Color"
              type="color"
              value={accentColor}
              onChange={(e) => onAccentColorChange(e.target.value)}
              className="w-[30px] h-[30px] rounded cursor-pointer border border-[#555] bg-transparent p-0"
            />
            <input
              id="accent-hex"
              name="accent-hex"
              title="Accent Color HEX"
              type="text"
              value={accentColor}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onAccentColorChange(v);
              }}
              className="text-[12.5px] font-mono bg-[#1e1e1e] border border-[#555] rounded px-[8px] py-[3px] text-gray-200 w-[100px] outline-none focus:border-[#fc5c45]"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                onClick={() => onAccentColorChange(c)}
                className={`w-[25px] h-[25px] rounded-sm border transition-all ${accentColor === c ? 'border-white scale-110' : 'border-[#555] hover:border-gray-400'}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Font Family selector */}
        <div className="mb-[15px] pb-[10px] border-b border-[#363636]">
          <div className="text-[12.5px] text-gray-300 uppercase tracking-wider font-bold mb-[8px]">{t('style.font_family')}</div>
          <select
            id="font-family-select"
            name="font-family"
            value={fontFamily}
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#555] rounded px-[8px] py-[5px] text-[12.5px] text-gray-200 outline-none cursor-pointer focus:border-[#fc5c45]"
          >
            {availableFonts.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Font Size sliders */}
        <div className="mb-[15px] pb-[10px] border-b border-[#363636]">
          <div className="text-[12.5px] text-gray-300 uppercase tracking-wider font-bold mb-[8px]">{t('style.font_size')}</div>
          {sizeSliders.map((s) => {
            const currentSizeValue = fontSizes[s.key] || sizeDefaults[s.key];
            const { num: sizeNum } = parseValue(currentSizeValue);

            return (
              <div key={s.key} className="flex items-center gap-[10px] mb-[5px]">
                <label htmlFor={`size-${s.key}`} className="text-[11.25px] text-gray-500 w-[70px] shrink-0">{t(s.i18nKey as TranslationKey)}</label>
                <input
                  id={`size-${s.key}`} name={`size-${s.key}`}
                  type="range"
                  min={s.min} max={s.max} step={s.step}
                  value={sizeNum}
                  onChange={(e) => handleSizeChange(s.key, parseFloat(e.target.value), s.unit)}
                  className="flex-1 slider-size cursor-pointer"
                />
                <EditableValue value={currentSizeValue} onChange={(v) => handleDirectEdit(s.key, v)} />
              </div>
            );
          })}
        </div>

        {/* Spacing sliders */}
        <div className="mb-[15px] pb-[10px] border-b border-[#363636]">
          <div className="text-[12.5px] text-gray-300 uppercase tracking-wider font-bold mb-[8px]">{t('style.spacing')}</div>
          {SPACING_FIELDS.map((sf) => {
            const currentValue = spacing[sf.key] || sf.defaultValue;
            const { num, unit } = parseValue(currentValue);
            const spacingSlider = buildSliderConfig(sf.key, sf.label, sf.i18nKey, sf.defaultValue);

            return (
              <div key={sf.key} className="flex items-center gap-[10px] mb-[5px]">
                <label htmlFor={`spacing-${sf.key}`} className="text-[11.25px] text-gray-500 w-[115px] shrink-0">{t(sf.i18nKey as TranslationKey)}</label>
                <input
                  id={`spacing-${sf.key}`} name={`spacing-${sf.key}`}
                  type="range"
                  min={spacingSlider.min} max={spacingSlider.max} step={spacingSlider.step}
                  value={num}
                  onChange={(e) => handleSpacingChange(sf.key, parseFloat(e.target.value), unit)}
                  className="flex-1 slider-spacing cursor-pointer"
                />
                <EditableValue
                  value={currentValue}
                  onChange={(v) => handleSpacingEdit(sf.key, v)}
                  min={spacingSlider.min} max={spacingSlider.max}
                />
              </div>
            );
          })}
        </div>

        {/* Reset button */}
        <div className="flex gap-[8px] mt-[5px]">
          <button
            onClick={() => { onReset(); setIsOpen(false); }}
            className="flex-1 flex items-center justify-center gap-[8px] text-[15px] py-[8px] bg-[#1e1e1e] border border-[#404040] hover:bg-[#404040] rounded transition-colors text-gray-300"
          >
            <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t('style.reset_defaults')}
          </button>
        </div>
      </div>
    </div>
  );
};
