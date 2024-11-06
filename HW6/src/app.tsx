// App.js
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import itemStore from './ItemStore'; // Подключаем созданный Store

const App = observer(() => {
    useEffect(() => {
        itemStore.getItems(); // Загружаем данные при монтировании компонента
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                {!itemStore.isLoading ? (
                    itemStore.items.map((item, i) => (
                        <View key={`item_${i}`} style={styles.item}>
                            <Text style={styles.itemId}>ID: {item.id}</Text>
                            <Text style={styles.itemBody}>Body: {item.body}</Text>
                        </View>
                    ))
                ) : (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        padding: 20,
    },
    item: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    itemId: {
        fontWeight: 'bold',
    },
    itemBody: {
        color: '#333',
    },
});

export default App;
