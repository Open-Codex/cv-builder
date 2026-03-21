# DECISIONES

> **Propósito:** Registro de la agencia humana y decisiones estratégicas con alto costo de reversibilidad.

---

### DEC-001 — Arquitectura 100% Client-Side

- **Fecha:** 2026-03-20
- **Contexto:** Se evaluó backend vs client-side para el motor de renderizado.
- **Decisión:** Todo el procesamiento (YAML→Typst→PDF) ocurre en el navegador via Typst WASM.
- **Alternativas Descartadas:** Backend con API REST para compilación Typst (requeriría servidor, costos de hosting, latencia de red).
- **Consecuencias:** Privacidad total, deploy estático, pero bundle pesado (~30MB WASM). Sin posibilidad de funcionalidades server-side (colaboración, historial cloud).
- **Condiciones de Reversión:** Baja — la arquitectura entera depende de esta decisión. Revertir implicaría re-implementar el pipeline completo con backend.

### DEC-002 — Rename sb2nov → mart

- **Fecha:** 2026-03-21
- **Contexto:** El tema principal del CV del usuario se llamaba "sb2nov" (nombre original del repositorio upstream de RenderCV).
- **Decisión:** Renombrarlo a "mart" como branding propio.
- **Alternativas Descartadas:** Mantener "sb2nov" (sin identidad propia) o usar otro nombre genérico.
- **Consecuencias:** Todos los YAMLs con `theme: sb2nov` dejarán de funcionar. Migración aplicada en templates y defaults.
- **Condiciones de Reversión:** Media — requiere sed global pero es mecánico. No hay usuarios externos con YAMLs guardados aún.

### DEC-003 — Monaco Editor en modo Uncontrolled

- **Fecha:** 2026-03-21
- **Contexto:** El modo controlled (`value={...}`) causaba cursor jump al actualizar el contenido externamente.
- **Decisión:** Cambiar a `defaultValue` + `pushEditOperations()` para updates programáticos.
- **Alternativas Descartadas:** Mantener modo controlled con workaround de `cursor.restorePosition()` (frágil, no resuelve undo stack).
- **Consecuencias:** Preserva cursor y undo stack. Requiere flag `isUserEditRef` para evitar loops de update redundantes.
- **Condiciones de Reversión:** Media — revertir requiere re-implementar la lógica de sync. El patrón uncontrolled es más robusto, difícilmente se revertiría.

### DEC-004 — Debounce 200ms

- **Fecha:** 2026-03-21
- **Contexto:** El debounce original era 800ms, lo cual generaba una percepción de lag.
- **Decisión:** Reducir a 200ms.
- **Alternativas Descartadas:** Debounce adaptativo basado en tamaño del YAML (complejidad innecesaria para el caso de uso).
- **Consecuencias:** Renderizado mucho más responsivo, pero mayor carga computacional en cambios rápidos. Aceptable dado que Typst WASM compila rápido.
- **Condiciones de Reversión:** Alta — es un solo parámetro. Puede ajustarse en cualquier momento sin efectos secundarios.

### DEC-005 — Branding "YaCV"

- **Fecha:** 2026-03-21
- **Contexto:** La página no tenía nombre propio.
- **Decisión:** Adoptar "YaCV" como nombre del producto con tagline "Genera CVs a partir de texto".
- **Alternativas Descartadas:** "RenderCV Web" (demasiado genérico y acoplado al upstream), "QuickCV" (nombre ya en uso).
- **Consecuencias:** Afecta títulos, meta tags, favicon, panel about, templates. Define la identidad del proyecto para su extracción standalone.
- **Condiciones de Reversión:** Media — grep + sed global. Afectaría branding público si el sitio ya tiene usuarios.

### DEC-006 — Deploy vía GitHub Actions

- **Fecha:** 2026-03-21
- **Contexto:** El sitio necesitaba deploy automático a GitHub Pages. Se evaluó entre deploy manual (`gh-pages` branch) y GitHub Actions.
- **Decisión:** Usar GitHub Actions con `actions/deploy-pages@v4` activado por push a `main`.
- **Alternativas Descartadas:** Deploy manual con `gh-pages` npm package (requiere token y ejecución local), Netlify/Vercel (innecesarios para un sitio estático ya hosteado en GitHub).
- **Consecuencias:** Deploy fully automatizado. Requiere permisos de Pages en el repo y `actions/upload-pages-artifact` en el workflow.
- **Condiciones de Reversión:** Alta — se puede volver a deploy manual eliminando el workflow. Sin efectos colaterales.
