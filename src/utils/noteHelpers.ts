import { formatDistanceToNow, format } from 'date-fns';

export const formatNoteDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Today - show time
    return format(date, 'HH:mm');
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, 'MMM d');
  }
};

export const getFullDateString = (timestamp: number): string => {
  return format(new Date(timestamp), 'EEEE, MMMM d, yyyy \'at\' HH:mm');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getPlainText = (text: string): string => {
  return text.replace(/\n/g, ' ').trim();
};

export const getPreviewText = (content: string, maxLength: number = 150): string => {
  const plainText = getPlainText(content);
  return truncateText(plainText, maxLength);
};

export const isEmptyNote = (title: string, content: string): boolean => {
  return !title.trim() && !content.trim();
};

export const validateNote = (title: string, content: string): { valid: boolean; error?: string } => {
  if (isEmptyNote(title, content)) {
    return { valid: false, error: 'Note cannot be empty' };
  }
  return { valid: true };
};
