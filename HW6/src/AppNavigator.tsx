import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ItemList from 'C:\Users\alexy\HW6\src\app.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ItemList" component={ItemList} />
    </Stack.Navigator>
);

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ title: 'Home' }}
        />
    </Tab.Navigator>
);

export default AppNavigator;