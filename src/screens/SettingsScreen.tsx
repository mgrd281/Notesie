import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDarkMode } from '@hooks/useNotes';
import { StorageService } from '@storage/StorageService';
import { LightTheme, DarkTheme, Spacing, Typography, BorderRadius } from '@constants/theme';
import { ThemeColors } from '@types/index';
import { Container, SectionHeader, Divider } from '@components/Layout';
import { PrimaryButton, TextButton } from '@components/Button';

interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<any>;
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
  isDarkMode,
  onThemeChange,
}) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;
  const { toggleDarkMode } = useDarkMode();

  const handleDarkModeToggle = async (value: boolean) => {
    await toggleDarkMode(value);
    onThemeChange(value);
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your notes and categories. This action cannot be undone.',
      [
        { text: 'Cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            try {
              await StorageService.clearAllData();
              Alert.alert('Success', 'All data has been cleared.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleFeedback = () => {
    const email = 'feedback@notesie.app';
    const subject = 'Notesie App Feedback';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(mailto).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  return (
    <Container theme={theme} padding={Spacing.lg}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text
          style={{
            fontSize: Typography.h2.fontSize,
            fontWeight: '600',
            color: theme.text,
            marginBottom: Spacing.lg,
          }}
        >
          Settings
        </Text>

        {/* Appearance Section */}
        <SectionHeader title="Appearance" theme={theme} />
        <View
          style={{
            backgroundColor: theme.surface,
            borderRadius: BorderRadius.lg,
            padding: Spacing.lg,
            marginBottom: Spacing.lg,
            borderColor: theme.border,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: theme.text, fontWeight: '600', marginBottom: Spacing.xs }}>
                Dark Mode
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: Typography.caption.fontSize }}>
                Use dark theme across the app
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: theme.border, true: theme.accent }}
              thumbColor={isDarkMode ? theme.accent : theme.textSecondary}
            />
          </View>
        </View>

        {/* About Section */}
        <SectionHeader title="About" theme={theme} />
        <View
          style={{
            backgroundColor: theme.surface,
            borderRadius: BorderRadius.lg,
            borderColor: theme.border,
            borderWidth: 1,
            marginBottom: Spacing.lg,
            overflow: 'hidden',
          }}
        >
          <SettingRow
            label="App Name"
            value="Notesie"
            theme={theme}
            isButton={false}
          />
          <Divider theme={theme} style={{ marginVertical: 0 }} />
          <SettingRow
            label="Version"
            value="1.0.0"
            theme={theme}
            isButton={false}
          />
          <Divider theme={theme} style={{ marginVertical: 0 }} />
          <SettingRow
            label="Bundle ID"
            value="com.notesie.app"
            theme={theme}
            isButton={false}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" theme={theme} />
        <View
          style={{
            backgroundColor: theme.surface,
            borderRadius: BorderRadius.lg,
            borderColor: theme.border,
            borderWidth: 1,
            marginBottom: Spacing.lg,
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            onPress={handleFeedback}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.md,
            }}
          >
            <Text style={{ color: theme.text, fontWeight: '500' }}>Send Feedback</Text>
            <Text style={{ color: theme.textSecondary }}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Data Management Section */}
        <SectionHeader title="Data" theme={theme} />
        <PrimaryButton
          title="Clear All Data"
          onPress={handleClearAllData}
          theme={theme}
          style={{ backgroundColor: theme.error, marginBottom: Spacing.lg }}
        />

        {/* Footer Info */}
        <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: Typography.caption.fontSize,
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Notesie is a simple, fast, and beautiful note-taking app designed for iOS.{'\n'}
            All your notes are stored locally on your device.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

interface SettingRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  theme: ThemeColors;
  isButton?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  label,
  value,
  onPress,
  theme,
  isButton = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isButton}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
      }}
    >
      <Text style={{ color: theme.text, fontWeight: '500' }}>{label}</Text>
      {value && (
        <Text style={{ color: theme.textSecondary, fontSize: Typography.bodySmall.fontSize }}>
          {value}
        </Text>
      )}
    </TouchableOpacity>
  );
};
