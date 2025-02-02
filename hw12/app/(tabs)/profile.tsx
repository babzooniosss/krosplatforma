import { View, Text, StyleSheet, Pressable, Share } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import CustomIcon from '../../components/CustomIcon';
import { useFonts } from '../../hooks/useFonts';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const { userId } = params;
  const fontsLoaded = useFonts();

  const shareProfile = async () => {
    const url = Linking.createURL('/profile', {
      queryParams: { userId: '123' }
    });
    try {
      await Share.share({
        message: url,
        url: url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('headers.profile')}</Text>
      
      {userId && (
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Opened with userId: {userId}
        </Text>
      )}

      <Pressable 
        onPress={shareProfile}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.buttonText}>Share Profile Link</Text>
      </Pressable>

      <Link 
        href="/profile?userId=456" 
        style={[styles.link, { color: theme.colors.primary }]}
      >
        <Text>Open Profile with ID 456</Text>
      </Link>

      {/* Тест разных шрифтов */}
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Этот текст в Roboto Bold
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Этот текст в Roboto Regular
      </Text>

      {/* Тест иконок */}
      <View style={styles.iconContainer}>
        <CustomIcon name="home-outline" size={24} color="black" />
        <CustomIcon name="settings-outline" size={24} color="black" />
        <CustomIcon name="person-outline" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  }
}); 