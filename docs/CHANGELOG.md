# CHANGELOG

> Todas las notas de cambios para este proyecto serán documentadas en este archivo.
> Formato basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
>
> **Contexto fundacional:** YaCV nació en 4 días de desarrollo, a partir de RenderCV (open source) y Typst WASM. Construido por un ingeniero recién titulado que se negó a que los filtros ATS y la burocracia de los CVs lo frenaran. Lo que empezó como necesidad personal — un CV distinto para cada postulación, 36 en un solo día — se convirtió en una herramienta pública para todos los que están en la misma trinchera.

## [Unreleased]

### Added

- GitHub Actions workflow para deploy automático a GitHub Pages.
- Archivo `.nojekyll` para deshabilitar procesamiento Jekyll.
- 31 tests E2E Playwright para cambio de idioma (`e2e/i18n.spec.ts`): UI sync, selector display, YAML keys, valores condicionales, edge cases.
- 14 tests E2E Playwright para sync toolbar (`e2e/toolbar-sync.spec.ts`): Demo CV, Plantilla vacía, cambio de tema, operaciones combinadas.

### Changed

- `LanguageSelector` muestra el idioma **actual** (🇬🇧EN / 🇪🇸ES) en vez del idioma destino.
- `handleThemeLangChange` usa `hintStateRef` en vez de capturar `hintState` en closure de `useCallback`.
- `handleReset` y `handleLoadShowcase` marcan `isToolbarUpdateRef` para prevenir re-sync innecesario.

### Fixed

- Fix `lib.typ` 404 en sitio desplegado: regla `*.typ` en `.gitignore` excluía archivos necesarios del paquete Typst.
- **Fix crítico: toggle ES→EN no actualizaba el editor.** `pushEditOperations` disparaba `onChange` de Monaco que marcaba `isUserEditRef=true`, causando que la siguiente sincronización externa se ignorara. Corregido con guard `isProgrammaticRef` en `EditorPanel.tsx`.
- **Fix: "Plantilla vacía" y "Demo CV" no actualizaban el editor.** Misma causa raíz que el toggle de idioma — corregido por el mismo `isProgrammaticRef`.
- Fix inicialización dual de idioma: `I18nProvider` cambiado a inicialización síncrona para eliminar flicker.
- Eliminado hook muerto `useLanguageDetection.ts`.

---

## [1.0.0] — 2026-03-21

### Added

- Motor de renderizado YAML→Typst→PDF 100% client-side con compilador Typst WASM.
- Editor Monaco con validación YAML en tiempo real (modo uncontrolled, sin cursor jump).
- 5 temas de CV: Mart, Classic, ModernCV, EngineeringClassic, EngineeringResumes.
- Registry de temas con defaults completos de tipografía, colores, spacing y templates de entries.
- Panel de ajuste tipográfico (SizesDropdown): fuente, tamaño, peso, espaciado por elemento.
- Selector de color de acento con preview en tiempo real.
- Sistema i18n bilingüe ES/EN (43 keys) con detección automática de idioma.
- Traductor de keys YAML español→inglés (`yamlKeyTranslator.ts`).
- Templates default bilingües: showcase (EN/ES) y skeleton (EN/ES).
- Panel "¿Qué es YaCV?" con hover tooltip de contenido rico bilingüe.
- Descarga de PDF y YAML desde la toolbar.
- Carga de archivos YAML externos.
- Persistencia completa en localStorage (YAML, tema, fuente, colores).
- Favicon emoji 📄.
- Título dinámico del documento según idioma UI.
- Mensaje WASM loading con explicación breve.
- 98 unit tests (themeRegistry, yamlValidator, yamlKeyTranslator, yamlToTypst).
- Tests de resiliencia y edge cases para sincronización UI↔PDF.
- `.gitignore` para deploy standalone.
- Documentación Kairós V1.0.0 (MASTER-SPEC, TODO, CHANGELOG, MEMORY, USER-DECISIONS).

### Fixed

- Bug de cursor jump en Monaco Editor (switch a modo uncontrolled + `pushEditOperations`).
- 6 hardcoded fallbacks en `yamlToTypst.ts` que ignoraban theme defaults (links-underline, show-icons, display-urls, nested-bullet, space-between-entries).
- Build error por dependencia innecesaria `vite-plugin-top-level-await` (removida).
- Debounce de renderizado reducido de 800ms a 200ms.
