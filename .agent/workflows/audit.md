---
description: /audit - Evalúa la calidad de la sesión, extrae aprendizajes estratégicos y actualiza MEMORY.md.
---

# Auditoría de colaboración

Este flujo de trabajo evalúa cualitativa y cuantitativamente la colaboración humano-IA de la sesión.

IMPORTANTE: Los criterios se encuentran en `.agent/evaluacion.md`.

## Paso 0: Viabilidad de la Auditoría

Antes de auditar, verificar:

1. ¿Hay suficiente historial de conversación para evaluar? (mínimo ~5 intercambios sustanciales)
2. ¿Se realizó trabajo substantivo (no solo preguntas de configuración)?

Si NO hay suficiente material → informar al usuario y detener. No auditar sesiones triviales.

## Clasificación de sesión

Clasificar la sesión usando criterios **behavioral** — basados en evidencia observable en el log, no en juicios de calidad:

| Cuadrante | Indicador behavioral (observable en el log) |
| --- | --- |
| Creación-Producción | Se produjeron nuevos archivos, nuevo código, nueva arquitectura |
| Evaluación-Negociación | Se evaluaron opciones, se tomaron decisiones estratégicas, se definieron trade-offs |
| Análisis-Cognitivo | Se examinó código existente, se investigaron causas, se exploraron posibilidades |
| Refactorización-Ejecución | Se modificó código existente para mejorar sin cambiar comportamiento observable |

Si la sesión mezcla tipos: elegir el cuadrante dominante (>50%), anotar como "Mixto: X+Y" con justificación.

Declarar el Perfil de Prioridad correspondiente según la tabla del IMK 4.0.

## Paso 2: Evaluación Técnica Rigurosa

**MANDATO DE RIGOR:** Esta fase DEBE ejecutarse consultando exclusivamente las definiciones, descriptores de nivel y escalas de puntuación detalladas en `.agent/evaluacion.md`. Está ESTRICTAMENTE PROHIBIDO evaluar basándose en resúmenes o memoria contextual.

Para cada uno de los 4 ejes y sus respectivos KPIs definidos en `evaluacion.md`:

1. **Lectura de Criterio:** Leer los descriptores de desempeño (+2 a -2) para el KPI específico.
2. **Búsqueda de Evidencia:** Localizar fragmentos textuales en el historial de la sesión que coincidan con los descriptores.
3. **Calibración de Score:** Asignar el puntaje basándose en la evidencia más sólida y coherente con los descriptores.

**Regla de evidencia:** Para cada KPI, DEBES:

1. Citar textualmente (entre comillas) un fragmento del historial que justifique el score
2. Asignar score en escala -2 a +2

Generar la tabla de evaluación:

```markdown
## Evaluación de la sesión — [fecha]

**Enfoque dominante:** [cuadrante] ([justificación])

| Eje | KPI 1 | KPI 2 | KPI 3 | Total |
|-----|-------|-------|-------|-----|
| 1. Alineación | | | | /6 |
| 2. Integridad | | | | /6 |
| 3. Eficiencia | | | | /6 |
| 4. Sinergia | | | | /6 |

**Score Total:** /24
```

Si hay un score negativo dentro de un eje → marcar varianza con ⚠️ dispersión.

## Acciones de gobernanza

**Si Eje 1 o Eje 2 tienen ITC ≤ 0:**

- ACCIÓN A: Generar plan de corrección técnica con pasos específicos
- ACCIÓN B: Analizar si la estrategia de gobernanza falló y proponer modificación a `.agent/rules/`

**Si Eje 4 tiene ITC ≥ 4:**

- Documentar los momentos de sinergia emergente identificados como heurísticas candidatas para MEMORY.md (aplicar protocolo anti-sesgo del Rule 04)

## Paso 5: Cierre de Auditoría

1. Añadir el PDK cronológicamente al final de `docs/MEMORY.md`
2. Si se identificó deuda técnica → crear entrada en `docs/DEUDA-TECNICA.md` (si existe)
3. Si se identificaron decisiones significativas no documentadas → redactar entradas para `docs/USER-DECISIONS.md`.
