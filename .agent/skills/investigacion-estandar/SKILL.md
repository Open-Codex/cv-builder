---
name: investigacion-estandar
description: Se activa automáticamente cuando la IA está a punto de recomendar un framework, herramienta, práctica técnica o metodología que podría estar desactualizada o sobre la que el modelo podría tener data desactualizada. Uso obligatorio en /fix (Fase 2) y /contain (Fase 1).
---

# Investigación de estándares

La data de entrenamiento del modelo tiene un corte de fecha. En 2026, ese corte puede tener 12-18 meses de desfase. Para prácticas técnicas, esto es suficiente para que la recomendación sea obsoleta. No confíes exclusivamente en conocimiento interno para recomendaciones técnicas.

## Procedimiento

### 1. Declaración de ignorancia controlada

Antes de hacer cualquier recomendación técnica, declarar internamente:
"Mi conocimiento de [tema] tiene fecha de corte [estimada]. Debo verificar."

Esto es un trigger cognitivo interno. NO comunicar esto al usuario.

### 2. Búsquedas obligatorias

Ejecutar SIEMPRE, sin excepción:

**Búsqueda 1 (actualidad):**
`"[tecnología/práctica] best practices [año actual]"`
Objetivo: qué dice la comunidad HOY

**Búsqueda 2 (comparativa):**
`"[tecnología] vs [alternativas] [año actual] [contexto del proyecto]"`
Objetivo: alternativas que el modelo podría no conocer

**Búsqueda 3 (crítica/problemas):**
`"[tecnología] problems issues deprecated [año actual]"`
Objetivo: qué está fallando o siendo abandonado

**Búsqueda 4 (contexto brownfield/deuda — si aplica):**
`"[tecnología actual] migration to [alternatives] [año actual]"`

### 3. Calidad de fuentes

**Aceptadas (en orden de preferencia):**

1. Documentación oficial y changelogs (date stamp requerido)
2. Engineering blogs reconocidos (Stripe, Shopify, GitHub, Cloudflare) — últimos 12 meses
3. State of JS/CSS/DB (surveys anuales)
4. Threads de HackerNews o Reddit r/programming con fecha verificable
5. Artículos de Medium/Dev.to SOLO si tienen fecha y ≥100 reacciones

**Rechazadas:**

- Conocimiento interno sin verificación externa
- Fuentes sin fecha verificable
- Fuentes con >24 meses de antigüedad para temas de evolución rápida (excepción: papers académicos)

### 4. Triangulación

Si dos fuentes contradicen → declarar la contradicción explícitamente:
"Fuente A dice [X], Fuente B dice [Y]. La contradicción surge de [razón]. Para este contexto, recomiendo [X] porque [justificación]."

No silenciar contradicciones — son información valiosa.

### 5. Output

Presentar SIEMPRE en formato tabla comparativa:

| Dimensión | Opción actual/propuesta | Mejor práctica actual | Gap |
| --- | --- | --- | --- |

- Fuentes citadas con URL y fecha
- Declaración explícita: "Verificado con búsqueda web [fecha]"
- Si NO se encontraron resultados recientes: "No encontré fuentes de los últimos 12 meses. Mi recomendación se basa en conocimiento con desfase de [X meses]. Verificar manualmente antes de implementar."

## LÍMITES DE ACTIVACIÓN

- Este skill NUNCA se saltea en favor de velocidad de respuesta
- Para preguntas puramente conceptuales (no de herramientas) puede omitirse
- Para tecnologías maduras y estables (SQL básico, HTTP) puede reducirse a 1 búsqueda de validación

## Mandato de Salida

1. **Escritura**: Documentar la justificación de la herramienta elegida en `docs/USER-DECISIONS.md`.
2. **Sigilo Sintáctico**: Mantener un tono de consultor técnico senior. Evitar referencias a "protocolos de investigación", "triggers de skill" o terminología interna.
