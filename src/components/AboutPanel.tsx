import React from 'react';
import { useTranslation } from '../i18n';

/**
 * Rich "About YaCV" panel content, rendered as styled JSX.
 * Shown on hover over the "¿Qué es YaCV?" button in the toolbar.
 */
export const AboutPanel: React.FC = () => {
  const { t } = useTranslation();
  // Detect language from a known key
  const isEs = t('toolbar.theme') === 'Tema';

  if (isEs) {
    return (
      <div className="text-gray-300 text-[12px] leading-[1.6] space-y-3">
        <p className="text-center">
          <strong>YaCV</strong> es un arma forjada en la <em>obstinación</em>.
        </p>
        <p>
          Existe para ayudarte a <strong>redactar o prototipar currículums rápidamente</strong>.<br />
          Rápido, sin suscripciones, hosteado en <em>GitHub Pages</em>.
        </p>

        <hr className="border-[#404040] my-2" />

        <h3 className="text-[13px] font-semibold text-white m-0">Cómo empezar</h3>
        <ol className="list-decimal pl-5 space-y-0.5 m-0">
          <li>Haz clic en <strong>Reset</strong>, luego <strong>Plantilla Vacía</strong>.</li>
          <li>Rellena la plantilla con tu información en el panel de la izquierda.</li>
          <li>Ve los cambios en tu currículum en el panel de la derecha.</li>
          <li><strong>Ajusta el estilo</strong> de tu CV, si quieres, y <strong>descárgalo en PDF</strong>.</li>
        </ol>

        <hr className="border-[#404040] my-2" />

        <h3 className="text-[13px] font-semibold text-white m-0">Features</h3>
        <ul className="list-disc pl-5 space-y-0.5 m-0">
          <li><strong>Plantillas de CV 100% amigables</strong> con filtros <em>ATS</em>.</li>
          <li>Plantillas e interfaz en español e inglés (<strong>ES/EN</strong>).</li>
          <li><strong>Página estática</strong>. Todo el procesamiento ocurre en el dispositivo. <em>100% Seguro</em>.</li>
          <li>Linter de <strong>YAML</strong> incluido.</li>
          <li>Basado en los motores open source <em>RenderCV</em> y <em>Typst WASM</em>. Gracias a ambos proyectos por hacer esto posible.</li>
        </ul>

        <hr className="border-[#404040] my-2" />

        <p className="text-[11px] text-gray-400 text-center">
          Si te gustó <strong className="text-gray-300">YaCV</strong>, te agradecería enormemente que le des una{' '}
          <strong className="text-gray-300">estrella en GitHub</strong> a este repositorio:{' '}
          <a href="https://github.com/kirlts/yacv" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
            github.com/kirlts/yacv
          </a>
        </p>
      </div>
    );
  }

  // English version
  return (
    <div className="text-gray-300 text-[12px] leading-[1.6] space-y-3">
      <p className="text-center">
        <strong>YaCV</strong> is a weapon forged in <em>stubbornness</em>.
      </p>
      <p>
        It exists to help you <strong>draft or prototype résumés quickly</strong>.<br />
        Fast, no subscriptions, hosted on <em>GitHub Pages</em>.
      </p>

      <hr className="border-[#404040] my-2" />

      <h3 className="text-[13px] font-semibold text-white m-0">Getting started</h3>
      <ol className="list-decimal pl-5 space-y-0.5 m-0">
        <li>Click <strong>Reset</strong>, then <strong>Empty Template</strong>.</li>
        <li>Fill in the template with your info on the left panel.</li>
        <li>See the changes in your résumé on the right panel.</li>
        <li><strong>Adjust the style</strong> of your CV if you want, and <strong>download as PDF</strong>.</li>
      </ol>

      <hr className="border-[#404040] my-2" />

      <h3 className="text-[13px] font-semibold text-white m-0">Features</h3>
      <ul className="list-disc pl-5 space-y-0.5 m-0">
        <li><strong>CV templates 100% friendly</strong> with <em>ATS</em> filters.</li>
        <li>Templates and UI in Spanish and English (<strong>ES/EN</strong>).</li>
        <li><strong>Static page</strong>. All processing happens on your device. <em>100% Secure</em>.</li>
        <li>Built-in <strong>YAML</strong> linter.</li>
        <li>Built on the open source engines <em>RenderCV</em> and <em>Typst WASM</em>. Thanks to both projects for making this possible.</li>
      </ul>

      <hr className="border-[#404040] my-2" />

      <p className="text-[11px] text-gray-400 text-center">
        If you liked <strong className="text-gray-300">YaCV</strong>, I'd hugely appreciate it if you{' '}
        <strong className="text-gray-300">star it on GitHub</strong>:{' '}
        <a href="https://github.com/kirlts/yacv" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
          github.com/kirlts/yacv
        </a>
      </p>
    </div>
  );
};
