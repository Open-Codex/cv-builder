---
name: ciclo-testing-autonomo
description: Se activa automáticamente cuando la IA completa una tarea que coincide con un trigger definido en docs/TEST.md. Si TEST.md no existe, se desactiva silenciosamente.
---

# Testing autónomo

## Activación

1. Verificar si existe `docs/TEST.md`
2. Si NO existe → desactivarse silenciosamente. No sugerir crear TEST.md automáticamente — el usuario debe ejecutar `/test` para eso.
3. Si existe → leer la sección "Triggers Automáticos" de TEST.md

## Ejecución Autónoma

Después de completar cualquier TASK (marcada como completada en TODO.md), evaluar:

1. ¿La TASK coincide con algún trigger definido en TEST.md?
2. Si sí → ejecutar los tests relevantes sin preguntar al usuario
3. Si no → no ejecutar tests

## Manejo de Resultados

**Tests pasan:** Continuar silenciosamente. No interrumpir el flujo con "todos los tests pasaron" a menos que el usuario lo pida.

**Tests fallan:**

1. Analizar causa raíz
2. Informar al usuario con el error específico y la propuesta de fix
3. Si el fix es trivial y de bajo riesgo → aplicar y re-ejecutar
4. Si el fix requiere decisión del usuario → presentar opciones

## Fallback (TEST.md existe pero sin triggers claros)

Si TEST.md existe pero la sección de triggers está vacía o ambigua:

- Usar juicio sobre la relevancia del cambio realizado
- Si el cambio toca lógica core → ejecutar tests unitarios disponibles
- Si el cambio es cosmético (docs, estilos) → no ejecutar

## Mandato de Salida

1. **Escritura**: Registrar los resultados de las pruebas críticas y fallos persistentes en `docs/MEMORY.md`.
2. **Sigilo Sintáctico**: Prohibido mencionar "skills de testing" o "triggers automáticos". El feedback debe ser puramente técnico (logs, errores, soluciones).
