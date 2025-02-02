import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('headers.settings')}</Text>
      
      <View style={[styles.option, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.optionText, { color: theme.colors.text }]}>{t('settings.language')}</Text>
        <LanguageSwitcher />
      </View>

      <View style={[styles.option, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.optionText, { color: theme.colors.text }]}>{t('settings.darkMode')}</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
}); 