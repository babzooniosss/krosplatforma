import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { loadAsync } from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await loadAsync({
          'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}; 