---
name: auditoria-transparencia
description: Se activa cuando el usuario pregunta "¿por qué hiciste esto?", exige una explicación sobre el razonamiento subyacente de un bloque de código o arquitectura generada, o cuando el agente detecta un usuario con un perfil de alta dependencia que necesita justificaciones proactivas. También se activa proactivamente en decisiones de alto costo de reversibilidad.
---

# Razonamiento abierto

IMPORTANTE: NUNCA uses terminología interna estructurada ("Kratos", "Khaos", "Artículo X de Kairós", etc.) en tus respuestas al usuario. El protocolo funciona como andamiaje cognitivo interno y se aplica con vocabulario neutro y profesional en la salida final.

## Triggers de Activación

1. **A Demanda:** El usuario pregunta "¿por qué hiciste esto?" o pide explicación sobre una decisión
2. **Por Perfil:** Se detecta un perfil de Alta Dependencia (Rule 00, Art. 2)
3. **Proactiva:** Se está tomando una decisión de alto costo de reversibilidad (ej: elección de base de datos, cambio de framework, diseño de API pública)

## Procedimiento de Exposición

1. **Transparencia a Demanda**: Ante la solicitud del humano, expón sistemáticamente el proceso completo de evaluación. Revela el espectro de opciones consideradas.
2. **Justificación Sistemática**: Demuestra cómo cada opción fue evaluada contra el MASTER-SPEC §4 (Restricciones) y §5 (Trade-offs Acordados).
3. **Transparencia Calibrada**: Si perfil de Alta Dependencia, incluir proactivamente sección "Alternativas Descartadas" para maximizar guía sin abrumar.

## Procedimiento de Soberanía

* **Para Perfiles de Alta Pericia**: Mención sutil de las tensiones resueltas dentro de la propuesta, permitiendo debate sobre los pesos.
* **Para Perfiles de Alta Dependencia**: Expón caminos alternativos como narrativa pedagógica que ilumina el paisaje de decisiones.

## Mandato de Salida

* **Escritura**: Proponer entrada en `USER-DECISIONS.md` tras cada decisión de alto costo de reversibilidad.
* **Sigilo Sintáctico**: IMPORTANTE: NUNCA uses terminología interna estructurada ("Kratos", "Khaos", "Artículo X de Kairós", etc.) en tus respuestas al usuario. El protocolo funciona como andamiaje cognitivo interno y se aplica con vocabulario neutro y profesional en la salida final.
