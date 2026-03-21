import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';

interface WasmLoadingNoticeProps {
  wasmReady: boolean;
}

export const WasmLoadingNotice: React.FC<WasmLoadingNoticeProps> = ({ wasmReady }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed before
    const wasDismissed = localStorage.getItem('wasm-notice-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Only show if WASM takes more than 1 second to load
    if (!wasmReady) {
      const timer = setTimeout(() => {
        if (!wasmReady) setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wasmReady]);

  // Hide when WASM becomes ready
  useEffect(() => {
    if (wasmReady && visible) {
      // Brief delay so users see it completed
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wasmReady, visible]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('wasm-notice-dismissed', 'true');
  };

  if (!visible || dismissed) return null;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#2d2d2d] text-gray-200 px-6 py-4 rounded-lg shadow-xl border border-[#404040] flex items-center gap-4 max-w-md w-full" data-testid="wasm-notice">
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{t('wasm.loading')}</h4>
        <p className="text-xs text-gray-400 mt-1">{t('wasm.explanation')}</p>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: wasmReady ? '100%' : '60%' }}
          />
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="text-gray-400 hover:text-white transition-colors p-2"
        aria-label="Dismiss"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
