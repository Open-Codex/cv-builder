/**
 * Sync resilience and edge-case tests for yamlToTypst.
 * Tests the helpers that bridge UI controls → Typst preamble values,
 * and the full generateTypstSource with edge-case YAML inputs.
 *
 * Run: npx vitest run src/engine/yamlToTypst.test.ts
 */
import { describe, it, expect, vi, beforeAll } from 'vitest';
import {
  hexToRgb,
  toTypstColor,
  toTypstDimension,
  toTypstBool,
  generateTypstSource,
} from './yamlToTypst';

// Mock fetch for lib.typ (generateTypstSource fetches it)
beforeAll(() => {
  vi.stubGlobal('fetch', async (url: string) => {
    if (typeof url === 'string' && url.includes('lib.typ')) {
      return { ok: true, text: async () => '// mock lib.typ' };
    }
    throw new Error('Not found ' + url);
  });
});

// ───────────────────────────────────────────────
// hexToRgb
// ───────────────────────────────────────────────
describe('hexToRgb', () => {
  it('converts standard hex colors', () => {
    expect(hexToRgb('#004F90')).toBe('rgb(0, 79, 144)');
    expect(hexToRgb('#ffffff')).toBe('rgb(255, 255, 255)');
    expect(hexToRgb('#000000')).toBe('rgb(0, 0, 0)');
  });

  it('handles hex without # prefix', () => {
    expect(hexToRgb('FF0000')).toBe('rgb(255, 0, 0)');
  });

  it('handles lowercase hex', () => {
    expect(hexToRgb('#abcdef')).toBe('rgb(171, 205, 239)');
  });
});

// ───────────────────────────────────────────────
// toTypstColor
// ───────────────────────────────────────────────
describe('toTypstColor', () => {
  it('passes through rgb() values untouched', () => {
    expect(toTypstColor('rgb(255, 0, 0)', 'rgb(0, 0, 0)')).toBe('rgb(255, 0, 0)');
  });

  it('converts hex to rgb', () => {
    expect(toTypstColor('#004F90', 'rgb(0, 0, 0)')).toBe('rgb(0, 79, 144)');
  });

  it('uses fallback when value is undefined', () => {
    expect(toTypstColor(undefined, 'rgb(128, 128, 128)')).toBe('rgb(128, 128, 128)');
  });

  it('converts hex fallback to rgb', () => {
    expect(toTypstColor(undefined, '#FF0000')).toBe('rgb(255, 0, 0)');
  });

  it('returns black for empty/invalid colors', () => {
    expect(toTypstColor(undefined, '')).toBe('rgb(0, 0, 0)');
    expect(toTypstColor('', '')).toBe('rgb(0, 0, 0)');
    expect(toTypstColor('invalid', 'also-invalid')).toBe('rgb(0, 0, 0)');
  });

  it('handles short hex gracefully (less than 7 chars)', () => {
    // #FFF is too short (< 7), should fall through to black
    expect(toTypstColor('#FFF', '')).toBe('rgb(0, 0, 0)');
  });

  it('handles hex in fallback position', () => {
    expect(toTypstColor(undefined, '#2c3e50')).toBe('rgb(44, 62, 80)');
  });
});

// ───────────────────────────────────────────────
// toTypstDimension
// ───────────────────────────────────────────────
describe('toTypstDimension', () => {
  it('returns value when provided', () => {
    expect(toTypstDimension('0.2cm', '1cm')).toBe('0.2cm');
    expect(toTypstDimension('12pt', '10pt')).toBe('12pt');
  });

  it('returns fallback when value is undefined', () => {
    expect(toTypstDimension(undefined, '0.7in')).toBe('0.7in');
  });

  it('returns fallback when value is empty string', () => {
    expect(toTypstDimension('', '0.5cm')).toBe('0.5cm');
  });

  it('passes through em values', () => {
    expect(toTypstDimension('1.2em', '0.6em')).toBe('1.2em');
  });
});

// ───────────────────────────────────────────────
// toTypstBool
// ───────────────────────────────────────────────
describe('toTypstBool', () => {
  it('returns value when provided', () => {
    expect(toTypstBool(true, false)).toBe('true');
    expect(toTypstBool(false, true)).toBe('false');
  });

  it('returns fallback when undefined', () => {
    expect(toTypstBool(undefined, true)).toBe('true');
    expect(toTypstBool(undefined, false)).toBe('false');
  });
});

