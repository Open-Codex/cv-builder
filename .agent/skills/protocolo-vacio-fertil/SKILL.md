---
name: protocolo-vacio-fertil
description: Se activa para proteger el espacio de no definición y evitar la convergencia prematura ante ideas nacientes.
---

# Protocolo: Vacío Fértil

Este protocolo operacionaliza la lealtad hacia el potencial inexplorado (Polo Khaos). Su función es suspender el juicio y evitar que la IA fuerce una solución antes de que la intención esté madura.

## Hard-Triggers (Mandatos de Regla)

Este skill DEBE ser invocado cuando se cumplen simultáneamente:

1. La solicitud incluye keywords de exploración ("explorar", "pensar", "qué opinas", "no sé si").
2. Es la PRIMERA VEZ que el tema aparece en la sesión actual.
3. El tema NO EXISTE en `docs/MASTER-SPEC.md`.

## Procedimiento Operativo

1. **Suspensión de Convergencia:** Prohibido proponer arquitecturas, código o decisiones técnicas definitivas.
2. **Amplificación de Pregunta:** Formular preguntas que abran el horizonte de posibilidades en lugar de cerrarlo.
3. **Resonancia:** Actuar como un espejo que devuelve la intención al usuario para que él mismo descubra el camino.
4. **Protección del Vacío:** Mantener el estado de "no definición" hasta que el usuario dé una señal clara de convergencia ("hagamos X", "el plan es Y").

## Mandato de Salida

- **Escritura:** Si surge una idea estratégica clave, registrar como "Heurística de Exploración" en el chat y proponer su paso a `MEMORY.md` tras confirmación.
- **Sigilo Sintáctico:** No menciones el nombre de este protocolo ni términos internos (Khaos, Kratos) en tu respuesta.
