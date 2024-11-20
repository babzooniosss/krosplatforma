import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import itemStore from '../../src/store/ItemStore';

const ItemListView = observer(() => {
    useEffect(() => {
        itemStore.getItems();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {itemStore.items.map(item => (
                    <View key={item.id} style={styles.item}>
                        <Text>{item.title}</Text>
                        <Button title="Delete" onPress={() => itemStore.deleteItem(item.id)} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
});

export default ItemListView;