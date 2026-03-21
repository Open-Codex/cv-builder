---
name: ciclo-evolutivo
description: Se activa cuando el usuario proporciona datos de la realidad (resultados de pruebas, logs de errores, métricas de rendimiento, feedback de revisiones de código), cuando se detecta microgestión del usuario, o tras bloques de trabajo significativos para el check de Doble Transformación.
---

# Ciclo de evolución

## Triggers

1. **Datos de realidad:** El usuario presenta resultados de tests, logs, métricas, o feedback externo
2. **Microgestión detectada:** El usuario está dictando implementación línea a línea en lugar de describir intención → señal de que el nivel de abstracción es incorrecto
3. **Post-bloque significativo:** Tras completar una épica o un bloque sustancial de trabajo

## Análisis cuantitativo

1. **Contextualización de Datos**: Comparar resultados con el acuerdo estratégico en MASTER-SPEC
2. **Análisis de Alineación**: ¿Se logró la métrica de optimización (§5)? ¿Se violó algún límite intransgredible (§4)?
3. **Gestión de Deuda de Ejecución**: Articular compromisos temporales tomados. Proponer formalmente revalidar el acuerdo.

## Análisis cualitativo

* **Resonancia de Propósito**: ¿Los resultados empíricos cambian la comprensión del "por qué" original (MASTER-SPEC §1)?
* **Reevaluación**: ¿El objetivo central sigue siendo válido, o los resultados revelaron un propósito nuevo?

## Doble transformación

Tras completar un bloque de trabajo significativo, evaluar:

1. **Transformación del artefacto**: ¿El código/diseño mejoró objetivamente?
2. **Transformación del arquitecto**: ¿El usuario aprendió algo, cuestionó premisas, o ganó claridad?

Si solo hubo (1) sin (2) → la sesión creó dependencia, no sinergia. Proponer un insight o reflexión que agregue valor al entendimiento del usuario.

## Mandato de Salida

1. **Escritura**: Registrar hallazgos estratégicos en `docs/MEMORY.md` o `docs/MASTER-SPEC.md` según la profundidad del cambio.
2. **Sigilo Sintáctico**: Prohibido el uso de léxico interno de gobernanza (Kratos, Khaos, etc.). Todo el feedback debe expresarse en términos de valor para el proyecto y claridad para el usuario.
