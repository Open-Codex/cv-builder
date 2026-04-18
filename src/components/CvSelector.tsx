import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { cvService, type Cv } from '../services/api';
import { skeleton } from '../templates';

interface CvSelectorProps {
  currentCvId: string | null;
  onSelectCv: (cv: Cv | null) => void;
}

export function CvSelector({ currentCvId, onSelectCv }: CvSelectorProps) {
  const { token, user } = useAuth();
  const [cvs, setCvs] = useState<Cv[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  const loadCvs = useCallback(async () => {
    if (!token || !user) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await cvService.findAll(user.id, token);
      setCvs(data);
      if (data.length === 0 && !currentCvId) {
        onSelectCv(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load CVs');
    } finally {
      setIsLoading(false);
    }
  }, [token, user, currentCvId, onSelectCv]);

  useEffect(() => {
    loadCvs();
  }, [loadCvs]);

  const handleCreateCv = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newTitle.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const created = await cvService.create(token, {
        title: newTitle.trim(),
        content: skeleton,
        isDefault: cvs.length === 0,
      });
      setCvs([created, ...cvs]);
      setShowNewForm(false);
      setNewTitle('');
      onSelectCv(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create CV');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCv = async (cv: Cv, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;
    if (!confirm(`Delete "${cv.title}"? This cannot be undone.`)) return;

    setIsLoading(true);
    setError('');
    try {
      await cvService.delete(cv.id, token);
      const newCvs = cvs.filter((c) => c.id !== cv.id);
      setCvs(newCvs);
      if (currentCvId === cv.id) {
        onSelectCv(newCvs[0] || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete CV');
    } finally {
      setIsLoading(false);
    }
  };

  const currentCv = cvs.find((cv) => cv.id === currentCvId) || null;

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span className="text-red-400 text-sm">{error}</span>
      )}

      <select
        value={currentCvId || ''}
        onChange={(e) => {
          const selected = cvs.find((cv) => cv.id === e.target.value);
          onSelectCv(selected || null);
        }}
        disabled={isLoading}
        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
      >
        {cvs.length === 0 ? (
          <option value="">Template</option>
        ) : (
          cvs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.title} {cv.isDefault ? '(Default)' : ''}
            </option>
          ))
        )}
      </select>

      {showNewForm ? (
        <form onSubmit={handleCreateCv} className="flex items-center gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="CV title"
            required
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 w-40"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white text-sm px-3 py-1.5 rounded-lg"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              setShowNewForm(false);
              setNewTitle('');
              setError('');
            }}
            className="text-gray-400 hover:text-gray-300 text-sm px-2 py-1.5"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowNewForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1"
        >
          <span>+</span> New CV
        </button>
      )}

      {currentCv && (
        <button
          onClick={(e) => handleDeleteCv(currentCv, e)}
          className="text-gray-400 hover:text-red-400 text-sm px-2 py-1.5"
          title="Delete CV"
        >
          Delete
        </button>
      )}
    </div>
  );
}
