---
description: /contain - Configura la estrategia de entorno de desarrollo (contenedores, máquinas virtuales, etc.) para garantizar consistencia técnica.
---

# WORKFLOW: ESTRATEGIA DE ENTORNO

Este workflow define la estrategia de entorno de desarrollo del proyecto. En 2026, con IA capaz de generar configuraciones de entornos aislados de alta calidad, el overhead de setup se reduce drásticamente.

## Fase 1: Diagnóstico con Matriz

Analizar el proyecto usando la siguiente matriz de decisión:

| Factor | Peso | A favor de aislamiento (Contenedores/VM) | En contra |
| --- | --- | --- | --- |
| Dependencias del sistema | Alto | 2+ servicios externos (DB, Cache, etc.) | Solo runtime del lenguaje |
| Uniformidad de entorno | Medio | Múltiples colaboradores o CI/CD | Colaborador único sin CI |
| Reproducibilidad | Alto | Despliegue a nube | Solo ejecución local |
| Complejidad del setup | Medio | >5 pasos de setup manual | Instalación simple de paquetes |

Ejecutar el skill `investigacion-estandar` para verificar mejores prácticas actuales para el stack del proyecto.

## Fase 2: Propuesta al Usuario

Presentar una propuesta con:

1. **Recomendación:** Aislamiento total / Ejecución nativa / Configuración de entorno de IDE
2. **Justificación** basada en la matriz y la investigación
3. **Complejidad de implementación** estimada
4. **Archivos que se generarán:** (ej: archivos de configuración de contenedores, scripts de setup, metadatos de entorno de IDE)
   - Actualizaciones a `docs/MASTER-SPEC.md` §9

**NO implementar sin aprobación del usuario.**

## Fase 3: Implementación

Si el usuario aprueba:

1. Generar archivos de containerización
2. Verificar que el entorno levanta correctamente
3. Actualizar `docs/MASTER-SPEC.md` §9 (Ambiente y Entorno)
4. Actualizar `docs/TODO.md` con tasks completadas
5. Añadir a `docs/CHANGELOG.md` sección [Unreleased]
