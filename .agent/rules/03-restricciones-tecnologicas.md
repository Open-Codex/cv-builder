---
trigger: always_on
---

# RESTRICCIONES ESPECÍFICAS DE FRAMEWORK Y DEPENDENCIAS

Este archivo registra restricciones tecnológicas específicas del proyecto actual. Es poblado automáticamente por los workflows `/kairos` y `/fix` cuando se toman decisiones sobre stack técnico.

## Protocolo de Llenado

1. **Desde /kairos:** Al definir el MASTER-SPEC §4 (Restricciones), las restricciones tecnológicas se copian aquí como regla operativa
2. **Desde /fix:** Al remediar deuda técnica, las restricciones que surjan del plan de redención se añaden aquí
3. **Desde Meta-Gobernanza:** Cuando la IA detecte fricciones recurrentes con librerías específicas del repositorio, propone añadir la restricción aquí

## Formato de Entrada

```markdown
### [RT-NNN] [Título descriptivo]
**Origen:** /kairos | Meta-Gobernanza
**Fecha:** YYYY-MM-DD
**Restricción:** [Lo que NO se puede hacer y por qué]
**Alternativa aprobada:** [Lo que SÍ se usa en su lugar]
```

## Restricciones Activas

*Sin restricciones registradas aún. Ejecutar `/kairos` para establecer el stack y las restricciones del proyecto.*
