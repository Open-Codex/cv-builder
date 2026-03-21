---
description: /update - Actualiza el sistema de gobernanza Kairós a su última versión oficial sin afectar tu código.
---

# Actualización

Este workflow actualiza los archivos de gobernanza del sistema Kairós (reglas, workflows, skills, IMK) a la última versión disponible en el repositorio remoto, sin afectar la documentación del proyecto del usuario.

## Variables de Configuración

- **REPO_OWNER:** kirlts
- **REPO_NAME:** kairos
- **BRANCH:** main
- **VERSION_FILE:** kairos-version.txt

## Paso 0: Detección de Versión Local

Leer la primera línea de `kairos-version.txt` en la raíz del repositorio local. Esta es la versión instalada.

## Paso 1: Detección de Versión Remota

Usar `read_url_content` para leer:

```text
https://raw.githubusercontent.com/{REPO_OWNER}/{REPO_NAME}/{BRANCH}/kairos-version.txt
```

Extraer la primera línea como versión remota. El resto del archivo es el manifiesto de archivos de gobernanza.

## Paso 2: Comparación de Versiones

- Si versión local == versión remota → informar "Kairós está actualizado" y detener
- Si versión local < versión remota → continuar con actualización

## Paso 3: Detección de Cambios

Usando el manifiesto del archivo remoto `kairos-version.txt`:

Para CADA ruta listada en el manifiesto remoto:

1. **ADD:** Si la ruta existe en el manifiesto remoto pero NO existe localmente → archivo nuevo
2. **MODIFY:** Si la ruta existe en ambos → posible modificación. Leer ambas versiones con `read_url_content` del remoto y `view_file` del local. Si difieren → cambio detectado
3. **DELETE:** Si la ruta existe en el manifiesto local pero NO en el remoto → archivo eliminado en la nueva versión

## Paso 4: Presentación de Diff

Presentar al usuario una tabla de cambios detectados:

| Archivo | Tipo | Descripción del cambio |
| --- | --- | --- |

**NO aplicar ningún cambio sin aprobación explícita del usuario.**

Recordar: los archivos de `docs/` NUNCA se tocan en un /update — son propiedad del proyecto, no de Kairós.

## Paso 5: Aplicación

Para cada archivo aprobado:

- **ADD:** Crear el archivo con el contenido remoto
- **MODIFY:** Reemplazar el archivo local con la versión remota
- **DELETE:** Eliminar el archivo local

Actualizar `kairos-version.txt` local con la nueva versión + manifiesto.

## Paso 6: Post-Update

- Añadir entrada a `docs/CHANGELOG.md` sección [Kairós]
- Informar al usuario si alguna regla nueva requiere acción (ej: nuevo workflow disponible)
