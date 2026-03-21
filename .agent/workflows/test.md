---
description: /test - Establece o ejecuta la estrategia de pruebas para asegurar la estabilidad y el correcto funcionamiento del sistema.
---

# Testing estratégico

Este workflow tiene dos modos: **Setup** (primera ejecución) y **Verificación** (ejecuciones subsecuentes).

## Detección de Modo

- Si `docs/TEST.md` NO existe → modo **Setup**
- Si `docs/TEST.md` existe → modo **Verificación**

---

## Configuración inicial (Setup)

### Fase 1: Conversación con el Usuario

Explorar con el usuario para definir el contrato de testing. Preguntar:

1. **¿Qué tecnologías usa el proyecto?** — determina qué runners de test son viables (vitest, pytest, go test, etc.)
2. **¿Qué es lo más crítico que NO puede fallar?** — identifica los tests de alta prioridad
3. **¿Cuál es la tolerancia a la complejidad de tests?** — Playwright/E2E son potentes pero caros en tokens. Tests unitarios son baratos en tokens y rápidos.
4. **¿Hay integraciones externas que requieran mocks?**

### Fase 2: Generación de TEST.md

Con las respuestas, generar `docs/TEST.md`:

```markdown
# TEST.md

## Stack de Testing
- Runner: [ej: vitest, pytest]
- E2E: [si aplica: playwright, cypress, ninguno]
- Mocking: [estrategia]

## Triggers Automáticos
<!-- Condiciones bajo las cuales la IA debe ejecutar tests sin que se lo pidan -->
- Al completar cualquier TASK que modifique [componente X]
- Al modificar [archivos/patrones específicos]
- Al cerrar una épica

## Tests de Alta Prioridad (Límites Intransgredibles)
<!-- Tests que validan que NO se viole un Límite Intransgredible -->
- [ ] [Descripción del test] — valida §4 de MASTER-SPEC

## Tests de Regresión
<!-- Se añaden cuando /audit o debugging revelan un bug -->

## Política de Playwright/E2E
- Activar cuando: [condiciones]
- No activar cuando: [condiciones]
- Budget de tokens estimado: [alto/medio/bajo]
```

### Fase 3: Confirmación

Presentar TEST.md al usuario. No implementar tests hasta que confirme el contrato.

---

## Verificación de regresión

### Paso 1: Leer docs/TEST.md

Cargar el contrato de testing para conocer:

- Qué runner usar
- Qué triggers están activos
- Qué tests de alta prioridad existen

### Paso 2: Evaluar Contexto

Analizar el TODO.md para determinar qué se completó recientemente y qué tests son relevantes.

### Paso 3: Ejecutar Tests

Ejecutar los tests relevantes según la política definida en TEST.md. Si un test falla:

1. Analizar la causa raíz
2. Proponer fix
3. Re-ejecutar para validar

### Paso 4: Documentar Resultado

Si se descubren bugs → añadir a tests de regresión en TEST.md.
Si la corrección revela un patrón → candidato para MEMORY.md (con protocolo anti-sesgo).
