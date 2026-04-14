import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNotes, useCategories } from '@hooks/useNotes';
import { LightTheme, DarkTheme, Spacing, Typography } from '@constants/theme';
import { ThemeColors } from '@types/index';
import { Container, SectionHeader, EmptyState } from '@components/Layout';
import { SearchBar } from '@components/Input';
import { NoteListSection } from '@components/NoteCard';
import { FloatingActionButton, PrimaryButton } from '@components/Button';

type HomeScreenNavigationProp = NativeStackNavigationProp<any, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  isDarkMode: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, isDarkMode }) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;
  const { notes, isLoading, getSortedNotes, getPinnedNotes, searchNotes, deleteNote, pinNote, refreshNotes } = useNotes();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');

  const pinnedNotes = getPinnedNotes();
  const regularNotes = getSortedNotes().filter(n => !n.isPinned);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchNotes(query);
    } else {
      await refreshNotes();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshNotes();
    });
    return unsubscribe;
  }, [navigation, refreshNotes]);

  const handleAddNote = () => {
    navigation.navigate('AddNote');
  };

  if (isLoading) {
    return (
      <Container theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.accent} />
        </View>
      </Container>
    );
  }

  const isEmpty = notes.length === 0;

  return (
    <Container theme={theme} padding={Spacing.lg}>
      {/* Header */}
      <Text
        style={{
          fontSize: Typography.h1.fontSize,
          fontWeight: '700',
          color: theme.text,
          marginBottom: Spacing.md,
        }}
      >
        Notesie
      </Text>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={() => handleSearch('')}
        theme={theme}
      />

      {isEmpty ? (
        <EmptyState
          icon="📝"
          title="No notes yet"
          description="Create your first note to get started. Tap the + button below to begin writing."
          theme={theme}
        />
      ) : (
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              {/* Pinned Notes Section */}
              {pinnedNotes.length > 0 && (
                <>
                  <SectionHeader title="Pinned" theme={theme} />
                  <NoteListSection
                    notes={pinnedNotes}
                    categories={categories}
                    onNotePress={(id) => navigation.navigate('EditNote', { noteId: id })}
                    onDeleteNote={deleteNote}
                    onPinNote={pinNote}
                    theme={theme}
                  />
                </>
              )}

              {/* Recent Notes Section */}
              {regularNotes.length > 0 && (
                <>
                  <SectionHeader
                    title={pinnedNotes.length > 0 ? 'Recent' : 'All Notes'}
                    theme={theme}
                  />
                  <NoteListSection
                    notes={regularNotes}
                    categories={categories}
                    onNotePress={(id) => navigation.navigate('EditNote', { noteId: id })}
                    onDeleteNote={deleteNote}
                    onPinNote={pinNote}
                    theme={theme}
                  />
                </>
              )}
            </>
          }
          scrollEnabled={false}
        />
      )}

      {/* Floating Action Button */}
      <FloatingActionButton icon="+" onPress={handleAddNote} theme={theme} />
    </Container>
  );
};
