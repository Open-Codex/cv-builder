# TODO: YaCV

> **Convenciones:**
>
> - `[ ]` Pendiente · `[/]` En progreso · `[x]` Completado
> - Todo item completado lleva timestamp: `[x] Tarea — YYYY-MM-DD HH:MM:SS`
> - Las épicas se referencian como `[EPIC-NNN]` y sus subtareas como `[TASK-NNN]`

---

## 🔴 En Progreso

---

## 🟡 Próximamente

- [ ] `[EPIC-001]` Optimización de bundle
  - [ ] `[TASK-001]` Auditar fonts bundleadas y eliminar no utilizadas (Fontin, XCharter, Nunito, IBM Plex Sans)
  - [ ] `[TASK-002]` Evaluar lazy loading del compilador WASM
- [ ] `[EPIC-002]` CI/CD para standalone
  - [ ] `[TASK-003]` Configurar GitHub Actions para build y deploy automático
  - [ ] `[TASK-004]` Integrar tests Playwright en CI
- [ ] `[EPIC-003]` Mejoras UX
  - [ ] `[TASK-005]` Optimizar experiencia mobile para edición prolongada
  - [ ] `[TASK-006]` Evaluar soporte de más idiomas (PT, FR)

---

## ✅ Completado

- [x] `[EPIC-100]` Motor de renderizado — 2026-03-21 00:00:00
  - [x] `[TASK-100]` Implementar `yamlToTypst.ts` con registry de temas — 2026-03-20 00:00:00
  - [x] `[TASK-101]` Compilador Typst WASM en Web Worker — 2026-03-20 00:00:00
  - [x] `[TASK-102]` Debounce de renderizado ajustado a 200ms — 2026-03-21 00:00:00
- [x] `[EPIC-101]` Editor y UI — 2026-03-21 00:00:00
  - [x] `[TASK-103]` Integración Monaco Editor en modo uncontrolled (fix cursor jump) — 2026-03-21 00:20:00
  - [x] `[TASK-104]` Deshabilitar sugerencias de autocompletado en Monaco — 2026-03-21 00:20:00
  - [x] `[TASK-105]` Toolbar con controles de tema, estilo, color, idioma — 2026-03-20 02:00:00
  - [x] `[TASK-106]` Panel "¿Qué es YaCV?" con contenido rico bilingüe — 2026-03-21 01:16:00
  - [x] `[TASK-107]` Panel SizesDropdown para ajuste tipográfico — 2026-03-20 02:00:00
- [x] `[EPIC-102]` i18n y localización — 2026-03-21 00:34:00
  - [x] `[TASK-108]` Sistema i18n completo ES/EN (43 keys) — 2026-03-21 00:34:00
  - [x] `[TASK-109]` Traductor de keys YAML español→inglés (`yamlKeyTranslator.ts`) — 2026-03-20 00:00:00
  - [x] `[TASK-110]` Templates default bilingües (showcase EN, showcase ES, skeleton EN, skeleton ES) — 2026-03-21 00:33:00
  - [x] `[TASK-111]` Título dinámico del documento según idioma UI — 2026-03-20 16:00:00
- [x] `[EPIC-103]` Registry de temas — 2026-03-21 00:30:00
  - [x] `[TASK-112]` 5 temas con defaults completos (mart, classic, moderncv, engineeringclassic, engineeringresumes) — 2026-03-20 14:00:00
  - [x] `[TASK-113]` Rename sb2nov → mart — 2026-03-21 00:30:00
  - [x] `[TASK-114]` Fix hardcoded fallbacks en `yamlToTypst.ts` (6 bugs corregidos) — 2026-03-21 00:28:00
- [x] `[EPIC-104]` Testing — 2026-03-21 00:28:00
  - [x] `[TASK-115]` 98 unit tests (themeRegistry, yamlValidator, yamlKeyTranslator, yamlToTypst) — 2026-03-21 00:28:00
  - [x] `[TASK-116]` Tests de resiliencia y edge cases para sync UI↔PDF — 2026-03-21 00:28:00
- [x] `[EPIC-105]` Preparación standalone — 2026-03-21 00:00:00
  - [x] `[TASK-117]` Auditoría de acoplamiento (resultado: 0 coupling al repo padre) — 2026-03-21 00:00:00
  - [x] `[TASK-118]` Limpieza de archivos temporales/debug — 2026-03-21 00:00:00
  - [x] `[TASK-119]` Creación de `.gitignore` standalone — 2026-03-21 00:00:00
  - [x] `[TASK-120]` Remoción de `vite-plugin-top-level-await` (innecesario) — 2026-03-21 00:00:00
- [x] `[EPIC-106]` Branding y UX copy — 2026-03-21 01:16:00
  - [x] `[TASK-121]` Branding "YaCV" en tagline, título, favicon (📄) — 2026-03-21 00:34:00
  - [x] `[TASK-122]` Botón "Descargar PDF" / "Download PDF" — 2026-03-21 00:19:00
  - [x] `[TASK-123]` Mensaje WASM con explicación breve — 2026-03-21 00:35:00
- [x] `[EPIC-107]` Documentación V1.0.0 — 2026-03-21 01:22:00
  - [x] `[TASK-124]` Crear eje documental Kairós (MASTER-SPEC, TODO, CHANGELOG, MEMORY, USER-DECISIONS) — 2026-03-21 01:22:00
