import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, Category } from '@types/index';
import { DefaultCategories } from '@constants/theme';
import { v4 as uuidv4 } from 'uuid';

const NOTES_KEY = '@notesie_notes';
const CATEGORIES_KEY = '@notesie_categories';
const DARK_MODE_KEY = '@notesie_darkmode';

// Sample notes data for first launch
const SAMPLE_NOTES: Note[] = [
  {
    id: uuidv4(),
    title: 'Welcome to Notesie',
    content: 'This is your first note. Tap to edit, swipe to delete, or pin important notes for quick access.',
    categoryId: 'personal',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
    isPinned: true,
  },
  {
    id: uuidv4(),
    title: 'Meeting Notes',
    content: '• Discuss product roadmap\n• Review Q2 targets\n• Team building event planning\n• Budget approval for new tools',
    categoryId: 'work',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    isPinned: false,
  },
  {
    id: uuidv4(),
    title: 'App Ideas',
    content: 'Brainstorm:\n- Social note sharing feature\n- Collaboration mode\n- Rich text formatting\n- Voice notes integration',
    categoryId: 'ideas',
    createdAt: Date.now() - 86400000 * 0.5,
    updatedAt: Date.now() - 86400000 * 0.5,
    isPinned: false,
  },
];

export const StorageService = {
  // Notes Management
  async getNotes(): Promise<Note[]> {
    try {
      const data = await AsyncStorage.getItem(NOTES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // First launch - initialize with sample data
      await StorageService.initializeNotes();
      return SAMPLE_NOTES;
    } catch (error) {
      console.error('Error reading notes:', error);
      return [];
    }
  },

  async saveNotes(notes: Note[]): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  },

  async addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const notes = await StorageService.getNotes();
    const newNote: Note = {
      ...note,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    notes.push(newNote);
    await StorageService.saveNotes(notes);
    return newNote;
  },

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    const notes = await StorageService.getNotes();
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        ...updates,
        updatedAt: Date.now(),
      };
      await StorageService.saveNotes(notes);
      return notes[index];
    }
    return null;
  },

  async deleteNote(id: string): Promise<void> {
    const notes = await StorageService.getNotes();
    const filtered = notes.filter(n => n.id !== id);
    await StorageService.saveNotes(filtered);
  },

  async pinNote(id: string, isPinned: boolean): Promise<void> {
    await StorageService.updateNote(id, { isPinned });
  },

  async searchNotes(query: string): Promise<Note[]> {
    const notes = await StorageService.getNotes();
    const lowerQuery = query.toLowerCase();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery)
    );
  },

  async getNotesByCategory(categoryId: string): Promise<Note[]> {
    const notes = await StorageService.getNotes();
    return notes.filter(note => note.categoryId === categoryId);
  },

  // Categories Management
  async getCategories(): Promise<Category[]> {
    try {
      const data = await AsyncStorage.getItem(CATEGORIES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // First launch - initialize with default categories
      await StorageService.initializeCategories();
      return DefaultCategories;
    } catch (error) {
      console.error('Error reading categories:', error);
      return DefaultCategories;
    }
  },

  async saveCategories(categories: Category[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories:', error);
      throw error;
    }
  },

  async addCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const categories = await StorageService.getCategories();
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
    };
    categories.push(newCategory);
    await StorageService.saveCategories(categories);
    return newCategory;
  },

  // Dark Mode
  async isDarkMode(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(DARK_MODE_KEY);
      return data ? JSON.parse(data) : false;
    } catch (error) {
      console.error('Error reading dark mode:', error);
      return false;
    }
  },

  async setDarkMode(isDark: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving dark mode:', error);
      throw error;
    }
  },

  // Initialization
  async initializeNotes(): Promise<void> {
    await StorageService.saveNotes(SAMPLE_NOTES);
  },

  async initializeCategories(): Promise<void> {
    await StorageService.saveCategories(DefaultCategories);
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([NOTES_KEY, CATEGORIES_KEY, DARK_MODE_KEY]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
