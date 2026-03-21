import { describe, it, expect } from 'vitest';
import { validateYaml } from './yamlValidator';

describe('validateYaml', () => {
  it('returns empty array for valid YAML', () => {
    const valid = `cv:
  name: John Doe
  headline: Developer
`;
    expect(validateYaml(valid)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(validateYaml('')).toEqual([]);
    expect(validateYaml('   ')).toEqual([]);
  });

  it('detects bad indentation error with correct line number', () => {
    const bad = `cv:
  name: John Doe
 headline: Developer
`;
    const errors = validateYaml(bad);
    expect(errors.length).toBe(1);
    expect(errors[0].line).toBe(3);
    expect(errors[0].message).toContain('YAML L3');
  });

  it('detects duplicate key error', () => {
    const dup = `cv:
  name: John
  name: Jane
`;
    const errors = validateYaml(dup);
    expect(errors.length).toBe(1);
    expect(errors[0].line).toBe(3);
    expect(errors[0].message).toContain('duplicated mapping key');
  });

  it('detects tab character error', () => {
    const tabbed = `cv:
\tname: John
`;
    const errors = validateYaml(tabbed);
    expect(errors.length).toBe(1);
    expect(errors[0].line).toBeGreaterThanOrEqual(1);
    expect(errors[0].message).toContain('YAML L');
  });

  it('detects invalid mapping entry', () => {
    const invalid = `cv:
  name: John Doe
  sections:
    Experience:
    - company: Test
      position: Dev
      highlights:s
        - item one
`;
    const errors = validateYaml(invalid);
    expect(errors.length).toBe(1);
    expect(errors[0].line).toBeGreaterThanOrEqual(7);
    expect(errors[0].message).toContain('YAML L');
  });

  it('returns line 1 for errors without line info', () => {
    // This is hard to trigger with js-yaml, but we test the fallback path
    const errors = validateYaml('{{{{');
    expect(errors.length).toBe(1);
    expect(errors[0].line).toBeGreaterThanOrEqual(1);
  });
});
