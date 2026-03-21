/**
 * TDD tests for yamlKeyTranslator
 * Run: npx vitest run src/engine/yamlKeyTranslator.test.ts
 */
import { describe, it, expect } from 'vitest';
import {
  translateToSpanish,
  translateToEnglish,
  normalizeToEnglish,
  switchYamlLanguage,
  EN_TO_ES,
  ES_TO_EN,
  SECTION_EN_TO_ES,
  SECTION_ES_TO_EN,
} from './yamlKeyTranslator';

describe('yamlKeyTranslator', () => {
  describe('EN_TO_ES / ES_TO_EN maps', () => {
    it('should have matching keys in both directions', () => {
      for (const [en, es] of Object.entries(EN_TO_ES)) {
        expect(ES_TO_EN[es]).toBe(en);
      }
    });
    
    it('should contain all required CV keys', () => {
      const requiredKeys = ['name', 'location', 'phone', 'email', 'headline', 'sections',
        'company', 'position', 'date', 'highlights', 'institution', 'area', 'degree', 'summary'];
      for (const key of requiredKeys) {
        expect(EN_TO_ES).toHaveProperty(key);
      }
    });
  });

  describe('SECTION_EN_TO_ES / SECTION_ES_TO_EN maps', () => {
    it('should have matching keys in both directions', () => {
      for (const [en, es] of Object.entries(SECTION_EN_TO_ES)) {
        expect(SECTION_ES_TO_EN[es]).toBe(en);
      }
    });

    it('should contain all common section names', () => {
      const requiredSections = ['Experience', 'Education', 'Skills', 'Personal Projects'];
      for (const s of requiredSections) {
        expect(SECTION_EN_TO_ES).toHaveProperty(s);
      }
    });
  });

  describe('translateToSpanish', () => {
    it('should translate top-level CV keys', () => {
      const input = { name: 'John', location: 'NYC', phone: '123' };
      const result = translateToSpanish(input);
      expect(result).toEqual({ nombre: 'John', ubicación: 'NYC', teléfono: '123' });
    });

    it('should translate nested entry keys', () => {
      const input = { company: 'Google', position: 'SWE', highlights: ['did stuff'] };
      const result = translateToSpanish(input);
      expect(result).toEqual({ empresa: 'Google', cargo: 'SWE', logros: ['did stuff'] });
    });

    it('should preserve unknown keys as-is', () => {
      const input = { name: 'John', unknown_key: 'value' };
      const result = translateToSpanish(input);
      expect(result).toEqual({ nombre: 'John', unknown_key: 'value' });
    });

    it('should handle arrays of entries', () => {
      const input = [{ company: 'A', position: 'B' }, { company: 'C', position: 'D' }];
      const result = translateToSpanish(input);
      expect(result).toEqual([{ empresa: 'A', cargo: 'B' }, { empresa: 'C', cargo: 'D' }]);
    });
  });

  describe('translateToEnglish', () => {
    it('should translate Spanish keys to English', () => {
      const input = { nombre: 'Juan', ubicación: 'Madrid', teléfono: '123' };
      const result = translateToEnglish(input);
      expect(result).toEqual({ name: 'Juan', location: 'Madrid', phone: '123' });
    });

    it('should handle nested entries', () => {
      const input = { empresa: 'Google', cargo: 'SWE', logros: ['hice cosas'] };
      const result = translateToEnglish(input);
      expect(result).toEqual({ company: 'Google', position: 'SWE', highlights: ['hice cosas'] });
    });
  });

  describe('normalizeToEnglish', () => {
    it('should normalize a full Spanish CV document', () => {
      const doc = {
        cv: {
          nombre: 'Juan',
          ubicación: 'Madrid',
          secciones: {
            Experience: [
              { empresa: 'Google', cargo: 'SWE', logros: ['built stuff'] }
            ]
          }
        },
        design: { theme: 'classic', colors: { name: '#000' } },
      };
      const result = normalizeToEnglish(doc);
      expect(result.cv.name).toBe('Juan');
      expect(result.cv.location).toBe('Madrid');
      expect(result.cv.sections).toBeDefined();
      expect(result.design.theme).toBe('classic');
      expect(result.design.colors.name).toBe('#000');
    });

    it('should pass through English documents unchanged', () => {
      const doc = {
        cv: { name: 'John', location: 'NYC' },
        design: { theme: 'mart' },
      };
      const result = normalizeToEnglish(doc);
      expect(result.cv.name).toBe('John');
      expect(result.cv.location).toBe('NYC');
    });

    it('should handle null and undefined gracefully', () => {
      expect(normalizeToEnglish(null)).toBeNull();
      expect(normalizeToEnglish(undefined)).toBeUndefined();
      expect(normalizeToEnglish('string')).toBe('string');
    });
  });

  describe('switchYamlLanguage', () => {
    it('should switch from English to Spanish', () => {
      const doc = {
        cv: { name: 'John', location: 'NYC', sections: { Experience: [{ company: 'Google' }] } },
        design: { theme: 'mart' },
      };
      const result = switchYamlLanguage(doc, 'spanish');
      expect(result.cv.nombre).toBe('John');
      expect(result.cv.ubicación).toBe('NYC');
      expect(result.cv.secciones).toBeDefined();
      expect(result.design.theme).toBe('mart');
    });

    it('should switch from Spanish to English', () => {
      const doc = {
        cv: { nombre: 'Juan', ubicación: 'Madrid' },
        design: { theme: 'classic' },
      };
      const result = switchYamlLanguage(doc, 'english');
      expect(result.cv.name).toBe('Juan');
      expect(result.cv.location).toBe('Madrid');
    });

    it('should be idempotent (EN→EN = no change)', () => {
      const doc = { cv: { name: 'John', location: 'NYC' } };
      const result = switchYamlLanguage(doc, 'english');
      expect(result.cv.name).toBe('John');
      expect(result.cv.location).toBe('NYC');
    });

    it('should handle round-trip (EN→ES→EN)', () => {
      const original = {
        cv: { name: 'John', location: 'NYC', phone: '123', highlights: ['a', 'b'] },
      };
      const spanish = switchYamlLanguage(original, 'spanish');
      expect(spanish.cv.nombre).toBe('John');
      
      const backToEnglish = switchYamlLanguage(spanish, 'english');
      expect(backToEnglish.cv.name).toBe('John');
      expect(backToEnglish.cv.location).toBe('NYC');
      expect(backToEnglish.cv.phone).toBe('123');
    });

    it('should translate section names EN→ES', () => {
      const doc = {
        cv: {
          name: 'John',
          sections: {
            Experience: [{ company: 'Google' }],
            Education: [{ institution: 'MIT' }],
            Skills: [{ label: 'Python' }],
            'Personal Projects': [{ name: 'App' }],
          },
        },
      };
      const result = switchYamlLanguage(doc, 'spanish');
      expect(result.cv.secciones).toHaveProperty('Experiencia');
      expect(result.cv.secciones).toHaveProperty('Educación');
      expect(result.cv.secciones).toHaveProperty('Habilidades');
      expect(result.cv.secciones).toHaveProperty('Proyectos Personales');
      expect(result.cv.secciones).not.toHaveProperty('Experience');
      expect(result.cv.secciones).not.toHaveProperty('Education');
    });

    it('should translate section names ES→EN', () => {
      const doc = {
        cv: {
          nombre: 'Juan',
          secciones: {
            Experiencia: [{ empresa: 'Google' }],
            'Educación': [{ institución: 'UNAB' }],
            Habilidades: [{ etiqueta: 'Python' }],
            'Proyectos Personales': [{ nombre: 'App' }],
          },
        },
      };
      const result = switchYamlLanguage(doc, 'english');
      expect(result.cv.sections).toHaveProperty('Experience');
      expect(result.cv.sections).toHaveProperty('Education');
      expect(result.cv.sections).toHaveProperty('Skills');
      expect(result.cv.sections).toHaveProperty('Personal Projects');
      expect(result.cv.sections).not.toHaveProperty('Experiencia');
    });

    it('should preserve custom (untranslatable) section names', () => {
      const doc = {
        cv: {
          name: 'John',
          sections: {
            Experience: [{ company: 'Google' }],
            'My Custom Section': [{ name: 'Something' }],
          },
        },
      };
      const result = switchYamlLanguage(doc, 'spanish');
      expect(result.cv.secciones).toHaveProperty('Experiencia');
      expect(result.cv.secciones).toHaveProperty('My Custom Section');
    });

    it('should roundtrip section names (EN→ES→EN)', () => {
      const doc = {
        cv: {
          name: 'John',
          sections: {
            Experience: [{ company: 'Google' }],
            Education: [{ institution: 'MIT' }],
            Skills: [{ label: 'Python' }],
          },
        },
      };
      const spanish = switchYamlLanguage(doc, 'spanish');
      const english = switchYamlLanguage(spanish, 'english');
      expect(Object.keys(english.cv.sections)).toEqual(['Experience', 'Education', 'Skills']);
    });

    it('should not translate social_networks content', () => {
      const doc = {
        cv: {
          name: 'John',
          social_networks: [
            { network: 'LinkedIn', username: 'john' },
            { network: 'GitHub', username: 'john' },
          ],
        },
      };
      const result = switchYamlLanguage(doc, 'spanish');
      expect(result.cv.social_networks[0].network).toBe('LinkedIn');
      expect(result.cv.social_networks[0].username).toBe('john');
    });

    it('should handle null/undefined/empty gracefully', () => {
      expect(switchYamlLanguage(null, 'spanish')).toBeNull();
      expect(switchYamlLanguage(undefined, 'english')).toBeUndefined();
      expect(switchYamlLanguage({}, 'spanish')).toEqual({});
      expect(switchYamlLanguage({ cv: {} }, 'spanish')).toEqual({ cv: {} });
    });

    it('should handle empty sections object', () => {
      const doc = { cv: { name: 'John', sections: {} } };
      const result = switchYamlLanguage(doc, 'spanish');
      expect(result.cv.secciones).toEqual({});
    });

    it('should preserve entry content during section name translation', () => {
      const doc = {
        cv: {
          name: 'John',
          sections: {
            Experience: [
              { company: 'Google', position: 'SWE', highlights: ['Built APIs'] }
            ],
          },
        },
      };
      const result = switchYamlLanguage(doc, 'spanish');
      const exp = result.cv.secciones['Experiencia'];
      expect(exp).toHaveLength(1);
      expect(exp[0].empresa).toBe('Google');
      expect(exp[0].cargo).toBe('SWE');
      expect(exp[0].logros).toEqual(['Built APIs']);
    });
  });
});
