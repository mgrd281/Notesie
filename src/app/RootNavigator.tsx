import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { LightTheme, DarkTheme } from '@constants/theme';
import { useDarkMode } from '@hooks/useNotes';

// Screens
import { HomeScreen } from '@screens/HomeScreen';
import { AddEditNoteScreen } from '@screens/AddEditNoteScreen';
import { CategoriesScreen } from '@screens/CategoriesScreen';
import { SettingsScreen } from '@screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync().catch(() => {});

// HomeStack Navigator
const HomeStackNavigator = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="HomeList"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <HomeScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
      <Stack.Screen
        name="AddNote"
        options={{
          title: 'New Note',
          presentation: 'modal',
        }}
      >
        {(props) => <AddEditNoteScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditNote"
        options={{
          title: 'Edit Note',
        }}
      >
        {(props) => {
          const noteId = (props.route.params as any)?.noteId;
          return <AddEditNoteScreen {...props} isDarkMode={isDarkMode} noteId={noteId} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// CategoriesStack Navigator
const CategoriesStackNavigator = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="CategoriesList"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <CategoriesScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditNote"
        options={{
          title: 'Edit Note',
        }}
      >
        {(props) => {
          const noteId = (props.route.params as any)?.noteId;
          return <AddEditNoteScreen {...props} isDarkMode={isDarkMode} noteId={noteId} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// SettingsStack Navigator
const SettingsStackNavigator = ({
  isDarkMode,
  onThemeChange,
}: {
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
}) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="SettingsList"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            isDarkMode={isDarkMode}
            onThemeChange={onThemeChange}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
export const RootNavigator = ({ isDarkMode, onThemeChange }: { isDarkMode: boolean; onThemeChange: (isDark: boolean) => void }) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        initialParams={{ isDarkMode }}
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📝</Text>,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStackNavigator}
        initialParams={{ isDarkMode }}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📂</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        initialParams={{ isDarkMode, onThemeChange }}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
