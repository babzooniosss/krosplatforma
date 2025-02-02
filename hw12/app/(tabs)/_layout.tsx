import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#94a3b5',
      headerRight: () => null,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
