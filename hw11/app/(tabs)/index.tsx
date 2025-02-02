import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { observer } from 'mobx-react-lite';
import itemStore from '../../src/store/ItemStore';
import { ThemeProvider, useTheme } from '@/src/modules/theme/ThemeProvider';
import { Colors } from '@/src/styles/Colors';
import { useTranslation } from 'react-i18next';
import LangStore from '@/src/lang/LangStore';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'; // Импорт иконок

const langStore = new LangStore();

const AppContent = observer(() => {
    const modalizeRef = useRef<Modalize>(null);
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'CustomFont': require('../../assets/fonts/CustomFont.ttf'),
            });
            setFontsLoaded(true);
        };
        loadFonts();
        itemStore.getItems();
    }, []);

    const openModalize = () => {
        modalizeRef.current?.open();
    };

    const confirmDelete = (id: string) => {
        Alert.alert(
            t('common.confirmTitle'),
            t('common.confirmMessage'),
            [
                { text: t('common.no'), style: 'cancel' },
                { text: t('common.yes'), onPress: () => itemStore.completeTask(id) },
            ],
            { cancelable: true }
        );
    };

    const toggleLanguage = async () => {
        const newLang = langStore.currentLang === 'ru' ? 'en' : 'ru';
        await langStore.changeLang(newLang);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: Colors.backgroundPrimary[theme],
        },
        item: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: Colors.buttonBackground[theme],
            borderRadius: 5,
        },
        text: {
            color: Colors.textPrimary[theme],
            fontFamily: 'CustomFont',
        },
        modalContent: {
            padding: 16,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            color: Colors.textPrimary[theme],
            fontFamily: 'CustomFont',
        },
        completedItem: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: Colors.textSecondary[theme],
            borderRadius: 5,
        },
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={Colors.textPrimary[theme]} />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button
                    title={`${t('common.toggleTheme')} (${theme === 'light' ? t('common.dark') : t('common.light')})`}
                    onPress={toggleTheme}
                    color={Colors.textPrimary[theme]}
                />
                <Button
                    title={t('common.viewCompleted')}
                    onPress={openModalize}
                    color={Colors.textPrimary[theme]}
                />
                <Button
                    title={t('common.toggleLanguage')}
                    onPress={toggleLanguage}
                    color={Colors.textPrimary[theme]}
                />

                <ScrollView>
                    {itemStore.items.map((item) => (
                        <View key={item.id} style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.textPrimary[theme]} />
                            <Text style={styles.text}>{item.title}</Text>
                            <Button
                                title={t('common.complete')}
                                onPress={() => confirmDelete(item.id)}
                                color={Colors.textPrimary[theme]}
                            />
                        </View>
                    ))}
                </ScrollView>

                <Modalize ref={modalizeRef} snapPoint={400} modalHeight={500}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('common.completedTasks')}</Text>
                        <ScrollView>
                            {itemStore.completedItems.map((completedItem) => (
                                <View
                                    key={completedItem.id}
                                    style={styles.completedItem}
                                >
                                    <Ionicons name="checkmark-done-circle" size={24} color={Colors.textPrimary[theme]} />
                                    <Text style={styles.text}>
                                        {completedItem.title}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </Modalize>
            </View>
        </GestureHandlerRootView>
    );
});

const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
