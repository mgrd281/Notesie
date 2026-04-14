import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNotes, useCategories } from '@hooks/useNotes';
import { LightTheme, DarkTheme, Spacing, Typography } from '@constants/theme';
import { ThemeColors, Note } from '@types/index';
import { Container } from '@components/Layout';
import { TextInputField, SelectField } from '@components/Input';
import { PrimaryButton, SecondaryButton, TextButton } from '@components/Button';
import { validateNote, getFullDateString } from '@utils/noteHelpers';

interface AddEditNoteScreenProps {
  navigation: NativeStackNavigationProp<any, 'AddNote' | 'EditNote'>;
  isDarkMode: boolean;
  noteId?: string;
}

export const AddEditNoteScreen: React.FC<AddEditNoteScreenProps> = ({
  navigation,
  isDarkMode,
  noteId,
}) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;
  const { notes, addNote, updateNote } = useNotes();
  const { categories } = useCategories();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || 'personal'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // Load existing note if editing
  useEffect(() => {
    if (noteId) {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setSelectedCategory(note.categoryId);
        setCurrentNote(note);
        setIsEditing(true);
      }
    }
  }, [noteId, notes]);

  // Set navigation title
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Note' : 'New Note',
      headerRight: isEditing
        ? () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Delete Note',
                  'Are you sure you want to delete this note?',
                  [
                    { text: 'Cancel' },
                    {
                      text: 'Delete',
                      onPress: () => {
                        navigation.goBack();
                      },
                      style: 'destructive',
                    },
                  ]
                );
              }}
            >
              <Text style={{ color: theme.error, fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          )
        : undefined,
    });
  }, [navigation, isEditing, theme.error]);

  const handleSave = async () => {
    const validation = validateNote(title, content);
    if (!validation.valid) {
      Alert.alert('Validation Error', validation.error || 'Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);

      if (isEditing && currentNote) {
        await updateNote(currentNote.id, {
          title,
          content,
          categoryId: selectedCategory,
        });
      } else {
        await addNote({
          title,
          content,
          categoryId: selectedCategory,
          isPinned: false,
        });
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const categoryOptions = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    emoji: cat.emoji,
    color: cat.color,
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container theme={theme} padding={Spacing.lg}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.xl * 2 }}
        >
          {/* Title Input */}
          <TextInputField
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
            theme={theme}
            label="Title"
            style={{ marginBottom: Spacing.lg }}
          />

          {/* Category Selection */}
          <SelectField
            label="Category"
            options={categoryOptions}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
            theme={theme}
            style={{ marginBottom: Spacing.lg }}
          />

          {/* Content Input */}
          <TextInputField
            value={content}
            onChangeText={setContent}
            placeholder="Start typing your note..."
            theme={theme}
            multiline
            numberOfLines={10}
            label="Content"
            style={{ marginBottom: Spacing.lg }}
          />

          {/* Edit Info */}
          {isEditing && currentNote && (
            <View
              style={{
                backgroundColor: theme.surface,
                padding: Spacing.md,
                borderRadius: 8,
                marginBottom: Spacing.lg,
                borderColor: theme.border,
                borderWidth: 1,
              }}
            >
              <Text style={{ fontSize: 12, color: theme.textSecondary }}>
                Created: {getFullDateString(currentNote.createdAt)}
              </Text>
              <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 4 }}>
                Updated: {getFullDateString(currentNote.updatedAt)}
              </Text>
            </View>
          )}

          {/* Buttons Section */}
          <View style={{ gap: Spacing.md }}>
            <PrimaryButton
              title={isEditing ? 'Update Note' : 'Create Note'}
              onPress={handleSave}
              isLoading={isSaving}
              theme={theme}
            />
            <SecondaryButton
              title="Discard"
              onPress={() => navigation.goBack()}
              disabled={isSaving}
              theme={theme}
            />
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};
