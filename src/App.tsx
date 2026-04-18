import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { EditorPage } from './pages/EditorPage';
import { I18nProvider } from './i18n';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </I18nProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
