import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@app_language';

const resources = {
  en: {
    translation: {
      tabs: {
        home: 'Home',
        profile: 'Profile',
        settings: 'Settings',
      },
      headers: {
        home: 'Home',
        profile: 'Profile',
        settings: 'Settings',
      },
    },
  },
  ru: {
    translation: {
      tabs: {
        home: 'Главная',
        profile: 'Профиль',
        settings: 'Настройки',
      },
      headers: {
        home: 'Главная',
        profile: 'Профиль',
        settings: 'Настройки',
      },
    },
  },
};

const getStoredLanguage = async () => {
  try {
    return await AsyncStorage.getItem(LANGUAGE_KEY) || 'en';
  } catch {
    return 'en';
  }
};

export const changeLanguage = async (lng: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    await i18n.changeLanguage(lng);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

getStoredLanguage().then((lng) => {
  i18n.changeLanguage(lng);
});

export default i18n; 