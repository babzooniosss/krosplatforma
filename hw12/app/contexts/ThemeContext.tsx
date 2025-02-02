import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = {
  colors: {
    background: string;
    text: string;
    primary: string;
    card: string;
    border: string;
  };
};

const lightTheme: Theme = {
  colors: {
    background: '#1ed140',
    text: '#000000',
    primary: '#31455c',
    card: '#FFFFFF',
    border: '#E1E1E1',
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    card: '#1C1C1E',
    border: '#3A3A3C',
  },
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      if (value) {
        setIsDark(value === 'dark');
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};