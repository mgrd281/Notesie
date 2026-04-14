import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNotes, useCategories } from '@hooks/useNotes';
import { LightTheme, DarkTheme, Spacing, Typography, BorderRadius, Shadow } from '@constants/theme';
import { ThemeColors } from '@types/index';
import { Container, EmptyState, SectionHeader } from '@components/Layout';
import { NoteListSection } from '@components/NoteCard';

type CategoriesScreenNavigationProp = NativeStackNavigationProp<any>;

interface CategoriesScreenProps {
  navigation: CategoriesScreenNavigationProp;
  isDarkMode: boolean;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  navigation,
  isDarkMode,
}) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;
  const { notes, deleteNote, pinNote, refreshNotes } = useNotes();
  const { categories, isLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshNotes();
      if (selectedCategory) {
        // Reload category notes
        const categoryNotes = notes.filter(n => n.categoryId === selectedCategory);
      }
    });
    return unsubscribe;
  }, [navigation, selectedCategory, refreshNotes, notes]);

  if (isLoading) {
    return (
      <Container theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.accent} />
        </View>
      </Container>
    );
  }

  const categoryNotes = selectedCategory
    ? notes.filter(n => n.categoryId === selectedCategory)
    : notes;

  return (
    <Container theme={theme} padding={Spacing.lg}>
      {/* Header */}
      <Text
        style={{
          fontSize: Typography.h2.fontSize,
          fontWeight: '600',
          color: theme.text,
          marginBottom: Spacing.lg,
        }}
      >
        Categories
      </Text>

      {/* Category Tabs */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: Spacing.lg,
          paddingBottom: Spacing.md,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory(null)}
          style={{
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.md,
            marginRight: Spacing.md,
            borderBottomColor: selectedCategory === null ? theme.accent : 'transparent',
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              color: selectedCategory === null ? theme.accent : theme.textSecondary,
              fontWeight: selectedCategory === null ? '600' : '400',
              fontSize: Typography.body.fontSize,
            }}
          >
            All ({notes.length})
          </Text>
        </TouchableOpacity>

        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={{
              paddingVertical: Spacing.sm,
              paddingHorizontal: Spacing.md,
              marginRight: Spacing.md,
              borderBottomColor:
                selectedCategory === category.id ? category.color : 'transparent',
              borderBottomWidth: 2,
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory === category.id
                    ? category.color
                    : theme.textSecondary,
                fontWeight: selectedCategory === category.id ? '600' : '400',
                fontSize: Typography.body.fontSize,
              }}
            >
              {category.emoji} {category.name} (
              {notes.filter(n => n.categoryId === category.id).length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notes List */}
      {categoryNotes.length === 0 ? (
        <EmptyState
          icon="📂"
          title="No notes in this category"
          description="Create a note and assign it to this category to see it here."
          theme={theme}
        />
      ) : (
        <FlatList
          data={categoryNotes}
          keyExtractor={note => note.id}
          renderItem={({ item }) => (
            <NoteListSection
              notes={[item]}
              categories={categories}
              onNotePress={(id) => navigation.navigate('EditNote', { noteId: id })}
              onDeleteNote={deleteNote}
              onPinNote={pinNote}
              theme={theme}
            />
          )}
          scrollEnabled={false}
        />
      )}
    </Container>
  );
};
