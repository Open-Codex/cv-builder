# DECISIONES

> **Propósito:** Registro de la agencia humana y decisiones estratégicas con alto costo de reversibilidad.

---

### DEC-001 — Arquitectura 100% Client-Side

- **Fecha:** 2026-03-20
- **Contexto:** Se evaluó backend vs client-side para el motor de renderizado.
- **Decisión:** Todo el procesamiento (YAML→Typst→PDF) ocurre en el navegador via Typst WASM.
- **Consecuencias:** Privacidad total, deploy estático, pero bundle pesado (~30MB WASM). Sin posibilidad de funcionalidades server-side (colaboración, historial cloud).
- **Reversibilidad:** Baja — la arquitectura entera depende de esta decisión.

### DEC-002 — Rename sb2nov → mart

- **Fecha:** 2026-03-21
- **Contexto:** El tema principal del CV del usuario se llamaba "sb2nov" (nombre original del repositorio upstream de RenderCV).
- **Decisión:** Renombrarlo a "mart" como branding propio.
- **Consecuencias:** Todos los YAMLs con `theme: sb2nov` dejarán de funcionar. Migración aplicada en templates y defaults.
- **Reversibilidad:** Media — requiere sed global pero es mecánico.

### DEC-003 — Monaco Editor en modo Uncontrolled

- **Fecha:** 2026-03-21
- **Contexto:** El modo controlled (`value={...}`) causaba cursor jump al actualizar el contenido externamente.
- **Decisión:** Cambiar a `defaultValue` + `pushEditOperations()` para updates programáticos.
- **Consecuencias:** Preserva cursor y undo stack. Requiere flag `isUserEditRef` para evitar loops de update redundantes.
- **Reversibilidad:** Media — revertir requiere re-implementar la lógica de sync.

### DEC-004 — Debounce 200ms

- **Fecha:** 2026-03-21
- **Contexto:** El debounce original era 800ms, lo cual generaba una percepción de lag.
- **Decisión:** Reducir a 200ms.
- **Consecuencias:** Renderizado mucho más responsivo, pero mayor carga computacional en cambios rápidos. Aceptable dado que Typst WASM compila rápido.
- **Reversibilidad:** Alta — es un solo parámetro.

### DEC-005 — Branding "YaCV"

- **Fecha:** 2026-03-21
- **Contexto:** La página no tenía nombre propio.
- **Decisión:** Adoptar "YaCV" como nombre del producto con tagline "Genera CVs a partir de texto".
- **Consecuencias:** Afecta títulos, meta tags, favicon, panel about, templates. Define la identidad del proyecto para su extracción standalone.
- **Reversibilidad:** Media — grep + sed global.
