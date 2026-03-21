# HEURÍSTICAS

> **Criterio de inclusión:** Este archivo contiene solo heurísticas **transferibles** y patrones estratégicos observados. No es un log de cambios.

---

## Catálogo de Heurísticas

### [HEU-001] Controlled vs Uncontrolled Monaco

**Patrón:** Usar Monaco en modo `value={...}` (controlled) causa cursor jump cuando el valor se actualiza externamente. El fix canónico es usar `defaultValue` + `model.pushEditOperations()` para updates programáticos.

**Contexto:** El editor Monaco re-renderiza completamente cuando `value` cambia, reseteando la posición del cursor. En modo uncontrolled, los updates externos se aplican como operaciones de edición que preservan cursor y undo stack.

**Aplicabilidad:** Cualquier editor React que integre Monaco con actualizaciones externas frecuentes (ej: formateo automático, templates, sync con otros paneles).

### [HEU-002] Hardcoded Fallbacks son Bugs Silenciosos

**Patrón:** Cuando un sistema tiene valores default por tema/config (ej: `themeRegistry`), pero los fallbacks en el punto de consumo están hardcodeados, los defaults del tema se ignoran silenciosamente. Esto crea desync entre UI y render.

**Contexto:** En `yamlToTypst.ts`, 6 valores de fallback estaban hardcodeados (`'1.2em'`, `false`, `true`, `'•'`) en vez de usar `td.sections.*`, `td.links.*`, `td.header.*`. El resultado: el PDF no reflejaba los defaults del tema seleccionado.

**Regla:** Todo fallback debe referenciar la fuente de verdad del default (theme registry, config, schema), nunca un literal inline.

### [HEU-003] Tests de Integración como Detectores de Desync

**Patrón:** Los tests unitarios de helpers no detectan bugs de sync entre componentes. Los tests de integración que pasan YAML completo y verifican el output Typst sí lo hacen.

**Contexto:** Los 6 bugs de hardcoded fallbacks fueron descubiertos por tests de integración que verificaban `expect(result).toContain('links-underline: true')` para el tema sb2nov — no por tests de los helpers individuales.

**Regla:** Para pipelines de transformación (YAML→Typst→PDF), siempre escribir tests end-to-end que verifiquen el output final contra los defaults esperados de cada configuración.

### [HEU-004] Volumen > Perfección en CVs para ATS

**Patrón:** Un montón de CVs "suficientes" — cada uno con keywords ajustadas al JD — outperforman a un solo CV "perfecto" enviado a todas las ofertas. Los filtros ATS premian la especificidad léxica, no la calidad literaria.

**Contexto:** Se enviaron 36 CVs únicos en un solo día. Todos compartían la misma base factual (Knowledge Base), pero variaban en keywords, elección de proyectos personales y énfasis técnico según la oferta. Sin mentiras — solo la comprensión del ecosistema.

**Regla:** Automatizar la generación de CVs permite escalar esta estrategia. La herramienta debe optimizar para velocidad de iteración (debounce 200ms, templates precargadas, shortcuts de teclado) más que para perfección unitaria.
