import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Главный экран</Text>
        </View>
    );
};

const HomeAboutScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>О приложении</Text>
        </View>
    );
};

// Другие экраны табов
const NewsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Экран новостей</Text>
    </View>
);

const ChatScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Экран сообщений</Text>
    </View>
);

const SettingsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Экран настроек</Text>
    </View>
);


const Stack = createNativeStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Домой"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <Ionicons name="Домой" size={24} color="Grey" style={{ marginLeft: 10 }} />
                    ),
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('О приложении')}
                            title="О приложении"
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="О приложении"
                component={HomeAboutScreen}
                options={{ title: 'О приложении' }}
            />
        </Stack.Navigator>
    );
};


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Новости') {
                        iconName = 'newspaper-outline';
                    } else if (route.name === 'Чат') {
                        iconName = 'chatbubble-outline';
                    } else if (route.name === 'Настройки') {
                        iconName = 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Домой" component={HomeStack} options={{ title: 'Домой', headerShown: false }} />
            <Tab.Screen name="Чат" component={ChatScreen} />
            <Tab.Screen name="Новости" component={NewsScreen} />
            <Tab.Screen name="Настройки" component={SettingsScreen} />
        </Tab.Navigator>
    );
};


export default function App() {
    return (
        <NavigationContainer independent={true}>
            <TabNavigation />
        </NavigationContainer>
    );
}