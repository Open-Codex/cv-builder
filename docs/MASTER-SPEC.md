# MASTER-SPEC: YaCV

> **Propósito:** YaCV no es un convertor de YAML a PDF. Es un arma forjada en la obstinación — nacida de la necesidad real de un ingeniero recién titulado que se negó a dejar que los filtros ATS y la burocracia de los CVs frenaran su avance. Cada línea de código apesta a su espíritu: la rabia transformada en herramienta, la frustración canalizada en funcionalidad. Un producto 100% client-side, sin suscripciones, sin tracking, sin excusas — para todos los que están en la trinchera buscando trabajo y saben que un CV "suficiente" es mejor que ninguno.

## 1. El Propósito Guía (Outcome)

Que ninguna persona eficiente pierda tiempo valioso en la actividad ridícula de maquetar un currículum. YaCV existe para que puedas redactar o prototipar CVs rápidamente, descargarlos y seguir con lo que importa: buscar más trabajo, preparar entrevistas, o automejorarte.

El caso de uso original: **un CV distinto para cada postulación**, optimizado para filtros ATS, generado en segundos en vez de horas. 36 CVs únicos en un solo día — todos se parecen, pero cambian las keywords y la elección de proyectos. Sin mentiras. Solo la comprensión del ecosistema y la fabricación de las mejores armas para utilizarlas en el momento adecuado.

Hosteado gratuitamente en GitHub Pages. Sin cuentas, sin membresías, sin rastreo de datos, sin estupideces.

## 2. Definición del Artefacto (Output)

Una **GitHub Page estática** compuesta por:

- **Editor Monaco** (panel izquierdo): edición YAML con validación en tiempo real.
- **Visor PDF** (panel derecho): renderizado live del CV mediante compilador Typst WASM.
- **Toolbar**: controles de tema, estilo tipográfico, colores, idioma (ES/EN), descarga PDF/YAML, carga YAML, reset.
- **Panel "¿Qué es YaCV?"**: tooltip informativo con features y créditos.
- **Motor de conversión** `yamlToTypst`: traduce YAML → fuente Typst con preamble de diseño parametrizado.
- **Registry de temas**: 5 temas (mart, classic, moderncv, engineeringclassic, engineeringresumes) con defaults de tipografía, colores, espaciado y plantillas de entries.
- **Traductor de keys** `yamlKeyTranslator`: normaliza YAML con keys en español a formato inglés canónico.
- **Persistencia localStorage**: YAML, tema, fuente, colores — todo persiste entre sesiones.
- **Deploy automatizado:** GitHub Actions workflow que ejecuta build + deploy a GitHub Pages en cada push a `main`.

## 3. Requisitos de Usuario

- **RU-01:** Editar YAML y ver el PDF renderizado en ≤200ms de debounce.
- **RU-02:** Descargar el CV como PDF con un botón.
- **RU-03:** Cambiar tema visual sin perder contenido.
- **RU-04:** Escribir el CV en español (keys en español) o inglés, indistintamente.
- **RU-05:** Ajustar tipografía (fuente, tamaño, peso, espaciado) y colores desde la UI.
- **RU-06:** Cargar un archivo YAML externo para edición.
- **RU-07:** Interfaz bilingüe (ES/EN) con toggle de idioma.
- **RU-08:** Funcionar 100% offline después de la primera carga (WASM cacheado).
- **RU-09:** No enviar ningún dato a servidores externos.

## 4. Límites y Restricciones (Límites Intransgredibles)

- **Zero backend:** No hay API, base de datos ni servidor. Todo corre en el navegador.
- **Sin autenticación:** No hay login, cuentas ni tracking de usuarios.
- **Hosting estático:** Deploy exclusivo en GitHub Pages o equivalente estático.
- **Stack fijo:** React 19 + Vite + Tailwind CSS + Monaco Editor + pdfjs-dist + Typst WASM.
- **Bundle WASM:** El compilador Typst (~30MB) se descarga una vez y se cachea.
- **Temas predefinidos:** Los temas disponibles están definidos en `themeRegistry.ts`. No se soporta carga dinámica de temas.

## 5. Prioridades y Trade-offs

| Prioridad Alta | Se sacrifica |
|---|---|
| Velocidad de renderizado (debounce 200ms) | Tamaño de bundle (WASM ~30MB) |
| Privacidad total (client-side) | Funcionalidades que requieren backend (colaboración, historial cloud) |
| Simplicidad de deploy (estático) | SEO dinámico y server-side rendering |
| Compatibilidad ATS de los PDFs | Diseños visualmente complejos (gráficos, iconos, fotos en CV) |
| Soporte bilingüe ES/EN | Soporte de más idiomas |

## 6. Preguntas Abiertas e Incertidumbre

- **Fonts bundleadas:** Se identificaron fonts potencialmente no utilizadas (Fontin, XCharter, Nunito, IBM Plex Sans). Evaluación de reducción de bundle pendiente.
- **E2E tests en CI:** 45 tests Playwright (31 i18n + 14 toolbar-sync) existen y pasan localmente, pero no están integrados en el pipeline CI de GitHub Actions.
- **Temas adicionales:** ¿Se agregarán más temas en V2? ¿Se soportarán temas custom?
- **Mobile:** La experiencia mobile existe con tabs Editor/Preview, pero no está optimizada para edición prolongada.
