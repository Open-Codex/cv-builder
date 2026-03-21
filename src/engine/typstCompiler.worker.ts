// Typst WASM compiler worker
// Uses $typst API for compilation; fonts registered before first compile

const FONT_FILES = [
  'SourceSans3[wght].ttf',
  'SourceSans3-Italic[wght].ttf',
  'Lato-Regular.ttf',
  'Lato-Italic.ttf',
  'Lato-Bold.ttf',
  'Lato-BoldItalic.ttf',
  'Roboto[wdth,wght].ttf',
  'Roboto-Italic[wdth,wght].ttf',
  'FiraSans-Regular.ttf',
  'FiraSans-Italic.ttf',
  'FiraSans-Bold.ttf',
  'FiraSans-BoldItalic.ttf',
];

let initialized = false;
let initPromise: Promise<void> | null = null;
let $typst: any = null;

async function initCompiler() {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    // Dynamic import to avoid bundler issues with WASM
    const mod = await import('@myriaddreamin/typst.ts');
    $typst = mod.$typst;

    // Load fonts
    for (const fontFile of FONT_FILES) {
      try {
        const resp = await fetch(`./fonts/${fontFile}`);
        if (resp.ok) {
          const buffer = await resp.arrayBuffer();
          $typst.addRawFont(new Uint8Array(buffer));
        }
      } catch (fontErr) {
        console.warn(`Font load failed: ${fontFile}`, fontErr);
      }
    }

    initialized = true;
  })();

  return initPromise;
}

self.onmessage = async (e: MessageEvent) => {
  const { id, type, payload } = e.data;

  try {
    if (type === 'init') {
      await initCompiler();
      self.postMessage({ id, status: 'success' });

    } else if (type === 'compile') {
      if (!initialized || !$typst) {
        throw new Error('Compiler not initialized');
      }

      const source = payload.source as string;

      try {
        const result = await $typst.pdf({
          mainContent: source,
        });

        if (result) {
          const pdfBytes = result instanceof Uint8Array ? result : new Uint8Array(result);
          self.postMessage(
            { id, status: 'success', data: pdfBytes },
            // @ts-ignore — transferable
            [pdfBytes.buffer]
          );
        } else {
          throw new Error('Compilation returned empty result');
        }
      } catch (compileErr: any) {
        if (compileErr?.type === 'cancelation' || compileErr?.msg === 'operation is manually canceled') {
          self.postMessage({ id, status: 'canceled' });
          return;
        }
        console.error('Typst compilation error:', compileErr);
        self.postMessage({
          id,
          status: 'error',
          error: `Compilation error: ${compileErr.message || String(compileErr)}`
        });
      }
    }
  } catch (err: any) {
    self.postMessage({ id, status: 'error', error: err.message });
  }
};
