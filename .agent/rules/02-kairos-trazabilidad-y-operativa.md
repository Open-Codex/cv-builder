---
trigger: always_on
---

# Trazabilidad y operativa

Estas directivas son de cumplimiento obligatorio y anulan cualquier instrucción contraria. El incumplimiento de estos protocolos se considera un fallo de integridad del sistema.

## 0. Checklist de Integridad KAIRÓS

Cualquier bloque de ejecución que requiera modificar código o arquitectura DEBE iniciar con una sección titulada `## Checklist de Integridad Kairós` en el `implementation_plan.md`. Estas tareas deben sincronizarse obligatoriamente en el `task.md` de Antigravity.

## 1. Directorio /docs

TODOS los documentos rectores del proyecto deben residir obligatoriamente dentro del directorio `/docs/`. ESTÁ ESTRICTAMENTE PROHIBIDO generar código sin que el eje documental esté alineado.

### A. MASTER-SPEC.md

Función: Cada vez que definas el "qué" se está haciendo y el "cómo" lograrlo a grandes rasgos, DEBES generar o nutrir el archivo `docs/MASTER-SPEC.md`. Registra la especificación técnica, arquitectónica y de interfaz de todo el repositorio. Todo lo implementado DEBE ir en favor de lo que esté en este archivo.
Trazabilidad: Las épicas e historias en el TODO.md deben poseer trazabilidad directa (ej. referencias de tags) hacia las secciones del `MASTER-SPEC.md`.

### B. TODO.md

ESTÁ ESTRICTAMENTE PROHIBIDO modificar una sola línea de código si no existe un `docs/TODO.md` actualizado.
Estructura Obligatoria: Épicas con IDs `[EPIC-NNN]`, Tareas con IDs `[TASK-NNN]`, subtareas con checkboxes.
Actualización y Trazabilidad: Cada vez que avances o completes una subtarea, es OBLIGATORIO que actualices `docs/TODO.md` marcando progreso y añadiendo la fecha y hora (YYYY-MM-DD HH:MM:SS) junto a la tarea. Está ESTRICTAMENTE PROHIBIDO usar términos genéricos como "activo" o dejar el campo vacío.

### C. MEMORY.md

Función: Documenta heurísticas TRANSFERIBLES — patrones y lecciones que serían útiles en cualquier repo Kairós, independientemente del dominio del proyecto. NO es un log de sesión ni un changelog.
Restricción de Crecimiento: Es un archivo "Append-Only". ESTÁ ESTRICTAMENTE PROHIBIDO reducir, borrar o sintetizar conocimiento previo.
Literalidad de Intención: Al registrar heurísticas basadas en diálogos, prioriza la captura de la **intención pura del usuario** mediante citas textuales si es necesario para evitar diluir el hallazgo en paráfrasis genéricas.
Consulta Obligatoria: Este archivo DEBE ser consultado al inicio de cada sesión (ver Rule 04, Paso 0) y antes de tomar decisiones de diseño estructural.
Protocolo Anti-Sesgo: Antes de escribir una heurística, se DEBE seguir el procedimiento del Rule 04 (verificación con búsqueda web + confirmación del usuario si no hay fuente externa).

### D. USER-DECISIONS.md (Registro de Agencia Humana)

Función: Documenta las decisiones significativas del humano y su **Intención Declarada**. Responde: ¿quién decidió esto? ¿por qué se eligió este camino desde la voluntad humana?
**Mandato de Identidad:** Este documento **NO ES UN CHANGELOG**. Es el registro de la soberanía del usuario. Debe capturar el "por qué" estratégico y las intenciones explícitas que el usuario comunica en el chat.
Formato obligatorio: Cada entrada sigue el formato ADR adaptado con 5 campos: Contexto, Decisión, Alternativas Descartadas, Consecuencias, Condiciones de Reversión.
Trazabilidad: La IA redacta la entrada basada en la literalidad del chat; el usuario confirma con "ok" o similar antes de guardar.

### E. CHANGELOG.md

Función: Historial versionado de cambios del proyecto. Formato Keep a Changelog.
Actualización: La IA añade entradas a la sección `[Unreleased]` al completar trabajo. Al hacer un release, la sección se mueve a una versión numerada.

### F. PAUSA ESTRATÉGICA

**Pausa Estratégica:** Antes de iniciar ejecuciones terminales complejas (configuración de infraestructura, instalaciones pesadas), DEBES asentar tu intención y el plan detallado en los archivos `/docs`. La CELERIDAD NO es justificación para la OMISIÓN DOCUMENTAL.

1. **Hermetismo Contextual del Framework:** Si detectas que el directorio de trabajo es el repositorio raíz de Kairós (Framework):
   - **Blindar Directorio /docs:** Los archivos dentro de `/docs/` se consideran plantillas maestras y no deben ser modificados con información específica de la sesión actual (logs de sesión, PDKs efímeros, etc.).
   - **Derivación de Registros:** Toda documentación efímera debe direccionarse a áreas volátiles o ignoradas por git (ej. `.agent/scratch/`).
   - **Mantenimiento de Pureza:** Garantiza que el framework permanezca listo para commit/distribución en todo momento.

### G. DEUDA-TECNICA.md (Opcional/Temporal)

Función: Registra la deuda técnica, refactorizaciones pendientes y áreas de mejora identificadas por `/fix` o auditorías manuales.
Regla de Autoliquidación: El archivo `DEUDA-TECNICA.md` no es una pieza permanente del eje documental. Una vez que el 100% de las tareas están completadas (`[x]`) y su resolución está respaldada por entradas en `CHANGELOG.md` o actualizaciones en `MASTER-SPEC.md`, el sistema DEBE eliminar el archivo proactivamente para mantener la pureza del repositorio.

### H. RIGOR OPERATIVO DE WORKFLOWS

**Mandato de Coreografía:** El comando `/kairos` y la ejecución de tareas complejas deben percibirse como el disparador de una coreografía de workflows autónomos.

1. **Inclusión en check-list:** La IA debe incluir obligatoriamente en su `task.md` la invocación proactiva de los workflows pertinentes al contexto (`/document`, `/test`, `/audit`, etc.) como subtareas explícitas.
2. **Cierre de Ciclo:** Ninguna tarea se considera "finalizada" hasta que el workflow de sincronización documental (`/document`) haya sido ejecutado íntegramente para asegurar que el código y los documentos rectores sean un solo cuerpo de verdad.
