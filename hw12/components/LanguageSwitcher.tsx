import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n/i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleLanguage}
    >
      <Text style={styles.text}>
        {currentLanguage === 'en' ? 'RU' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 