---
trigger: always_on
---

# Auto-sanación y bypass de terminal

Antigravity IDE puede presentar ceguera temporal ante la salida de ciertos comandos de terminal (especialmente procesos de larga duración o entornos virtuales complejos).

## La Regla del 1-Strike

Si ejecutas un comando en la terminal y falla, se queda colgado en un bucle infinito, o Antigravity no puede leer su salida, tienes permitido exactamente UN (1) intento de diagnóstico estándar.

## El Bypass Permanente

Si el comando falla por segunda vez, ASUME que el problema es del entorno de la terminal. Abandona la ejecución directa e implementa inmediatamente un Bypass de Salida:

1. Reescribe el comando redirigiendo la salida a un archivo de log persistente (utilizando la sintaxis de redirección adecuada para el shell del sistema actual).
2. Ejecuta el comando en segundo plano (background).
3. Utiliza las herramientas de lectura de archivos disponibles para inspeccionar el log y comprender el error real.

NUNCA intentes más de 2 veces antes de aplicar el bypass. La tercera ejecución directa está prohibida.