// ───────────────────────────────────────────────
// generateTypstSource — integration / edge cases
// ───────────────────────────────────────────────
describe('generateTypstSource', () => {
  // Helper to check the generated Typst source contains expected patterns
  async function gen(yaml: string): Promise<string> {
    return generateTypstSource(yaml);
  }

  it('generates valid output for minimal YAML', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('rendercv.with(');
    expect(result).toContain('name: "Test"');
  });

  it('handles missing cv.name gracefully', async () => {
    const result = await gen(`
cv:
  location: Somewhere
design:
  theme: mart
`);
    expect(result).toContain('name: "CV"');
  });

  it('handles empty design block', async () => {
    const result = await gen(`
cv:
  name: Test
design: {}
`);
    expect(result).toContain('rendercv.with(');
  });

  it('handles missing design block entirely', async () => {
    const result = await gen(`
cv:
  name: Test
`);
    expect(result).toContain('rendercv.with(');
  });

  it('uses mart defaults for font sizes when no explicit typography', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('typography-font-size-body: 8pt');
    expect(result).toContain('typography-font-size-name: 30pt');
    expect(result).toContain('typography-font-family-body: "Lato"');
  });

  it('uses mart defaults for spacing when no explicit spacing', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('typography-line-spacing: 0.2cm');
    expect(result).toContain('section-titles-space-above: 0.3cm');
    expect(result).toContain('section-titles-space-below: 0.2cm');
    expect(result).toContain('sections-space-between-regular-entries: 0.3cm');
  });

  it('overrides defaults when explicit values are given', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
  typography:
    font_size:
      body: 11pt
    line_spacing: 0.5cm
`);
    expect(result).toContain('typography-font-size-body: 11pt');
    expect(result).toContain('typography-line-spacing: 0.5cm');
  });

  it('converts hex colors from design block to rgb', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
  colors:
    name: "#FF0000"
    section_titles: "#00FF00"
`);
    expect(result).toContain('colors-name: rgb(255, 0, 0)');
    expect(result).toContain('colors-section-titles: rgb(0, 255, 0)');
    // Should NOT contain raw hex
    expect(result).not.toContain('#FF0000');
    expect(result).not.toContain('#00FF00');
  });

  it('handles Spanish keys transparently', async () => {
    const result = await gen(`
cv:
  nombre: Juan
  ubicación: Madrid
  secciones:
    Experiencia:
      - empresa: Google
        cargo: SWE
        fecha: 2020 - 2021
        logros:
          - Hizo cosas
design:
  theme: mart
`);
    expect(result).toContain('name: "Juan"');
    expect(result).toContain('== Experiencia');
  });

  it('handles empty sections gracefully', async () => {
    const result = await gen(`
cv:
  name: Test
  sections: {}
design:
  theme: mart
`);
    expect(result).toContain('rendercv.with(');
    // No section headers should appear
    expect(result).not.toContain('== ');
  });

  it('handles section with empty entries array', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience: []
design:
  theme: mart
`);
    expect(result).toContain('rendercv.with(');
  });

  it('handles entries with all optional fields missing', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience:
      - company: ACME
design:
  theme: mart
`);
    expect(result).toContain('rendercv.with(');
    expect(result).toContain('ACME');
  });

  it('handles social_networks field', async () => {
    const result = await gen(`
cv:
  name: Test
  social_networks:
    - network: GitHub
      username: testuser
    - network: LinkedIn
      username: testuser
design:
  theme: mart
`);
    expect(result).toContain('github.com/testuser');
    expect(result).toContain('linkedin.com/in/testuser');
  });

  it('handles unknown theme gracefully (falls back to classic)', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: nonexistent_theme
`);
    expect(result).toContain('rendercv.with(');
    // Should use classic defaults (Source Sans 3)
    expect(result).toContain('typography-font-family-body: "Source Sans 3"');
  });

  it('handles YAML with only cv key (no design, no locale)', async () => {
    const result = await gen(`
cv:
  name: Solo CV
  headline: Developer
  sections:
    Experience:
      - company: Start
        position: Dev
        date: 2023
        highlights:
          - Built things
`);
    expect(result).toContain('name: "Solo CV"');
    expect(result).toContain('rendercv.with(');
  });

  it('handles special characters in text', async () => {
    const result = await gen(`
cv:
  name: José García
  sections:
    Experience:
      - company: O'Reilly & Sons
        position: Dev
        date: 2023
        highlights:
          - Used $pecial characters & "quotes"
design:
  theme: mart
`);
    // & is valid in Typst content mode — just check special chars don't crash
    expect(result).toContain('José García');
    expect(result).toContain('O\'Reilly');
  });

  // ── mart theme-specific defaults ──────────────────────

  it('mart uses underline: true for links (theme default)', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('links-underline: true');
  });

  it('mart uses show_icons: false for connections', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('header-connections-show-icons: false');
    expect(result).toContain('header-connections-display-urls-instead-of-usernames: true');
  });

  it('mart uses ◦ for highlight bullets', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('entries-highlights-bullet: "◦"');
  });

  it('mart uses section_titles type with_full_line', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
`);
    expect(result).toContain('section-titles-type: "with_full_line"');
  });

  // ── Cross-theme consistency ──────────────────────

  it('classic theme uses different defaults than mart', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: classic
`);
    expect(result).toContain('typography-font-family-body: "Source Sans 3"');
    expect(result).toContain('typography-font-size-body: 10pt');
    expect(result).toContain('links-underline: false');
    expect(result).toContain('header-connections-show-icons: true');
  });

  it('moderncv theme uses its own defaults', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: moderncv
`);
    expect(result).toContain('section-titles-type: "moderncv"');
    expect(result).toContain('typography-font-family-body: "Source Sans 3"');
  });

  // ── Multi-section rendering ──────────────────────

  it('renders multiple sections in order', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience:
      - company: ACME
        position: Dev
        date: 2023
        highlights:
          - Built APIs
    Education:
      - institution: MIT
        area: CS
        date: 2020
    Skills:
      - label: Languages
        details: Python, TypeScript
design:
  theme: mart
`);
    expect(result).toContain('== Experience');
    expect(result).toContain('== Education');
    expect(result).toContain('== Skills');
    expect(result).toContain('ACME');
    expect(result).toContain('MIT');
    expect(result).toContain('Python, TypeScript');
  });

  it('renders education entries correctly', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Education:
      - institution: MIT
        area: Computer Science
        date: 2018 - 2022
        highlights:
          - Dean's list
design:
  theme: mart
`);
    expect(result).toContain('MIT');
    expect(result).toContain('Computer Science');
  });

  it('renders one-line entries (label + details)', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Skills:
      - label: Languages
        details: Python, TypeScript, Go
      - label: Tools
        details: Docker, K8s
design:
  theme: mart
`);
    expect(result).toContain('Languages');
    expect(result).toContain('Python, TypeScript, Go');
    expect(result).toContain('Docker, K8s');
  });

  // ── Explicit design overrides ──────────────────────

  it('explicit design.links overrides theme defaults', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
  links:
    underline: false
`);
    expect(result).toContain('links-underline: false');
  });

  it('explicit design.entries.highlights overrides bullet', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
  entries:
    highlights:
      bullet: "→"
`);
    expect(result).toContain('entries-highlights-bullet: "→"');
  });

  it('explicit font family override works', async () => {
    const result = await gen(`
cv:
  name: Test
design:
  theme: mart
  typography:
    font_family: Montserrat
`);
    expect(result).toContain('typography-font-family-body: "Montserrat"');
    expect(result).toContain('typography-font-family-name: "Montserrat"');
  });

  // ── Stress / edge cases ──────────────────────

  it('handles many highlights without crashing', async () => {
    const highlights = Array.from({ length: 20 }, (_, i) => `          - Achievement ${i + 1}`).join('\n');
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience:
      - company: BigCo
        position: Lead
        date: 2020 - 2024
        highlights:
${highlights}
design:
  theme: mart
`);
    expect(result).toContain('Achievement 1');
    expect(result).toContain('Achievement 20');
  });

  it('handles entry with summary field', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience:
      - company: StartupCo
        position: Founder
        date: 2022
        summary: Built a SaaS platform from scratch
        highlights:
          - Raised seed funding
design:
  theme: mart
`);
    expect(result).toContain('Built a SaaS platform from scratch');
  });

  it('handles mixed entry types in different sections', async () => {
    const result = await gen(`
cv:
  name: Test
  sections:
    Experience:
      - company: Co
        position: Dev
        date: 2023
    Skills:
      - label: Lang
        details: Python
    Education:
      - institution: Uni
        area: CS
        date: 2020
design:
  theme: mart
`);
    expect(result).toContain('== Experience');
    expect(result).toContain('== Skills');
    expect(result).toContain('== Education');
  });

  it('throws a descriptive error on completely empty YAML', async () => {
    await expect(gen('')).rejects.toThrow('YAML');
  });

  it('throws a descriptive error on YAML with only comments', async () => {
    await expect(gen('# This is just a comment\n# Nothing else')).rejects.toThrow('YAML');
  });
});
