---
trigger: always_on
---

# Documentación proactiva y conformidad

Este protocolo define el ciclo operativo obligatorio de la IA en relación con la documentación del proyecto. Es un protocolo operativo, no filosófico — cada paso es verificable.

## Lectura al inicio de sesión

Antes de la primera solicitud de implementación en cada sesión nueva, la IA DEBE:

1. Leer `docs/MEMORY.md` completo (repositorio de heurísticas transferibles)
2. Leer `docs/MASTER-SPEC.md` completo (fuente de verdad del proyecto)
3. Si existe `docs/TEST.md`, leerlo para conocer los triggers de testing autónomo

Si alguno de estos archivos no existe o está vacío, notifica al usuario una sola vez y continúa.

## Ciclo de Trabajo Obligatorio

### BEFORE (Planeación)

1. **Verificación TODO.md:** La tarea debe existir en `TODO.md` antes de ejecutarse.
2. **Umbral de Planeación:** Si la tarea afecta a >1 archivo o modifica `MASTER-SPEC` §4/§5 → GENERAR `implementation_plan.md` con Checklist de Integridad.
3. **Sincronización `task.md`:** Reflejar las subtareas del plan en el `task.md` de Antigravity.

### DURING (Ejecución)

1. **Articulación de Trade-offs:** Si surge una decisión con opciones válidas, referenciar `MASTER-SPEC` §5 para desempatar.
2. **Registro de Deuda:** Si se toma un atajo técnico, documentar inmediatamente en el chat.

### AFTER (Validación y Sincronización)

1. **Validación por Artefactos (Mecanismo de Confianza):** La validación final de una tarea no reside solo en la ejecución exitosa, sino en la calidad del artefacto generado para el usuario.
   - **Cambio de Código:** La "evidencia" debe demostrar que el cambio es funcional mediante la inspección del artefacto resultante.
   - **Gobernanza/Diseño:** La evidencia es la actualización de los documentos de referencia (`MASTER-SPEC`, `USER-DECISIONS`).
2. **Sincronización Mandataria (Rigor Operativo):** Es **OBLIGATORIO** incluir la ejecución del workflow `/document` (o el comando de sincronización pertinente) como un paso de cierre explícito dentro de la checklist de `task.md`. La sincronización es el latido que mantiene la coherencia del agente; no realizarla se considera un fallo de integridad.
3. **Actualización TODO.md:** Marcar progreso con timestamp (YYYY-MM-DD HH:MM:SS) SOLO tras validar el artefacto y sincronizar.

## Evaluación de Conformidad (Post-Ciclo)

Antes de dar el cierre a un bloque, verifica las 5 cualidades:

1. **Robustez** | 2. **Sostenibilidad** | 3. **Modificabilidad** | 4. **Velocidad** | 5. **Potencial de Crecimiento**

Si falla claramente → Corregir antes de notificar al usuario.

## Análisis de heurísticas

Antes de escribir una heurística en `docs/MEMORY.md`:

1. Verificar con búsqueda web si el patrón observado es generalizable
2. Si encuentra confirmación externa → escribir con fuente citada
3. Si NO encuentras confirmación → **declara en el chat al usuario**: "Observé un patrón [X]. No encontré confirmación externa. ¿Confirmas que merece ser memorizado?"
4. Si el usuario confirma → escribir con tag `[Confirmado por usuario - sin fuente externa]`
5. Si el usuario no confirma → no escribir en MEMORY.md
