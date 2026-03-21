/**
 * Tests for themeRegistry.
 * Verifies theme defaults, template strings, and merge behavior.
 */
import { describe, it, expect } from 'vitest';
import { getThemeDefaults, themes } from './themeRegistry';

describe('themeRegistry', () => {
  it('should have all 5 themes', () => {
    expect(Object.keys(themes).sort()).toEqual([
      'classic', 'engineeringclassic', 'engineeringresumes', 'mart', 'moderncv',
    ]);
  });

  it('classic should have blue name color', () => {
    const td = getThemeDefaults('classic');
    expect(td.colors.name).toBe('rgb(0, 79, 144)');
  });



  it('moderncv should have blue name color', () => {
    const td = getThemeDefaults('moderncv');
    expect(td.colors.name).toBe('rgb(0, 79, 144)');
  });

  it('unknown theme should fallback to classic', () => {
    const td = getThemeDefaults('nonexistent');
    expect(td.colors.name).toBe('rgb(0, 79, 144)');
  });

  it('each theme should have complete color defaults', () => {
    for (const [, td] of Object.entries(themes)) {
      expect(td.colors.body).toBeDefined();
      expect(td.colors.name).toBeDefined();
      expect(td.colors.headline).toBeDefined();
      expect(td.colors.section_titles).toBeDefined();
      expect(td.colors.links).toBeDefined();
      expect(td.colors.footer).toBeDefined();
    }
  });

  it('each theme should have complete typography defaults', () => {
    for (const [, td] of Object.entries(themes)) {
      expect(td.typography.font_family).toBeDefined();
      expect(td.typography.font_size.body).toBeDefined();
      expect(td.typography.font_size.name).toBeDefined();
      expect(td.typography.line_spacing).toBeDefined();
    }
  });

  it('each theme should have page defaults', () => {
    for (const [, td] of Object.entries(themes)) {
      expect(td.page.size).toBe('us-letter');
      expect(td.page.top_margin).toBeDefined();
    }
  });

  // Template-specific tests

  it('classic uses **COMPANY**, POSITION for experience main_column', () => {
    const td = getThemeDefaults('classic');
    expect(td.templates.experience_entry.main_column).toBe(
      '**COMPANY**, POSITION\nSUMMARY\nHIGHLIGHTS'
    );
  });

  it('classic uses LOCATION\\nDATE for experience date_and_location_column', () => {
    const td = getThemeDefaults('classic');
    expect(td.templates.experience_entry.date_and_location_column).toBe('LOCATION\nDATE');
  });

  it('classic education has degree_column **DEGREE**', () => {
    const td = getThemeDefaults('classic');
    expect(td.templates.education_entry.degree_column).toBe('**DEGREE**');
  });

  it('moderncv uses ENGINEERING_TEMPLATES (POSITION first)', () => {
    const td = getThemeDefaults('moderncv');
    expect(td.templates.experience_entry.main_column).toBe(
      '**POSITION**, COMPANY -- LOCATION\nSUMMARY\nHIGHLIGHTS'
    );
    expect(td.templates.experience_entry.date_and_location_column).toBe('DATE');
  });

  it('moderncv education has degree_column: null', () => {
    const td = getThemeDefaults('moderncv');
    expect(td.templates.education_entry.degree_column).toBeNull();
  });

  it('engineeringclassic shares ENGINEERING_TEMPLATES', () => {
    const td = getThemeDefaults('engineeringclassic');
    expect(td.templates.experience_entry.main_column).toContain('**POSITION**');
    expect(td.templates.experience_entry.date_and_location_column).toBe('DATE');
  });

  it('mart uses newlines and italics in templates', () => {
    const td = getThemeDefaults('mart');
    expect(td.templates.experience_entry.main_column).toBe(
      '**POSITION**\n*COMPANY*\nSUMMARY\nHIGHLIGHTS'
    );
    expect(td.templates.experience_entry.date_and_location_column).toBe('*LOCATION*\n*DATE*');
  });

  it('mart education uses INSTITUTION, AREA (no "in" keyword)', () => {
    const td = getThemeDefaults('mart');
    expect(td.templates.education_entry.main_column).toContain('**INSTITUTION**, AREA');
    expect(td.templates.education_entry.main_column).not.toContain('*in*');
  });

  it('moderncv has section_titles.type = moderncv', () => {
    const td = getThemeDefaults('moderncv');
    expect(td.section_titles.type).toBe('moderncv');
  });

  it('mart has bullet = ◦', () => {
    const td = getThemeDefaults('mart');
    expect(td.entries.highlights_bullet).toBe('◦');
  });
});
