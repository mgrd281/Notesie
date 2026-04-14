export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
  isPinned: boolean;
  color?: string;
}

export interface AppState {
  notes: Note[];
  categories: Category[];
  isDarkMode: boolean;
}

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  cardBackground: string;
  shadowColor: string;
}
