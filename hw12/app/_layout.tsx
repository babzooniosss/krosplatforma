import { Stack } from 'expo-router';
import { useEffect } from 'react';
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.init();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={styles.container}>
        <Host>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </Host>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
