import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/(tabs)';
import { MainTabParamList } from './app/types/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});