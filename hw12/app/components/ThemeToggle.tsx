import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons
        name={isDark ? 'moon' : 'sunny'}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
}; 