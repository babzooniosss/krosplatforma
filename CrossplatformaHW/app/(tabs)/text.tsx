import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
    const [inputText, setInputText] = useState('');
    const [displayText, setDisplayText] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.displayText}>{displayText}</Text>

            <TextInput
                style={styles.input}
                placeholder="Введите текст"
                value={inputText}
                onChangeText={(value) => setInputText(value)}
            />

            <Button
                title="Показать текст"
                onPress={() => setDisplayText(inputText)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayText: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
