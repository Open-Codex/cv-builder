import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartBuilding = () => {
    if (user) {
      navigate('/editor');
    } else {
      navigate('/login?redirect=/editor');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">CV Builder</span>
          <span className="text-xs text-gray-500 ml-2">by OpenCodex</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          Login
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full text-sm text-blue-400 mb-8">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          OpenCodex Extension
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Build Professional CVs
          <br />
          <span className="text-blue-500">in Minutes</span>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Edit in YAML, preview in real-time PDF.
          <br />
          Choose from multiple themes and export instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleStartBuilding}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full sm:w-auto"
          >
            Start Building
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors w-full sm:w-auto"
          >
            Login
          </button>
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 text-left">
            <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">YAML Editor</h3>
            <p className="text-sm text-gray-400">Write your CV content in a clean, structured YAML format with real-time validation.</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 text-left">
            <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Live PDF Preview</h3>
            <p className="text-sm text-gray-400">See your CV rendered as a professional PDF instantly as you type.</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 text-left">
            <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Multiple Themes</h3>
            <p className="text-sm text-gray-400">Choose from professionally designed themes tailored for tech professionals.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-12 mt-24 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm">© 2026 OpenCodex. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Open-Codex" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              GitHub
            </a>
            <a href="https://opencodex.app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              opencodex.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
