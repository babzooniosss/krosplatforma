import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './localization/en.json';
import ru from './localization/ru.json';
import { LangType } from './LangType';

export const defaultNS = 'common'; // Установим 'common' как пространство имен по умолчанию
export const resources = {
    en: { common: en }, // Правильно добавляем JSON в неймспейсы
    ru: { common: ru },
};

// @ts-ignore
i18n
    .use(initReactI18next)
    .init({
        resources,
        defaultNS, // Указываем, что 'common' используется как пространство имен
        lng: LangType.RU, // Установим начальный язык
        fallbackLng: LangType.EN, // Если перевод отсутствует, используем английский
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false, // Не экранируем значения (безопасно в React)
        },
    });

export const Localization = i18n;
