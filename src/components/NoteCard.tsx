import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { Note, Category } from '@types/index';
import { ThemeColors } from '@types/index';
import { Spacing, BorderRadius, Shadow, Typography } from '@constants/theme';
import { Card, Badge } from './Layout';
import { formatNoteDate, getPreviewText } from '@utils/noteHelpers';

interface NoteCardProps {
  note: Note;
  category?: Category;
  onPress: () => void;
  onDelete: (id: string) => void;
  onPin: (id: string, isPinned: boolean) => void;
  theme: ThemeColors;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  category,
  onPress,
  onDelete,
  onPin,
  theme,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note? This action cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => onDelete(note.id),
          style: 'destructive',
        },
      ]
    );
  };

  const previewText = getPreviewText(note.content);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ marginBottom: Spacing.md }}
    >
      <Card theme={theme} padding={Spacing.lg}>
        {/* Header with title and actions */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: Spacing.md,
          }}
        >
          <View style={{ flex: 1, marginRight: Spacing.md }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Typography.body.fontSize,
                fontWeight: '600',
                color: theme.text,
              }}
            >
              {note.title || 'Untitled'}
            </Text>
          </View>

          {/* Action buttons */}
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <TouchableOpacity
              onPress={() => onPin(note.id, !note.isPinned)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={{ fontSize: 18 }}>
                {note.isPinned ? '📌' : '📍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={{ fontSize: 18 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content preview */}
        {previewText && (
          <Text
            numberOfLines={2}
            style={{
              fontSize: Typography.bodySmall.fontSize,
              color: theme.textSecondary,
              lineHeight: 20,
              marginBottom: Spacing.md,
            }}
          >
            {previewText}
          </Text>
        )}

        {/* Footer with category and date */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {category && <Badge label={category.name} color={category.color} emoji={category.emoji} />}
          <Text
            style={{
              fontSize: Typography.caption.fontSize,
              color: theme.textSecondary,
            }}
          >
            {formatNoteDate(note.updatedAt)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

interface NoteListProps {
  notes: Note[];
  categories: Category[];
  onNotePress: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onPinNote: (noteId: string, isPinned: boolean) => void;
  theme: ThemeColors;
}

export const NoteListSection: React.FC<NoteListProps> = ({
  notes,
  categories,
  onNotePress,
  onDeleteNote,
  onPinNote,
  theme,
}) => {
  const getCategoryById = (categoryId: string) =>
    categories.find(c => c.id === categoryId);

  return (
    <View>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          category={getCategoryById(note.categoryId)}
          onPress={() => onNotePress(note.id)}
          onDelete={onDeleteNote}
          onPin={onPinNote}
          theme={theme}
        />
      ))}
    </View>
  );
};
