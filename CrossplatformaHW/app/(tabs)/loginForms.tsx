import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const validateLogin = () => {
        if (login === 'admin' && password === '1234') {
            setIsLoggedIn(true);
            setErrorMessage('');
        } else {
            setErrorMessage('Неправильный логин или пароль.');
        }
    };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <Text style={styles.welcomeText}>Welcome</Text>
            ) : (
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Логин"
                        value={login}
                        onChangeText={(value) => setLogin(value)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Пароль"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                    />

                    <Button title="Войти" onPress={validateLogin} />
                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});
