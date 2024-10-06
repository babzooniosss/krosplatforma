import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function App() {
    const [pressCount, setPressCount] = useState(0);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleButtonPress = () => {
        if (pressCount < 3) {
            setPressCount(pressCount + 1);
        }
        if (pressCount + 1 >= 3) {
            setButtonDisabled(true);
        }
    };

    const handleResetPress = () => {
        setPressCount(0);
        setButtonDisabled(false);
    };

    return (
        <View style={styles.container}>
            <Button
                title={`Нажата ${pressCount} раз${pressCount === 1 ? '' : 'а'}`}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
            />
            <Text style={styles.infoText}>
                {isButtonDisabled ? 'Кнопка заблокирована' : 'Кнопка активна'}
            </Text>

            <Button
                title="Сбросить блокировку"
                onPress={handleResetPress}
                color="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    infoText: {
        margin: 10,
        fontSize: 18,
    },
});
