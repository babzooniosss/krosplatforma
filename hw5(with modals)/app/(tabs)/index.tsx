import React, { useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { observer } from 'mobx-react-lite';
import itemStore from '../../src/store/store';

const ItemListView = observer(() => {
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        itemStore.getItems();
    }, []);

    const openModalize = () => {
        modalizeRef.current?.open();
    };

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Уведомление',
            'Вы хотите завершить эту задачу?',
            [
                { text: 'Нет', style: 'cancel' },
                { text: 'Да', onPress: () => itemStore.completeTask(id) },
            ],
            { cancelable: true }
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title="Все завершенные задачи" onPress={openModalize} />

                {/* Список задач */}
                <ScrollView>
                    {itemStore.items.map(item => (
                        <View key={item.id} style={styles.item}>
                            <Text>{item.title}</Text>
                            <Button title="Завершить" onPress={() => confirmDelete(item.id)} />
                        </View>
                    ))}
                </ScrollView>

                <Modalize ref={modalizeRef} snapPoint={400} modalHeight={500}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Завершенные задачи</Text>
                        <ScrollView>
                            {itemStore.completedItems.map(completedItem => (
                                <View key={completedItem.id} style={styles.completedItem}>
                                    <Text>{completedItem.title}</Text>
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
        backgroundColor: '#887e7e',
    },
    item: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#40ae55',
        borderRadius: 5,
    },
    modalContent: {
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    completedItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#61fd00',
        borderRadius: 5,
    },
});

export default ItemListView;