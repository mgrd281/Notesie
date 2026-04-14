import { useState, useEffect, useCallback } from 'react';
import { Note, Category } from '@types/index';
import { StorageService } from '@storage/StorageService';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await StorageService.getNotes();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const addNote = useCallback(
    async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newNote = await StorageService.addNote(note);
        setNotes(prev => [...prev, newNote]);
        return newNote;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add note');
        throw err;
      }
    },
    []
  );

  const updateNote = useCallback(
    async (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
      try {
        const updated = await StorageService.updateNote(id, updates);
        if (updated) {
          setNotes(prev =>
            prev.map(n => (n.id === id ? updated : n))
          );
          return updated;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update note');
        throw err;
      }
    },
    []
  );

  const deleteNote = useCallback(async (id: string) => {
    try {
      await StorageService.deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      throw err;
    }
  }, []);

  const pinNote = useCallback(async (id: string, isPinned: boolean) => {
    try {
      await StorageService.pinNote(id, isPinned);
      setNotes(prev =>
        prev.map(n => (n.id === id ? { ...n, isPinned } : n))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pin note');
      throw err;
    }
  }, []);

  const searchNotes = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadNotes();
      return;
    }
    try {
      const results = await StorageService.searchNotes(query);
      setNotes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    }
  }, [loadNotes]);

  const getNotesByCategory = useCallback(async (categoryId: string) => {
    try {
      const results = await StorageService.getNotesByCategory(categoryId);
      setNotes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    }
  }, []);

  const getPinnedNotes = useCallback(() => {
    return notes.filter(n => n.isPinned).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);

  const getSortedNotes = useCallback(() => {
    return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);

  const refreshNotes = useCallback(async () => {
    await loadNotes();
  }, [loadNotes]);

  return {
    notes,
    isLoading,
    error,
    addNote,
    updateNote,
    deleteNote,
    pinNote,
    searchNotes,
    getNotesByCategory,
    getPinnedNotes,
    getSortedNotes,
    refreshNotes,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await StorageService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = useCallback(
    async (category: Omit<Category, 'id'>) => {
      try {
        const newCategory = await StorageService.addCategory(category);
        setCategories(prev => [...prev, newCategory]);
        return newCategory;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add category');
        throw err;
      }
    },
    []
  );

  const getCategoryById = useCallback(
    (id: string) => categories.find(c => c.id === id),
    [categories]
  );

  return {
    categories,
    isLoading,
    error,
    addCategory,
    getCategoryById,
    loadCategories,
  };
};

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const isDark = await StorageService.isDarkMode();
        setIsDarkMode(isDark);
      } catch (error) {
        console.error('Failed to load dark mode setting:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDarkMode();
  }, []);

  const toggleDarkMode = useCallback(async (isDark: boolean) => {
    try {
      setIsDarkMode(isDark);
      await StorageService.setDarkMode(isDark);
    } catch (error) {
      console.error('Failed to save dark mode setting:', error);
    }
  }, []);

  return {
    isDarkMode,
    isLoading,
    toggleDarkMode,
  };
};
