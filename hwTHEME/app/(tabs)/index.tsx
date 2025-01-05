import React, { useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { observer } from 'mobx-react-lite';
import itemStore from '../../src/store/store';
import { ThemeProvider, useTheme } from '@/src/theme/ThemeProvider';
import { Colors } from '@/src/theme/Style';



const ItemListView = observer(() => {
    const modalizeRef = useRef<Modalize>(null);
    const { theme, toggleTheme } = useTheme();


    const confirmDelete = (id: string) => {
        Alert.alert(
            'Подтверждение',
            'Точно завершить?',
            [
                { text: 'Нет', style: 'cancel' },
                { text: 'Да', onPress: () => itemStore.completeTask(id) },
            ],
            { cancelable: true }
        );
    };


    useEffect(() => {
        itemStore.getItems();
    }, []);

    const openModalize = () => {
        modalizeRef.current?.open();
    };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button
                    title={`Переключить тему (${theme === 'light' ? 'Тёмная' : 'Светлая'})`}
                    onPress={toggleTheme}
                    color={Colors.textPrimary[theme]}
                />
                <Button
                    title="Посмотреть завершенные задачи"
                    onPress={openModalize}
                    color={Colors.textPrimary[theme]}
                />

                <ScrollView>
                    {itemStore.items.map((item) => (
                        <View key={item.id} style={styles.item}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Button
                                title="Завершить"
                                onPress={() => confirmDelete(item.id)}
                                color={Colors.textPrimary[theme]}
                            />
                        </View>
                    ))}
                </ScrollView>

                <Modalize ref={modalizeRef} snapPoint={400} modalHeight={500}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Завершенные задачи</Text>
                        <ScrollView>
                            {itemStore.completedItems.map((completedItem) => (
                                <View
                                    key={completedItem.id}
                                    style={styles.completedItem}
                                >
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
    },
    modalContent: {
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.textPrimary[theme],
    },
    completedItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: Colors.textSecondary[theme],
        borderRadius: 5,
    },
});


const App = () => {
    return (
        <ThemeProvider>
            <ItemListView />
        </ThemeProvider>
    );
};

export default App;
