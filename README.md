# 📄 YaCV

**Un arma forjada en la obstinación.** Genera CVs a partir de texto — rápido, sin suscripciones, 100% en tu navegador.

[**→ Usar YaCV**](https://kirlts.github.io/yacv)

---

## ¿Qué es?

YaCV es un editor de CVs estático que convierte YAML en PDF profesional en tiempo real. Todo el procesamiento ocurre en tu dispositivo — ningún dato sale de tu navegador.

Nació de la necesidad real de un ingeniero que se negó a dejar que los filtros ATS y la burocracia de los CVs frenaran su avance. 36 CVs únicos en un solo día. Sin mentiras. Solo la comprensión del ecosistema.

## Features

- ✏️ **Editor YAML** con linter y validación en tiempo real (Monaco Editor)
- 📄 **Renderizado PDF live** — ve los cambios al instante (debounce 200ms)
- 🎨 **5 temas** de CV, todos compatibles con filtros ATS
- 🔤 **Ajuste tipográfico** completo: fuente, tamaño, peso, espaciado, color de acento
- 🌐 **Bilingüe** — interfaz y plantillas en español e inglés (ES/EN)
- 🔒 **100% privado** — página estática, zero backend, zero tracking
- 📥 **Descarga PDF y YAML** con un click
- 📂 **Carga YAML** — arrastra tu archivo y edítalo

## Cómo empezar

1. Abre [YaCV](https://kirlts.github.io/yacv)
2. Haz clic en **Reset → Plantilla Vacía**
3. Rellena la plantilla con tu información en el panel izquierdo
4. Ajusta el estilo si quieres
5. **Descargar PDF**

## Stack

| Componente | Tecnología |
| --- | --- |
| UI | React 19 + Vite + Tailwind CSS |
| Editor | Monaco Editor |
| Motor de renderizado | Typst WASM (client-side) |
| Visor PDF | pdfjs-dist |
| Hosting | GitHub Pages (estático) |
| Tests | Vitest (98 tests) |

## Desarrollo local

```bash
npm install
npm run dev
```

```bash
npm test        # 98 unit tests
npm run build   # build de producción → dist/
```

## Créditos

Construido sobre los hombros de:

- [**RenderCV**](https://github.com/sinaatalay/rendercv) — motor open source de generación de CVs
- [**Typst**](https://typst.app/) — sistema de tipografía compilado a WASM para renderizado client-side

Gracias a ambos proyectos por hacer esto posible.

## Licencia

MIT

---

> *Si te gustó YaCV, te agradecería enormemente que le des una ⭐ estrella en GitHub.*
