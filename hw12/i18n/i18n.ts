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
      buttons: {
        showCompletedTodos: 'Show completed todos',
        add: 'Add',
        adding: 'Adding...',
        delete: 'Delete',
        deleting: 'Deleting...',
      },
      placeholders: {
        addTodo: 'Add new todo',
      },
      settings: {
        language: 'Language',
        darkMode: 'Dark Mode',
      },
      errors: {
        loadFailed: 'Failed to load todos',
        addFailed: 'Failed to add todo',
        deleteFailed: 'Failed to delete todo',
        toggleFailed: 'Failed to update todo',
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
      buttons: {
        showCompletedTodos: 'Показать завершенные задачи',
        add: 'Добавить',
        adding: 'Добавление...',
        delete: 'Удалить',
        deleting: 'Удаление...',
      },
      placeholders: {
        addTodo: 'Добавить новую задачу',
      },
      settings: {
        language: 'Язык',
        darkMode: 'Темная тема',
      },
      errors: {
        loadFailed: 'Не удалось загрузить задачи',
        addFailed: 'Не удалось добавить задачу',
        deleteFailed: 'Не удалось удалить задачу',
        toggleFailed: 'Не удалось обновить задачу',
      },
    },
  },
};

const getStoredLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return lang || 'en';
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

const initI18n = async () => {
  const storedLang = await getStoredLanguage();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: storedLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
};

initI18n();

export default i18n; 