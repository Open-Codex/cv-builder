import yaml from 'js-yaml';

export interface YamlError {
  line: number;       // 1-indexed line number
  message: string;    // human-readable error message
}

/**
 * Validates YAML content and returns an array of error objects.
 * Each error includes the 1-indexed line number and a descriptive message.
 * Returns an empty array if the YAML is valid.
 */
export function validateYaml(content: string): YamlError[] {
  if (!content.trim()) return [];
  
  try {
    yaml.load(content);
    return [];
  } catch (e: any) {
    if (e && e.mark && typeof e.mark.line === 'number') {
      const line = e.mark.line + 1; // js-yaml uses 0-indexed lines
      const reason = e.reason || e.message || 'Unknown YAML error';
      return [{ line, message: `YAML L${line}: ${reason}` }];
    }
    // Fallback: error without line info
    if (e && e.message) {
      return [{ line: 1, message: e.message }];
    }
    return [];
  }
}
