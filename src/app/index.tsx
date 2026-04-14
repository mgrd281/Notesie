import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from '@hooks/useNotes';
import { RootNavigator } from '@app/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const { isDarkMode, isLoading, toggleDarkMode } = useDarkMode();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAppReady(true);
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  const handleThemeChange = async (isDark: boolean) => {
    await toggleDarkMode(isDark);
  };

  if (!appReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFBF5', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>📝</Text>
        <Text style={{ fontSize: 32, fontWeight: '700', color: '#2D2D2D' }}>Notesie</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator isDarkMode={isDarkMode} onThemeChange={handleThemeChange} />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
