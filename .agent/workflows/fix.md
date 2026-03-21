---
description: /fix - Diagnostica y resuelve deuda técnica, errores específicos o áreas de mejora estructural en el código.
---

# WORKFLOW: FIX (REMEDIACIÓN Y SANACIÓN)

Este workflow permite auditar la deuda técnica de un proyecto y realizar reparaciones quirúrgicas basadas en la excelencia y la inteligencia operativa.

## Caso A: `/fix` (Sin texto)

1. **Escaneo Global:** Identifica patrones de deuda técnica (tests faltantes, dependencias obsoletas, patrones inconsistentes).
2. **Inventario de Deuda:** Actualiza `docs/DEUDA-TECNICA.md` con un triaje de severidad.
3. **Remediación Masiva:** Aplica "Quick Wins" y propone planes para refactors complejos.

## Caso B: `/fix [texto]` (Focalizado)

- **Acción:** Reparación quirúrgica de la deuda técnica o error específico detallado en el texto del comando.

---

## Fase 1: La Valla de Chesterton

**OBLIGATORIO:** Antes de proponer eliminar o cambiar cualquier lógica existente:

1. Preguntar internamente: "¿Quién puso esto aquí y por qué?".
2. Si no hay respuesta clara en docs/código → Consultar al usuario. No asesines la intención original por una brevedad mal entendida.

## Fase 2: Investigación de Estándares

Para ítems de severidad Alta o Media:

1. Ejecutar el skill `investigacion-estandar`.
2. Triangular soluciones actuales antes de proponer remedios.

## Fase 3: Plan de Sanación y Ejecución

1. **Quick Wins:** Aplicar inmediatamente (tests, dependencias, types).
2. **Refactoring Soberano:** Proponer cambios que honren la arquitectura del `MASTER-SPEC`.
3. **Cierre:** Actualizar `TODO.md` y `USER-DECISIONS.md`.

---

## REGLA DE ORO DE INTELIGENCIA

- El bajo costo temporal no justifica el ruido. Sanar es **precisión**, no sobreproducción.
- Mantén el lenguaje bello y el tono técnico senior en toda la documentación generada.
